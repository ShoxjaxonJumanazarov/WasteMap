import { hotspots, severityColors } from '../data';
import type { Hotspot } from '../data';

interface SidebarProps {
  selectedHotspot: Hotspot | null;
  onSelectHotspot: (hotspot: Hotspot) => void;
}

export default function Sidebar({ selectedHotspot, onSelectHotspot }: SidebarProps) {
  const critical = hotspots.filter(h => h.severity === 'critical');
  const warning = hotspots.filter(h => h.severity === 'warning');
  const normal = hotspots.filter(h => h.severity === 'normal');

  return (
    <aside
      style={{
        width: 300,
        background: 'rgba(5, 10, 14, 0.98)',
        borderRight: '1px solid rgba(0,255,178,0.1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* City Stats */}
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          City Stats
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          <StatCard label="Critical" value={critical.length} color="#FF3B5C" />
          <StatCard label="Warning" value={warning.length} color="#FF8C42" />
          <StatCard label="Normal" value={normal.length} color="#00FFB2" />
        </div>
      </div>

      {/* Section heading */}
      <div style={{ padding: '12px 16px 8px' }}>
        <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase' }}>
          Hotspot Monitor
        </p>
      </div>

      {/* Hotspot Cards */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '0 12px 12px' }}>
        {hotspots.map(hotspot => (
          <HotspotCard
            key={hotspot.id}
            hotspot={hotspot}
            selected={selectedHotspot?.id === hotspot.id}
            onClick={() => onSelectHotspot(hotspot)}
          />
        ))}
      </div>
    </aside>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      background: `rgba(${hexToRgb(color)}, 0.08)`,
      border: `1px solid rgba(${hexToRgb(color)}, 0.2)`,
      borderRadius: 8,
      padding: '10px 8px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: 24, fontWeight: 700, fontFamily: 'Syne, sans-serif', color }}>{value}</div>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.45)', letterSpacing: 1, textTransform: 'uppercase', marginTop: 2 }}>{label}</div>
    </div>
  );
}

function HotspotCard({ hotspot, selected, onClick }: { hotspot: Hotspot; selected: boolean; onClick: () => void }) {
  const color = severityColors[hotspot.severity];

  return (
    <div
      onClick={onClick}
      style={{
        marginBottom: 8,
        padding: '12px 14px',
        background: selected
          ? `rgba(${hexToRgb(color)}, 0.12)`
          : 'rgba(255,255,255,0.03)',
        border: `1px solid ${selected ? `rgba(${hexToRgb(color)}, 0.4)` : 'rgba(255,255,255,0.06)'}`,
        borderRadius: 10,
        cursor: 'pointer',
        transition: 'all 0.2s',
        boxShadow: selected ? `0 0 16px rgba(${hexToRgb(color)}, 0.2)` : 'none',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#fff', fontFamily: 'Instrument Sans, sans-serif', marginBottom: 2 }}>
            {hotspot.name}
          </div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: `rgba(${hexToRgb(color)}, 0.12)`,
            border: `1px solid rgba(${hexToRgb(color)}, 0.3)`,
            borderRadius: 4,
            padding: '2px 6px',
          }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: color }} />
            <span style={{ fontSize: 10, fontWeight: 700, color, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              {hotspot.severity}
            </span>
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Syne, sans-serif', color, lineHeight: 1 }}>
            {hotspot.fillLevel}%
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 1 }}>capacity</div>
        </div>
      </div>

      {/* Fill bar */}
      <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 3, height: 4, overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${hotspot.fillLevel}%`,
            background: `linear-gradient(90deg, ${color}, ${color}CC)`,
            borderRadius: 3,
            boxShadow: `0 0 8px rgba(${hexToRgb(color)}, 0.5)`,
          }}
        />
      </div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
