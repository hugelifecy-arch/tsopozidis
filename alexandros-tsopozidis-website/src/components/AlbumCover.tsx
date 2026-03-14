'use client';

import Image from 'next/image';
import { Music } from 'lucide-react';
import { useState } from 'react';

interface AlbumCoverProps {
  src?: string;
  title: string;
  year?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function AlbumCover({ src, title, year, size = 'md', className = '' }: AlbumCoverProps) {
  const [error, setError] = useState(false);

  const iconSize = size === 'sm' ? 24 : size === 'md' ? 40 : 64;

  if (!src || error) {
    return (
      <div className={`aspect-square bg-gradient-to-br from-bg-tertiary to-bg-secondary rounded-sm border border-gold/20 flex flex-col items-center justify-center gap-2 ${className}`}>
        <Music size={iconSize} className="text-gold/30" />
        <p className="text-gold/40 text-xs font-display uppercase tracking-wider text-center px-2 truncate max-w-full">
          {title}
        </p>
        {year && (
          <p className="text-gold/20 text-[10px] font-sans">{year}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`aspect-square relative rounded-sm border border-gold/20 overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={`${title} — album cover`}
        fill
        className="object-cover"
        sizes={size === 'sm' ? '192px' : size === 'md' ? '320px' : '480px'}
        onError={() => setError(true)}
      />
    </div>
  );
}
