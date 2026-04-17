import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0f2e 100%)',
          color: '#ffffff',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative background elements */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-5%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Main content */}
        <div style={{ flex: 1, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 88, fontWeight: 900, marginBottom: 20, letterSpacing: '-2px' }}>
            Blackjack
          </div>
          <div style={{ fontSize: 48, fontWeight: 600, color: '#22c55e', marginBottom: 40 }}>
            Provably Fair
          </div>
          <div style={{ fontSize: 32, color: '#e5e7eb', lineHeight: 1.4, maxWidth: '600px' }}>
            Play the ultimate security-grade blackjack engine with transparent game outcomes and fair RNG
          </div>
          <div style={{ fontSize: 24, color: '#9ca3af', marginTop: 40 }}>
            demo.vln.gg
          </div>
        </div>

        {/* Visual element - card design */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Card 1 - Ace of Spades */}
          <div
            style={{
              position: 'absolute',
              width: 200,
              height: 280,
              background: '#ffffff',
              borderRadius: 20,
              padding: 20,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              transform: 'rotate(-15deg) translateX(-40px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 20,
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 900, color: '#000000' }}>A♠</div>
            <div style={{ fontSize: 72, color: '#000000', textAlign: 'center' }}>♠</div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: '#000000',
                textAlign: 'right',
                transform: 'rotate(180deg)',
              }}
            >
              A♠
            </div>
          </div>

          {/* Card 2 - King of Hearts */}
          <div
            style={{
              position: 'absolute',
              width: 200,
              height: 280,
              background: '#ffffff',
              borderRadius: 20,
              padding: 20,
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
              transform: 'rotate(8deg) translateX(20px) translateY(40px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              zIndex: 10,
            }}
          >
            <div style={{ fontSize: 24, fontWeight: 900, color: '#dc2626' }}>K♥</div>
            <div style={{ fontSize: 72, color: '#dc2626', textAlign: 'center' }}>♥</div>
            <div
              style={{
                fontSize: 24,
                fontWeight: 900,
                color: '#dc2626',
                textAlign: 'right',
                transform: 'rotate(180deg)',
              }}
            >
              K♥
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
