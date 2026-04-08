import type { UserConfig } from '../types'

interface ShareableConfig {
  s: string   // senderName
  r: string   // receiverName
  l: string   // language
  t: string   // themeColor
}

export function encodeConfigToURL(config: UserConfig): string {
  const data: ShareableConfig = {
    s: config.senderName,
    r: config.receiverName,
    l: config.language,
    t: config.themeColor,
  }
  const json = JSON.stringify(data)
  const encoded = btoa(unescape(encodeURIComponent(json)))
  const url = new URL(window.location.href)
  url.search = ''
  url.hash = encoded
  return url.toString()
}

export function decodeConfigFromURL(): Partial<UserConfig> | null {
  try {
    const hash = window.location.hash.slice(1)
    if (!hash) return null

    const json = decodeURIComponent(escape(atob(hash)))
    const data = JSON.parse(json) as ShareableConfig

    const config: Partial<UserConfig> = {}
    if (data.s) config.senderName = data.s
    if (data.r) config.receiverName = data.r
    if (data.l && (data.l === 'vi' || data.l === 'en')) config.language = data.l
    if (data.t) config.themeColor = data.t

    return config
  } catch {
    return null
  }
}

export function exportConfigJSON(config: UserConfig): string {
  return JSON.stringify(config, null, 2)
}

export function importConfigJSON(json: string): UserConfig | null {
  try {
    const parsed = JSON.parse(json)
    if (!parsed.senderName || !parsed.receiverName) return null
    return {
      senderName: parsed.senderName,
      receiverName: parsed.receiverName,
      themeColor: parsed.themeColor || '#e11d48',
      language: parsed.language === 'en' ? 'en' : 'vi',
    }
  } catch {
    return null
  }
}
