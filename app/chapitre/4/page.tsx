'use client';

import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useRouter, useSearchParams } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import PlayButton from '@/components/ui/PlayButton';
import DragDropMap, { DropZone } from '@/components/DragDropMap';

const Viewer360 = dynamic(() => import('@/components/Viewer360'), { ssr: false });

type Screen = 1|2|3|4|5|6|7|8|9|10|11|12;

const BASE = 'https://blkzckjwlpuxqckduypi.supabase.co/storage/v1/object/public/quarterons-media';

const DROP_ZONES: DropZone[] = [
  { id: 'zone-graviers', x_pct: 72, y_pct: 80, label: 'Zone graviers (bord Loire)' },
  { id: 'zone-calcaire', x_pct: 68, y_pct: 30, label: 'Zone calcaire (côteaux)' },
];

export default function Chapitre4() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialScreen = (Number(searchParams.get('screen')) || 1) as Screen;
  const [screen, setScreen] = useState<Screen>(initialScreen);
  const [soilDetailOpen, setSoilDetailOpen] = useState<'graviers' | 'calcaire' | null>(null);

  const go = (s: Screen) => setScreen(s);

  const backTargets: Record<Screen, () => void> = {
    1: () => router.push('/menu'),
    2: () => go(1),
    3: () => go(2),
    4: () => go(3),
    5: () => go(4),
    6: () => go(5),
    7: () => go(6),
    8: () => go(7),
    9: () => go(8),
    10: () => go(9),
    11: () => go(10),
    12: () => go(11),
  };

  if (screen === 11) {
    return (
      <Viewer360
        imageUrl={`${BASE}/images/360/chai-360.jpg`}
        onExit={() => go(12)}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-6">
        <BackButton onClick={backTargets[screen]} />
      </div>

      {/* 1 — Intro terroir */}
      {screen === 1 && (
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-2xl font-extrabold text-brand-blue">Le goût de l&apos;endroit</h1>
          <p className="text-brand-gold font-semibold">
            Maintenant, retournez dans la boutique et entrez dans la salle N°2, dédiée aux terroirs.
          </p>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '4/3' }}>
            <Image
              src={`${BASE}/images/lieux/gout-endroit.jpg`}
              alt="Le goût de l'endroit"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex items-center gap-3 bg-brand-gold/10 rounded-2xl p-4 w-full">
            <div className="w-10 h-10 rounded-full bg-brand-gold text-white font-extrabold flex items-center justify-center shrink-0">①</div>
            <p className="text-brand-blue font-semibold text-sm text-left">Un parcellaire très riche entre Loire et côteaux</p>
          </div>
          <button className="btn-gold w-full" onClick={() => go(2)}>Continuer</button>
        </div>
      )}

      {/* 2 — Entre Loire et côteaux */}
      {screen === 2 && (
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-2xl font-extrabold text-brand-blue">Entre Loire et côteaux</h1>
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '4/3' }}>
            <Image
              src={`${BASE}/images/lieux/carte-terroirs.jpg`}
              alt="Carte des terroirs entre Loire et côteaux"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-brand-blue/70 leading-relaxed">
            Le Clos des Quarterons s&apos;étend sur des terroirs variés — des{' '}
            <strong>graviers</strong> en bord de Loire aux <strong>calcaires</strong> des côteaux.
            Chaque parcelle donne un vin unique.
          </p>
          <button className="btn-gold w-full" onClick={() => go(3)}>
            Aide-nous à associer les coupes de sol aux terroirs !
          </button>
        </div>
      )}

      {/* 3 — Présentation terroir graviers */}
      {screen === 3 && (
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-brand-blue/70 leading-relaxed">
            Les terroirs les plus proches de la Loire sont constitués de sable ou terroirs de
            graviers. Ce type de terroir produit des vins souples, ronds et sur le fruit.
          </p>
          <p className="text-brand-blue/50 text-sm italic">
            Clique sur l&apos;image pour découvrir ce terroir en détail.
          </p>
          <button
            onClick={() => setSoilDetailOpen('graviers')}
            className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-brand-gold hover:opacity-90 transition-opacity shadow-md"
          >
            <Image
              src={`${BASE}/images/lieux/terroir-gravier.png`}
              alt="Terroir graviers"
              fill
              className="object-cover"
            />
          </button>
          <button className="btn-gold w-full" onClick={() => go(4)}>Je continue</button>

          {soilDetailOpen === 'graviers' && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
              <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-extrabold text-brand-blue">Terroir de graviers</h3>
                  <button onClick={() => setSoilDetailOpen(null)} className="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center font-bold">✕</button>
                </div>
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 shadow-md">
                  <Image src={`${BASE}/images/lieux/terroir-gravier.png`} alt="Graviers siliceux" fill className="object-cover" />
                </div>
                <p className="text-brand-blue/70 text-sm leading-relaxed">
                  Sols de <strong>graviers siliceux</strong> en bord de Loire. Ces terres légères
                  et drainantes donnent des vins fruités et élégants. Cuvée emblématique :{' '}
                  <strong>Les Gravilices</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4 — Drag & Drop graviers */}
      {screen === 4 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-extrabold text-brand-blue text-center">
            Déplace la coupe de sol sur la bonne partie du vignoble.
          </h1>
          <DragDropMap
            instruction="Glisse l'échantillon de graviers sur la zone correspondante de la carte"
            mapSrc={`${BASE}/images/lieux/carte-terroirs.jpg`}
            dropZones={DROP_ZONES}
            sampleSrc={`${BASE}/images/lieux/terroir-gravier.png`}
            sampleLabel="Graviers"
            correctZoneId="zone-graviers"
            onCorrect={() => go(5)}
          />
        </div>
      )}

      {/* 5 — Success graviers */}
      {screen === 5 && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="bg-brand-blue rounded-3xl p-8 text-white w-full">
            <div className="text-3xl mb-3">🎉</div>
            <p className="font-bold text-base leading-relaxed">
              Bravo ! En effet, notre terroir de graviers correspond à nos parcelles les plus
              proches de la Loire. Nous y produisons notamment la cuvée des{' '}
              <strong>Gravilices</strong>.
            </p>
          </div>
          <button className="btn-gold w-full" onClick={() => go(6)}>
            Je continue avec un 2e terroir
          </button>
        </div>
      )}

      {/* 6 — Présentation terroir calcaire */}
      {screen === 6 && (
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="text-brand-blue/70 leading-relaxed">
            Les terroirs de nature argilo calcaire ou terroirs de &laquo;&nbsp;tufs&nbsp;&raquo;
            sont plus présents, lorsque l&apos;on aborde les coteaux de l&apos;Appélation. Les
            vins issus de ce type de terroir sont plus structurés, de plus belle complexité et de
            plus grande garde.
          </p>
          <p className="text-brand-blue/50 text-sm italic">
            Clique sur l&apos;image pour découvrir ce terroir en détail.
          </p>
          <button
            onClick={() => setSoilDetailOpen('calcaire')}
            className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-brand-gold hover:opacity-90 transition-opacity shadow-md"
          >
            <Image
              src={`${BASE}/images/lieux/terroir-calcaire.png`}
              alt="Terroir calcaire"
              fill
              className="object-cover"
            />
          </button>
          <button className="btn-gold w-full" onClick={() => go(7)}>Je continue</button>

          {soilDetailOpen === 'calcaire' && (
            <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
              <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-extrabold text-brand-blue">Terroir calcaire</h3>
                  <button onClick={() => setSoilDetailOpen(null)} className="w-8 h-8 rounded-full bg-brand-gold text-white flex items-center justify-center font-bold">✕</button>
                </div>
                <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 shadow-md">
                  <Image src={`${BASE}/images/lieux/terroir-calcaire.png`} alt="Calcaire turonien" fill className="object-cover" />
                </div>
                <p className="text-brand-blue/70 text-sm leading-relaxed">
                  Sols <strong>argilo-calcaires</strong> sur les côteaux. Ces terres retiennent
                  bien l&apos;eau et donnent des vins plus structurés et complexes. Cuvée emblématique :{' '}
                  <strong>Vau Renou</strong>.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 7 — Drag & Drop calcaire */}
      {screen === 7 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-extrabold text-brand-blue text-center">
            Déplace la coupe de sol sur la bonne partie du vignoble.
          </h1>
          <DragDropMap
            instruction="Glisse l'échantillon de calcaire sur la zone correspondante de la carte"
            mapSrc={`${BASE}/images/lieux/carte-terroirs.jpg`}
            dropZones={DROP_ZONES}
            sampleSrc={`${BASE}/images/lieux/terroir-calcaire.png`}
            sampleLabel="Calcaire"
            correctZoneId="zone-calcaire"
            onCorrect={() => go(8)}
          />
        </div>
      )}

      {/* 8 — Success calcaire */}
      {screen === 8 && (
        <div className="flex flex-col min-h-[calc(100vh-8rem)]">
          <div className="bg-brand-blue rounded-3xl p-10 text-white w-full">
            <div className="text-3xl mb-4">🎉</div>
            <p className="font-bold text-base leading-relaxed">
              Bravo ! En effet, notre terroir de calcaire correspond bien à ces parcelles !
              Nous y produisons notre cuvée du <strong>Vau Renou</strong>.
            </p>
          </div>
          <button className="btn-gold w-full mt-auto" onClick={() => go(9)}>
            Maintenant, viens tester notre crédo : Des vins qui ont le goût de l&apos;endroit !
          </button>
        </div>
      )}

      {/* 9 — Dégustation */}
      {screen === 9 && (
        <div className="flex flex-col items-center gap-6 text-center">
          <h1 className="text-2xl font-extrabold text-brand-blue">La dégustation</h1>
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-md">
            <Image
              src={`${BASE}/images/portraits/onboarding.png`}
              alt="La dégustation"
              fill
              className="object-cover"
            />
          </div>
          <p className="text-brand-blue/70 leading-relaxed">
            Maintenant que tes sens sont en éveil et que tu comprends le rôle du terroir,
            tu es fin prêt pour la <strong>dégustation</strong>. 🍷
          </p>
          <button className="btn-gold w-full" onClick={() => go(10)}>
            Mais d&apos;abord, clique ici pour entrer dans le &ldquo;Chai d&apos;Oeuvre&rdquo;,
            là où la magie opère !
          </button>
        </div>
      )}

      {/* 10 — Transition 360° */}
      {screen === 10 && (
        <div className="flex flex-col min-h-[calc(100vh-8rem)]">
          <div className="flex flex-col items-center gap-6 text-center flex-1">
            <div className="relative w-44 h-44 rounded-full overflow-hidden shadow-md">
              <Image
                src={`${BASE}/images/lieux/porte-du-chai.png`}
                alt="Porte du chai"
                fill
                className="object-cover"
              />
            </div>
            <p className="text-brand-blue font-semibold leading-relaxed">
              Un lieu magique s&apos;ouvre maintenant à toi.
            </p>
            <p className="text-brand-blue leading-relaxed">
              Tu vas lancer une <strong>expérience à 360°</strong> du chai.
            </p>
            <p className="text-brand-blue/60 text-sm italic">
              Pour en sortir, clique sur l&apos;écran.
            </p>
          </div>
          <button className="btn-gold w-full mt-auto" onClick={() => go(11)}>
            Je découvre le chai
          </button>
        </div>
      )}

      {/* 12 — Conclusion */}
      {screen === 12 && (
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Team photo in landscape format */}
          <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '4/3' }}>
            <Image
              src={`${BASE}/images/portraits/equipe-conclusion.jpg`}
              alt="L'équipe du Clos des Quarterons"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <PlayButton
              size="lg"
              audioUrl={`${BASE}/audios/conclusion-au-revoir.m4a`}
            />
          </div>
          <blockquote className="text-brand-blue italic text-base leading-relaxed border-l-4 border-brand-gold pl-4 text-left">
            &ldquo;Il n&apos;y a pas l&apos;Homme d&apos;un côté et la Nature de l&apos;autre,
            l&apos;Homme est Nature.&rdquo;
          </blockquote>
          <p className="text-brand-gold font-bold text-sm">— Pierre Rabhi</p>
          <div className="flex flex-col gap-3 w-full mt-4">
            <button className="btn-blue w-full" onClick={() => router.push('/remerciements')}>
              Remerciements
            </button>
            <button className="btn-gold w-full" onClick={() => router.push('/menu')}>
              Je retourne à l&apos;accueil
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
