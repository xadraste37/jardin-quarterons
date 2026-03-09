'use client';

import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';

const CHAPTERS = [
  { number: 1, title: 'La Biodynamie', subtitle: 'Quesako ?', route: '/chapitre/1', bonus: false },
  { number: 2, title: 'À la recherche des plantes mystères', subtitle: 'Immersion au cœur du jardin', route: '/chapitre/2', bonus: false },
  { number: 3, title: 'Le Jardin des Arômes', subtitle: 'Découvre les bienfaits des plantes', route: '/chapitre/3', bonus: false },
  { number: 4, title: 'Le goût de l\'endroit', subtitle: 'On ne baisse pas les bras, on lève le coude !', route: '/chapitre/4', bonus: false },
  { number: 5, title: 'Le Bonus Aromathèque', subtitle: 'Constitue ta propre aromathèque !', route: '/chapitre/5', bonus: true },
];

export default function MenuPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-6">
        <BackButton href="/onboarding" />
      </div>

      <h1 className="text-2xl font-extrabold text-brand-blue text-center mb-10">
        Le parcours-jeu
      </h1>

      <div className="flex flex-col gap-4">
        {CHAPTERS.map(ch => (
          <button
            key={ch.number}
            onClick={() => router.push(ch.route)}
            className={`flex items-center gap-5 p-5 rounded-3xl border-2 transition-all group active:scale-98 ${
              ch.bonus
                ? 'border-brand-gold bg-brand-gold/10 hover:bg-brand-gold/20'
                : 'border-brand-blue/10 hover:border-brand-gold hover:bg-brand-gold/5'
            }`}
          >
            <div className={`w-12 h-12 rounded-full font-extrabold text-lg flex items-center justify-center shrink-0 shadow-md ${
              ch.bonus ? 'bg-brand-gold text-white ring-2 ring-brand-gold/40' : 'bg-brand-gold text-white'
            }`}>
              {ch.bonus ? '✦' : ch.number}
            </div>
            <div className="text-left">
              <p className={`font-bold leading-tight ${ch.bonus ? 'text-brand-gold' : 'text-brand-blue group-hover:text-brand-blue'}`}>
                {ch.title}
              </p>
              <p className={`text-xs mt-0.5 italic ${ch.bonus ? 'text-brand-gold/70' : 'text-brand-blue/50'}`}>{ch.subtitle}</p>
            </div>
            <span className={`ml-auto text-xl shrink-0 ${ch.bonus ? 'text-brand-gold/60' : 'text-brand-blue/30'}`}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}
