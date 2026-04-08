import type { ChallengeDefinition } from '../../../types'

export interface ClickChallengeConfig {
  type: 'click-hearts'
  targetCount: number
  timeLimitSeconds: number
}

export interface TapCounterConfig {
  type: 'tap-counter'
  targetTaps: number
  timeLimitSeconds: number
}

export interface MemoryCardConfig {
  type: 'memory-cards'
  pairs: number
  emojis: string[]
}

export interface CatchConfig {
  type: 'catch-hearts'
  targetCount: number
  timeLimitSeconds: number
  spawnInterval: number
}

export interface TypeLoveConfig {
  type: 'type-love'
  phrase: string
  phraseEn: string
  timeLimitSeconds: number
}

export type InteractiveConfig =
  | ClickChallengeConfig
  | TapCounterConfig
  | MemoryCardConfig
  | CatchConfig
  | TypeLoveConfig

export const interactiveChallenges: ChallengeDefinition[] = [
  {
    id: 'click-hearts-1',
    category: 'click',
    difficulty: 'easy',
    titleKey: 'Bắt trái tim!',
    descriptionKey: 'Click vào tất cả trái tim trước khi hết giờ!',
    timeLimitSeconds: 10,
    config: {
      type: 'click-hearts',
      targetCount: 8,
      timeLimitSeconds: 10,
    } satisfies ClickChallengeConfig,
  },
  {
    id: 'tap-counter-1',
    category: 'click',
    difficulty: 'easy',
    titleKey: 'Tốc độ tình yêu!',
    descriptionKey: 'Bấm nút thật nhanh!',
    timeLimitSeconds: 5,
    config: {
      type: 'tap-counter',
      targetTaps: 20,
      timeLimitSeconds: 5,
    } satisfies TapCounterConfig,
  },
  {
    id: 'memory-cards-1',
    category: 'minigame',
    difficulty: 'medium',
    titleKey: 'Lật bài tình yêu',
    descriptionKey: 'Tìm các cặp emoji giống nhau!',
    config: {
      type: 'memory-cards',
      pairs: 4,
      emojis: ['💕', '💖', '💗', '🌹', '💝', '😍', '🥰', '❤️'],
    } satisfies MemoryCardConfig,
  },
  {
    id: 'catch-hearts-1',
    category: 'click',
    difficulty: 'medium',
    titleKey: 'Hứng trái tim!',
    descriptionKey: 'Hứng trái tim rơi từ trên xuống!',
    timeLimitSeconds: 12,
    config: {
      type: 'catch-hearts',
      targetCount: 10,
      timeLimitSeconds: 12,
      spawnInterval: 800,
    } satisfies CatchConfig,
  },
  {
    id: 'type-love-1',
    category: 'text',
    difficulty: 'easy',
    titleKey: 'Gõ lời yêu thương!',
    descriptionKey: 'Gõ lại câu dưới đây thật nhanh!',
    timeLimitSeconds: 15,
    config: {
      type: 'type-love',
      phrase: 'Em yêu anh nhiều lắm',
      phraseEn: 'I love you so much',
      timeLimitSeconds: 15,
    } satisfies TypeLoveConfig,
  },
]
