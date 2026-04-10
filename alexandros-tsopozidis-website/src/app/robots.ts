import { MetadataRoute } from 'next';
import { BASE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: [
      `${BASE_URL}/sitemap.xml`,
      `${BASE_URL}/sitemap/0.xml`,
      `${BASE_URL}/sitemap/1.xml`,
      `${BASE_URL}/sitemap/2.xml`,
    ],
  };
}
