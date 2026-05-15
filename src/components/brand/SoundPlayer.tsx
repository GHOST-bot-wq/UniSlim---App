import React from 'react';
import { useAudio } from '../../hooks/useAudio';
import type { SoundType } from '../../types';

interface SoundPlayerProps {
  sound: SoundType;
  children: (play: () => void) => React.ReactNode;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ sound, children }) => {
  const { play } = useAudio();
  return <>{children(() => play(sound))}</>;
};

export default SoundPlayer;
