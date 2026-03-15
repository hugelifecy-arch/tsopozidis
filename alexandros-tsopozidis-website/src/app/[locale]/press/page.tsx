import { useTranslations, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { generatePageMetadata, getArtistName, generateBreadcrumbSchema } from '@/lib/seo';
import { Download, Phone } from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import SectionHeading from '@/components/common/SectionHeading';
import JsonLd from '@/components/JsonLd';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'press' });
  return generatePageMetadata({
    locale,
    path: 'press',
    title: `${t('title')} — ${getArtistName(locale)}`,
    description: t('meta_description'),
  });
}

export default function PressPage() {
  const t = useTranslations('press');
  const locale = useLocale();

  const quickFacts = [
    { label: t('fact_name_label'), value: 'Alexandros Tsopozidis' },
    { label: t('fact_origin_label'), value: t('fact_origin') },
    { label: t('fact_genre_label'), value: t('fact_genre') },
    { label: t('fact_languages_label'), value: t('fact_languages') },
    { label: t('fact_notable_label'), value: t('fact_notable') },
    { label: t('fact_award_label'), value: t('fact_award') },
    { label: t('fact_booking_label'), value: '+7 938 316 30 34 (Liana)' },
  ];

  return (
    <>
      <JsonLd data={generateBreadcrumbSchema(locale, 'Press', 'press')} />
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      {/* Quick Facts */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <SectionHeading title={t('quick_facts')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="space-y-4">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-border pb-4">
                  <span className="text-xs uppercase tracking-wider text-gold font-sans min-w-[140px]">
                    {fact.label}
                  </span>
                  <span className="text-text-secondary font-sans text-sm">{fact.value}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Artist Biographies */}
      <section className="py-24 px-4 md:px-8 bg-bg-secondary">
        <div className="max-w-3xl mx-auto">
          {/* 50-word bio */}
          <ScrollReveal>
            <SectionHeading title={t('short_bio_title')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <blockquote className="text-text-secondary font-serif italic text-lg leading-relaxed border-l-2 border-gold pl-6">
              {t('short_bio')}
            </blockquote>
          </ScrollReveal>

          {/* 100-word bio */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16">
              <h3 className="font-display text-lg uppercase tracking-wider mb-4">
                {t('medium_bio_title')}
              </h3>
              <p className="text-text-secondary font-sans font-light leading-relaxed">
                {t('medium_bio')}
              </p>
            </div>
          </ScrollReveal>

          {/* 250-word full bio */}
          <ScrollReveal delay={0.4}>
            <div className="mt-16">
              <h3 className="font-display text-lg uppercase tracking-wider mb-6">
                {t('full_bio_title')}
              </h3>
              <div className="text-text-secondary font-sans font-light leading-relaxed space-y-4">
                {t('full_bio').split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Press Photos */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <SectionHeading title={t('press_photos')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {['landscape', 'portrait', 'logo'].map((type) => (
                <div
                  key={type}
                  className="bg-bg-secondary border border-border rounded-sm p-6 text-center"
                >
                  <Download size={24} className="text-gold mx-auto mb-3" />
                  <p className="font-sans text-sm">{t(`photo_${type}`)}</p>
                </div>
              ))}
            </div>
            <p className="text-text-tertiary text-xs text-center mt-4 font-sans">
              {t('hires_note')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Booking */}
      <section className="py-24 px-4 md:px-8 bg-bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <SectionHeading title={t('booking_title')} />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-text-secondary font-sans mb-6">{t('available_for')}</p>
            <div className="flex items-center justify-center gap-3 mb-8">
              <Phone size={20} className="text-gold" />
              <a href="tel:+79383163034" className="font-display text-xl text-gold tracking-wider">
                +7 938 316 30 34
              </a>
            </div>
            <a
              href="https://wa.me/79383163034?text=Hi%2C%20I%27d%20like%20to%20inquire%20about%20booking%20Alexandros%20Tsopozidis%20for%20an%20event."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gold text-bg-primary px-8 py-3 text-sm font-display uppercase tracking-wider hover:bg-gold-light transition-all duration-300"
            >
              {t('booking_cta')}
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
