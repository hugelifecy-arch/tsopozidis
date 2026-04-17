import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';

const locales = ['en', 'ru', 'el'] as const;

const pages = [
  { path: '', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: 'about', changeFrequency: 'monthly' as const, priority: 0.6 },
  { path: 'music', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'videos', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: 'gallery', changeFrequency: 'monthly' as const, priority: 0.6 },
  { path: 'events', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: 'contact', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: 'press', changeFrequency: 'monthly' as const, priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date('2026-04-09');

  return locales.flatMap((locale) =>
    pages.map((page) => {
      const pagePath = page.path ? `/${page.path}` : '';

      const languages: Record<string, string> = {};
      for (const alt of locales) {
        languages[alt] = `${BASE_URL}/${alt}${pagePath}`;
      }
      languages['x-default'] = `${BASE_URL}/en${pagePath}`;

      return {
        url: `${BASE_URL}/${locale}${pagePath}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages,
        },
      };
    }),
  );
}
