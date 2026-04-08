import { useCallback } from 'react'
import { Howl } from 'howler'
import { create } from 'zustand'

interface AudioState {
  musicPlaying: boolean
  sfxEnabled: boolean
  toggleMusic: () => void
  toggleSfx: () => void
}

export const useAudioStore = create<AudioState>((set) => ({
  musicPlaying: false,
  sfxEnabled: true,
  toggleMusic: () => set((s) => ({ musicPlaying: !s.musicPlaying })),
  toggleSfx: () => set((s) => ({ sfxEnabled: !s.sfxEnabled })),
}))

const SFX_URLS: Record<string, string> = {
  click: '/sounds/tap.mp3',
  success: '/sounds/bell_ring.mp3',
  fail: '/sounds/button_tiny.mp3',
  pop: '/sounds/water_droplet.mp3',
}

const sfxCache: Map<string, Howl> = new Map()

function getSfx(name: string): Howl | null {
  const url = SFX_URLS[name]
  if (!url) return null

  if (!sfxCache.has(name)) {
    sfxCache.set(
      name,
      new Howl({ src: [url], volume: name === 'success' ? 0.6 : 0.4, preload: true }),
    )
  }
  return sfxCache.get(name) || null
}

export function playSfx(name: string, playbackRate: number = 1.0) {
  const { sfxEnabled } = useAudioStore.getState()
  if (!sfxEnabled) return
  const sfx = getSfx(name)
  if (sfx) {
    sfx.rate(playbackRate)
    sfx.play()
  }
}

let bgmHowl: Howl | null = null

export function playBgm() {
  if (!bgmHowl) {
    bgmHowl = new Howl({
      src: ['/sounds/bgm.mp3'],
      loop: true,
      volume: 0.3,
      html5: true, // Bypass CORS & XHR for huge BGM file
    })
  }

  const { musicPlaying } = useAudioStore.getState()
  if (!musicPlaying) {
    useAudioStore.setState({ musicPlaying: true })
    if (bgmHowl.state() === 'unloaded') {
      bgmHowl.once('load', () => bgmHowl?.play())
    } else {
      bgmHowl.play()
    }
  }
}

export function pauseBgm() {
  const { musicPlaying } = useAudioStore.getState()
  if (musicPlaying) {
    useAudioStore.setState({ musicPlaying: false })
    bgmHowl?.pause()
  }
}

export function useBackgroundMusic() {
  const { musicPlaying } = useAudioStore()

  const handleToggle = useCallback(() => {
    if (!bgmHowl) {
      bgmHowl = new Howl({
        src: ['/sounds/bgm.mp3'],
        loop: true,
        volume: 0.3,
        html5: true,
      })
    }

    if (musicPlaying) {
      bgmHowl.pause()
      useAudioStore.setState({ musicPlaying: false })
    } else {
      bgmHowl.play()
      useAudioStore.setState({ musicPlaying: true })
    }
  }, [musicPlaying])

  return { musicPlaying, handleToggle }
}
