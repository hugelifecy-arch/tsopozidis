import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import '../globals.css';

export const metadata = {
  title: 'Alexandros Tsopozidis — Official Website',
  description: 'Official website of Greek-Russian pop artist Alexandros Tsopozidis. Music, videos, tour dates, and booking.',
  openGraph: {
    title: 'Alexandros Tsopozidis — Official Website',
    description: 'Official website of Greek-Russian pop artist Alexandros Tsopozidis.',
    type: 'website',
    images: ['/images/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

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
          <Navbar />
          <main className="relative z-[2]">{children}</main>
          <Footer />
        </NextIntlClientProvider>
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
