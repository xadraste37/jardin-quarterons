'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import PlayButton from '@/components/ui/PlayButton';
import NumericKeypad from '@/components/ui/NumericKeypad';

type View = 'main' | 'keypad' | 'error' | 'success';

const CORRECT_CODE = '2018';

export default function OnboardingPage() {
  const router = useRouter();
  const [view, setView] = useState<View>('main');

  if (view === 'error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center">
        <div className="text-6xl mb-6">🔍</div>
        <h2 className="text-2xl font-extrabold text-brand-blue mb-3">
          Eh non !
        </h2>
        <p className="text-brand-blue/70 text-base leading-relaxed mb-10">
          Regarde bien, il s&apos;agit de l&apos;année de conception de l&apos;Amphore gravée derrière.
        </p>
        <button className="btn-gold w-full" onClick={() => setView('main')}>
          Je réessaie
        </button>
      </div>
    );
  }

  if (view === 'success') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-10 text-center">
        <div className="bg-brand-blue rounded-3xl p-8 text-white w-full mb-6">
          <h2 className="text-2xl font-extrabold">
            Le parcours est prêt, c&apos;est parti !
          </h2>
        </div>
        <div className="relative w-72 h-72 rounded-full overflow-hidden mb-8 shadow-lg">
          <Image
            src="https://blkzckjwlpuxqckduypi.supabase.co/storage/v1/object/public/quarterons-media/images/lieux/onboarding-success.png"
            alt="Parcours prêt"
            fill
            className="object-cover"
          />
        </div>
        <button
          className="btn-gold w-full"
          onClick={() => router.push('/menu')}
        >
          Je démarre le parcours-jeu
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-8 text-center">
      <div className="self-start mb-6">
        <BackButton href="/" />
      </div>

      <div className="relative w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 shadow-lg">
        <Image
          src="https://blkzckjwlpuxqckduypi.supabase.co/storage/v1/object/public/quarterons-media/images/portraits/onboarding.png"
          alt="Bienvenue"
          fill
          className="object-cover"
        />
      </div>

      <h1 className="text-2xl font-extrabold text-brand-blue mb-2">
        C&apos;est parti pour le premier défi !
      </h1>
      <p className="text-brand-blue/70 text-sm mb-8">
        Écoute le message de bienvenue et trouve le code caché dans le jardin
      </p>

      {/* Audio bienvenue — centered, large */}
      <div className="flex flex-col items-center gap-3 mb-auto">
        <PlayButton
          size="lg"
          audioUrl="https://blkzckjwlpuxqckduypi.supabase.co/storage/v1/object/public/quarterons-media/audios/bienvenue-ch1.m4a"
        />
        <p className="text-brand-blue font-semibold text-sm">
          Ecoutez le message de bienvenue.
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-10">
        <button
          className="btn-blue w-full"
          onClick={() => router.push('/onboarding/indice')}
        >
          Écoutez l&apos;indice
        </button>
        <button className="btn-gold w-full" onClick={() => setView('keypad')}>
          J&apos;ai trouvé le code !
        </button>
      </div>

      {view === 'keypad' && (
        <NumericKeypad
          correctCode={CORRECT_CODE}
          onSuccess={() => setView('success')}
          onClose={() => setView('main')}
          onError={() => setView('error')}
        />
      )}
    </div>
  );
}
