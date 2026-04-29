import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Cinzel, Cormorant_Garamond, Inter } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { generatePageMetadata, getArtistName } from '@/lib/seo';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Analytics from '@/components/Analytics';
import TelegramBanner from '@/components/TelegramBanner';
import CookieConsent from '@/components/CookieConsent';
import '../globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const homeDescriptions: Record<string, string> = {
  en: 'Alexandros Tsopozidis — Greek-Russian pop artist. Book for weddings, christenings, corporate events, birthdays & private celebrations worldwide. 100M+ YouTube views. Listen to Бродяга, Канитель, Mia Kardia.',
  ru: 'Александрос Цопозидис — греко-русский поп-артист. Заказать на свадьбу, крестины, корпоратив, юбилей, день рождения. 100М+ просмотров YouTube. Слушайте Бродяга, Канитель, Mia Kardia.',
  el: 'Αλέξανδρος Τσοποζίδης — Ελληνορώσος ποπ καλλιτέχνης. Κρατήσεις για γάμους, βαπτίσεις, εταιρικές εκδηλώσεις, γενέθλια & ιδιωτικές γιορτές. 100M+ YouTube views. Ακούστε Бродяга, Канитель, Mia Kardia.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const siteLabel = locale === 'ru' ? 'Официальный сайт' : locale === 'el' ? 'Επίσημη ιστοσελίδα' : 'Official Website';
  return generatePageMetadata({
    locale,
    title: `${getArtistName(locale)} — ${siteLabel}`,
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
  const tNav = await getTranslations('nav');

  return (
    <html lang={locale}>
      <head>
        <meta name="theme-color" content="#C8A96E" />
      </head>
      <body className={`${cinzel.variable} ${cormorant.variable} ${inter.variable} min-h-screen bg-bg-primary text-text-primary font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-gold focus:text-bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-sans"
          >
            {tNav('skip_to_content')}
          </a>
          <Navbar />
          <main id="main-content" className="relative z-[2]">{children}</main>
          <Footer />
          <TelegramBanner />
          <CookieConsent />
        </NextIntlClientProvider>
        <Analytics />
        <div
          className="hidden md:block fixed inset-0 pointer-events-none z-[1] opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </body>
    </html>
  );
}
