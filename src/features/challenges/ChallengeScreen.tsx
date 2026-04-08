import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { SkipForward, ArrowLeft, PartyPopper, RefreshCcw, LayoutGrid } from 'lucide-react'
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

type ChallengePhase = 'select' | 'hub' | 'playing' | 'result'

export default function ChallengeScreen() {
  const { t, i18n } = useTranslation()
  const { setScreen, recordChallenge } = useAppStore()
  const isEn = i18n.language === 'en'

  const engine = useMemo(() => createChallengeEngine(), [])

  const [phase, setPhase] = useState<ChallengePhase>('select')
  const [currentChallenge, setCurrentChallenge] = useState<ChallengeDefinition | null>(null)
  const [options] = useState<ChallengeDefinition[]>(() => engine.getOptions(3))
  const [lastSuccess, setLastSuccess] = useState(false)

  const handleComplete = useCallback(
    (success: boolean) => {
      setLastSuccess(success)
      setPhase('result')
      if (currentChallenge) recordChallenge(currentChallenge.id)
    },
    [currentChallenge, recordChallenge],
  )

  const handleContinue = useCallback(() => {
    setScreen('question')
  }, [setScreen])

  const handleSkip = useCallback(() => {
    if (currentChallenge) recordChallenge(currentChallenge.id)
    setScreen('question')
  }, [currentChallenge, recordChallenge, setScreen])

  const renderChallenge = useCallback(() => {
    if (!currentChallenge) return null

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
          <div className="text-center text-slate-500">
            Challenge not found.
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
      {/* Dynamic Header based on Phase */}
      {(phase === 'select' || phase === 'hub') && (
        <div className="text-center mb-8 w-full max-w-md">
          <motion.h2 
            className="text-3xl font-bold text-slate-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {phase === 'select' ? "Hình Phạt Của Bạn!" : "Arcade Hub"}
          </motion.h2>
          <p className="text-slate-500 mt-2 font-medium">
            {phase === 'select' ? "Bốc 1 thẻ bí ẩn để tiếp tục!" : "Chọn bất kì trò nào bạn muốn"}
          </p>
        </div>
      )}

      {(phase === 'playing' || phase === 'result') && currentChallenge && (
        <div className="w-full max-w-md mb-6">
          <div className="flex justify-between items-center">
            <motion.h2
              className="text-2xl font-bold text-slate-800"
              style={{ fontFamily: 'var(--font-display)' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {currentChallenge.id.replace(/-/g, ' ').toUpperCase()}
            </motion.h2>

            <motion.button
              className="px-4 py-2 text-sm font-semibold text-slate-500 bg-slate-100/50 hover:bg-slate-100 hover:text-slate-700 rounded-xl cursor-pointer border border-slate-200/50 flex items-center gap-1.5 transition-colors backdrop-blur-sm shadow-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSkip}
            >
              Skip
              <SkipForward size={14} strokeWidth={2.5} />
            </motion.button>
          </div>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            {isEn ? currentChallenge.descriptionKey : currentChallenge.descriptionKey}
          </p>
        </div>
      )}

      {/* Primary Content Container */}
      <AnimatePresence mode="wait">
        {phase === 'select' && (
          <motion.div
            key="select"
            className="w-full max-w-md flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="grid grid-cols-1 gap-4">
              {options.map((opt, i) => (
                <motion.button
                  key={`mystery-${i}`}
                  className="p-5 text-left bg-white/70 backdrop-blur-xl rounded-2xl border border-rose-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(225,29,72,0.1)] hover:bg-white transition-all flex items-center justify-between group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => {
                    engine.commitOption(opt.id)
                    setCurrentChallenge(opt)
                    setPhase('playing')
                  }}
                >
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-rose-600 transition-colors">
                      Thẻ Bí Ẩn #{i + 1}
                    </h3>
                    <p className="text-rose-400 text-xs font-bold tracking-wider mt-1 uppercase">
                      Chủ đề: {opt.category}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
                    <ArrowLeft size={18} className="rotate-180" />
                  </div>
                </motion.button>
              ))}
            </div>

            <motion.button
              className="mt-4 mx-auto flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm font-medium transition-colors cursor-pointer"
              onClick={() => setPhase('hub')}
            >
              <LayoutGrid size={16} />
              Đến kho Game (Dành cho Dev/Player)
            </motion.button>
          </motion.div>
        )}

        {phase === 'hub' && (
          <motion.div
            key="hub"
            className="w-full max-w-md grid grid-cols-2 gap-3 h-[50vh] overflow-y-auto pr-2 pb-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            {engine.getAll().map((opt) => (
              <motion.button
                key={opt.id}
                className="p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm hover:border-rose-300 hover:shadow-md transition-all text-left flex flex-col justify-between h-24"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  engine.commitOption(opt.id)
                  setCurrentChallenge(opt)
                  setPhase('playing')
                }}
              >
                <div className="font-semibold text-slate-700 text-sm truncate">{opt.id}</div>
                <div className="text-xs font-medium text-rose-500 uppercase">{opt.category}</div>
              </motion.button>
            ))}
          </motion.div>
        )}

        {phase === 'playing' && (
          <motion.div
            key="playing"
            className="w-full max-w-md bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_8px_40px_rgba(0,0,0,0.06)] rounded-3xl p-6"
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
            className="w-full max-w-md text-center bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.div
              className="text-7xl mb-6 flex justify-center text-rose-500"
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
              {lastSuccess ? t('challenge.successTitle', 'Xuất sắc!') : t('challenge.failTitle', 'Ối, lặp lại nào!')}
            </motion.h3>

            <motion.p
              className="text-slate-600 mb-8 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {lastSuccess
                ? t('challenge.successMessage', 'Bạn đã mở khóa cơ hội trả lời lại câu hỏi rồi!')
                : t('challenge.failMessage', 'Không sao cả, hãy quay lại và thử sức lần nữa nhé!')}
            </motion.p>

            <motion.button
              className="px-8 py-4 text-lg font-bold text-white rounded-2xl cursor-pointer border-none flex items-center justify-center gap-2 mx-auto"
              style={{
                background: 'linear-gradient(135deg, #e11d48, #f43f5e)',
                boxShadow: '0 8px 25px rgba(225, 29, 72, 0.35)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContinue}
            >
              <ArrowLeft size={18} strokeWidth={2.5} />
              Quay Lại Câu Hỏi
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
