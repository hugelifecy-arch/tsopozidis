import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin();

const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'instagram.com' },
      { protocol: 'https', hostname: 'scontent.cdninstagram.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'i.scdn.co' },
      { protocol: 'https', hostname: 'open.spotify.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // Redirect non-www to www (301 permanent)
      // Note: Only matches the bare domain, not www subdomain, to prevent loops
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'tsopozidis-alexandros.com' }],
        missing: [{ type: 'host', value: 'www.tsopozidis-alexandros.com' }],
        destination: 'https://www.tsopozidis-alexandros.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Robots-Tag', value: 'all' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://mc.yandex.ru https://www.youtube.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https://img.youtube.com https://i.scdn.co https://*.instagram.com https://*.cdninstagram.com https://avatars.yandex.net",
              "frame-src https://www.youtube.com https://open.spotify.com https://music.yandex.ru",
              "connect-src 'self' https://www.google-analytics.com https://mc.yandex.ru https://analytics.google.com",
              "font-src 'self'",
              "media-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
            ].join('; '),
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default withAnalyzer(withNextIntl(nextConfig));
