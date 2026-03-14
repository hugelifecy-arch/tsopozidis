'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const links = [
  { label: 'Latest Release: Канитель', href: 'https://tsopozidis-alexandros.com/en/music?utm_source=linkinbio&utm_medium=social', emoji: '🎵' },
  { label: 'Coming Soon: Вечная любовь', href: 'https://t.me/tsopozidis?utm_source=linkinbio&utm_medium=social', emoji: '🔥' },
  { label: 'Watch Бродяга (22M+ views)', href: 'https://www.youtube.com/watch?v=z9ASjQE6Q2Y&utm_source=linkinbio&utm_medium=social', emoji: '▶️' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/6PPuuN3cvmbyuvgrGbhXge?utm_source=linkinbio&utm_medium=social', emoji: '🎧' },
  { label: 'Apple Music', href: 'https://music.apple.com/artist/alexandros-tsopozidis/839072119?utm_source=linkinbio&utm_medium=social', emoji: '🎧' },
  { label: 'Yandex Music', href: 'https://music.yandex.ru/artist/3050547?utm_source=linkinbio&utm_medium=social', emoji: '🎧' },
  { label: 'Zvuk', href: 'https://zvuk.com/artist/196201870?utm_source=linkinbio&utm_medium=social', emoji: '🎧' },
  { label: 'TikTok', href: 'https://www.tiktok.com/@tsopozidis?utm_source=linkinbio&utm_medium=social', emoji: '📱' },
  { label: 'VK', href: 'https://vk.com/alexandros_tsopozidis?utm_source=linkinbio&utm_medium=social', emoji: '📱' },
  { label: 'Instagram', href: 'https://instagram.com/alexandros_official?utm_source=linkinbio&utm_medium=social', emoji: '📱' },
  { label: 'Book for Event', href: 'https://wa.me/79383163034?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20booking.&utm_source=linkinbio&utm_medium=social', emoji: '✉️' },
  { label: 'Official Website', href: 'https://tsopozidis-alexandros.com?utm_source=linkinbio&utm_medium=social', emoji: '🌐' },
];

export default function LinksPage() {
  const [greeting, setGreeting] = useState('Greek Soul · Eastern Sound');

  useEffect(() => {
    const lang = navigator.language?.slice(0, 2);
    if (lang === 'ru') setGreeting('Греческая душа · Восточный звук');
    else if (lang === 'el') setGreeting('Ελληνική ψυχή · Ανατολίτικος ήχος');
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center p-4">
      <div className="w-full max-w-[480px] py-12 text-center">
        {/* Artist photo */}
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#C8A96E] mb-4">
          <Image
            src="/images/artist/portrait-balcony.jpg"
            alt="Alexandros Tsopozidis"
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-white text-lg font-semibold tracking-wider">
          Alexandros Tsopozidis
        </h1>
        <p className="text-[#A09080] text-sm italic mt-1">
          {greeting}
        </p>

        {/* Links */}
        <div className="mt-8 space-y-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full border border-[#C8A96E]/40 text-[#C8A96E] px-6 py-3 text-sm font-medium tracking-wide rounded-sm hover:bg-[#C8A96E]/10 transition-all duration-300"
            >
              <span className="mr-2">{link.emoji}</span>
              {link.label}
            </a>
          ))}
        </div>

        <p className="text-[#605040] text-xs mt-8">
          © 2026 Alexandros Tsopozidis
        </p>
      </div>
    </div>
  );
}
