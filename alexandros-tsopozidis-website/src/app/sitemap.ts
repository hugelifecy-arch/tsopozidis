import { MetadataRoute } from 'next';

const BASE_URL = 'https://tsopozidis-alexandros.com';
const locales = ['en', 'ru', 'el'];

const pages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: 'about', changeFrequency: 'monthly' as const, priority: 0.6 },
  { path: 'music', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'videos', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: 'gallery', changeFrequency: 'monthly' as const, priority: 0.6 },
  { path: 'events', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'contact', changeFrequency: 'monthly' as const, priority: 0.5 },
  { path: 'press', changeFrequency: 'monthly' as const, priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      const url = page.path
        ? `${BASE_URL}/${locale}/${page.path}`
        : `${BASE_URL}/${locale}`;

      entries.push({
        url,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}
