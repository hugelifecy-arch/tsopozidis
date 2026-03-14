import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Phone, Mail } from 'lucide-react';
import PageHero from '@/components/common/PageHero';
import ScrollReveal from '@/components/common/ScrollReveal';
import SocialIcons from '@/components/common/SocialIcons';
import BookingForm from '@/components/contact/BookingForm';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: `${t('title')} — Alexandros Tsopozidis`,
    description: 'Book Alexandros Tsopozidis for concerts, festivals, and private events.',
  };
}

export default function ContactPage() {
  const t = useTranslations('contact');

  return (
    <>
      <PageHero title={t('title')} subtitle={t('subtitle')} />

      <section className="py-24 px-4 md:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: Contact Info */}
          <ScrollReveal direction="left">
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wider mb-6">{t('booking_title')}</h2>
              <p className="text-text-secondary font-sans font-light leading-relaxed mb-8">
                {t('booking_text')}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-sm">
                      <a href="tel:+79383163034" className="hover:text-gold transition-colors">
                        +7 938 316 30 34
                      </a>
                      <span className="text-text-secondary ml-2">(Liana)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone size={18} className="text-gold mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-sans text-sm font-medium">BigCityStar</p>
                    <p className="text-text-secondary text-sm font-sans">
                      <a href="tel:+74951426010" className="hover:text-gold transition-colors">
                        +7 (495) 142-60-10
                      </a>
                    </p>
                    <p className="text-text-secondary text-sm font-sans">
                      <a href="mailto:inbox@bigcitystar.ru" className="hover:text-gold transition-colors">
                        inbox@bigcitystar.ru
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail size={18} className="text-gold mt-1 flex-shrink-0" />
                  <p className="text-text-secondary text-sm font-sans italic">
                    {t('press_note')}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <SocialIcons size="md" />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Form */}
          <ScrollReveal direction="right" delay={0.2}>
            <BookingForm />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
