'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';

type DefiType = 'riddle' | 'multi';

interface PlantPhoto {
  src: string;
  label: string;
}

interface Defi {
  number: number;
  title: string;
  emoji: string;
  type: DefiType;
  clue: string;
  hint: string;
  answer: string;
  ctaLabel?: string;
  photos: PlantPhoto[];
}

const BASE = 'https://blkzckjwlpuxqckduypi.supabase.co/storage/v1/object/public/quarterons-media';

const DEFIS: Defi[] = [
  {
    number: 1,
    title: 'Les plantes biodynamiques',
    emoji: '🌼',
    type: 'riddle',
    clue: 'Je suis située proche du chai et je suis très utilisée en agriculture biodynamique pour lutter contre la sécheresse et les maladies fongiques.',
    hint: 'Je fais de jolies fleurs blanches au cœur jaune, qui sentent bon la pomme.\n\nOn m\'utilise souvent en tisane le soir !',
    answer: 'Bravo ! Je suis bien la camomille matricaire !',
    ctaLabel: 'Je poursuis les défis',
    photos: [{ src: `${BASE}/images/plantes/camomille-matricaire.png`, label: 'Camomille matricaire' }],
  },
  {
    number: 2,
    title: 'Les plantes odorantes',
    emoji: '🌸',
    type: 'multi',
    clue: 'Au Jardin des Arômes, nous sommes plusieurs à produire de puissantes odeurs. Sauras-tu en trouver au moins l\'une d\'entre nous ?',
    hint: '1/ Je suis une grosse plante buissonnante au feuillage finement découpé. Je fais face au romarin.\n\n2/ Je suis originaire de l\'île de la Réunion, mes feuilles écrasées ou en infusion sont appliquées sur les plaies pour leur désinfection et la cicatrisation. Je suis à l\'entrée du caveau avec des feuilles poilues et douces !\n\n3/ Je suis très aromatique, originaire du Mexique, je dégage un parfum d\'ananas. Je suis en face des orties.',
    answer: 'Bravo ! L\'Aurone, le Géranium Bourbon et la Sauge Ananas !',
    ctaLabel: 'Je poursuis les défis',
    photos: [
      { src: `${BASE}/images/plantes/aurone.png`, label: 'Aurone' },
      { src: '', label: 'Géranium Bourbon' },
      { src: `${BASE}/images/plantes/sauge.png`, label: 'Sauge Ananas' },
    ],
  },
  {
    number: 3,
    title: 'Les plantes poivrées',
    emoji: '🌶️',
    type: 'multi',
    clue: 'Au Jardin des Arômes, nous sommes plusieurs à produire des arômes épicés, aux notes poivrées !',
    hint: 'La première d\'entre nous est connue pour son parfum mentholé très rafraichissant.\n\nLa deuxième est un arbuste qui possède un feuillage ressemblant à une feuille de chanvre.\n\nLa troisième d\'entre nous est un arbuste épineux venu d\'Asie.\n\nLa quatrième est une plante condimentaire peu connue qu\'on utilise pour faire du pastis !\n\nLa cinquième forme un joli couvre-sol au feuillage en forme de cœur dont les couleurs varient du rouge au vert, en passant par le jaune.',
    answer: 'Bravo ! La Menthe poivrée, le Gatillier, le Poivrier du Sichuan, l\'Hysope et l\'Herbe à poivre !',
    ctaLabel: 'Je poursuis les défis',
    photos: [
      { src: `${BASE}/images/plantes/menthe-poivree.png`, label: 'Menthe poivrée' },
      { src: `${BASE}/images/plantes/gattilier.png`, label: 'Gatillier' },
      { src: `${BASE}/images/plantes/poivrier-sichuan.png`, label: 'Poivrier du Sichuan' },
      { src: `${BASE}/images/plantes/hysope.png`, label: 'Hysope' },
      { src: `${BASE}/images/plantes/perilla-pourpre.png`, label: 'Herbe à poivre' },
    ],
  },
  {
    number: 4,
    title: 'Les plantes mentholées',
    emoji: '🍃',
    type: 'multi',
    clue: 'Au Jardin des Arômes, nous sommes plusieurs à produire un parfum mentholé ! Essaie de trouver notre cachette !',
    hint: 'Plante 1 : utilisée dans les dentifrices, sirops et bonbons\n\nPlante 2 : ses feuilles sentent quand on les froisse',
    answer: 'Bravo ! La Menthe poivrée et la Sauge officinale !',
    ctaLabel: 'Je poursuis les défis',
    photos: [
      { src: `${BASE}/images/plantes/menthe-poivree.png`, label: 'Menthe poivrée' },
      { src: `${BASE}/images/plantes/sauge.png`, label: 'Sauge officinale' },
    ],
  },
  {
    number: 5,
    title: 'La plante à Curry',
    emoji: '✨',
    type: 'riddle',
    clue: 'Au Jardin des Arômes, je suis la seule plante à sentir le curry !',
    hint: 'Je suis pas très loin de l\'amphore. 🏺🏺🏺 Ne meurt jamais en Italie...',
    answer: 'Bravissimo ! Je suis l\'immortelle d\'Italie. On m\'utilisait autrefois en cuisine comme épice pour relever les viandes et les poissons. Je suis un ersatz du curry.',
    ctaLabel: 'Je continue',
    photos: [{ src: `${BASE}/images/plantes/immortelle-italie.png`, label: 'Immortelle d\'Italie' }],
  },
];

