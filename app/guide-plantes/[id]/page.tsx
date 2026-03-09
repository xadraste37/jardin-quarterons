import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import BackButton from '@/components/ui/BackButton';
import PlayButton from '@/components/ui/PlayButton';
import AromathequeButton from '@/components/ui/AromathequeButton';
import type { Plante } from '@/lib/types';

interface Props {
  params: { id: string };
}

export default async function PlantDetailPage({ params }: Props) {
  const { data } = await supabase
    .from('qj_plante')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!data) notFound();

  const plant = data as Plante;

  return (
    <div className="flex flex-col min-h-screen px-6 py-8 pb-16">
      <div className="mb-6">
        <BackButton />
      </div>

      {/* Hero image */}
      <div className="flex flex-col items-center gap-4 mb-6">
        {plant.image_url ? (
          <div className="relative w-48 h-48 rounded-full overflow-hidden shadow-lg">
            <Image src={plant.image_url} alt={plant.nom} fill className="object-cover" />
          </div>
        ) : (
          <div className="w-48 h-48 rounded-full bg-brand-blue/5 flex items-center justify-center text-6xl">🌿</div>
        )}

        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-brand-blue">{plant.nom}</h1>
          {plant.nom_latin && (
            <p className="text-brand-blue/50 italic text-sm mt-1">{plant.nom_latin}</p>
          )}
          {plant.sous_titre && (
            <p className="text-brand-gold font-semibold mt-1">{plant.sous_titre}</p>
          )}
          {plant.famille && (
            <p className="text-brand-blue/40 text-xs mt-0.5 uppercase tracking-wide">{plant.famille}</p>
          )}
        </div>

        {plant.audio_url && (
          <PlayButton audioUrl={plant.audio_url} size="lg" />
        )}
      </div>

      {/* Content sections */}
      <div className="flex flex-col gap-6">
        {plant.intro && (
          <section>
            <p className="text-brand-blue/80 leading-relaxed whitespace-pre-line text-center">{plant.intro}</p>
          </section>
        )}

        {plant.sens && (
          <section>
            <div className="flex flex-col items-center mb-3">
              <Image src="/images/icone/sens.png" alt="" width={64} height={64} />
              <h2 className="font-extrabold text-brand-blue mt-3">Sens &amp; Saveurs</h2>
            </div>
            <p className="text-brand-blue/80 leading-relaxed whitespace-pre-line text-center">{plant.sens}</p>
          </section>
        )}

        {plant.vertus && (
          <section>
            <div className="flex flex-col items-center mb-3">
              <Image src="/images/icone/vertus.png" alt="" width={64} height={64} />
              <h2 className="font-extrabold text-brand-blue mt-3">Vertus &amp; usages</h2>
            </div>
            <p className="text-brand-blue/80 leading-relaxed whitespace-pre-line text-center">{plant.vertus}</p>
          </section>
        )}

        {plant.contre_indications && (
          <section>
            <div className="flex flex-col items-center mb-3">
              <Image src="/images/icone/contre-indications.png" alt="" width={64} height={64} />
              <h2 className="font-extrabold text-brand-blue mt-3">Précautions</h2>
            </div>
            <p className="text-brand-blue/80 leading-relaxed whitespace-pre-line text-center">{plant.contre_indications}</p>
          </section>
        )}

        {plant.vignes && (
          <section className="bg-brand-blue/5 rounded-3xl p-5">
            <div className="flex flex-col items-center mb-3">
              <Image src="/images/icone/vignes.png" alt="" width={64} height={64} />
              <h2 className="font-extrabold text-brand-blue mt-3">Et dans nos vignes ?</h2>
            </div>
            <p className="text-brand-blue/80 leading-relaxed whitespace-pre-line text-center">{plant.vignes}</p>
          </section>
        )}

        <AromathequeButton plantId={plant.id} />
      </div>
    </div>
  );
}
