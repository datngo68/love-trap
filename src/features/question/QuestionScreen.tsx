import { useState, useCallback, useRef } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../store/useAppStore'
import { playSfx } from '../../hooks/useAudio'

export default function QuestionScreen() {
  const { t } = useTranslation()
  const { session, setScreen, recordRefusal } = useAppStore()
  const [tooltipText, setTooltipText] = useState('')
  const [showTooltip, setShowTooltip] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  const variantIndex = session.refusalCount % 12
  const variants = t('question.variants', { returnObjects: true }) as string[]
  const questionText = variants[variantIndex] || variants[0]

  const tooltips = t('question.noTooltips', { returnObjects: true }) as string[]

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotate = useTransform(x, [-100, 100], [-15, 15])

  const dodgeNoButton = useCallback(() => {
    const maxX = window.innerWidth * 0.3
    const maxY = window.innerHeight * 0.25
    const newX = (Math.random() - 0.5) * 2 * maxX
    const newY = (Math.random() - 0.5) * 2 * maxY
    x.set(newX)
    y.set(newY)

    const tip = tooltips[Math.floor(Math.random() * tooltips.length)]
    setTooltipText(tip)
    setShowTooltip(true)
    setTimeout(() => setShowTooltip(false), 1200)
  }, [x, y, tooltips])

  const handleNo = useCallback(() => {
    playSfx('click')
    recordRefusal()
    setScreen('challenge')
  }, [recordRefusal, setScreen])

  const handleYes = useCallback(() => {
    playSfx('pop')
    setScreen('celebration')
  }, [setScreen])

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-6 text-center relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      {/* Decorative sparkles */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
              background: `hsl(${340 + i * 5}, 80%, ${70 + i * 2}%)`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.6,
            }}
          />
        ))}
      </div>

      {/* Question heart */}
      <motion.div
        className="text-6xl mb-8"
        animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        💓
      </motion.div>

      {/* Question text */}
      <motion.h1
        key={variantIndex}
        className="text-3xl md:text-4xl font-bold mb-12 max-w-md leading-snug"
        style={{ fontFamily: 'var(--font-display)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {questionText}
      </motion.h1>

      {/* Buttons container */}
      <div className="flex flex-col gap-5 items-center w-full max-w-xs relative">
        {/* YES button — big and inviting */}
        <motion.button
          id="btn-yes"
          className="w-full py-4 text-xl font-bold text-white rounded-2xl cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, #e11d48, #f43f5e)',
            boxShadow: '0 6px 24px rgba(225, 29, 72, 0.35)',
          }}
          whileHover={{
            scale: 1.06,
            boxShadow: '0 10px 40px rgba(225, 29, 72, 0.5)',
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleYes}
          aria-label={t('question.yes')}
        >
          {t('question.yes')}
        </motion.button>

        {/* NO button — dodges on hover/approach */}
        <div className="relative">
          <motion.button
            ref={noButtonRef}
            id="btn-no"
            className="px-8 py-3 text-base font-medium text-rose-400 bg-rose-50 border-2 border-rose-200 rounded-2xl cursor-pointer"
            style={{ x, y, rotate }}
            onHoverStart={dodgeNoButton}
            onTouchStart={dodgeNoButton}
            onClick={handleNo}
            whileTap={{ scale: 0.9 }}
            aria-label={t('question.no')}
          >
            {t('question.no')}
          </motion.button>

          {/* Tooltip */}
          {showTooltip && (
            <motion.div
              className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-rose-600 text-white text-sm px-3 py-1 rounded-lg pointer-events-none"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {tooltipText}
            </motion.div>
          )}
        </div>
      </div>

      {/* Refusal counter (subtle) */}
      {session.refusalCount > 0 && (
        <motion.p
          className="mt-8 text-xs text-rose-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Đã từ chối: {session.refusalCount} lần 😤
        </motion.p>
      )}
    </motion.div>
  )
}
