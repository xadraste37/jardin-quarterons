'use client';

import { useRouter } from 'next/navigation';

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
}

export default function BackButton({ href, onClick }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      router.push(href);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-10 h-10 rounded-full bg-brand-gold flex items-center justify-center text-white text-lg font-bold shadow-md hover:opacity-90 active:opacity-80 transition-opacity"
      aria-label="Retour"
    >
      ←
    </button>
  );
}
