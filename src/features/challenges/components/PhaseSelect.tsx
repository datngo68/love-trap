import { motion } from 'framer-motion'
import { ArrowLeft, LayoutGrid } from 'lucide-react'
import type { ChallengeDefinition } from '../../../types'

interface PhaseSelectProps {
  options: ChallengeDefinition[]
  onSelect: (opt: ChallengeDefinition) => void
  onGoToHub: () => void
}

export default function PhaseSelect({ options, onSelect, onGoToHub }: PhaseSelectProps) {
  return (
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
            onClick={() => onSelect(opt)}
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
        onClick={onGoToHub}
      >
        <LayoutGrid size={16} />
        Đến kho Game (Dành cho Dev/Player)
      </motion.button>
    </motion.div>
  )
}
