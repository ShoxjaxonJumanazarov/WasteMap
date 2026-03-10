import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { activityFeed, weeklyData, hotspots } from '../data';

interface RightPanelProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = ['Activity', 'Stats', 'Report'];

export default function RightPanel({ activeTab, onTabChange }: RightPanelProps) {
  return (
    <aside style={{
      width: 280,
      background: 'rgba(5,10,14,0.98)',
      borderLeft: '1px solid rgba(0,255,178,0.1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      flexShrink: 0,
    }}>
      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '8px 12px 0',
        gap: 4,
      }}>
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            style={{
              flex: 1,
              padding: '8px 4px',
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab ? '#00FFB2' : 'transparent'}`,
              color: activeTab === tab ? '#00FFB2' : 'rgba(255,255,255,0.4)',
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 600,
              fontSize: 12,
              cursor: 'pointer',
              transition: 'all 0.2s',
              letterSpacing: 0.5,
            }}
          >
            {tab === 'Activity' ? 'Activity Feed' : tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        {activeTab === 'Activity' && <ActivityFeed />}
        {activeTab === 'Stats' && <StatsTab />}
        {activeTab === 'Report' && <ReportForm />}
      </div>
    </aside>
  );
}

function ActivityFeed() {
  const colorMap: Record<string, string> = {
    critical: '#FF3B5C',
    warning: '#FF8C42',
    normal: '#00FFB2',
  };

  return (
    <div style={{ padding: '12px 8px', overflowY: 'auto', height: '100%' }}>
      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', padding: '0 8px', marginBottom: 8 }}>
        Recent Events
      </p>
      {activityFeed.map(event => (
        <div key={event.id} style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          padding: '10px',
          marginBottom: 4,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.02)',
          borderLeft: `3px solid ${colorMap[event.type]}`,
        }}>
          <div style={{
            width: 7,
            height: 7,
            borderRadius: '50%',
            background: colorMap[event.type],
            marginTop: 4,
            flexShrink: 0,
            boxShadow: `0 0 6px ${colorMap[event.type]}`,
          }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)', lineHeight: 1.4, margin: 0, marginBottom: 4 }}>
              {event.text}
            </p>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontWeight: 500 }}>{event.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsTab() {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: '#0D1B24',
          border: '1px solid rgba(0,255,178,0.2)',
          borderRadius: 6,
          padding: '8px 12px',
          fontSize: 11,
        }}>
          <p style={{ color: '#fff', fontWeight: 600, margin: '0 0 4px' }}>{label}</p>
          <p style={{ color: '#00FFB2', margin: '0 0 2px' }}>Collected: {payload[0]?.value}</p>
          <p style={{ color: '#FF3B5C', margin: 0 }}>Missed: {payload[1]?.value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: '12px', overflowY: 'auto', height: '100%' }}>
      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
        Weekly Overview
      </p>

      {/* Bar chart */}
      <div style={{ height: 150, marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData} margin={{ top: 0, right: 4, left: -24, bottom: 0 }}>
            <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.35)', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar dataKey="collected" fill="#00FFB2" radius={[3, 3, 0, 0]} maxBarSize={18}>
              {weeklyData.map((_, index) => (
                <Cell key={index} fill="#00FFB2" fillOpacity={0.8} />
              ))}
            </Bar>
            <Bar dataKey="missed" fill="#FF3B5C" radius={[3, 3, 0, 0]} maxBarSize={18}>
              {weeklyData.map((_, index) => (
                <Cell key={index} fill="#FF3B5C" fillOpacity={0.7} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: '#00FFB2' }} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Collected</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: '#FF3B5C' }} />
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Missed</span>
        </div>
      </div>

      {/* Collection Efficiency */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>Collection Efficiency</span>
          <span style={{ fontSize: 13, fontWeight: 700, fontFamily: 'Syne, sans-serif', color: '#00FFB2' }}>87%</span>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 3, height: 6, overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: '87%',
            background: 'linear-gradient(90deg, #00FFB2, #00CC8E)',
            borderRadius: 3,
            boxShadow: '0 0 8px rgba(0,255,178,0.4)',
          }} />
        </div>
      </div>

      {/* Response Time */}
      <div style={{
        background: 'rgba(255,140,66,0.08)',
        border: '1px solid rgba(255,140,66,0.2)',
        borderRadius: 10,
        padding: '12px 14px',
        marginBottom: 12,
      }}>
        <div style={{ fontSize: 10, color: 'rgba(255,140,66,0.8)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>Avg Response Time</div>
        <div style={{ fontFamily: 'Syne, sans-serif', fontSize: 26, fontWeight: 700, color: '#FF8C42' }}>18 <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}>min</span></div>
      </div>

      {/* Zone breakdown */}
      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
        Zone Levels
      </p>
      {hotspots.slice(0, 4).map(h => (
        <div key={h.id} style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{h.name.split(' ').slice(0, 2).join(' ')}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: { critical: '#FF3B5C', warning: '#FF8C42', normal: '#00FFB2' }[h.severity] }}>{h.fillLevel}%</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 2, height: 3 }}>
            <div style={{ height: '100%', width: `${h.fillLevel}%`, background: { critical: '#FF3B5C', warning: '#FF8C42', normal: '#00FFB2' }[h.severity], borderRadius: 2 }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function ReportForm() {
  const [submitted, setSubmitted] = useState(false);
  const [severity, setSeverity] = useState('');
  const [location, setLocation] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSeverity('');
      setLocation('');
      setIssueType('');
      setDescription('');
    }, 2000);
  };

  const selectStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: '#fff',
    padding: '9px 12px',
    fontSize: 12,
    fontFamily: 'Instrument Sans, sans-serif',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none' as const,
    WebkitAppearance: 'none' as const,
  };

  const labelStyle = {
    display: 'block',
    fontSize: 10,
    fontWeight: 600,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1,
    textTransform: 'uppercase' as const,
    marginBottom: 6,
  };

  return (
    <div style={{ padding: '12px', overflowY: 'auto', height: '100%' }}>
      <p style={{ fontFamily: 'Syne, sans-serif', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
        Submit Report
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Location</label>
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            style={selectStyle}
            required
          >
            <option value="" style={{ background: '#0D1B24' }}>Select location…</option>
            {hotspots.map(h => (
              <option key={h.id} value={h.id} style={{ background: '#0D1B24' }}>{h.name}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Issue Type</label>
          <select
            value={issueType}
            onChange={e => setIssueType(e.target.value)}
            style={selectStyle}
            required
          >
            <option value="" style={{ background: '#0D1B24' }}>Select issue…</option>
            <option value="overflow" style={{ background: '#0D1B24' }}>Overflow</option>
            <option value="missed-collection" style={{ background: '#0D1B24' }}>Missed Collection</option>
            <option value="sensor-malfunction" style={{ background: '#0D1B24' }}>Sensor Malfunction</option>
            <option value="illegal-dumping" style={{ background: '#0D1B24' }}>Illegal Dumping</option>
            <option value="route-obstruction" style={{ background: '#0D1B24' }}>Route Obstruction</option>
          </select>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={labelStyle}>Severity</label>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['Critical', 'Warning', 'Low'] as const).map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setSeverity(s)}
                style={{
                  flex: 1,
                  padding: '7px 4px',
                  borderRadius: 6,
                  border: `1px solid ${severity === s
                    ? s === 'Critical' ? '#FF3B5C' : s === 'Warning' ? '#FF8C42' : '#00FFB2'
                    : 'rgba(255,255,255,0.1)'}`,
                  background: severity === s
                    ? s === 'Critical' ? 'rgba(255,59,92,0.15)' : s === 'Warning' ? 'rgba(255,140,66,0.15)' : 'rgba(0,255,178,0.1)'
                    : 'rgba(255,255,255,0.03)',
                  color: severity === s
                    ? s === 'Critical' ? '#FF3B5C' : s === 'Warning' ? '#FF8C42' : '#00FFB2'
                    : 'rgba(255,255,255,0.4)',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the issue in detail…"
            rows={3}
            style={{
              ...selectStyle,
              resize: 'none',
              lineHeight: 1.5,
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '11px',
            borderRadius: 8,
            background: submitted
              ? 'rgba(0,255,178,0.15)'
              : 'linear-gradient(135deg, #00FFB2, #00CC8E)',
            color: submitted ? '#00FFB2' : '#050A0E',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 13,
            cursor: 'pointer',
            transition: 'all 0.3s',
            boxShadow: submitted ? '0 0 20px rgba(0,255,178,0.3)' : '0 4px 16px rgba(0,255,178,0.3)',
            border: submitted ? '1px solid rgba(0,255,178,0.4)' : 'none',
          } as React.CSSProperties}
        >
          {submitted ? '✓ Submitted!' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}
