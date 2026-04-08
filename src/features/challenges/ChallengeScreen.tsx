import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SkipForward, ArrowLeft, PartyPopper, RefreshCcw } from 'lucide-react'
import { useAppStore } from '../../store/useAppStore'
import { createChallengeEngine } from './engine'
import type { ChallengeDefinition } from '../../types'
import type { QuizConfig } from './data/quizData'
import type {
  ClickChallengeConfig,
  TapCounterConfig,
  MemoryCardConfig,
  CatchConfig,
  TypeLoveConfig,
} from './data/interactiveData'

import QuizChallenge from './components/QuizChallenge'
import ClickHeartsChallenge from './components/ClickHeartsChallenge'
import TapCounterChallenge from './components/TapCounterChallenge'
import MemoryCardsChallenge from './components/MemoryCardsChallenge'
import CatchHeartsChallenge from './components/CatchHeartsChallenge'
import TypeLoveChallenge from './components/TypeLoveChallenge'

type ChallengePhase = 'playing' | 'result'

export default function ChallengeScreen() {
  const { t, i18n } = useTranslation()
  const { session, setScreen, recordChallenge } = useAppStore()
  const isEn = i18n.language === 'en'

  const engine = useMemo(() => createChallengeEngine(), [])

  const [currentChallenge] = useState<ChallengeDefinition>(
    () => engine.getNext(session.completedChallengeIds),
  )
  const [phase, setPhase] = useState<ChallengePhase>('playing')
  const [lastSuccess, setLastSuccess] = useState(false)

  const handleComplete = useCallback(
    (success: boolean) => {
      setLastSuccess(success)
      setPhase('result')
      recordChallenge(currentChallenge.id)
    },
    [currentChallenge.id, recordChallenge],
  )

  const handleContinue = useCallback(() => {
    setScreen('question')
  }, [setScreen])

  const handleSkip = useCallback(() => {
    recordChallenge(currentChallenge.id)
    setScreen('question')
  }, [currentChallenge.id, recordChallenge, setScreen])

  const renderChallenge = useCallback(() => {
    const cfg = currentChallenge.config as Record<string, unknown>

    switch (currentChallenge.category) {
      case 'quiz':
        return (
          <QuizChallenge
            config={cfg as unknown as QuizConfig}
            timeLimit={currentChallenge.timeLimitSeconds || 15}
            onComplete={handleComplete}
          />
        )

      case 'click': {
        const interConfig = cfg as { type: string }
        if (interConfig.type === 'tap-counter') {
          const tc = cfg as unknown as TapCounterConfig
          return (
            <TapCounterChallenge
              targetTaps={tc.targetTaps}
              timeLimit={tc.timeLimitSeconds}
              onComplete={handleComplete}
            />
          )
        }
        if (interConfig.type === 'catch-hearts') {
          const cc = cfg as unknown as CatchConfig
          return (
            <CatchHeartsChallenge
              targetCount={cc.targetCount}
              timeLimit={cc.timeLimitSeconds}
              spawnInterval={cc.spawnInterval}
              onComplete={handleComplete}
            />
          )
        }
        // Default: click-hearts
        const ch = cfg as unknown as ClickChallengeConfig
        return (
          <ClickHeartsChallenge
            targetCount={ch.targetCount}
            timeLimit={ch.timeLimitSeconds}
            onComplete={handleComplete}
          />
        )
      }

      case 'minigame': {
        const mc = cfg as unknown as MemoryCardConfig
        return (
          <MemoryCardsChallenge
            pairs={mc.pairs}
            emojis={mc.emojis}
            onComplete={handleComplete}
          />
        )
      }

      case 'text': {
        const tl = cfg as unknown as TypeLoveConfig
        return (
          <TypeLoveChallenge
            phrase={tl.phrase}
            phraseEn={tl.phraseEn}
            timeLimit={tl.timeLimitSeconds}
            onComplete={handleComplete}
          />
        )
      }

      default:
        return (
          <div className="text-center text-rose-500">
            Challenge type not found 🤷
          </div>
        )
    }
  }, [currentChallenge, handleComplete])

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-dvh px-4 py-8"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ type: 'spring', stiffness: 250, damping: 25 }}
    >
      {/* Challenge header */}
      <div className="w-full max-w-md mb-6">
        <div className="flex justify-between items-center">
          <motion.h2
            className="text-2xl font-bold text-slate-800"
            style={{ fontFamily: 'var(--font-display)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {t('challenge.title', { num: session.currentChallengeIndex + 1 })}
          </motion.h2>

          <motion.button
            className="px-4 py-2 text-sm font-semibold text-slate-500 bg-slate-100/50 hover:bg-slate-100 hover:text-slate-700 rounded-xl cursor-pointer border border-slate-200/50 flex items-center gap-1.5 transition-colors backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSkip}
          >
            {t('challenge.skip')}
            <SkipForward size={14} strokeWidth={2.5} />
          </motion.button>
        </div>

        {/* Challenge info */}
        <p className="text-slate-500 mt-1 text-sm font-medium">
          {isEn ? currentChallenge.descriptionKey : currentChallenge.descriptionKey}
        </p>
      </div>

      {/* Challenge content */}
      <AnimatePresence mode="wait">
        {phase === 'playing' && (
          <motion.div
            key="playing"
            className="w-full max-w-md bg-white/60 backdrop-blur-xl border border-white/50 shadow-2xl shadow-slate-900/5 rounded-3xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {renderChallenge()}
          </motion.div>
        )}

        {phase === 'result' && (
          <motion.div
            key="result"
            className="w-full max-w-md text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-7xl mb-4 flex justify-center text-rose-500"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: [1.2, 1], rotate: [15, 0] }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.6 }}
            >
              {lastSuccess ? <PartyPopper size={72} strokeWidth={1.5} /> : <RefreshCcw size={72} strokeWidth={1.5} />}
            </motion.div>

            <motion.h3
              className="text-2xl font-bold text-slate-800 mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {lastSuccess ? t('challenge.successTitle', 'Khá lắm!') : t('challenge.failTitle', 'Chưa được rồi!')}
            </motion.h3>

            <motion.p
              className="text-slate-600 mb-8 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {lastSuccess
                ? t('challenge.successMessage', 'Bạn đã mở khóa cơ hội trả lời lại câu hỏi!')
                : t('challenge.failMessage', 'Không sao, hãy quay lại và thử lại nhé!')}
            </motion.p>

            <motion.button
              className="px-8 py-4 text-lg font-bold text-white rounded-2xl cursor-pointer border-none flex items-center justify-center gap-2 mx-auto"
              style={{
                background: 'linear-gradient(135deg, #e11d48, #f43f5e)',
                boxShadow: '0 4px 20px rgba(225, 29, 72, 0.3)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
              {t('challenge.tryAgain')}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
