import { Link } from '@/i18n/routing';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl text-gold mb-4">404</h1>
        <p className="font-serif italic text-text-secondary text-lg mb-8">Page not found</p>
        <Link
          href="/"
          className="border border-gold text-gold px-6 py-3 text-sm font-display uppercase tracking-wider hover:bg-gold hover:text-bg-primary transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
