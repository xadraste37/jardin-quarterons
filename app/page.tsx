'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function IntroPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen px-6 py-8 gap-6">
      {/* Hero image — fixed height, never expands */}
      <div className="relative w-full rounded-2xl overflow-hidden shrink-0" style={{ height: '220px' }}>
        <Image
          src="https://blkzckjwlpuxqckduypi.supabase.co/storage/v1/object/public/quarterons-media/images/lieux/intro-jardin2.png"
          alt="Jardin des Quarterons"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Text block */}
      <div className="flex flex-col text-center gap-2 shrink-0">
        <h1 className="text-2xl font-extrabold text-brand-blue leading-tight">
          &ldquo;De la Terre au Ciel&rdquo; au Clos des Quarterons
        </h1>
        <p className="text-brand-gold font-semibold text-base">
          Le Jardin des Arômes, lieu d&apos;éveil et de partage
        </p>
        <p className="text-brand-blue text-sm leading-relaxed mx-auto max-w-sm">
          Désireux d&apos;offrir à nos clients une expérience de visite inédite et de partager
          notre vision de la nature, nous avons conçu un jardin pédagogique, porteur de sens.
          <br />
          Vous découvrirez des plantes choisies pour leurs parfums et leurs saveurs mettant en
          scène les vins du domaine.
        </p>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA pinned above bottom */}
      <button
        onClick={() => router.push('/onboarding')}
        className="btn-gold w-full shrink-0"
      >
        Commencer le parcours jeu
      </button>
    </div>
  );
}
