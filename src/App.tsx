import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useAppStore } from './store/useAppStore'
import { useBackgroundMusic, useAudioStore } from './hooks/useAudio'
import { decodeConfigFromURL } from './utils/urlConfig'
import SplashScreen from './features/splash/SplashScreen'
import QuestionScreen from './features/question/QuestionScreen'
import ChallengeScreen from './features/challenges/ChallengeScreen'
import CelebrationScreen from './features/celebration/CelebrationScreen'
import SettingsModal from './features/settings/SettingsModal'

function SettingsButton() {
  const toggleSettings = useAppStore((s) => s.toggleSettings)

  return (
    <button
      id="btn-settings"
      className="fixed top-4 right-4 z-30 w-10 h-10 flex items-center justify-center text-xl bg-white/80 rounded-full shadow-md cursor-pointer hover:bg-white transition-colors"
      onClick={toggleSettings}
      aria-label="Settings"
    >
      ⚙️
    </button>
  )
}

function AudioControls() {
  const { musicPlaying, handleToggle } = useBackgroundMusic()
  const sfxEnabled = useAudioStore((s) => s.sfxEnabled)
  const toggleSfx = useAudioStore((s) => s.toggleSfx)

  return (
    <div className="fixed bottom-4 right-4 z-30 flex gap-2">
      <motion.button
        id="btn-music"
        className="w-10 h-10 flex items-center justify-center text-lg bg-white/80 rounded-full shadow-md cursor-pointer hover:bg-white transition-colors"
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        aria-label={musicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
        title={musicPlaying ? 'Tắt nhạc' : 'Bật nhạc'}
      >
        {musicPlaying ? '🎵' : '🔇'}
      </motion.button>
      <motion.button
        id="btn-sfx"
        className="w-10 h-10 flex items-center justify-center text-lg bg-white/80 rounded-full shadow-md cursor-pointer hover:bg-white transition-colors"
        whileTap={{ scale: 0.9 }}
        onClick={toggleSfx}
        aria-label={sfxEnabled ? 'Tắt SFX' : 'Bật SFX'}
        title={sfxEnabled ? 'Tắt SFX' : 'Bật SFX'}
      >
        {sfxEnabled ? '🔔' : '🔕'}
      </motion.button>
    </div>
  )
}

export default function App() {
  const screen = useAppStore((s) => s.screen)
  const updateConfig = useAppStore((s) => s.updateConfig)
  const { i18n } = useTranslation()

  // Load config from URL hash on mount
  useEffect(() => {
    const urlConfig = decodeConfigFromURL()
    if (urlConfig) {
      updateConfig(urlConfig)
      if (urlConfig.language) {
        i18n.changeLanguage(urlConfig.language)
      }
    }
  }, [updateConfig, i18n])

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])

  return (
    <>
      <SettingsButton />
      <AudioControls />
      <SettingsModal />

      <AnimatePresence mode="wait">
        {screen === 'splash' && <SplashScreen key="splash" />}
        {screen === 'question' && <QuestionScreen key="question" />}
        {screen === 'challenge' && <ChallengeScreen key="challenge" />}
        {screen === 'celebration' && <CelebrationScreen key="celebration" />}
      </AnimatePresence>
    </>
  )
}
