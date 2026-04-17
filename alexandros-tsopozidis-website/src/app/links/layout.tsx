import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BASE_URL } from '@/lib/seo';
import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic', 'greek'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Alexandros Tsopozidis — Links',
  description:
    'All official links for Alexandros Tsopozidis: music streaming, social profiles, latest releases, and booking.',
  alternates: { canonical: `${BASE_URL}/links` },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Alexandros Tsopozidis — Links',
    description: 'Music, socials, releases, and booking — all in one place.',
    url: `${BASE_URL}/links`,
    type: 'profile',
    images: [{ url: `${BASE_URL}/images/og-default.jpg`, width: 1200, height: 630 }],
    siteName: 'Alexandros Tsopozidis',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alexandros Tsopozidis — Links',
    description: 'Music, socials, releases, and booking — all in one place.',
    images: [`${BASE_URL}/images/og-default.jpg`],
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen bg-[#0A0A0A]`}>
        {children}
      </body>
    </html>
  );
}
