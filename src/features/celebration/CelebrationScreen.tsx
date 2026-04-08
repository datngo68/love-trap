import { useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Share2, RotateCcw } from 'lucide-react'
import confetti from 'canvas-confetti'
import { useAppStore } from '../../store/useAppStore'
import { encodeConfigToURL } from '../../utils/urlConfig'
import { playSfx } from '../../hooks/useAudio'

export default function CelebrationScreen() {
  const { t } = useTranslation()
  const { config, resetSession } = useAppStore()

  const fireConfetti = useCallback(() => {
    const duration = 4000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3'],
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    // Initial burst
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#e11d48', '#f43f5e', '#fb7185', '#fecdd3', '#facc15', '#fef08a'],
    })

    requestAnimationFrame(frame)
  }, [])

  useEffect(() => {
    fireConfetti()
    playSfx('success')
  }, [fireConfetti])

  const handleShare = useCallback(async () => {
    const shareUrl = encodeConfigToURL(config)
    const shareData = {
      title: 'Em Có Yêu Anh Không?',
      text: `${config.receiverName} đã nói CÓ! 💕`,
      url: shareUrl,
    }
    if (navigator.share) {
      await navigator.share(shareData).catch(() => {})
    } else {
      await navigator.clipboard.writeText(shareUrl)
    }
  }, [config])

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-6 text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background gradient */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background: 'linear-gradient(135deg, #fff1f2, #fecdd3, #fef9c3, #fff1f2)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 8s ease infinite',
        }}
      />

      {/* Falling hearts background */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-3xl select-none"
            style={{ left: `${(i * 5) % 100}%` }}
            initial={{ y: -50, opacity: 0 }}
            animate={{
              y: ['0vh', '110vh'],
              opacity: [0, 1, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              delay: i * 0.3,
              ease: 'linear',
            }}
          >
            {['💕', '💖', '💗', '❤️', '🌹', '✨', '💝', '🎉'][i % 8]}
          </motion.span>
        ))}
      </div>

      {/* Main celebration content */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
      >
        {/* Big celebration emoji */}
        <motion.div
          className="text-8xl mb-6"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎉
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-5xl md:text-6xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)', color: '#e11d48' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {t('celebration.title')}
        </motion.h1>

        {/* Message */}
        <motion.p
          className="text-2xl md:text-3xl font-semibold text-rose-700 mb-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {t('celebration.message', { name: config.receiverName })}
        </motion.p>

        <motion.p
          className="text-lg text-rose-500 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {t('celebration.subtitle')}
        </motion.p>

        {/* Action buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            id="btn-share"
            className="px-8 py-3.5 text-lg font-bold text-white rounded-full cursor-pointer border-none flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #e11d48, #f43f5e)',
              boxShadow: '0 4px 20px rgba(225, 29, 72, 0.3)',
            }}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(225, 29, 72, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleShare}
          >
            <Share2 size={18} strokeWidth={2.5} />
            {t('celebration.share')}
          </motion.button>

          <motion.button
            id="btn-play-again"
            className="px-8 py-3.5 text-lg font-medium text-rose-600 bg-white border-2 border-rose-200 rounded-full cursor-pointer flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05, backgroundColor: '#fff1f2' }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSession}
          >
            <RotateCcw size={18} strokeWidth={2.5} />
            {t('celebration.playAgain')}
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
