import Image from 'next/image';

interface PlaceholderImageProps {
  src?: string | null;
  emoji?: string;
  label?: string;
  size?: number;
  className?: string;
}

export default function PlaceholderImage({
  src,
  emoji = '🌿',
  label,
  size = 192,
  className = '',
}: PlaceholderImageProps) {
  if (src) {
    return (
      <div
        className={`rounded-full overflow-hidden shrink-0 ${className}`}
        style={{ width: size, height: size }}
      >
        <Image src={src} alt={label || ''} width={size} height={size} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-full bg-gray-100 flex flex-col items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <span style={{ fontSize: size * 0.35 }}>{emoji}</span>
      {label && (
        <span className="text-xs text-brand-blue/50 text-center px-2 mt-1 leading-tight">{label}</span>
      )}
    </div>
  );
}
