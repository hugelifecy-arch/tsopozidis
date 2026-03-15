import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip locale middleware for static/public files and API routes
  if (
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap.xml') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/opengraph-image') ||
    pathname.startsWith('/manifest') ||
    pathname.startsWith('/browserconfig') ||
    pathname.startsWith('/apple-icon') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|avif|woff|woff2|ttf|eot|xml|json|txt|webmanifest)$/)
  ) {
    return NextResponse.next();
  }

  // Run next-intl middleware for locale routing
  const response = intlMiddleware(request);

  // Force 301 for root-to-default-locale redirect (next-intl uses 307 by default)
  if (pathname === '/' && response.status === 307) {
    const url = request.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.redirect(url, 301);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|svg|gif|webp|avif|woff|woff2|ttf|eot)$).*)',
  ],
};
