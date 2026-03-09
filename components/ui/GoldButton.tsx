'use client';

interface GoldButtonProps {
  label: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
}

export default function GoldButton({ label, onClick, className = '', disabled = false }: GoldButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
}
