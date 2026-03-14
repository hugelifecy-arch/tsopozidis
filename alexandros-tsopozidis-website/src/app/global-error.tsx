'use client';

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body style={{ backgroundColor: '#0a0a0a', color: '#e5e5e5', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', color: '#c8a96e', marginBottom: '1rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#999', marginBottom: '2rem' }}>
              An unexpected error occurred.
            </p>
            <button
              onClick={reset}
              style={{
                border: '1px solid #c8a96e',
                color: '#c8a96e',
                background: 'transparent',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
