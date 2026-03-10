import { hotspots } from '../data';

interface NavbarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const views = ['Live Map', 'Analytics', 'Report', 'Routes'];

export default function Navbar({ activeView, onViewChange }: NavbarProps) {
  const criticalCount = hotspots.filter(h => h.severity === 'critical').length;

  return (
    <nav
      style={{
        background: 'rgba(5, 10, 14, 0.95)',
        borderBottom: '1px solid rgba(0,255,178,0.15)',
        backdropFilter: 'blur(12px)',
      }}
      className="flex items-center justify-between px-5 py-3 shrink-0 z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div
          style={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, #00FFB2, #00CC8E)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="3" fill="#050A0E" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="#050A0E" strokeWidth="2" fill="none" />
            <path d="M12 6v2M12 16v2M6 12H4M20 12h-2" stroke="#050A0E" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <span
          style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '-0.5px' }}
        >
          WasteMap <span style={{ color: '#00FFB2' }}>Pulse</span>
        </span>
      </div>

      {/* Nav Pills */}
      <div className="flex items-center gap-1">
        {views.map(view => (
          <button
            key={view}
            onClick={() => onViewChange(view)}
            style={{
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 500,
              fontSize: 13,
              padding: '6px 16px',
              borderRadius: 20,
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s',
              background: activeView === view ? '#00FFB2' : 'rgba(255,255,255,0.05)',
              color: activeView === view ? '#050A0E' : 'rgba(255,255,255,0.6)',
              boxShadow: activeView === view ? '0 0 16px rgba(0,255,178,0.4)' : 'none',
            }}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Right side badges */}
      <div className="flex items-center gap-4">
        {/* Critical Alert count */}
        {criticalCount > 0 && (
          <div style={{
            background: 'rgba(255,59,92,0.15)',
            border: '1px solid rgba(255,59,92,0.4)',
            borderRadius: 6,
            padding: '3px 10px',
            fontSize: 12,
            color: '#FF3B5C',
            fontWeight: 600,
          }}>
            {criticalCount} CRITICAL
          </div>
        )}

        {/* LIVE badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(255,59,92,0.1)',
          border: '1px solid rgba(255,59,92,0.3)',
          borderRadius: 20,
          padding: '4px 12px',
        }}>
          <div className="blink" style={{ width: 8, height: 8, borderRadius: '50%', background: '#FF3B5C' }} />
          <span style={{ fontSize: 11, fontWeight: 700, color: '#FF3B5C', letterSpacing: 1 }}>LIVE</span>
        </div>

        {/* City tag */}
        <div style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.5)',
          fontFamily: 'Instrument Sans, sans-serif',
        }}>
          Tashkent · <span style={{ color: '#00FFB2' }}>UZ</span>
        </div>
      </div>
    </nav>
  );
}
