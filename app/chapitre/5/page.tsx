'use client';

import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';

export default function Chapitre5Page() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-6">
        <BackButton href="/menu" />
      </div>

      <h1 className="text-2xl font-extrabold text-brand-blue text-center mb-8">
        L&apos;Aromathèque !
      </h1>

      <div className="bg-brand-blue rounded-3xl px-8 py-14 mb-8 text-center">
        <p className="text-white text-lg leading-relaxed">
          Flâne dans le jardin des Arômes et constitue ta propre aromathèque !
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => router.push('/chapitre/5/collecte')}
          className="w-full py-4 rounded-full bg-brand-gold text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all"
        >
          Je démarre ma collecte
        </button>
        <button
          onClick={() => router.push('/chapitre/5/ma-aromatheque')}
          className="w-full py-4 rounded-full bg-brand-blue text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all"
        >
          Je consulte mon aromathèque
        </button>
      </div>
    </div>
  );
}
