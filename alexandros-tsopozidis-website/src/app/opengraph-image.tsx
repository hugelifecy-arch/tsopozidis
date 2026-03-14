import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Alexandros Tsopozidis — Official Website';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          fontFamily: 'serif',
        }}
      >
        <div style={{ width: '100%', height: '4px', backgroundColor: '#C8A96E', position: 'absolute', top: 0 }} />
        <div style={{ color: '#C8A96E', fontSize: '28px', letterSpacing: '12px', marginBottom: '8px' }}>
          ALEXANDROS
        </div>
        <div style={{ color: '#F5F0E8', fontSize: '64px', fontWeight: 'bold', letterSpacing: '8px' }}>
          TSOPOZIDIS
        </div>
        <div style={{ color: '#A09080', fontSize: '18px', fontStyle: 'italic', letterSpacing: '6px', marginTop: '16px' }}>
          greek soul · eastern sound
        </div>
        <div style={{ color: '#605040', fontSize: '14px', position: 'absolute', bottom: '40px' }}>
          tsopozidis-alexandros.com
        </div>
        <div style={{ width: '100%', height: '4px', backgroundColor: '#C8A96E', position: 'absolute', bottom: 0 }} />
      </div>
    ),
    { ...size }
  );
}
