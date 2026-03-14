'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

const locales = [
  { code: 'en' as const, label: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'ru' as const, label: 'RU', name: 'Русский', flag: '🇷🇺' },
  { code: 'el' as const, label: 'EL', name: 'Ελληνικά', flag: '🇬🇷' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitch = (newLocale: 'en' | 'ru' | 'el') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-bg-secondary/50 p-0.5">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => handleSwitch(l.code)}
          className={`px-3 py-2.5 min-h-[44px] rounded-full text-xs font-sans tracking-wider transition-all duration-300 ${
            locale === l.code
              ? 'bg-gold/15 text-gold border border-gold/30'
              : 'text-text-secondary hover:text-text-primary border border-transparent'
          }`}
          title={l.name}
        >
          <span className="mr-1">{l.flag}</span>
          {l.label}
        </button>
      ))}
    </div>
  );
}
