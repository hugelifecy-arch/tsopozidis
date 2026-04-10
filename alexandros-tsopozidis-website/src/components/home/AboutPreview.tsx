import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import ScrollReveal from '@/components/common/ScrollReveal';

export default async function AboutPreview() {
  const t = await getTranslations('about');
  const tCommon = await getTranslations('common');

  return (
    <section className="py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* Photo */}
        <ScrollReveal direction="left" className="w-full md:w-[45%]">
          <div className="relative">
            <div className="aspect-[3/4] bg-bg-secondary rounded-sm overflow-hidden relative">
              <Image
                src="/images/artist/portrait-balcony.jpg"
                alt="Alexandros Tsopozidis"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
            {/* Decorative frame offset */}
            <div className="absolute -top-3 -left-3 w-full h-full border border-gold/20 rounded-sm pointer-events-none" />
          </div>
        </ScrollReveal>

        {/* Text */}
        <ScrollReveal direction="right" delay={0.2} className="w-full md:w-[55%]">
          <span className="text-gold text-xs uppercase tracking-widest font-sans">{t('title')}</span>
          <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wider mt-2">
            {t('the_story')}
          </h2>
          <p className="mt-6 text-text-secondary font-sans font-light leading-relaxed">
            {t('bio_paragraph_1')}
          </p>
          <p className="mt-4 text-text-secondary font-sans font-light leading-relaxed">
            {t('bio_paragraph_3')}
          </p>
          <Link
            href="/about"
            className="inline-block mt-8 text-gold font-sans text-sm tracking-wider hover:text-gold-light transition-colors duration-300"
          >
            {tCommon('read_more')} →
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
