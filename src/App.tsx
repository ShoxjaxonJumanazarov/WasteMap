import { useState, useCallback, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MapView from "./components/MapView";
import RightPanel from "./components/RightPanel";
import AlertPopup from "./components/AlertPopup";
import BottomBar from "./components/BottomBar";
import type { Hotspot } from "./data/hotspots";
import { hotspots } from "./data/hotspots";
import type { Map as LeafletMap } from "leaflet";

export type NavTab = "map" | "analytics" | "report" | "routes";

export default function App() {
  const [activeNav, setActiveNav] = useState<NavTab>("map");
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [alertHotspot, setAlertHotspot] = useState<Hotspot | null>(null);
  const [rightTab, setRightTab] = useState<"feed" | "stats" | "report">("feed");
  const mapRef = useRef<LeafletMap | null>(null);

  const flyTo = useCallback(
    (lat: number, lng: number, zoom = 15) => {
      mapRef.current?.flyTo([lat, lng], zoom, { duration: 1.5 });
    },
    []
  );

  const handleHotspotClick = useCallback(
    (hotspot: Hotspot) => {
      setSelectedHotspot(hotspot);
      flyTo(hotspot.lat, hotspot.lng, 15);
      if (hotspot.severity === "critical") {
        setAlertHotspot(hotspot);
      }
    },
    [flyTo]
  );

  const handleMarkerClick = useCallback(
    (hotspot: Hotspot) => {
      setSelectedHotspot(hotspot);
      if (hotspot.severity === "critical") {
        setAlertHotspot(hotspot);
      }
    },
    []
  );

  // Auto-alert for Yunusobod Zone A after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      const yunusobod = hotspots.find((h) => h.id === "yunusobod-a");
      if (yunusobod) {
        setAlertHotspot(yunusobod);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-bg-primary overflow-hidden">
      {/* Scanline overlay */}
      <div className="scanline-overlay" />

      {/* Navbar */}
      <Navbar activeNav={activeNav} setActiveNav={setActiveNav} />

      {/* Main content */}
      <div className="flex flex-1 min-h-0">
        {/* Left Sidebar */}
        <Sidebar
          hotspots={hotspots}
          selectedHotspot={selectedHotspot}
          onHotspotClick={handleHotspotClick}
        />

        {/* Center Map */}
        <div className="flex-1 relative min-w-0">
          <MapView
            hotspots={hotspots}
            selectedHotspot={selectedHotspot}
            onMarkerClick={handleMarkerClick}
            mapRef={mapRef}
          />

          {/* Alert Popup */}
          {alertHotspot && (
            <AlertPopup
              hotspot={alertHotspot}
              onDismiss={() => setAlertHotspot(null)}
              onDispatch={() => setAlertHotspot(null)}
            />
          )}
        </div>

        {/* Right Panel */}
        <RightPanel
          activeTab={rightTab}
          setActiveTab={setRightTab}
          activeNav={activeNav}
        />
      </div>

      {/* Bottom Bar */}
      <BottomBar
        flyTo={flyTo}
        setActiveNav={setActiveNav}
        setRightTab={setRightTab}
        hotspots={hotspots}
      />
    </div>
  );
}
