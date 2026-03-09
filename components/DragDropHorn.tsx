'use client';

import { useState } from 'react';
import Image from 'next/image';
import { DndContext, DragEndEvent, useDroppable, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface DragDropHornProps {
  onSuccess: () => void;
}

const BOUSES = [
  { id: 'bouse-1', label: 'Bouse 1' },
  { id: 'bouse-2', label: 'Bouse 2' },
  { id: 'bouse-3', label: 'Bouse 3' },
];

const HORN_IMAGES: Record<number, string> = {
  0: '/images/jeu/corne-vide.png',
  1: '/images/jeu/corne-1-3.png',
  2: '/images/jeu/corne-2-3.png',
  3: '/images/jeu/corne-3-3.png',
};

function DraggableBouse({ id, label, dropped }: { id: string; label: string; dropped: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  const style = { transform: CSS.Translate.toString(transform), opacity: isDragging ? 0.4 : 1 };

  if (dropped) {
    return (
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center border-4 border-green-400 text-3xl">
        ✅
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="w-20 h-20 rounded-full overflow-hidden border-4 border-brand-gold cursor-grab active:cursor-grabbing shadow-md touch-none"
      aria-label={label}
    >
      <Image
        src="/images/jeu/bouse.jpg"
        alt="Bouse de vache"
        width={80}
        height={80}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

function DroppableHorn({ count }: { count: number }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'corne' });

  return (
    <div
      ref={setNodeRef}
      className={`relative w-48 h-64 flex items-center justify-center transition-transform ${isOver ? 'scale-105' : ''}`}
    >
      <Image
        src={HORN_IMAGES[count]}
        alt={`Corne remplie ${count}/3`}
        width={192}
        height={256}
        className="object-contain w-full h-full"
      />
      {isOver && (
        <div className="absolute inset-0 rounded-3xl bg-brand-gold/10 border-2 border-brand-gold border-dashed" />
      )}
    </div>
  );
}

export default function DragDropHorn({ onSuccess }: DragDropHornProps) {
  const [dropped, setDropped] = useState<Set<string>>(new Set());

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over?.id === 'corne') {
      const id = event.active.id as string;
      const next = new Set(dropped).add(id);
      setDropped(next);
      if (next.size === 3) {
        setTimeout(onSuccess, 800);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col items-center gap-8">
        <DroppableHorn count={dropped.size} />
        <div className="flex gap-6">
          {BOUSES.map(b => (
            <DraggableBouse key={b.id} {...b} dropped={dropped.has(b.id)} />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
