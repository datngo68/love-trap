import { useRef, useCallback } from 'react'
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
  click: 'https://cdn.freesound.org/previews/707/707230_6142149-lq.mp3',
  success: 'https://cdn.freesound.org/previews/320/320655_5260872-lq.mp3',
  fail: 'https://cdn.freesound.org/previews/362/362204_289524-lq.mp3',
  pop: 'https://cdn.freesound.org/previews/421/421003_4921277-lq.mp3',
}

const sfxCache: Map<string, Howl> = new Map()

function getSfx(name: string): Howl | null {
  const url = SFX_URLS[name]
  if (!url) return null

  if (!sfxCache.has(name)) {
    sfxCache.set(
      name,
      new Howl({ src: [url], volume: 0.4, preload: true }),
    )
  }
  return sfxCache.get(name) || null
}

export function playSfx(name: string) {
  const { sfxEnabled } = useAudioStore.getState()
  if (!sfxEnabled) return
  const sfx = getSfx(name)
  sfx?.play()
}

export function useBackgroundMusic() {
  const musicRef = useRef<Howl | null>(null)
  const { musicPlaying, toggleMusic } = useAudioStore()

  const handleToggle = useCallback(() => {
    if (!musicRef.current) {
      musicRef.current = new Howl({
        src: ['https://cdn.freesound.org/previews/612/612095_5674468-lq.mp3'],
        loop: true,
        volume: 0.25,
      })
    }

    if (musicPlaying) {
      musicRef.current.pause()
    } else {
      musicRef.current.play()
    }
    toggleMusic()
  }, [musicPlaying, toggleMusic])

  return { musicPlaying, handleToggle }
}
