'use client';

interface BlueButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function BlueButton({ label, onClick, className = '', disabled = false }: BlueButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-blue w-full disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  );
}
