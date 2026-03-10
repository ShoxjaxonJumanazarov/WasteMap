import type { Hotspot } from '../data';
import { severityColors } from '../data';

interface AlertPopupProps {
  hotspot: Hotspot;
  onDismiss: () => void;
  onDispatch: () => void;
}

export default function AlertPopup({ hotspot, onDismiss, onDispatch }: AlertPopupProps) {
  const color = severityColors[hotspot.severity];

  return (
    <div style={{
      position: 'absolute',
      bottom: 24,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 2000,
      width: 420,
      maxWidth: 'calc(100vw - 32px)',
      background: 'rgba(5,10,14,0.97)',
      border: `1px solid ${color}40`,
      borderRadius: 12,
      backdropFilter: 'blur(20px)',
      boxShadow: `0 8px 40px rgba(0,0,0,0.6), 0 0 30px ${color}20`,
      overflow: 'hidden',
    }}>
      {/* Top accent bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, ${color}40)` }} />

      <div style={{ padding: '16px 20px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{
                background: `${color}20`,
                border: `1px solid ${color}50`,
                borderRadius: 4,
                padding: '2px 8px',
                fontSize: 10,
                fontWeight: 700,
                color,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}>
                ⚠ {hotspot.severity} Alert
              </div>
            </div>
            <h3 style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 16,
              color: '#fff',
              margin: 0,
            }}>
              {hotspot.name}
            </h3>
          </div>
          <button
            onClick={onDismiss}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: 'rgba(255,255,255,0.5)',
              fontSize: 16,
              width: 28,
              height: 28,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
          <div style={{
            flex: 1,
            background: `${color}0D`,
            border: `1px solid ${color}25`,
            borderRadius: 8,
            padding: '10px 12px',
          }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>Fill Level</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color, lineHeight: 1 }}>{hotspot.fillLevel}%</div>
          </div>
          <div style={{
            flex: 1,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            padding: '10px 12px',
          }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>Status</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>Immediate Action Required</div>
          </div>
          <div style={{
            flex: 1,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            padding: '10px 12px',
          }}>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 3 }}>Teams Nearby</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1 }}>3</div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={onDispatch}
            style={{
              flex: 2,
              padding: '11px',
              borderRadius: 8,
              border: 'none',
              background: 'linear-gradient(135deg, #FF3B5C, #CC2040)',
              color: '#fff',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(255,59,92,0.3)',
              transition: 'all 0.2s',
            }}
          >
            🚛 Dispatch Team
          </button>
          <button
            onClick={onDismiss}
            style={{
              flex: 1,
              padding: '11px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Snooze
          </button>
        </div>
      </div>
    </div>
  );
}
