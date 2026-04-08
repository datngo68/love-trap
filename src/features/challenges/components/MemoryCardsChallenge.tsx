import { useState, useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Props {
  pairs: number
  emojis: string[]
  onComplete: (success: boolean) => void
}

interface Card {
  id: number
  emoji: string
  flipped: boolean
  matched: boolean
}

function generateCards(pairs: number, emojis: string[]): Card[] {
  const selected = emojis.slice(0, pairs)
  const doubled = [...selected, ...selected]

  // Shuffle
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[doubled[i], doubled[j]] = [doubled[j], doubled[i]]
  }

  return doubled.map((emoji, idx) => ({
    id: idx,
    emoji,
    flipped: false,
    matched: false,
  }))
}

export default function MemoryCardsChallenge({ pairs, emojis, onComplete }: Props) {
  const [cards, setCards] = useState<Card[]>(() => generateCards(pairs, emojis))
  const [flippedIds, setFlippedIds] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [matchedCount, setMatchedCount] = useState(0)
  const checking = useRef(false)

  useEffect(() => {
    if (matchedCount >= pairs) {
      setTimeout(() => onComplete(true), 600)
    }
  }, [matchedCount, pairs, onComplete])

  const handleFlip = useCallback(
    (id: number) => {
      if (checking.current) return
      const card = cards.find((c) => c.id === id)
      if (!card || card.flipped || card.matched) return
      if (flippedIds.length >= 2) return

      const newFlipped = [...flippedIds, id]
      setFlippedIds(newFlipped)
      setCards((prev) =>
        prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)),
      )

      if (newFlipped.length === 2) {
        checking.current = true
        setMoves((m) => m + 1)

        const [first, second] = newFlipped
        const card1 = cards.find((c) => c.id === first)!
        const card2 = cards.find((c) => c.id === second)!

        if (card1.emoji === card2.emoji) {
          // Match!
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === first || c.id === second
                  ? { ...c, matched: true }
                  : c,
              ),
            )
            setMatchedCount((m) => m + 1)
            setFlippedIds([])
            checking.current = false
          }, 500)
        } else {
          // No match — flip back
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === first || c.id === second
                  ? { ...c, flipped: false }
                  : c,
              ),
            )
            setFlippedIds([])
            checking.current = false
          }, 800)
        }
      }
    },
    [cards, flippedIds],
  )

  const cols = pairs <= 3 ? 3 : 4

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-rose-700 font-bold">
          {matchedCount}/{pairs} cặp 💕
        </span>
        <span className="text-rose-500 font-medium">{moves} lượt</span>
      </div>

      {/* Cards grid */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      >
        {cards.map((card) => (
          <motion.button
            key={card.id}
            className="aspect-square rounded-xl text-3xl flex items-center justify-center cursor-pointer select-none border-none"
            style={{
              background: card.matched
                ? 'linear-gradient(135deg, #dcfce7, #bbf7d0)'
                : card.flipped
                  ? 'linear-gradient(135deg, #fff1f2, #fecdd3)'
                  : 'linear-gradient(135deg, #e11d48, #f43f5e)',
              boxShadow: card.matched
                ? '0 2px 8px rgba(34, 197, 94, 0.3)'
                : '0 2px 8px rgba(225, 29, 72, 0.2)',
            }}
            whileHover={!card.flipped && !card.matched ? { scale: 1.05 } : undefined}
            whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : undefined}
            animate={{
              rotateY: card.flipped || card.matched ? 0 : 180,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            onClick={() => handleFlip(card.id)}
            aria-label={card.flipped || card.matched ? card.emoji : 'Hidden card'}
          >
            {card.flipped || card.matched ? card.emoji : '❓'}
          </motion.button>
        ))}
      </div>
    </div>
  )
}
