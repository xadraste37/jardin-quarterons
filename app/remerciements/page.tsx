'use client';

import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';

export default function RemerciementsPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-6">
        <BackButton onClick={() => router.push('/chapitre/4')} />
      </div>

      <h1 className="text-2xl font-extrabold text-brand-blue text-center mb-6">
        Remerciements
      </h1>

      <div className="bg-brand-blue rounded-3xl p-6 text-white text-center mb-6">
        <blockquote className="italic text-base leading-relaxed mb-3">
          &ldquo;Il n&apos;y a pas l&apos;Homme d&apos;un côté et la Nature de l&apos;autre,
          l&apos;Homme est Nature.&rdquo;
        </blockquote>
        <p className="text-brand-gold font-bold text-sm">— Pierre Rabhi</p>
      </div>

      <div className="flex flex-col gap-4 text-brand-blue leading-relaxed mb-10">
        <p>
          Nous avons consacré près d&apos;un an au développement de ce jeu.
        </p>
        <p>
          Nous sommes très fiers d&apos;avoir pu collaborer avec des partenaires aussi passionnés
          que nous et qui contribuent au rayonnement de notre vignoble et plus largement de notre
          Région.
        </p>
        <p>
          Le développement et la mise en œuvre de cette application jeu sensoriel au jardin,
          a réuni plusieurs professionnels locaux :
        </p>

        <div className="bg-brand-blue/5 rounded-2xl p-5 flex flex-col gap-2 text-sm">
          <p><strong>Patrick Genty</strong> — Pour la création complète du Jardin</p>
          <p><strong>Emilie Boillot</strong> de Touraine Terre d&apos;histoire — Expertise Botanique, création graphique (fiches plantes, panneaux jardin)</p>
          <p><strong>Xavier Adraste / Gabin</strong> — Développement numérique du jeu</p>
          <p><strong>Graphival</strong> — Impression des panneaux au jardin</p>
          <p><strong>Cédric Godbert et Philippe Lepère</strong> — Fournitures de plantes et de végétaux</p>
        </div>

        <p>
          Et bien sûr <strong>toute l&apos;équipe du Clos des Quarterons</strong> pour ses contributions
          en tout genre !
        </p>

        <p className="text-brand-blue/50 text-xs italic">
          Crédits photos : Jean Yves Bardin (jardin, équipe), Jérôme Paressant (nain sur tas de fumier)
        </p>
      </div>

      <div className="mt-auto">
        <button className="btn-gold w-full" onClick={() => router.push('/menu')}>
          Je retourne à l&apos;accueil
        </button>
      </div>
    </div>
  );
}
