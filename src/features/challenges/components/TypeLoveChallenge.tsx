import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface Props {
  phrase: string
  phraseEn: string
  timeLimit: number
  onComplete: (success: boolean) => void
}

export default function TypeLoveChallenge({ phrase, phraseEn, timeLimit, onComplete }: Props) {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'
  const target = isEn ? phraseEn : phrase

  const [input, setInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [started, setStarted] = useState(false)
  const done = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

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

  const handleChange = useCallback(
    (value: string) => {
      if (done.current) return
      if (!started) setStarted(true)
      setInput(value)

      if (value.toLowerCase().trim() === target.toLowerCase().trim()) {
        done.current = true
        setTimeout(() => onComplete(true), 500)
      }
    },
    [started, target, onComplete],
  )

  // Character-by-character comparison for visual feedback
  const renderTarget = () => {
    return target.split('').map((char, idx) => {
      const typed = input[idx]
      let colorClass = 'text-rose-300'
      if (typed !== undefined) {
        colorClass =
          typed.toLowerCase() === char.toLowerCase()
            ? 'text-green-600'
            : 'text-red-500'
      }

      return (
        <span key={idx} className={`font-mono text-2xl ${colorClass} transition-colors`}>
          {char}
        </span>
      )
    })
  }

  const accuracy = target.split('').reduce((acc, char, idx) => {
    if (input[idx]?.toLowerCase() === char.toLowerCase()) return acc + 1
    return acc
  }, 0)
  const progress = target.length > 0 ? (accuracy / target.length) * 100 : 0

  return (
    <div className="w-full max-w-md mx-auto text-center">
      {/* Timer */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-rose-700 font-bold">✍️ Gõ lại câu này</span>
        <span className="text-rose-500 font-medium">
          {started ? `${timeLeft}s ⏱️` : 'Gõ để bắt đầu!'}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-rose-100 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-green-500 rounded-full"
          animate={{ width: `${progress}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Target phrase */}
      <div className="p-4 bg-rose-50 rounded-xl mb-4 min-h-[60px] flex items-center justify-center flex-wrap gap-0.5">
        {renderTarget()}
      </div>

      {/* Input */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full px-4 py-3 text-lg rounded-xl border-2 border-rose-300 text-rose-900 font-medium focus:border-rose-500 focus:outline-none transition-colors text-center"
        placeholder={isEn ? 'Start typing...' : 'Bắt đầu gõ...'}
        autoComplete="off"
        spellCheck={false}
      />

      {/* Feedback */}
      {input.length > 0 && (
        <motion.p
          className="mt-4 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {progress < 50 && <span className="text-rose-400">Tiếp tục gõ... 💪</span>}
          {progress >= 50 && progress < 100 && <span className="text-amber-500">Sắp xong! 🔥</span>}
          {progress >= 100 && <span className="text-green-600">Hoàn hảo! 💕</span>}
        </motion.p>
      )}
    </div>
  )
}
