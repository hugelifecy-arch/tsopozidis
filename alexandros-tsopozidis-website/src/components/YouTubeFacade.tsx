'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface YouTubeFacadeProps {
  videoId: string;
  title: string;
  views?: string;
  quality?: 'maxresdefault' | 'hqdefault' | 'mqdefault' | 'sddefault';
  sizes?: string;
  className?: string;
}

export default function YouTubeFacade({
  videoId,
  title,
  views,
  quality = 'hqdefault',
  sizes = '(max-width: 768px) 100vw, 50vw',
  className = '',
}: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false);
  const [thumbQuality, setThumbQuality] = useState(quality);

  const handleImageError = useCallback(() => {
    // maxresdefault doesn't exist for all videos — fall back through lower qualities
    const fallbackOrder: typeof quality[] = ['maxresdefault', 'sddefault', 'hqdefault', 'mqdefault'];
    const currentIndex = fallbackOrder.indexOf(thumbQuality);
    if (currentIndex < fallbackOrder.length - 1) {
      setThumbQuality(fallbackOrder[currentIndex + 1]);
    }
  }, [thumbQuality]);

  if (playing) {
    return (
      <div className={`aspect-video relative ${className}`}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={title}
        />
      </div>
    );
  }

  return (
    <button
      onClick={() => setPlaying(true)}
      className={`aspect-video relative group cursor-pointer w-full ${className}`}
      aria-label={`Play ${title} on YouTube`}
    >
      <Image
        src={`https://img.youtube.com/vi/${videoId}/${thumbQuality}.jpg`}
        alt={`${title} — music video thumbnail`}
        fill
        className="object-cover"
        sizes={sizes}
        loading="lazy"
        onError={handleImageError}
      />
      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full border-2 border-gold flex items-center justify-center group-hover:bg-gold/20 transition-all duration-300">
          <Play size={28} className="text-gold ml-1" />
        </div>
      </div>
      {views && (
        <span className="absolute top-3 right-3 text-[10px] bg-black/70 text-gold px-2 py-0.5 rounded font-sans">
          {views}
        </span>
      )}
    </button>
  );
}
