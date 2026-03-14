import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Yandex',
        allow: '/',
      },
    ],
    sitemap: 'https://tsopozidis-alexandros.com/sitemap.xml',
    host: 'https://tsopozidis-alexandros.com',
  };
}
