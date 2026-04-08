import type { ChallengeDefinition } from '../../../types'
import type {
  ClickChallengeConfig,
  TapCounterConfig,
  MemoryCardConfig,
  CatchConfig,
  TypeLoveConfig,
} from './interactiveData'

export const interactiveChallengesExtra: ChallengeDefinition[] = [
  {
    id: 'click-hearts-2',
    category: 'click',
    difficulty: 'medium',
    titleKey: 'Bắt trái tim cấp 2!',
    descriptionKey: 'Nhiều hơn, nhanh hơn!',
    timeLimitSeconds: 8,
    config: {
      type: 'click-hearts',
      targetCount: 12,
      timeLimitSeconds: 8,
    } satisfies ClickChallengeConfig,
  },
  {
    id: 'tap-counter-2',
    category: 'click',
    difficulty: 'hard',
    titleKey: 'Siêu tốc độ!',
    descriptionKey: 'Bạn có thể bấm 30 lần trong 5 giây?',
    timeLimitSeconds: 5,
    config: {
      type: 'tap-counter',
      targetTaps: 30,
      timeLimitSeconds: 5,
    } satisfies TapCounterConfig,
  },
  {
    id: 'memory-cards-2',
    category: 'minigame',
    difficulty: 'hard',
    titleKey: 'Trí nhớ siêu cấp!',
    descriptionKey: 'Nhiều cặp hơn!',
    config: {
      type: 'memory-cards',
      pairs: 6,
      emojis: ['💕', '💖', '💗', '🌹', '💝', '😍', '🥰', '❤️', '💘', '💞'],
    } satisfies MemoryCardConfig,
  },
  {
    id: 'catch-hearts-2',
    category: 'click',
    difficulty: 'hard',
    titleKey: 'Mưa trái tim!',
    descriptionKey: 'Trái tim rơi nhanh hơn!',
    timeLimitSeconds: 10,
    config: {
      type: 'catch-hearts',
      targetCount: 15,
      timeLimitSeconds: 10,
      spawnInterval: 500,
    } satisfies CatchConfig,
  },
  {
    id: 'type-love-2',
    category: 'text',
    difficulty: 'medium',
    titleKey: 'Lời yêu thương dài hơn!',
    descriptionKey: 'Câu này khó hơn một chút!',
    timeLimitSeconds: 20,
    config: {
      type: 'type-love',
      phrase: 'Anh yêu em hơn cả bầu trời',
      phraseEn: 'I love you more than the sky',
      timeLimitSeconds: 20,
    } satisfies TypeLoveConfig,
  },
]
