import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../../store/useAppStore'

export default function SettingsModal() {
  const { t, i18n } = useTranslation()
  const { config, updateConfig, settingsOpen, toggleSettings } = useAppStore()
  const [localConfig, setLocalConfig] = useState(config)

  const handleSave = () => {
    updateConfig(localConfig)
    i18n.changeLanguage(localConfig.language)
    localStorage.setItem('app-language', localConfig.language)
    toggleSettings()
  }

  // Sync local when modal opens
  if (settingsOpen && localConfig !== config) {
    setLocalConfig(config)
  }

  return (
    <AnimatePresence>
      {settingsOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSettings}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 mx-auto max-w-md bg-white rounded-3xl p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: '-45%' }}
            animate={{ opacity: 1, scale: 1, y: '-50%' }}
            exit={{ opacity: 0, scale: 0.9, y: '-45%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h2
              className="text-2xl font-bold text-rose-800 mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ⚙️ {t('settings.title')}
            </h2>

            <div className="space-y-5">
              {/* Receiver name */}
              <div>
                <label
                  htmlFor="input-receiver"
                  className="block text-sm font-semibold text-rose-700 mb-1"
                >
                  {t('settings.receiverName')}
                </label>
                <input
                  id="input-receiver"
                  type="text"
                  value={localConfig.receiverName}
                  onChange={(e) =>
                    setLocalConfig((c) => ({ ...c, receiverName: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 text-rose-900 font-medium focus:border-rose-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Sender name */}
              <div>
                <label
                  htmlFor="input-sender"
                  className="block text-sm font-semibold text-rose-700 mb-1"
                >
                  {t('settings.senderName')}
                </label>
                <input
                  id="input-sender"
                  type="text"
                  value={localConfig.senderName}
                  onChange={(e) =>
                    setLocalConfig((c) => ({ ...c, senderName: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 text-rose-900 font-medium focus:border-rose-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Language */}
              <div>
                <label
                  htmlFor="select-language"
                  className="block text-sm font-semibold text-rose-700 mb-1"
                >
                  {t('settings.language')}
                </label>
                <select
                  id="select-language"
                  value={localConfig.language}
                  onChange={(e) =>
                    setLocalConfig((c) => ({
                      ...c,
                      language: e.target.value as 'vi' | 'en',
                    }))
                  }
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 text-rose-900 font-medium focus:border-rose-500 focus:outline-none transition-colors bg-white"
                >
                  <option value="vi">🇻🇳 Tiếng Việt</option>
                  <option value="en">🇬🇧 English</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-8">
              <motion.button
                id="btn-save-settings"
                className="flex-1 py-3 text-base font-bold text-white rounded-xl cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #e11d48, #f43f5e)' }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleSave}
              >
                {t('settings.save')} ✓
              </motion.button>
              <motion.button
                id="btn-close-settings"
                className="px-6 py-3 text-base font-medium text-rose-600 bg-rose-50 rounded-xl border-2 border-rose-200 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={toggleSettings}
              >
                {t('settings.close')}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
