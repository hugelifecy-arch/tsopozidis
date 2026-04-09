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

// Generate a sub-sitemap per locale so Google re-processes all locale URLs
export async function generateSitemaps() {
  return locales.map((_, id) => ({ id }));
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  const locale = locales[id];
  const now = new Date('2026-04-09');

  return pages.map((page) => {
    const pagePath = page.path ? `/${page.path}` : '';

    // Build hreflang alternates for all locales + x-default
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
  });
}
