export interface JourneyStepDef {
  id: string
  stepNumber: 1 | 2 | 3
  titleKey: string
  descriptionKey: string
  unlockMessageKey: string
}

/** The 3 fixed journey steps — mapped to Challenge Registry IDs */
export const journeySteps: JourneyStepDef[] = [
  {
    id: 'bouquet-builder-1', // C4 — Bouquet Builder (Tier 2)
    stepNumber: 1,
    titleKey: 'heartJourney.step1Title',
    descriptionKey: 'heartJourney.step1Desc',
    unlockMessageKey: 'heartJourney.unlockStep1',
  },
  {
    id: 'mad-libs-1', // C1 — Mad Libs (Tier 1)
    stepNumber: 2,
    titleKey: 'heartJourney.step2Title',
    descriptionKey: 'heartJourney.step2Desc',
    unlockMessageKey: 'heartJourney.unlockStep2',
  },
  {
    id: 'draw-heart-1', // C2 — Draw Heart (Wow Tier)
    stepNumber: 3,
    titleKey: 'heartJourney.step3Title',
    descriptionKey: 'heartJourney.step3Desc',
    unlockMessageKey: 'heartJourney.unlockStep3',
  },
]
