'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/ui/BackButton';
import PlayButton from '@/components/ui/PlayButton';

export default function IndicePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen px-6 py-8">
      <div className="mb-6">
        <BackButton onClick={() => router.push('/onboarding')} />
      </div>

      <div className="flex flex-col items-center flex-1 justify-start pt-4 gap-8">
        <h1 className="text-xl font-extrabold text-brand-blue text-center">
          Écoutez l&apos;indice d&apos;Ana, notre maître de chai.
        </h1>

        {/* Ana photo with overlapping play button */}
        <div className="relative">
          <div className="relative w-56 h-56 rounded-full overflow-hidden shadow-xl">
            <Image
              src="/images/portraits/ana-maitre-de-chai.png"
              alt="Ana, maître de chai"
              fill
              className="object-cover"
            />
          </div>
          {/* Play button overlapping bottom center */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2">
            <PlayButton
              size="lg"
              audioUrl="/audios/indice-ana-amphore.m4a"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
