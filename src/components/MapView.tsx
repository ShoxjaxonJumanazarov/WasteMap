import { useEffect, useState, type MutableRefObject } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { Map as LeafletMap } from "leaflet";
import type { Hotspot } from "../data/hotspots";
import { createRoot } from "react-dom/client";

const TASHKENT_CENTER: [number, number] = [41.2995, 69.2401];
const DEFAULT_ZOOM = 12;

interface MapViewProps {
  hotspots: Hotspot[];
  selectedHotspot: Hotspot | null;
  onMarkerClick: (hotspot: Hotspot) => void;
  mapRef: MutableRefObject<LeafletMap | null>;
}

function createMarkerIcon(severity: string): L.DivIcon {
  const sizeMap: Record<string, number> = {
    critical: 40,
    warning: 32,
    normal: 24,
  };
  const size = sizeMap[severity] || 24;

  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    html: `<div class="marker-container marker-${severity}" style="width:${size}px;height:${size}px;">
      <div class="marker-ring ring-1"></div>
      <div class="marker-ring ring-2"></div>
      <div class="marker-ring ring-3"></div>
      <div class="marker-dot"></div>
    </div>`,
  });
}

function MapMarkers({
  hotspots,
  onMarkerClick,
}: {
  hotspots: Hotspot[];
  onMarkerClick: (hotspot: Hotspot) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const markers: L.Marker[] = [];

    hotspots.forEach((hotspot) => {
      const icon = createMarkerIcon(hotspot.severity);
      const marker = L.marker([hotspot.lat, hotspot.lng], { icon }).addTo(map);

      const popupContent = document.createElement("div");
      const root = createRoot(popupContent);
      root.render(
        <div style={{
          background: "#0D1720",
          color: "#E8F0F2",
          padding: "12px",
          borderRadius: "8px",
          minWidth: "180px",
          fontFamily: "Instrument Sans, sans-serif",
        }}>
          <div style={{
            fontFamily: "Syne, sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            marginBottom: "6px",
          }}>
            {hotspot.name}
          </div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#6B8A99",
          }}>
            <span>Fill Level</span>
            <span style={{
              color: hotspot.severity === "critical" ? "#FF3B5C"
                : hotspot.severity === "warning" ? "#FF8C42" : "#00FFB2",
              fontWeight: 600,
            }}>
              {hotspot.fillLevel}%
            </span>
          </div>
          <div style={{
            width: "100%",
            height: "4px",
            background: "#050A0E",
            borderRadius: "2px",
            marginTop: "6px",
          }}>
            <div style={{
              width: `${hotspot.fillLevel}%`,
              height: "100%",
              borderRadius: "2px",
              background: hotspot.severity === "critical" ? "#FF3B5C"
                : hotspot.severity === "warning" ? "#FF8C42" : "#00FFB2",
            }} />
          </div>
        </div>
      );

      marker.bindPopup(popupContent, {
        className: "custom-popup",
        closeButton: false,
      });

      marker.on("click", () => onMarkerClick(hotspot));
      markers.push(marker);
    });

    return () => {
      markers.forEach((m) => m.remove());
    };
  }, [map, hotspots, onMarkerClick]);

  return null;
}

function MapRefSetter({ mapRef }: { mapRef: MutableRefObject<LeafletMap | null> }) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);
  return null;
}

function AICounter() {
  const [count, setCount] = useState(12847);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-3 right-3 z-[1000] bg-bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 flex items-center gap-2">
      <div className="w-2 h-2 rounded-full bg-accent animate-blink" />
      <span className="text-xs text-text-secondary font-medium">AI Processing</span>
      <span className="text-sm font-heading font-bold text-accent glow-text">
        {count.toLocaleString()} data pts
      </span>
    </div>
  );
}

export default function MapView({ hotspots, selectedHotspot: _selectedHotspot, onMarkerClick, mapRef }: MapViewProps) {
  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={TASHKENT_CENTER}
        zoom={DEFAULT_ZOOM}
        className="w-full h-full"
        zoomControl={true}
        attributionControl={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />
        <MapMarkers hotspots={hotspots} onMarkerClick={onMarkerClick} />
        <MapRefSetter mapRef={mapRef} />
      </MapContainer>
      <AICounter />
    </div>
  );
}
