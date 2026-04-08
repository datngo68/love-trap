export type AppScreen = 'splash' | 'question' | 'challenge' | 'celebration'

export interface UserConfig {
  senderName: string
  receiverName: string
  themeColor: string
  language: 'vi' | 'en'
  autoPlayMusic: boolean
}

export type ChallengeCategory = 'quiz' | 'click' | 'text' | 'minigame' | 'truthdare'
export type ChallengeDifficulty = 'easy' | 'medium' | 'hard'

export interface ChallengeDefinition {
  id: string
  category: ChallengeCategory
  difficulty: ChallengeDifficulty
  titleKey: string
  descriptionKey: string
  timeLimitSeconds?: number
  config: Record<string, unknown>
}

export interface ChallengeResult {
  challengeId: string
  completed: boolean
  score?: number
  timeSpent?: number
}

export interface SessionState {
  refusalCount: number
  completedChallengeIds: string[]
  currentChallengeIndex: number
}
