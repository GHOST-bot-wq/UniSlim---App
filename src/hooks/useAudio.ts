import { useCallback } from 'react';
import { playSound } from '../services/audio';
import { useUIStore } from '../stores/uiStore';
import type { SoundType } from '../types';

export function useAudio() {
  const soundEnabled = useUIStore((s) => s.soundEnabled);

  const play = useCallback(
    (type: SoundType) => {
      if (soundEnabled) playSound(type);
    },
    [soundEnabled]
  );

  return { play, soundEnabled };
}
