'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Event name shared with Analytics.tsx so it can pick up the new consent
// state without requiring a full page reload.
export const COOKIE_CONSENT_EVENT = 'cookie-consent-changed';

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
    // Tell Analytics to mount immediately for this session (no reload needed).
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(COOKIE_CONSENT_EVENT, { detail: { accepted: true } }),
      );
    }
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setVisible(false);
    // No reload — just keep analytics un-mounted. Dispatching the event lets
    // anything else that cares (future GTM consent-mode wiring) react too.
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(COOKIE_CONSENT_EVENT, { detail: { accepted: false } }),
      );
    }
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('message')}
      className="fixed bottom-0 left-0 right-0 z-[60] p-4 md:p-6"
    >
      <div className="max-w-2xl mx-auto bg-bg-secondary border border-border rounded-sm p-5 shadow-lg">
        <p className="text-text-secondary text-sm font-sans leading-relaxed">
          {t('message')}
        </p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleAccept}
            type="button"
            className="bg-gold text-bg-primary px-6 py-2 text-xs font-display uppercase tracking-wider hover:bg-gold-light transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
          >
            {t('accept')}
          </button>
          <button
            onClick={handleDecline}
            type="button"
            className="border border-border text-text-secondary px-6 py-2 text-xs font-display uppercase tracking-wider hover:border-gold/30 hover:text-text-primary transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {t('decline')}
          </button>
        </div>
      </div>
    </div>
  );
}
