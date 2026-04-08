import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../store/useAppStore'

export default function SplashScreen() {
  const { t } = useTranslation()
  const { config, setScreen } = useAppStore()

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Floating hearts background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-2xl select-none"
            style={{
              left: `${8 + (i * 7.5) % 90}%`,
              top: `${10 + (i * 13) % 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
              opacity: [0.15, 0.35, 0.15],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          >
            {['💕', '💖', '💗', '🌹', '✨', '💝'][i % 6]}
          </motion.span>
        ))}
      </div>

      {/* Main content */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.8, y: 30 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
      >
        {/* Heart icon */}
        <motion.div
          className="text-7xl mb-6"
          animate={{ scale: [1, 1.15, 1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          💕
        </motion.div>

        {/* App title */}
        <h1
          className="text-4xl md:text-5xl font-bold mb-4"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Em Có Yêu Anh Không?
        </h1>

        {/* Greeting */}
        <motion.p
          className="text-xl md:text-2xl font-medium text-rose-700 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {t('splash.greeting', { name: config.receiverName })}
        </motion.p>

        <motion.p
          className="text-base text-rose-500 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {t('splash.subtitle')}
        </motion.p>

        {/* Start button */}
        <motion.button
          id="btn-start"
          className="relative px-10 py-4 text-lg font-bold text-white rounded-full cursor-pointer overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #e11d48, #f43f5e, #fb7185)',
            backgroundSize: '200% 200%',
          }}
          whileHover={{ scale: 1.08, boxShadow: '0 8px 30px rgba(225, 29, 72, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' },
          }}
          onClick={() => setScreen('question')}
          aria-label={t('splash.start')}
        >
          {t('splash.start')} 💌
        </motion.button>

        {/* From sender */}
        <motion.p
          className="mt-8 text-sm text-rose-400 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {t('splash.from', { sender: config.senderName })}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
