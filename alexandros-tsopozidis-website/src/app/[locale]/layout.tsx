import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { generatePageMetadata } from '@/lib/seo';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Analytics from '@/components/Analytics';
import TelegramBanner from '@/components/TelegramBanner';
import '../globals.css';

const homeDescriptions: Record<string, string> = {
  en: 'Alexandros Tsopozidis — official website. Greek soul, Eastern sound. Listen to Бродяга, Mia Kardia, Kavkaz and more. Book for events worldwide.',
  ru: 'Александрос Цопозидис — официальный сайт. Греческая душа, восточный звук. Слушайте Бродяга, Mia Kardia, Кавказ. Заказать на мероприятие.',
  el: 'Αλέξανδρος Τσοποζίδης — επίσημη ιστοσελίδα. Ελληνική ψυχή, ανατολίτικος ήχος. Ακούστε Бродяга, Mia Kardia, Kavkaz. Κρατήσεις εκδηλώσεων.',
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generatePageMetadata({
    locale,
    title: 'Alexandros Tsopozidis — Official Website',
    description: homeDescriptions[locale] || homeDescriptions.en,
    ogType: 'profile',
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'en' | 'ru' | 'el')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-sans"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="relative z-[2]">{children}</main>
          <Footer />
          <TelegramBanner />
        </NextIntlClientProvider>
        <Analytics />
        <div
          className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </body>
    </html>
  );
}
