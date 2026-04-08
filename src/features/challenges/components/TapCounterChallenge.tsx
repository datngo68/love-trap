import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Heart, Timer, Hand, Activity, Flame, Rocket, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface Props {
  targetTaps: number
  timeLimit: number
  onComplete: (success: boolean) => void
}

export default function TapCounterChallenge({ targetTaps, timeLimit, onComplete }: Props) {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const [taps, setTaps] = useState(0)
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [started, setStarted] = useState(false)
  const done = useRef(false)

  useEffect(() => {
    if (!started || done.current) return
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
  }, [started, onComplete])

  const handleTap = useCallback(() => {
    if (done.current) return
    if (!started) setStarted(true)

    setTaps((prev) => {
      const next = prev + 1
      if (next >= targetTaps) {
        done.current = true
        setTimeout(() => onComplete(true), 300)
      }
      return next
    })
  }, [started, targetTaps, onComplete])

  const progress = Math.min((taps / targetTaps) * 100, 100)
  const intensity = Math.min(taps / targetTaps, 1)

  return (
    <div className="w-full max-w-sm mx-auto text-center">
      {/* Timer */}
      <div className="flex justify-between items-center mb-4 px-1">
        <span className="text-rose-700 font-bold text-lg flex items-center gap-1.5">
          <Heart size={20} className="text-rose-500" fill="currentColor" strokeWidth={0} />
          {taps}/{targetTaps}
        </span>
        <span className="text-rose-500 font-medium flex items-center gap-1.5 bg-white px-3 py-1 rounded-full shadow-sm">
          {started ? (
            <>
              <Timer size={16} /> 
              <span>{timeLeft}s</span>
            </>
          ) : (
            isEn ? 'Tap to start!' : 'Bấm để bắt đầu!'
          )}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-3 bg-rose-100 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, #f43f5e, #e11d48)`,
          }}
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Big tap button */}
      <motion.button
        className="w-40 h-40 rounded-full text-5xl cursor-pointer border-none select-none mx-auto flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, hsl(${350 - intensity * 20}, 80%, ${65 - intensity * 15}%), hsl(${345 - intensity * 15}, 90%, ${55 - intensity * 10}%))`,
          boxShadow: `0 ${6 + intensity * 10}px ${20 + intensity * 20}px rgba(225, 29, 72, ${0.3 + intensity * 0.3})`,
        }}
        whileTap={{ scale: 0.85 }}
        animate={{
          scale: [1, 1 + intensity * 0.05, 1],
        }}
        transition={{
          scale: { duration: 0.3, repeat: Infinity },
        }}
        onClick={handleTap}
        aria-label="Tap"
      >
        <Heart size={48} className="text-white" fill="currentColor" strokeWidth={0} />
      </motion.button>

      {/* Encouragement */}
      <motion.div
        className="mt-6 flex justify-center text-rose-600"
        key={Math.floor(taps / 5)}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 text-lg font-semibold bg-white/70 px-4 py-2 rounded-xl backdrop-blur-sm border border-rose-100 shadow-sm">
          {taps === 0 && <><Hand size={20} className="text-rose-400" /> {isEn ? 'Tap tap!' : 'Bấm nào!'}</>}
          {taps > 0 && taps < targetTaps * 0.3 && <><Activity size={20} className="text-pink-500" /> {isEn ? 'Keep going!' : 'Tiếp tục!'}</>}
          {taps >= targetTaps * 0.3 && taps < targetTaps * 0.6 && <><Flame size={20} className="text-orange-500" /> {isEn ? 'Faster!' : 'Nhanh hơn nữa!'}</>}
          {taps >= targetTaps * 0.6 && taps < targetTaps * 0.9 && <><Rocket size={20} className="text-rose-600" /> {isEn ? 'Almost there!' : 'Sắp điên cuồng rồi!'}</>}
          {taps >= targetTaps * 0.9 && taps < targetTaps && <><Zap size={20} className="text-yellow-500" /> {isEn ? 'Finish line!' : 'Còn chút nữa thôi!'}</>}
        </div>
      </motion.div>
    </div>
  )
}
