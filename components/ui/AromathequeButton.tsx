'use client';

import { useState, useEffect } from 'react';

interface Props {
  plantId: string;
}

export default function AromathequeButton({ plantId }: Props) {
  const [isAdded, setIsAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('aromatheque') || '[]') as string[];
    setIsAdded(stored.includes(plantId));
  }, [plantId]);

  const handleAdd = () => {
    const stored = JSON.parse(localStorage.getItem('aromatheque') || '[]') as string[];
    if (!stored.includes(plantId)) {
      const updated = [...stored, plantId];
      localStorage.setItem('aromatheque', JSON.stringify(updated));
      setIsAdded(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleAdd}
        disabled={isAdded}
        className={`w-full py-4 rounded-full font-bold text-base transition-all ${
          isAdded
            ? 'bg-brand-gold text-white cursor-default'
            : 'bg-brand-blue text-white hover:opacity-90 active:scale-95'
        }`}
      >
        {isAdded
          ? '✓ Plante ajoutée à mon aromathèque'
          : "J'ajoute cette plante à mon aromathèque"}
      </button>

      {showToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-brand-blue text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold z-50">
          Plante ajoutée !
        </div>
      )}
    </div>
  );
}