type Ch2State =
  | { screen: 'intro' }
  | { screen: 'grid' }
  | { screen: 'riddle'; defi: number }
  | { screen: 'hint'; defi: number }
  | { screen: 'answer'; defi: number };

export default function Chapitre2() {
  const router = useRouter();
  const [state, setState] = useState<Ch2State>({ screen: 'intro' });

  const defi = state.screen !== 'intro' && state.screen !== 'grid'
    ? DEFIS[state.defi - 1]
    : null;

  const handleBack = () => {
    if (state.screen === 'intro') { router.push('/menu'); return; }
    if (state.screen === 'grid') { setState({ screen: 'intro' }); return; }
    if (state.screen === 'riddle') { setState({ screen: 'grid' }); return; }
    if (state.screen === 'hint') { setState({ screen: 'riddle', defi: state.defi }); return; }
    if (state.screen === 'answer') { setState({ screen: 'riddle', defi: state.defi }); return; }
  };

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-6">
        <BackButton onClick={handleBack} />
      </div>

      {/* INTRO */}
      {state.screen === 'intro' && (
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className="text-2xl font-extrabold text-brand-blue">
            Le jeu des plantes mystères
          </h1>
          <div className="bg-brand-blue rounded-3xl p-8 text-white w-full">
            <p className="text-base leading-relaxed font-semibold">
              Flâne dans le jardin à la recherche des <strong>plantes mystères</strong> dont
              les arômes évoquent le vin. Prêt ?
            </p>
          </div>
          <Image
            src="/images/icone/feuille.png"
            alt="Feuille"
            width={100}
            height={100}
            className="object-contain"
          />
          <button className="btn-gold w-full" onClick={() => setState({ screen: 'grid' })}>
            Je commence
          </button>
        </div>
      )}

      {/* DEFIS GRID */}
      {state.screen === 'grid' && (
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-extrabold text-brand-blue text-center mb-2">
            Le jeu des plantes mystères
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {DEFIS.slice(0, 4).map(d => (
              <button
                key={d.number}
                onClick={() => setState({ screen: 'riddle', defi: d.number })}
                className="flex flex-col items-center justify-center bg-brand-blue rounded-3xl p-4 text-white gap-2 aspect-square hover:opacity-90 active:scale-95 transition-transform"
              >
                <span className="text-brand-gold text-2xl font-extrabold underline">
                  {String(d.number).padStart(2, '0')}
                </span>
                <span className="text-2xl">{d.emoji}</span>
                <span className="font-bold text-xs text-center leading-tight">{d.title}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => setState({ screen: 'riddle', defi: 5 })}
              className="flex flex-col items-center justify-center bg-brand-blue rounded-3xl p-4 text-white gap-2 w-[calc(50%-8px)] aspect-square hover:opacity-90 active:scale-95 transition-transform"
            >
              <span className="text-brand-gold text-2xl font-extrabold underline">05</span>
              <span className="text-2xl">{DEFIS[4].emoji}</span>
              <span className="font-bold text-xs text-center leading-tight">{DEFIS[4].title}</span>
            </button>
          </div>
        </div>
      )}

      {/* RIDDLE / ENIGME */}
      {state.screen === 'riddle' && defi && (
        <div className="flex flex-col min-h-[calc(100vh-8rem)]">
          <div className="flex flex-col items-center text-center gap-4 flex-1">
            {defi.type === 'riddle' && (
              <h1 className="text-2xl font-extrabold text-brand-blue">Qui suis-je ?</h1>
            )}
            <div className="h-1 w-16 bg-brand-gold rounded-full" />
            <p className="text-lg text-brand-blue leading-relaxed">
              {defi.clue}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {defi.photos.map((p, i) => (
                <div key={i} className="relative w-20 h-20 rounded-full overflow-hidden bg-brand-blue/5 shrink-0 shadow-sm">
                  {p.src ? (
                    <Image src={p.src} alt={p.label} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">🌿</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* CTAs pushed to bottom */}
          <div className="flex flex-col gap-3 mt-auto pt-6">
            <div className="flex justify-center">
              <button
                onClick={() => setState({ screen: 'hint', defi: state.defi })}
                className="w-20 h-20 rounded-full bg-brand-gold text-white font-extrabold text-sm shadow-lg hover:opacity-90"
              >
                Indice
              </button>
            </div>
            <button
              className="btn-blue w-full"
              onClick={() => setState({ screen: 'answer', defi: state.defi })}
            >
              Voir la réponse
            </button>
          </div>
        </div>
      )}

      {/* HINT */}
      {state.screen === 'hint' && defi && (
        <div className="flex flex-col items-center text-center gap-6 min-h-[calc(100vh-8rem)] justify-center">
          <div className="self-end -mt-6">
            <button
              onClick={() => setState({ screen: 'riddle', defi: state.defi })}
              className="w-10 h-10 rounded-full bg-brand-gold text-white font-bold flex items-center justify-center hover:opacity-90"
            >
              ✕
            </button>
          </div>
          <div className="text-5xl mb-2">💡</div>
          <h2 className="text-xl font-extrabold text-brand-blue">L&apos;indice</h2>
          <p className="text-brand-blue text-base leading-relaxed max-w-xs whitespace-pre-line">
            {defi.hint}
          </p>
        </div>
      )}

      {/* ANSWER */}
      {state.screen === 'answer' && defi && (
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {defi.photos.map((p, i) => (
              <div key={i} className="relative w-20 h-20 rounded-full overflow-hidden bg-brand-blue/5 shrink-0 shadow-sm">
                {p.src ? (
                  <Image src={p.src} alt={p.label} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-2xl">🌿</div>
                )}
              </div>
            ))}
          </div>
          <div className="bg-brand-blue rounded-3xl p-6 text-white w-full">
            <p className="text-base leading-relaxed font-semibold">{defi.answer}</p>
          </div>
          {state.defi < 5 ? (
            <button
              className="btn-gold w-full"
              onClick={() => setState({ screen: 'grid' })}
            >
              {defi.ctaLabel || 'Je poursuis les défis'}
            </button>
          ) : (
            <button
              className="btn-gold w-full"
              onClick={() => router.push('/chapitre/3')}
            >
              {defi.ctaLabel || 'Je continue'}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
