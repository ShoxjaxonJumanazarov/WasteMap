import { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MapView from './components/MapView';
import RightPanel from './components/RightPanel';
import AlertPopup from './components/AlertPopup';
import BottomBar from './components/BottomBar';
import { hotspots } from './data';
import type { Hotspot } from './data';

export default function App() {
  const [activeView, setActiveView] = useState('Live Map');
  const [activeTab, setActiveTab] = useState('Activity');
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [alertHotspot, setAlertHotspot] = useState<Hotspot | null>(null);
  const [dataCount, setDataCount] = useState(12847);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const demoInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto alert on load after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setAlertHotspot(hotspots[0]);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // AI data counter: increment every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDataCount(prev => prev + Math.floor(Math.random() * 5) + 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectHotspot = useCallback((hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    setActiveView('Live Map');
  }, []);

  const handleMarkerClick = useCallback((hotspot: Hotspot) => {
    setSelectedHotspot(hotspot);
    if (hotspot.severity === 'critical') {
      setAlertHotspot(hotspot);
    }
  }, []);

  const runDemoStep = useCallback((step: number) => {
    switch (step % 4) {
      case 0:
        setActiveView('Live Map');
        setSelectedHotspot(null);
        setActiveTab('Activity');
        break;
      case 1:
        setActiveView('Live Map');
        setSelectedHotspot(hotspots.find(h => h.severity === 'critical') || null);
        break;
      case 2:
        setActiveView('Analytics');
        setActiveTab('Stats');
        break;
      case 3:
        setActiveView('Report');
        setActiveTab('Report');
        break;
    }
  }, []);

  const toggleDemo = useCallback(() => {
    if (isDemoRunning) {
      if (demoInterval.current) clearInterval(demoInterval.current);
      setIsDemoRunning(false);
      setDemoStep(0);
    } else {
      setIsDemoRunning(true);
      setDemoStep(0);
      runDemoStep(0);
      let step = 1;
      demoInterval.current = setInterval(() => {
        setDemoStep(step % 4);
        runDemoStep(step);
        step++;
      }, 5000);
    }
  }, [isDemoRunning, runDemoStep]);

  useEffect(() => {
    return () => {
      if (demoInterval.current) clearInterval(demoInterval.current);
    };
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: '#050A0E',
      overflow: 'hidden',
    }}>
      <Navbar activeView={activeView} onViewChange={setActiveView} />

      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        <Sidebar
          selectedHotspot={selectedHotspot}
          onSelectHotspot={handleSelectHotspot}
        />

        {/* Center Map */}
        <div style={{
          flex: 1,
          position: 'relative',
          display: (activeView === 'Analytics' || activeView === 'Report' || activeView === 'Routes') ? 'none' : 'flex',
        }}>
          <MapView
            selectedHotspot={selectedHotspot}
            onMarkerClick={handleMarkerClick}
            dataCount={dataCount}
          />
          {alertHotspot && (
            <AlertPopup
              hotspot={alertHotspot}
              onDismiss={() => setAlertHotspot(null)}
              onDispatch={() => setAlertHotspot(null)}
            />
          )}
        </div>

        {/* Analytics view */}
        {activeView === 'Analytics' && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050A0E', padding: 24 }}>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, color: '#00FFB2', fontWeight: 700, marginBottom: 8 }}>Analytics Dashboard</h2>
              <p style={{ fontSize: 14 }}>Detailed analytics available in the Stats tab on the right.</p>
            </div>
          </div>
        )}

        {/* Routes view */}
        {activeView === 'Routes' && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050A0E', padding: 24 }}>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🗺️</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, color: '#00FFB2', fontWeight: 700, marginBottom: 8 }}>Collection Routes</h2>
              <p style={{ fontSize: 14 }}>Route optimization for Tashkent waste collection teams.</p>
            </div>
          </div>
        )}

        {/* Report view */}
        {activeView === 'Report' && (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#050A0E', padding: 24 }}>
            <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.3)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
              <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 22, color: '#00FFB2', fontWeight: 700, marginBottom: 8 }}>Report Center</h2>
              <p style={{ fontSize: 14 }}>Use the Report tab on the right to submit a new waste incident.</p>
            </div>
          </div>
        )}

        <RightPanel activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <BottomBar
        isDemoRunning={isDemoRunning}
        onToggleDemo={toggleDemo}
        demoStep={demoStep}
      />
    </div>
  );
}
