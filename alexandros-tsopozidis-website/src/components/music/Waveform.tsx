'use client';

import { useMemo } from 'react';

interface WaveformProps {
  seed: string;
  bars?: number;
  className?: string;
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export default function Waveform({ seed, bars = 32, className = '' }: WaveformProps) {
  const heights = useMemo(() => {
    const base = hashCode(seed);
    return Array.from({ length: bars }, (_, i) => {
      const h = ((base * (i + 1) * 7919) % 100);
      const position = i / bars;
      const envelope = Math.sin(position * Math.PI) * 0.6 + 0.4;
      return Math.max(8, h * envelope);
    });
  }, [seed, bars]);

  return (
    <div className={`flex items-end gap-[2px] h-8 ${className}`}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-gold/20 rounded-full min-w-[2px] transition-all duration-300 group-hover:bg-gold/40"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
