import type { Metadata } from 'next';
import { BASE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Alexandros Tsopozidis — Official Website',
    template: '%s',
  },
  description:
    'Alexandros Tsopozidis — Greek-Russian pop artist. Book for weddings, christenings, corporate events, birthdays & private celebrations worldwide.',
  applicationName: 'Alexandros Tsopozidis',
  authors: [{ name: 'Alexandros Tsopozidis', url: BASE_URL }],
  creator: 'Alexandros Tsopozidis',
  publisher: 'Alexandros Tsopozidis',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    yandex: '998677740d9e0f8b',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  other: {
    'msapplication-TileColor': '#0A0A0A',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
