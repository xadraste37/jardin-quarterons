'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DndContext, DragEndEvent, DragOverEvent, useDroppable, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import PlaceholderImage from './ui/PlaceholderImage';

export interface DropZone {
  id: string;
  x_pct: number; // % from left
  y_pct: number; // % from top
  label: string;
}

interface DragDropMapProps {
  instruction: string;
  mapSrc?: string;
  mapEmoji?: string;
  dropZones: DropZone[];
  sampleEmoji?: string;
  sampleSrc?: string;
  sampleLabel: string;
  correctZoneId: string;
  onCorrect: () => void;
}

function DraggableSample({ emoji, src, label }: { emoji?: string; src?: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: 'sample' });
  const style = { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.5 : 1, zIndex: isDragging ? 99 : 1 };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="touch-none cursor-grab active:cursor-grabbing"
    >
      <PlaceholderImage src={src} emoji={emoji || '🪨'} label={label} size={80} />
    </div>
  );
}

function Zone({ id, x_pct, y_pct, label, isOver, isCorrect }: DropZone & { isOver: boolean; isCorrect: boolean }) {
  const { setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{ left: `${x_pct}%`, top: `${y_pct}%`, transform: 'translate(-50%, -50%)' }}
      className={`absolute w-14 h-14 rounded-full border-2 transition-all flex items-center justify-center text-xs font-bold text-center leading-tight p-1 ${
        isOver ? 'border-brand-gold bg-brand-gold/40 scale-110' :
        isCorrect ? 'border-green-500 bg-green-500/30' :
        'border-white/60 bg-white/20'
      }`}
      title={label}
    />
  );
}

export default function DragDropMap({
  instruction, mapSrc, mapEmoji, dropZones,
  sampleEmoji, sampleSrc, sampleLabel,
  correctZoneId, onCorrect,
}: DragDropMapProps) {
  const [result, setResult] = useState<'correct' | 'wrong' | null>(null);
  const [overZoneId, setOverZoneId] = useState<string | null>(null);

  const handleDragOver = (e: DragOverEvent) => {
    setOverZoneId(e.over?.id != null ? String(e.over.id) : null);
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setOverZoneId(null);
    if (!e.over) return;
    if (e.over.id === correctZoneId) {
      setResult('correct');
      setTimeout(onCorrect, 800);
    } else {
      setResult('wrong');
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <p className="text-brand-blue text-center font-semibold px-4">{instruction}</p>

      <DndContext onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
        {/* Map */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '4/3' }}>
          {mapSrc ? (
            <Image src={mapSrc} alt="Carte" fill className="object-cover" />
          ) : (
            <div className="w-full h-full bg-green-50 flex items-center justify-center text-8xl">
              {mapEmoji || '🗺️'}
            </div>
          )}
          {dropZones.map(zone => (
            <Zone
              key={zone.id}
              {...zone}
              isOver={overZoneId === zone.id}
              isCorrect={result === 'correct' && zone.id === correctZoneId}
            />
          ))}
        </div>

        {/* Draggable */}
        {result !== 'correct' && (
          <div className="flex flex-col items-center gap-2">
            <DraggableSample emoji={sampleEmoji} src={sampleSrc} label={sampleLabel} />
            <p className="text-xs text-brand-blue/50">Glisse sur la carte</p>
          </div>
        )}
      </DndContext>

      {result === 'wrong' && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-center w-full">
          <p className="text-orange-700 font-semibold">Dommage. Réessaie une nouvelle fois.</p>
          <button onClick={() => setResult(null)} className="btn-gold mt-3 text-sm py-2 px-6">
            Réessayer
          </button>
        </div>
      )}
    </div>
  );
}
