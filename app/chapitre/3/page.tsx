'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import PlayButton from '@/components/ui/PlayButton';

type BranchAStep = 'jeff' | 'quiz-jeff' | 'michel' | 'quiz-val-q1' | 'quiz-val-q2';
type Ch3State =
  | { screen: 'intro' }
  | { screen: 'branch-a'; step: BranchAStep };

function Quiz({
  question,
  options,
  ctaLabel,
  onNext,
}: {
  question: string;
  options: { id: string; label: string; correct: boolean }[];
  ctaLabel: string;
  onNext: () => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <h2 className="text-xl font-extrabold text-brand-blue text-center mb-6">{question}</h2>
      <div className="flex flex-col gap-5">
        {options.map(opt => {
          let cls = 'btn-blue w-full text-center';
          if (selected === opt.id) cls = opt.correct
            ? 'bg-green-500 text-white font-bold py-3 px-8 rounded-pill w-full'
            : 'bg-red-400 text-white font-bold py-3 px-8 rounded-pill w-full';
          else if (selected && opt.correct) cls = 'bg-green-500 text-white font-bold py-3 px-8 rounded-pill w-full';
          return (
            <button key={opt.id} onClick={() => !selected && setSelected(opt.id)} className={cls}>
              {opt.label}
            </button>
          );
        })}
      </div>
      {selected && (
        <button className="btn-gold w-full mt-auto pt-6" onClick={onNext}>
          {ctaLabel}
        </button>
      )}
    </div>
  );
}

export default function Chapitre3() {
  const router = useRouter();
  const [state, setState] = useState<Ch3State>({ screen: 'intro' });

  const handleBack = () => {
    if (state.screen === 'intro') { router.push('/menu'); return; }
    const { step } = state;
    const prev: Record<BranchAStep, () => void> = {
      'jeff': () => setState({ screen: 'intro' }),
      'quiz-jeff': () => setState({ screen: 'branch-a', step: 'jeff' }),
      'michel': () => setState({ screen: 'branch-a', step: 'quiz-jeff' }),
      'quiz-val-q1': () => setState({ screen: 'branch-a', step: 'michel' }),
      'quiz-val-q2': () => setState({ screen: 'branch-a', step: 'quiz-val-q1' }),
    };
    prev[step]();
  };

  const goStep = (step: BranchAStep) => setState({ screen: 'branch-a', step });

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-6">
        <BackButton onClick={handleBack} />
      </div>

      {/* INTRO */}
      {state.screen === 'intro' && (
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-2xl font-extrabold text-brand-blue text-center">
            Le Jardin des Arômes
          </h1>
          <div className="bg-brand-blue rounded-3xl p-7 text-white text-center">
            <p className="text-base leading-relaxed">
              Déambule dans le Jardin des Arômes et découvre des plantes aux arômes et aux{' '}
              <strong>bienfaits incroyables</strong> !
            </p>
          </div>

          <div className="flex gap-4 justify-center mt-2 w-full">
            <button
              onClick={() => goStep('jeff')}
              className="flex-1 flex flex-col items-center justify-center bg-brand-gold rounded-full aspect-square p-4 text-white font-bold text-sm text-center leading-tight hover:opacity-90 active:scale-95 transition-transform shadow-md"
            >
              <span className="text-2xl mb-1">🌿</span>
              Le défi plantes et Biody
            </button>
            <button
              onClick={() => router.push('/guide-plantes')}
              className="flex-1 flex flex-col items-center justify-center bg-brand-gold rounded-full aspect-square p-4 text-white font-bold text-sm text-center leading-tight hover:opacity-90 active:scale-95 transition-transform shadow-md"
            >
              <span className="text-2xl mb-1">📖</span>
              Le guide des plantes
            </button>
          </div>
        </div>
      )}

      {/* BRANCH A — Jeff + achillée */}
      {state.screen === 'branch-a' && state.step === 'jeff' && (
        <div className="flex flex-col items-center text-center gap-6">
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-md">
            <Image src="/images/portraits/jeff.jpg" alt="Jeff" fill className="object-cover" />
          </div>
          <h2 className="text-xl font-extrabold text-brand-blue">Jeff</h2>
          <p className="text-brand-blue/70 leading-relaxed">
            Jeff explique comment nous utilisons l&apos;<strong>achillée millefeuille</strong>{' '}
            dans le Guide des Plantes. Ecoute son commentaire et répond à la question.
          </p>
          <PlayButton
            size="lg"
            label="Écouter Jeff"
            audioUrl="/audios/jeff-achillee.mp3"
          />
          <button className="btn-gold w-full mt-auto" onClick={() => goStep('quiz-jeff')}>
            Répondre à la question
          </button>
        </div>
      )}

      {/* Quiz achillée */}
      {state.screen === 'branch-a' && state.step === 'quiz-jeff' && (
        <Quiz
          question="Dans quelle préparation retrouve-t-on l'achillée millefeuille ?"
          options={[
            { id: 'a', label: 'La préparation 502 du compost', correct: true },
            { id: 'b', label: 'Le compost de bouse', correct: false },
            { id: 'c', label: 'La tisane de mamie ☕', correct: false },
          ]}
          ctaLabel="Je continue les défis avec la valériane 🌿"
          onNext={() => goStep('michel')}
        />
      )}

      {/* Michel + valériane */}
      {state.screen === 'branch-a' && state.step === 'michel' && (
        <div className="flex flex-col items-center text-center gap-6">
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-md">
            <Image src="/images/portraits/michel.jpg" alt="Michel" fill className="object-cover" />
          </div>
          <h2 className="text-xl font-extrabold text-brand-blue">Michel</h2>
          <p className="text-brand-blue/70 leading-relaxed">
            Michel a présenté la <strong>valériane</strong>, avez-vous bien écouté ? Ecoute
            son commentaire et répond à la question.
          </p>
          <PlayButton
            size="lg"
            label="Écouter Michel"
            audioUrl="/audios/michel-valeriane.mp3"
          />
          <button className="btn-gold w-full mt-auto" onClick={() => goStep('quiz-val-q1')}>
            Répondre aux 2 questions !
          </button>
        </div>
      )}

      {/* Quiz valériane Q1 */}
      {state.screen === 'branch-a' && state.step === 'quiz-val-q1' && (
        <Quiz
          question="1. Quelles sont les vertus médicinales de la valériane officinale pour l'homme ?"
          options={[
            { id: 'a', label: 'Anxiolytique et sédative', correct: true },
            { id: 'b', label: 'Dépurative', correct: false },
            { id: 'c', label: 'Aphrodisiaque ❤️', correct: false },
          ]}
          ctaLabel="Je réponds à une deuxième question sur la valériane 🌿"
          onNext={() => goStep('quiz-val-q2')}
        />
      )}

      {/* Quiz valériane Q2 */}
      {state.screen === 'branch-a' && state.step === 'quiz-val-q2' && (
        <Quiz
          question="2. Quelles sont ses propriétés en Biodynamie pour la vigne 🍇 ?"
          options={[
            { id: 'a', label: 'Pour décorer', correct: false },
            { id: 'b', label: 'Pour drainer les sols', correct: false },
            { id: 'c', label: 'Pour cicatriser la vigne après le gel 😨', correct: true },
          ]}
          ctaLabel="Continuer le parcours-jeu"
          onNext={() => router.push('/chapitre/4')}
        />
      )}
    </div>
  );
}
