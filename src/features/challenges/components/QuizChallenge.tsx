import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { QuizConfig } from '../data/quizData'

interface Props {
  config: QuizConfig
  timeLimit: number
  onComplete: (success: boolean) => void
}

export default function QuizChallenge({ config, timeLimit, onComplete }: Props) {
  const { i18n } = useTranslation()
  const isEn = i18n.language === 'en'

  const [selected, setSelected] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  const question = isEn ? config.questionEn : config.question
  const explanation = isEn ? (config.explanationEn || '') : (config.explanation || '')

  useEffect(() => {
    if (showResult || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer)
          onComplete(false)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [showResult, timeLeft, onComplete])

  const handleSelect = useCallback(
    (idx: number) => {
      if (selected !== null) return
      setSelected(idx)
      setShowResult(true)

      const isCorrect = config.options[idx].isCorrect
      setTimeout(() => onComplete(isCorrect), 2000)
    },
    [selected, config.options, onComplete],
  )

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Timer bar */}
      <div className="w-full h-2 bg-rose-100 rounded-full mb-6 overflow-hidden">
        <motion.div
          className="h-full bg-rose-500 rounded-full"
          initial={{ width: '100%' }}
          animate={{ width: `${(timeLeft / timeLimit) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question */}
      <motion.h3
        className="text-xl font-bold text-rose-800 mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {question}
      </motion.h3>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {config.options.map((opt, idx) => {
          const optText = isEn ? opt.textEn : opt.text
          const isSelected = selected === idx
          const isCorrect = opt.isCorrect

          let bgClass = 'bg-white border-2 border-rose-200 text-rose-800'
          if (showResult && isSelected && isCorrect) {
            bgClass = 'bg-green-100 border-2 border-green-500 text-green-800'
          } else if (showResult && isSelected && !isCorrect) {
            bgClass = 'bg-red-100 border-2 border-red-400 text-red-800'
          } else if (showResult && isCorrect) {
            bgClass = 'bg-green-50 border-2 border-green-300 text-green-700'
          }

          return (
            <motion.button
              key={idx}
              className={`w-full px-4 py-3 rounded-xl text-left font-medium cursor-pointer transition-colors ${bgClass}`}
              whileHover={!showResult ? { scale: 1.02, x: 4 } : undefined}
              whileTap={!showResult ? { scale: 0.98 } : undefined}
              onClick={() => handleSelect(idx)}
              disabled={showResult}
            >
              <span className="mr-2 font-bold text-rose-400">
                {String.fromCharCode(65 + idx)}.
              </span>
              {optText}
              {showResult && isCorrect && ' ✅'}
              {showResult && isSelected && !isCorrect && ' ❌'}
            </motion.button>
          )
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showResult && explanation && (
          <motion.div
            className="mt-5 p-4 bg-rose-50 rounded-xl text-center text-rose-700 font-medium"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
