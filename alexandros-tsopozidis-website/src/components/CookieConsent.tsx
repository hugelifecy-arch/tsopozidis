'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function CookieConsent() {
  const t = useTranslations('cookie_consent');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
    window.location.reload();
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6">
      <div className="max-w-2xl mx-auto bg-bg-secondary border border-border rounded-sm p-5 shadow-lg">
        <p className="text-text-secondary text-sm font-sans leading-relaxed">
          {t('message')}
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAccept}
            className="bg-gold text-bg-primary px-6 py-2 text-xs font-display uppercase tracking-wider hover:bg-gold-light transition-all duration-300"
          >
            {t('accept')}
          </button>
          <button
            onClick={handleDecline}
            className="border border-border text-text-secondary px-6 py-2 text-xs font-display uppercase tracking-wider hover:border-gold/30 hover:text-text-primary transition-all duration-300"
          >
            {t('decline')}
          </button>
        </div>
      </div>
    </div>
  );
}
