import { challengeRegistry } from '../../challenges/registry'

export interface JourneyStepDef {
  id: string
  stepNumber: 1 | 2 | 3
  titleKey: string
  descriptionKey: string
  unlockMessageKey: string
}

// 4 kịch bản cảm xúc khác nhau
const themedJourneys = [
  // Combo 1: Lãng mạn (Romantic)
  ['bouquet-builder-1', 'mad-libs-1', 'draw-heart-1'],
  // Combo 2: Thử thách (Action/Reflex)
  ['catch-hearts-1', 'rhythm-tap-1', 'heart-shooter-1'],
  // Combo 3: Kỷ niệm (Memory & Truth)
  ['quiz-1', 'truth-dare-1', 'memory-lane-1'],
  // Combo 4: Vui nhộn (Fun)
  ['tap-counter-1', 'memory-cards-1', 'click-hearts-1'],
]

export function getRandomJourney(): JourneyStepDef[] {
  // Chọn ngẫu nhiên 1 kịch bản
  const randomCombo = themedJourneys[Math.floor(Math.random() * themedJourneys.length)]
  
  return randomCombo.map((challengeId, idx) => {
    // Lấy tên/mô tả gốc của game làm thông tin step
    const challenge = challengeRegistry.get(challengeId)
    return {
      id: challengeId,
      stepNumber: (idx + 1) as 1 | 2 | 3,
      titleKey: challenge?.titleKey || 'heartJourney.step1Title',
      descriptionKey: challenge?.descriptionKey || 'heartJourney.step1Desc',
      unlockMessageKey: `heartJourney.unlockStep${idx + 1}`, // Giữ nguyên thông báo mở khóa
    }
  })
}
