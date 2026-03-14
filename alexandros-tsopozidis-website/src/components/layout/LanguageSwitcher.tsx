'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

const locales = [
  { code: 'en' as const, label: 'EN' },
  { code: 'ru' as const, label: 'RU' },
  { code: 'el' as const, label: 'EL' },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleSwitch = (newLocale: 'en' | 'ru' | 'el') => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-1 font-sans text-xs tracking-widest uppercase">
      {locales.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && <span className="text-gold-dark mx-1">/</span>}
          <button
            onClick={() => handleSwitch(l.code)}
            className={`transition-colors duration-300 ${
              locale === l.code ? 'text-gold' : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
