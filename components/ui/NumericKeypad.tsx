'use client';

import { useState } from 'react';

interface NumericKeypadProps {
  correctCode: string;
  onSuccess: () => void;
  onClose: () => void;
  onError?: () => void;
  title?: string;
}

const ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['', '0', '⌫'],
];

export default function NumericKeypad({ correctCode, onSuccess, onClose, onError, title }: NumericKeypadProps) {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);

  const handleKey = (key: string) => {
    setError(false);
    if (key === '⌫') {
      setInput(p => p.slice(0, -1));
    } else if (key !== '') {
      setInput(p => p + key);
    }
  };

  const handleValidate = () => {
    if (input === correctCode) {
      onSuccess();
    } else if (onError) {
      setInput('');
      onError();
    } else {
      setError(true);
      setInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-3xl w-full max-w-md p-6 pb-10">
        <div className="flex justify-between items-center mb-4">
          {title && <p className="font-bold text-brand-blue text-sm">{title}</p>}
          <button
            onClick={onClose}
            className="ml-auto w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-white font-bold"
          >
            ✕
          </button>
        </div>

        {/* Display */}
        <div className={`rounded-2xl px-6 py-4 text-center text-3xl font-extrabold tracking-[0.3em] mb-4 transition-colors ${error ? 'bg-red-50 text-red-500' : 'bg-brand-blue/5 text-brand-blue'}`}>
          {input || <span className="opacity-20">_ _ _ _</span>}
        </div>
        {error && (
          <p className="text-red-500 text-sm text-center mb-3 font-semibold">Code incorrect, réessaie !</p>
        )}

        {/* Keys */}
        <div className="flex flex-col gap-2 mb-4">
          {ROWS.map((row, i) => (
            <div key={i} className="flex gap-2 justify-center">
              {row.map((key, j) => (
                <button
                  key={j}
                  onClick={() => handleKey(key)}
                  disabled={key === ''}
                  className={`flex-1 h-14 rounded-2xl font-bold text-xl transition-all active:scale-95 ${
                    key === '' ? 'invisible' :
                    key === '⌫' ? 'bg-brand-blue/10 text-brand-blue' :
                    'bg-brand-blue text-white hover:opacity-80'
                  }`}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>

        <button
          onClick={handleValidate}
          disabled={input.length === 0}
          className="btn-gold w-full disabled:opacity-40"
        >
          Je valide ce code
        </button>
      </div>
    </div>
  );
}
