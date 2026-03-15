import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.tsopozidis-alexandros.com';
const locales = ['en', 'ru', 'el'] as const;

const pages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0, lastModified: '2026-03-14' },
  { path: 'about', changeFrequency: 'monthly' as const, priority: 0.6, lastModified: '2026-03-01' },
  { path: 'music', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: '2026-03-14' },
  { path: 'videos', changeFrequency: 'monthly' as const, priority: 0.8, lastModified: '2026-03-14' },
  { path: 'gallery', changeFrequency: 'monthly' as const, priority: 0.6, lastModified: '2026-02-01' },
  { path: 'events', changeFrequency: 'weekly' as const, priority: 0.8, lastModified: '2026-03-14' },
  { path: 'contact', changeFrequency: 'weekly' as const, priority: 0.9, lastModified: '2026-03-15' },
  { path: 'press', changeFrequency: 'monthly' as const, priority: 0.7, lastModified: '2026-03-15' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    const pagePath = page.path ? `/${page.path}` : '';

    for (const locale of locales) {
      const url = `${BASE_URL}/${locale}${pagePath}`;

      // Build hreflang alternates for all locales + x-default
      const languages: Record<string, string> = {};
      for (const alt of locales) {
        languages[alt] = `${BASE_URL}/${alt}${pagePath}`;
      }
      languages['x-default'] = `${BASE_URL}/en${pagePath}`;

      entries.push({
        url,
        lastModified: page.lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages,
        },
      });
    }
  }

  return entries;
}
