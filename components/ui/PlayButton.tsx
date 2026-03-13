'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { registerAudio, unregisterAudio } from '@/lib/audioRegistry';

interface PlayButtonProps {
  audioUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const SIZES = {
  sm: { btn: 'w-10 h-10', icon: 24 },
  md: { btn: 'w-14 h-14', icon: 32 },
  lg: { btn: 'w-20 h-20', icon: 44 },
};

export default function PlayButton({ audioUrl, size = 'md', label }: PlayButtonProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        unregisterAudio(audioRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    if (!audioUrl) return;
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      registerAudio(audioRef.current);
      audioRef.current.onended = () => setPlaying(false);
    }
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  const { btn, icon } = SIZES[size];

  const btn_el = (
    <button
      onClick={handleToggle}
      className={`${btn} rounded-full bg-brand-gold flex items-center justify-center shadow-md hover:opacity-90 active:opacity-75 transition-opacity shrink-0 overflow-hidden`}
      aria-label={playing ? 'Pause' : 'Lire'}
    >
      <Image
        src={playing ? '/images/icone/pause.png' : '/images/icone/play.png'}
        alt={playing ? 'Pause' : 'Lire'}
        width={icon}
        height={icon}
        className="object-contain"
      />
    </button>
  );

  if (!label) return btn_el;

  return (
    <div className="flex items-center gap-3">
      {btn_el}
      <span className="text-brand-blue font-semibold text-sm">{label}</span>
    </div>
  );
}
