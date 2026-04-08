import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  targetCount: number
  timeLimit: number
  spawnInterval: number
  onComplete: (success: boolean) => void
}

interface FallingHeart {
  id: number
  x: number
  emoji: string
  speed: number
  y: number
}

const EMOJIS = ['💕', '💖', '💗', '❤️', '💝', '🌹']

export default function CatchHeartsChallenge({
  targetCount,
  timeLimit,
  spawnInterval,
  onComplete,
}: Props) {
  const [hearts, setHearts] = useState<FallingHeart[]>([])
  const [caught, setCaught] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const nextId = useRef(0)
  const done = useRef(false)
  const animRef = useRef<number | null>(null)

  // Spawn hearts
  useEffect(() => {
    const interval = setInterval(() => {
      if (done.current) return
      const heart: FallingHeart = {
        id: nextId.current++,
        x: 5 + Math.random() * 85,
        emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        speed: 1 + Math.random() * 1.5,
        y: -5,
      }
      setHearts((prev) => [...prev.filter((h) => h.y < 105), heart])
    }, spawnInterval)
    return () => clearInterval(interval)
  }, [spawnInterval])

  // Animate falling
  useEffect(() => {
    const tick = () => {
      setHearts((prev) =>
        prev
          .map((h) => ({ ...h, y: h.y + h.speed }))
          .filter((h) => h.y < 105),
      )
      animRef.current = requestAnimationFrame(tick)
    }
    animRef.current = requestAnimationFrame(tick)
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current)
    }
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

  const handleCatch = useCallback(
    (id: number) => {
      if (done.current) return
      setHearts((prev) => prev.filter((h) => h.id !== id))
      setCaught((prev) => {
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
      <div className="flex justify-between items-center mb-3">
        <span className="text-rose-700 font-bold text-lg">
          {caught}/{targetCount} 💕
        </span>
        <span className="text-rose-500 font-medium">{timeLeft}s ⏱️</span>
      </div>

      {/* Game area */}
      <div
        className="relative w-full bg-gradient-to-b from-rose-50/30 to-rose-100/50 rounded-2xl border-2 border-dashed border-rose-200 overflow-hidden"
        style={{ height: 320 }}
      >
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.button
              key={heart.id}
              className="absolute cursor-pointer select-none text-3xl border-none bg-transparent"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
              }}
              whileTap={{ scale: 0.3 }}
              onClick={() => handleCatch(heart.id)}
              exit={{ scale: 0, opacity: 0 }}
              aria-label="Catch heart"
            >
              {heart.emoji}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
