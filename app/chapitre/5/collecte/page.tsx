'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BackButton from '@/components/ui/BackButton';

export default function CollectePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-6">
        <BackButton href="/chapitre/5" />
      </div>

      <div className="flex flex-col flex-1 items-center justify-between pb-8">
        <div className="flex flex-col items-center gap-8 mt-8 text-center">
          <h1 className="text-xl font-extrabold text-brand-blue leading-tight">
            Dans le guide des plantes, pense à créer ta propre aromathèque !
          </h1>
          <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-lg">
            <Image
              src="/images/lieux/intro-jardin.png"
              alt="Jardin des Arômes"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={() => router.push('/chapitre/5/ma-aromatheque')}
            className="w-full py-4 rounded-full bg-brand-gold text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all"
          >
            Je consulte mon aromathèque
          </button>
          <button
            onClick={() => router.push('/guide-plantes')}
            className="w-full py-4 rounded-full bg-brand-blue text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all"
          >
            Je découvre le guide des plantes
          </button>
        </div>
      </div>
    </div>
  );
}
