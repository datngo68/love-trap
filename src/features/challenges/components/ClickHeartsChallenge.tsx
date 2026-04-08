import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Timer } from 'lucide-react'

interface Props {
  targetCount: number
  timeLimit: number
  onComplete: (success: boolean) => void
}

interface FloatingHeart {
  id: number
  x: number
  y: number
  size: number
  colorClass: string
}

const COLORS = ['text-rose-500', 'text-pink-500', 'text-fuchsia-500', 'text-red-500', 'text-rose-400']

export default function ClickHeartsChallenge({ targetCount, timeLimit, onComplete }: Props) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [clicked, setClicked] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const nextId = useRef(0)
  const done = useRef(false)

  // Spawn hearts periodically
  useEffect(() => {
    const spawnHeart = () => {
      const heart: FloatingHeart = {
        id: nextId.current++,
        x: 10 + Math.random() * 75,
        y: 10 + Math.random() * 65,
        size: 32 + Math.random() * 24,
        colorClass: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
      setHearts((prev) => [...prev.slice(-12), heart])
    }

    // Initial batch
    for (let i = 0; i < 4; i++) setTimeout(spawnHeart, i * 200)

    const interval = setInterval(spawnHeart, 600)
    return () => clearInterval(interval)
  }, [])

  // Timer
  useEffect(() => {
    if (done.current) return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          done.current = true
          clearInterval(timer)
          onComplete(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [onComplete])

  const handleClick = useCallback(
    (id: number) => {
      if (done.current) return
      setHearts((prev) => prev.filter((h) => h.id !== id))
      setClicked((prev) => {
        const next = prev + 1
        if (next >= targetCount) {
          done.current = true
          setTimeout(() => onComplete(true), 300)
        }
        return next
      })
    },
    [targetCount, onComplete],
  )

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress */}
      <div className="flex justify-between items-center mb-4 px-1">
        <div className="flex items-center gap-1.5 text-rose-700 font-bold text-lg">
          <Heart size={20} className="text-rose-500" fill="currentColor" strokeWidth={0} />
          <span>{clicked}/{targetCount}</span>
        </div>
        <div className="flex items-center gap-1.5 text-rose-500 font-medium bg-white px-3 py-1 rounded-full shadow-sm">
          <Timer size={16} />
          <span>{timeLeft}s</span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="w-full h-2 bg-rose-100 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-rose-500 rounded-full"
          animate={{ width: `${(timeLeft / timeLimit) * 100}%` }}
        />
      </div>

      {/* Game area */}
      <div
        className="relative w-full bg-rose-50/50 rounded-2xl border-2 border-dashed border-rose-200 overflow-hidden"
        style={{ height: 300 }}
      >
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.button
              key={heart.id}
              className="absolute cursor-pointer select-none"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                fontSize: heart.size,
              }}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.5 }}
              onClick={() => handleClick(heart.id)}
              aria-label="Click heart"
            >
              <Heart size={heart.size} className={heart.colorClass} fill="currentColor" strokeWidth={0} />
            </motion.button>
          ))}
        </AnimatePresence>

        {hearts.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-rose-300 text-lg">
            Đợi trái tim xuất hiện...
          </div>
        )}
      </div>
    </div>
  )
}
