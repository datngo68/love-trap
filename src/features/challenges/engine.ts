import type { ChallengeDefinition } from '../../types'
import { challengeRegistry } from './registry'

/**
 * Challenge Engine — manages random-without-repeat pool.
 *
 * Rules (from SRS FR-05):
 * - No duplicate challengeId in a session until pool is exhausted
 * - After exhaustion, reshuffle and allow repeats
 * - Difficulty can optionally scale with challenge index
 */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function createChallengeEngine() {
  const allChallenges = challengeRegistry.getAll()
  let pool: ChallengeDefinition[] = []
  let usedInRound: Set<string> = new Set()

  function refillPool() {
    pool = shuffle(allChallenges)
    usedInRound = new Set()
  }

  function getNext(_completedIds: string[]): ChallengeDefinition {
    // If pool is empty or all used in this round, reshuffle
    if (pool.length === 0 || usedInRound.size >= allChallenges.length) {
      refillPool()
    }

    // Find first challenge not yet used in this round
    let candidate = pool.find((c) => !usedInRound.has(c.id))

    // If somehow all are used (edge case), just reshuffle
    if (!candidate) {
      refillPool()
      candidate = pool[0]
    }

    usedInRound.add(candidate.id)

    // Remove from pool to cycle through
    pool = pool.filter((c) => c.id !== candidate!.id)

    return candidate
  }

  function getOptions(n: number): ChallengeDefinition[] {
    if (pool.length < n) refillPool()
    const opts: ChallengeDefinition[] = []
    const cPool = [...pool]
    for (let i = 0; i < Math.min(n, cPool.length); i++) {
      opts.push(cPool[i])
    }
    return opts
  }

  function commitOption(challengeId: string) {
    usedInRound.add(challengeId)
    pool = pool.filter((c) => c.id !== challengeId)
  }

  function getTotalCount(): number {
    return allChallenges.length
  }

  function getAll(): ChallengeDefinition[] {
    return allChallenges
  }

  return { getNext, getOptions, commitOption, getTotalCount, getAll, refillPool }
}

export type ChallengeEngine = ReturnType<typeof createChallengeEngine>
