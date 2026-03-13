'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AudioManager() {
  const pathname = usePathname();

  useEffect(() => {
    document.querySelectorAll('audio').forEach(a => a.pause());
  }, [pathname]);

  return null;
}
