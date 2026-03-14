'use client';

import { useTranslations } from 'next-intl';

export default function Error({ reset }: { reset: () => void }) {
  const t = useTranslations('error');

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-4xl text-gold mb-4">{t('title')}</h1>
        <p className="font-serif italic text-text-secondary text-lg mb-8">{t('message')}</p>
        <button
          onClick={reset}
          className="border border-gold text-gold px-6 py-3 text-sm font-display uppercase tracking-wider hover:bg-gold hover:text-bg-primary transition-all duration-300"
        >
          {t('try_again')}
        </button>
      </div>
    </div>
  );
}
