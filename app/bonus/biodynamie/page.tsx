'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function BonusBiodynamiePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      {/* Close button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-full bg-brand-gold text-white font-bold flex items-center justify-center hover:opacity-90"
        >
          ✕
        </button>
      </div>

      <h1 className="text-2xl font-extrabold text-brand-blue text-center mb-6">
        En savoir plus sur la Biodynamie
      </h1>

      <div className="flex flex-col gap-6 pb-12">
        {/* Histoire */}
        <p className="text-brand-blue leading-relaxed">
          C&apos;est en <strong>1924</strong> que l&apos;on entend parler pour la première fois
          de la Biodynamie par <strong>Rudolf Steiner</strong>.
        </p>

        {/* Green leaf icon */}
        <div className="flex justify-center">
          <Image src="/images/icone/feuille.png" alt="" width={48} height={48} className="object-contain" />
        </div>

        {/* Qu'est-ce que c'est */}
        <div className="bg-brand-blue/5 rounded-3xl p-6">
          <p className="text-brand-blue leading-relaxed">
            La biodynamie est une approche agricole globale qui n&apos;utilise aucun produit de
            synthèse, comme les engrais chimiques et pesticides. Elle vise à{' '}
            <strong>régénérer les écosystèmes</strong> en prenant soin de chaque élément du
            domaine agricole : sol, plante, animal, être humain.
          </p>
        </div>

        <div className="flex justify-center">
          <Image src="/images/icone/feuille.png" alt="" width={48} height={48} className="object-contain" />
        </div>

        <p className="text-brand-blue leading-relaxed">
          C&apos;est une forme plus poussée de l&apos;agriculture biologique. Les deux se
          rapprochent mais se distinguent car l&apos;agriculture biodynamique vise à{' '}
          <strong>intensifier les échanges entre la plante et son environnement</strong>, ce qui
          va permettre d&apos;obtenir plus de vitalité dans nos raisins, donc de meilleurs vins !
        </p>

        <div className="flex justify-center">
          <Image src="/images/icone/feuille.png" alt="" width={48} height={48} className="object-contain" />
        </div>

        <p className="text-brand-blue leading-relaxed">
          La Biodynamie accorde une grande importance aux <strong>rythmes de la nature</strong>,
          à l&apos;influence des astres et surtout aux cycles lunaires.
        </p>

        {/* Préparations */}
        <div>
          <h2 className="font-extrabold text-brand-blue text-lg mb-3">🧪 Les préparations biodynamiques</h2>
          <div className="flex flex-col gap-3 text-brand-blue text-sm leading-relaxed">
            <div className="bg-brand-blue/5 rounded-2xl p-4">
              <p><strong>Préparation 500</strong> — pulvérisée sur le sol, composée de bouse de corne. Renforce et harmonise le système racinaire et stimule la biodiversité des sols.</p>
            </div>
            <div className="bg-brand-blue/5 rounded-2xl p-4">
              <p><strong>Préparation 501</strong> — au silice de corne, pulvérisée sur le feuillage. Permet une bonne production des fruits et un bon développement de la vigne.</p>
            </div>
            <div className="bg-brand-blue/5 rounded-2xl p-4">
              <p><strong>Préparations 502 à 507</strong> — élaborées à partir de plantes médicinales. Par exemple, l&apos;ortie aide à une bonne humification et les écorces de chênes augmentent l&apos;assimilation du calcium.</p>
            </div>
          </div>
        </div>

        {/* Logos certifications */}
        <div>
          <h2 className="font-extrabold text-brand-blue text-lg mb-4">🏅 Certifications</h2>
          <div className="flex gap-6 justify-center items-center">
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/images/logos/demeter.gif"
                alt="Certification Demeter"
                width={80}
                height={80}
                className="object-contain"
              />
              <span className="text-xs font-bold text-brand-blue/60">Demeter</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Image
                src="/images/logos/biodyvin.png"
                alt="Certification Biodyvin"
                width={80}
                height={80}
                className="object-contain"
              />
              <span className="text-xs font-bold text-brand-blue/60">Biodyvin</span>
            </div>
          </div>
        </div>

        {/* Pierre Rabhi quote */}
        <div className="bg-brand-blue rounded-3xl p-6 text-white text-center">
          <blockquote className="italic text-base leading-relaxed mb-3">
            &ldquo;La nature est par définition le complexe vivant dans lequel l&apos;être humain
            doit enfin trouver sa juste place s&apos;il ne veut être éradiqué par ses propres
            erreurs.&rdquo;
          </blockquote>
          <p className="text-brand-gold font-bold text-sm">— Pierre Rabhi</p>
        </div>
      </div>
    </div>
  );
}
