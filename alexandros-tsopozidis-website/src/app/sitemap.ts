import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.tsopozidis-alexandros.com';
const locales = ['en', 'ru', 'el'];

const pages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0, lastModified: '2026-03-14' },
  { path: 'about', changeFrequency: 'monthly' as const, priority: 0.6, lastModified: '2026-03-01' },
  { path: 'music', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: '2026-03-14' },
  { path: 'videos', changeFrequency: 'monthly' as const, priority: 0.8, lastModified: '2026-03-14' },
  { path: 'gallery', changeFrequency: 'monthly' as const, priority: 0.6, lastModified: '2026-02-01' },
  { path: 'events', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: '2026-03-14' },
  { path: 'contact', changeFrequency: 'monthly' as const, priority: 0.5, lastModified: '2026-01-15' },
  { path: 'press', changeFrequency: 'monthly' as const, priority: 0.5, lastModified: '2026-01-15' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      const url = page.path
        ? `${BASE_URL}/${locale}/${page.path}`
        : `${BASE_URL}/${locale}`;

      entries.push({
        url,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      });
    }
  }

  return entries;
}
