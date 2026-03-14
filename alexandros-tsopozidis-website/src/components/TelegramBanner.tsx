'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TelegramBanner() {
  const t = useTranslations('telegram_cta');
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('telegram-banner-dismissed')) {
      setDismissed(true);
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dismissed]);

  if (dismissed || !visible) return null;

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem('telegram-banner-dismissed', 'true');
  };

  return (
    <div className="fixed bottom-4 right-4 left-4 md:left-auto md:w-auto z-[55] animate-slide-up">
      <div className="bg-bg-secondary border border-gold/30 rounded-sm px-5 py-3 flex items-center gap-4 shadow-lg">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold flex-shrink-0">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
        <a
          href="https://t.me/tsopozidis"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-sans text-text-primary hover:text-gold transition-colors"
        >
          {t('message')} <span className="text-gold font-medium">{t('link_text')}</span>
        </a>
        <button
          onClick={handleDismiss}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors flex-shrink-0 -mr-2"
          aria-label="Dismiss Telegram banner"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}
