import { motion } from 'framer-motion'
import type { ChallengeDefinition } from '../../../types'

interface PhaseHubProps {
  options: ChallengeDefinition[]
  onSelect: (opt: ChallengeDefinition) => void
}

export default function PhaseHub({ options, onSelect }: PhaseHubProps) {
  return (
    <motion.div
      key="hub"
      className="w-full max-w-md grid grid-cols-2 gap-3 h-[50vh] overflow-y-auto pr-2 pb-10"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      {options.map((opt) => (
        <motion.button
          key={opt.id}
          className="p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-200 shadow-sm hover:border-rose-300 hover:shadow-md transition-all text-left flex flex-col justify-between h-24 cursor-pointer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelect(opt)}
        >
          <div className="font-semibold text-slate-700 text-sm truncate">{opt.id}</div>
          <div className="text-xs font-medium text-rose-500 uppercase">{opt.category}</div>
        </motion.button>
      ))}
    </motion.div>
  )
}
