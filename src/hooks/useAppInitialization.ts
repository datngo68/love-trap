import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAppStore } from '../store/useAppStore'
import { decodeConfigFromURL } from '../utils/urlConfig'
import { playBgm } from './useAudio'

export function useAppInitialization() {
  const config = useAppStore((s) => s.config)
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
      if (urlConfig.autoPlayMusic) {
        playBgm()
      }
    }
  }, [updateConfig, i18n])

  // Dynamically update document title based on config and translation
  useEffect(() => {
    const appTitle = i18n.t('splash.appTitle', { 
      receiver: config.receiverName, 
      sender: config.senderName,
      defaultValue: 'Em Có Yêu Anh Không?'
    })
    document.title = appTitle
  }, [config.receiverName, config.senderName, i18n.language])

  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js').catch(() => {})
    }
  }, [])
}
