interface BottomBarProps {
  isDemoRunning: boolean;
  onToggleDemo: () => void;
  demoStep: number;
}

const demoSteps = ['Overview', 'Zoom Critical', 'Analytics', 'Report'];

export default function BottomBar({ isDemoRunning, onToggleDemo, demoStep }: BottomBarProps) {
  return (
    <div style={{
      height: 44,
      background: 'rgba(5,10,14,0.97)',
      borderTop: '1px solid rgba(0,255,178,0.08)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 16px',
      flexShrink: 0,
    }}>
      {/* Left: system info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00FFB2', boxShadow: '0 0 6px #00FFB2' }} />
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontFamily: 'Instrument Sans, sans-serif' }}>
            System Online
          </span>
        </div>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>|</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>7 sensors active</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>|</span>
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Last sync: just now</span>
      </div>

      {/* Center: demo step indicators */}
      {isDemoRunning && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {demoSteps.map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: i === demoStep ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === demoStep ? '#00FFB2' : 'rgba(255,255,255,0.1)',
                transition: 'all 0.4s',
                boxShadow: i === demoStep ? '0 0 8px #00FFB2' : 'none',
              }} />
              {i === demoStep && (
                <span style={{ fontSize: 10, color: '#00FFB2', fontWeight: 600, letterSpacing: 0.5 }}>{step}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Right: Auto Demo button */}
      <button
        onClick={onToggleDemo}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          padding: '6px 14px',
          borderRadius: 6,
          border: `1px solid ${isDemoRunning ? 'rgba(0,255,178,0.4)' : 'rgba(255,255,255,0.1)'}`,
          background: isDemoRunning ? 'rgba(0,255,178,0.08)' : 'rgba(255,255,255,0.03)',
          color: isDemoRunning ? '#00FFB2' : 'rgba(255,255,255,0.5)',
          fontFamily: 'Instrument Sans, sans-serif',
          fontWeight: 600,
          fontSize: 11,
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        {isDemoRunning ? (
          <>
            <div style={{ width: 8, height: 8, background: '#00FFB2', borderRadius: 2 }} />
            Stop Demo
          </>
        ) : (
          <>
            <div style={{
              width: 0,
              height: 0,
              borderLeft: '7px solid rgba(255,255,255,0.4)',
              borderTop: '4px solid transparent',
              borderBottom: '4px solid transparent',
            }} />
            Auto Demo
          </>
        )}
      </button>
    </div>
  );
}
