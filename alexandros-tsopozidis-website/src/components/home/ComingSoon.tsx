'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function ComingSoon() {
  const t = useTranslations('coming_soon');

  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-secondary to-bg-primary opacity-50" />

      <div className="relative max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <p className="text-xs tracking-[0.3em] text-gold uppercase font-sans mb-4">
            {t('label')}
          </p>
          <motion.h2
            animate={{
              textShadow: [
                '0 0 20px rgba(200,169,110,0.2)',
                '0 0 40px rgba(200,169,110,0.4)',
                '0 0 20px rgba(200,169,110,0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="font-display text-4xl md:text-5xl text-gold tracking-wider"
          >
            Вечная любовь
          </motion.h2>
          <p className="font-serif italic text-text-secondary text-lg mt-2">
            {t('translation')}
          </p>
          <p className="text-text-secondary font-sans text-sm mt-6">
            {t('subtitle')}
          </p>
          <a
            href="https://t.me/tsopozidis"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 border border-gold/40 text-gold px-6 py-3 text-sm font-display uppercase tracking-wider hover:bg-gold/10 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            {t('notify_me')}
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
