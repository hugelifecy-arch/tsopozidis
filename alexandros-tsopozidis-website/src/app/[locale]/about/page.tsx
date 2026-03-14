import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import GoldButton from '@/components/common/GoldButton';
import { User, MapPin, Award, Music, Globe, type LucideIcon } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: `${t('title')} — Alexandros Tsopozidis`,
    description: t('bio_paragraph_1'),
  };
}

function TimelineItem({ icon: Icon, title, children }: { icon: LucideIcon; title: string; children: React.ReactNode }) {
  return (
    <ScrollReveal>
      <div className="relative pl-8 pb-12 border-l border-gold/20 last:border-0 last:pb-0">
        <div className="absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full bg-bg-secondary border border-gold/40 flex items-center justify-center">
          <Icon size={14} className="text-gold" />
        </div>
        <h3 className="font-display text-xl uppercase tracking-wider mb-4">{title}</h3>
        <div className="text-text-secondary font-sans font-light leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <TimelineItem icon={MapPin} title={t('origins_title')}>
            <p>{t('bio_paragraph_1')}</p>
            <p>{t('bio_paragraph_2')}</p>
          </TimelineItem>

          <TimelineItem icon={Music} title={t('football_title')}>
            <p>{t('bio_paragraph_3')}</p>
          </TimelineItem>

          <TimelineItem icon={Award} title={t('career_title')}>
            <p>{t('bio_paragraph_4')}</p>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center py-4 bg-bg-secondary rounded-sm">
                <p className="font-display text-2xl text-gold">22M+</p>
                <p className="text-xs text-text-tertiary mt-1">YouTube Views</p>
              </div>
              <div className="text-center py-4 bg-bg-secondary rounded-sm">
                <p className="font-display text-2xl text-gold">310K</p>
                <p className="text-xs text-text-tertiary mt-1">Followers</p>
              </div>
              <div className="text-center py-4 bg-bg-secondary rounded-sm">
                <p className="font-display text-2xl text-gold">15+</p>
                <p className="text-xs text-text-tertiary mt-1">Years</p>
              </div>
            </div>
          </TimelineItem>

          <TimelineItem icon={Globe} title={t('sound_title')}>
            <p>{t('bio_paragraph_5')}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {['Russian', 'Greek', 'Pontic Greek'].map((lang) => (
                <span key={lang} className="text-xs bg-gold/10 text-gold px-3 py-1 rounded-full font-sans">
                  {lang}
                </span>
              ))}
            </div>
          </TimelineItem>

          <TimelineItem icon={User} title={t('today_title')}>
            <p>Based in Paphos, Cyprus. Latest release: &quot;Mia Kardia&quot; (2025). &quot;Вечная любовь&quot; coming soon.</p>
            <div className="mt-6">
              <GoldButton href="/contact" variant="outline">
                Book Alexandros
              </GoldButton>
            </div>
          </TimelineItem>
        </div>
      </section>
    </>
  );
}
