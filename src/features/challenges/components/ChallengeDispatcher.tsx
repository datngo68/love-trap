import type { ChallengeDefinition } from '../../../types'
import QuizChallenge from './QuizChallenge'
import ClickHeartsChallenge from './ClickHeartsChallenge'
import TapCounterChallenge from './TapCounterChallenge'
import MemoryCardsChallenge from './MemoryCardsChallenge'
import CatchHeartsChallenge from './CatchHeartsChallenge'
import TypeLoveChallenge from './TypeLoveChallenge'
import type { QuizConfig } from '../data/quizData'
import type {
  ClickChallengeConfig,
  TapCounterConfig,
  MemoryCardConfig,
  CatchConfig,
  TypeLoveConfig,
} from '../data/interactiveData'

interface ChallengeDispatcherProps {
  challenge: ChallengeDefinition
  onComplete: (success: boolean) => void
}

export default function ChallengeDispatcher({ challenge, onComplete }: ChallengeDispatcherProps) {
  const cfg = challenge.config as Record<string, unknown>

  switch (challenge.category) {
    case 'quiz':
      return (
        <QuizChallenge
          config={cfg as unknown as QuizConfig}
          timeLimit={challenge.timeLimitSeconds || 15}
          onComplete={onComplete}
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
            onComplete={onComplete}
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
            onComplete={onComplete}
          />
        )
      }
      const ch = cfg as unknown as ClickChallengeConfig
      return (
        <ClickHeartsChallenge
          targetCount={ch.targetCount}
          timeLimit={ch.timeLimitSeconds}
          onComplete={onComplete}
        />
      )
    }

    case 'minigame': {
      const mc = cfg as unknown as MemoryCardConfig
      return (
        <MemoryCardsChallenge
          pairs={mc.pairs}
          emojis={mc.emojis}
          onComplete={onComplete}
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
          onComplete={onComplete}
        />
      )
    }

    default:
      return <div className="text-center text-slate-500">Challenge not found.</div>
  }
}
