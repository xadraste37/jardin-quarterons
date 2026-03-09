'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import BackButton from '@/components/ui/BackButton';
import type { Plante } from '@/lib/types';

interface Props {
  plants: Plante[];
}

export default function AromathequeClient({ plants }: Props) {
  const router = useRouter();
  const [aromatheque, setAromatheque] = useState<string[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('aromatheque') || '[]') as string[];
    setAromatheque(stored);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="px-6 pt-8 pb-4 shrink-0">
        <div className="mb-4">
          <BackButton href="/chapitre/5" />
        </div>
        <h1 className="text-2xl font-extrabold text-brand-blue text-center">
          Mon Aromathèque
        </h1>
      </div>

      {/* Scrollable grid */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        {plants.length === 0 ? (
          <p className="text-center text-brand-blue/40 mt-8">Aucune plante disponible.</p>
        ) : (
          <div className="grid grid-cols-4 gap-x-2 gap-y-4">
            {plants.map(plant => {
              const isAdded = aromatheque.includes(plant.id);
              return (
                <div key={plant.id} className="flex flex-col items-center gap-1">
                  <div
                    className={`relative w-16 h-16 rounded-full overflow-hidden bg-gray-200 shrink-0 transition-all ${
                      isAdded ? '' : 'grayscale opacity-30'
                    }`}
                  >
                    {plant.image_url ? (
                      <Image
                        src={plant.image_url}
                        alt={plant.nom}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        🌿
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-brand-blue text-center leading-tight line-clamp-2">
                    {plant.nom}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Fixed CTA */}
      <div className="px-6 py-4 shrink-0 border-t border-brand-blue/10 bg-white">
        <button
          onClick={() => router.push('/guide-plantes')}
          className="w-full py-4 rounded-full bg-brand-gold text-white font-bold text-base hover:opacity-90 active:scale-95 transition-all"
        >
          J&apos;accède au guide des plantes
        </button>
      </div>
    </div>
  );
}
