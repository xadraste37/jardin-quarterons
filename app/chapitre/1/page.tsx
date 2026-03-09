'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import PlayButton from '@/components/ui/PlayButton';
import DragDropHorn from '@/components/DragDropHorn';

type Screen = 1 | 2 | 3 | 4 | 5 | 6 | 7;

function QuizOrtie({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const OPTIONS = [
    { id: 'a', label: 'A apporter de l\'énergie à la vigne en libérant l\'azote.', correct: true },
    { id: 'b', label: 'A réduire le niveau de souffre.', correct: false },
    { id: 'c', label: 'A drainer les sols', correct: false },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <h2 className="text-xl font-extrabold text-brand-blue text-center mb-6">
        A quoi cela sert de mélanger l&apos;ortie à la bouse ?
      </h2>
      <div className="flex flex-col gap-5">
        {OPTIONS.map(opt => {
          let cls = 'btn-blue';
          if (selected === opt.id) cls = opt.correct ? 'bg-green-500 text-white font-bold py-3 px-8 rounded-pill w-full' : 'bg-red-400 text-white font-bold py-3 px-8 rounded-pill w-full';
          else if (selected && opt.correct) cls = 'bg-green-500 text-white font-bold py-3 px-8 rounded-pill w-full';
          return (
            <button key={opt.id} onClick={() => !selected && setSelected(opt.id)} className={`${cls} w-full text-center`}>
              {opt.label}
            </button>
          );
        })}
      </div>
      {selected && (
        <button className="btn-gold w-full mt-auto pt-6" onClick={onNext}>
          Je continue le parcours-jeu
        </button>
      )}
    </div>
  );
}

export default function Chapitre1() {
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>(1);

  const go = (s: Screen) => setScreen(s);
  const next = (s: Screen) => () => go(s);

  const backTarget: Record<Screen, () => void> = {
    1: () => router.push('/menu'),
    2: () => go(1),
    3: () => go(2),
    4: () => go(3),
    5: () => go(4),
    6: () => go(5),
    7: () => go(6),
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-6">
        <BackButton onClick={backTarget[screen]} />
      </div>

      {/* SCREEN 1 — Editorial biodynamie */}
      {screen === 1 && (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-extrabold text-brand-blue text-center">
            La Biodynamie - Quesako ?
          </h1>
          {/* Photo 1 (landscape) — biodynamie-2 first */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '4/3' }}>
            <Image src="/images/lieux/biodynamie-2.jpg" alt="La biodynamie" fill className="object-cover" />
          </div>
          <p className="text-brand-blue leading-relaxed">
            La biodynamie est une approche globale de l&apos;agriculture qui renforce la vie du sol,
            favorise la <strong>vitalité des plantes</strong> et préserve l&apos;équilibre de
            l&apos;écosystème en travaillant avec tous les cycles naturels.
          </p>
          {/* Photo 2 (landscape) — biodynamie-1 second */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '4/3' }}>
            <Image src="/images/lieux/biodynamie-1.jpg" alt="Vigne en biodynamie" fill className="object-cover" />
          </div>
          <p className="text-brand-blue leading-relaxed">
            Ecoutez Jeff expliquer comment nous appliquons la préparation T500 au domaine.
          </p>
          <div className="flex items-center justify-center gap-5">
            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md shrink-0">
              <Image src="/images/portraits/jeff.jpg" alt="Jeff" fill className="object-cover" />
            </div>
            <PlayButton
              size="lg"
              label="Écouter Jeff"
              audioUrl="/audios/temoignage-t500.m4a"
            />
          </div>
          <div className="flex flex-col gap-3 mt-4">
            {/* Gold first, blue second (swapped) */}
            <button className="btn-gold w-full" onClick={next(2)}>
              Trouve la corne de vache dans la boutique et clique ici pour continuer
            </button>
            <button className="btn-blue w-full" onClick={() => router.push('/bonus/biodynamie')}>
              Je veux en savoir plus sur la biodynamie
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 2 — Editorial T500 */}
      {screen === 2 && (
        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-extrabold text-brand-blue text-center">La préparation T500</h1>
          <p className="text-brand-gold font-semibold text-center">Un puissant activateur biologique</p>
          {/* Landscape photo */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '4/3' }}>
            <Image src="/images/lieux/biodynamie-3.jpg" alt="Préparation T500" fill className="object-cover" />
          </div>
          <p className="text-brand-blue leading-relaxed">
            La préparation T500 est l&apos;une des préparations les plus couramment utilisées en
            biodynamie.
          </p>
          <p className="text-brand-blue leading-relaxed">
            Elle est composée de <strong>bouse de vache fraîche</strong> mélangée à de l&apos;eau
            de pluie, dynamisée pendant <strong>1 heure</strong>, puis appliquée selon les cycles
            lunaires pour renforcer la vie microbienne du sol et stimuler la croissance générale
            du système racinaire.
          </p>
          <p className="text-brand-blue leading-relaxed">
            La préparation T500 est un outil très précieux pour l&apos;équipe.
          </p>
          <div className="mt-auto pt-4">
            <button className="btn-gold w-full" onClick={next(3)}>
              Aide-nous à préparer la T500 !
            </button>
          </div>
        </div>
      )}

      {/* SCREEN 3 — Drag & Drop : remplir la corne */}
      {screen === 3 && (
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-extrabold text-brand-blue text-center">
            Glisse la bouse de vache dans la corne.
          </h1>
          <p className="text-brand-blue/60 text-center text-sm">
            Dépose les 3 bouses dans la corne pour la remplir
          </p>
          <DragDropHorn onSuccess={next(4)} />
        </div>
      )}

      {/* SCREEN 4 — Success + audio témoignage */}
      {screen === 4 && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="bg-brand-blue rounded-3xl p-6 text-white w-full">
            <p className="font-bold text-lg">
              Maintenant que la corne est remplie de bouse, nous l&apos;enterrons 6 mois !
            </p>
          </div>
          {/* Larger circular photo */}
          <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-md">
            <Image src="/images/lieux/cornes-enterees.jpg" alt="Cornes enterrées" fill className="object-cover" />
          </div>
          <p className="text-brand-blue leading-relaxed text-sm">
            Bravo ! Nous la dynamisons pendant 1 heure avant de la pulvériser dans les vignes
            pour renforcer la vie microbienne du sol et stimuler la croissance générale du
            système racinaire.
          </p>
          <div className="flex justify-center">
            <PlayButton
              size="lg"
              label="Écouter le témoignage"
              audioUrl="/audios/temoignage-t500.m4a"
            />
          </div>
          <button className="btn-gold w-full" onClick={next(5)}>
            Continuer
          </button>
        </div>
      )}

      {/* SCREEN 5 — Mission : trouve l'ortie */}
      {screen === 5 && (
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-xl font-extrabold text-brand-blue">
            Sauras-tu retrouver l&apos;ortie dans le jardin ?
          </h1>
          <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md">
            <Image
              src="/images/plantes/ortie.png"
              alt="Ortie"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-brand-blue/70 leading-relaxed">
            L&apos;ortie est une plante fascinante, utilisée en biodynamie pour ses propriétés
            exceptionnelles. Pars à sa recherche dans le jardin !
          </p>
          <button className="btn-gold w-full" onClick={next(6)}>
            Clique ici pour continuer
          </button>
        </div>
      )}

      {/* SCREEN 6 — Narrator Constant + ortie */}
      {screen === 6 && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-md">
            <Image src="/images/portraits/constant.png" alt="Constant" fill className="object-cover" />
          </div>
          <h2 className="text-xl font-extrabold text-brand-blue">Constant</h2>
          <p className="text-brand-blue/70 leading-relaxed">
            Écoute bien <strong>Constant</strong> nous parler des propriétés de l&apos;Ortie pour
            pouvoir répondre au QUIZZ.
          </p>
          <PlayButton
            size="lg"
            label="Écouter Constant"
            audioUrl="/audios/constant-ortie.mp3"
          />
          <button className="btn-gold w-full mt-auto" onClick={next(7)}>
            Répondre au QUIZZ
          </button>
        </div>
      )}

      {/* SCREEN 7 — Quiz QCM ortie */}
      {screen === 7 && (
        <QuizOrtie onNext={() => router.push('/chapitre/2')} />
      )}
    </div>
  );
}
