'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { stopAllAudio } from '@/lib/audioRegistry';

export default function AudioManager() {
  const pathname = usePathname();

  useEffect(() => {
    stopAllAudio();
  }, [pathname]);

  return null;
}
