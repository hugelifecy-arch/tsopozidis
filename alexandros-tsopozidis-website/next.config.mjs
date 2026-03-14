import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'instagram.com' },
      { protocol: 'https', hostname: 'scontent.cdninstagram.com' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
      { protocol: 'https', hostname: 'i.scdn.co' },
    ],
  },
};

export default withNextIntl(nextConfig);
