'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import PlayButton from '@/components/ui/PlayButton';
import type { Plante } from '@/lib/types';

interface Props {
  plants: Plante[];
}

const PLANT_EMOJIS = ['🌼', '🌿', '🌱', '💜', '🍃', '🌾', '🌸', '🌺', '🌻', '✨'];

export default function GuidePlantesClient({ plants }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-6">
        <BackButton />
      </div>

      <h1 className="text-2xl font-extrabold text-brand-blue text-center mb-6">
        Le Guide des Plantes
      </h1>

      {plants.length === 0 && (
        <p className="text-center text-brand-blue/40 mt-10">Aucune plante disponible.</p>
      )}

      <div className="flex flex-col gap-4">
        {plants.map((plant, i) => (
          <div
            key={plant.id}
            onClick={() => router.push(`/guide-plantes/${plant.id}`)}
            className="flex items-center gap-4 p-4 rounded-3xl border-2 border-brand-blue/10 hover:border-brand-gold hover:bg-brand-gold/5 transition-all text-left group cursor-pointer"
          >
            {plant.image_url ? (
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                <Image src={plant.image_url} alt={plant.nom} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-full bg-brand-blue/5 flex items-center justify-center text-2xl shrink-0">
                {PLANT_EMOJIS[i % PLANT_EMOJIS.length]}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-extrabold text-brand-blue truncate">{plant.nom}</p>
                {plant.audio_url && (
                  <Image src="/images/icone/feuille.png" alt="" width={14} height={14} className="shrink-0 opacity-60" />
                )}
              </div>
              {plant.sous_titre && (
                <p className="text-xs text-brand-gold font-semibold mt-0.5 truncate">{plant.sous_titre}</p>
              )}
            </div>
            {plant.audio_url && (
              <div onClick={e => e.stopPropagation()}>
                <PlayButton audioUrl={plant.audio_url} size="sm" />
              </div>
            )}
            <span className="text-brand-blue/20 text-lg group-hover:text-brand-gold transition-colors shrink-0">→</span>
          </div>
        ))}
      </div>
    </div>
  );
}
