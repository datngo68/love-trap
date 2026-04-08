import { motion } from 'framer-motion'
import { ArrowLeft, PartyPopper, RefreshCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface PhaseResultProps {
  success: boolean
  onContinue: () => void
}

export default function PhaseResult({ success, onContinue }: PhaseResultProps) {
  const { t } = useTranslation()

  return (
    <motion.div
      key="result"
      className="w-full max-w-md text-center bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/60"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <motion.div
        className="text-7xl mb-6 flex justify-center text-rose-500"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: [1.2, 1], rotate: [15, 0] }}
        transition={{ duration: 0.7, type: 'spring', bounce: 0.6 }}
      >
        {success ? <PartyPopper size={72} strokeWidth={1.5} /> : <RefreshCcw size={72} strokeWidth={1.5} />}
      </motion.div>

      <motion.h3
        className="text-2xl font-bold text-slate-800 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {success ? t('challenge.successTitle', 'Xuất sắc!') : t('challenge.failTitle', 'Ối, lặp lại nào!')}
      </motion.h3>

      <motion.p
        className="text-slate-600 mb-8 font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        {success
          ? t('challenge.successMessage', 'Bạn đã mở khóa cơ hội trả lời lại câu hỏi rồi!')
          : t('challenge.failMessage', 'Không sao cả, hãy quay lại và thử sức lần nữa nhé!')}
      </motion.p>

      <motion.button
        className="px-8 py-4 text-lg font-bold text-white rounded-2xl cursor-pointer border-none flex items-center justify-center gap-2 mx-auto"
        style={{
          background: 'linear-gradient(135deg, #e11d48, #f43f5e)',
          boxShadow: '0 8px 25px rgba(225, 29, 72, 0.35)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, type: 'spring' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onContinue}
      >
        <ArrowLeft size={18} strokeWidth={2.5} />
        Quay Lại Câu Hỏi
      </motion.button>
    </motion.div>
  )
}
