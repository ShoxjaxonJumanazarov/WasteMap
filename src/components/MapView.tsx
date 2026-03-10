import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { hotspots, severityColors } from '../data';
import type { Hotspot } from '../data';

interface MapProps {
  selectedHotspot: Hotspot | null;
  onMarkerClick: (hotspot: Hotspot) => void;
  dataCount: number;
}

// FlyTo controller
function FlyToController({ hotspot }: { hotspot: Hotspot | null }) {
  const map = useMap();
  const prevId = useRef<string | null>(null);

  useEffect(() => {
    if (hotspot && hotspot.id !== prevId.current) {
      prevId.current = hotspot.id;
      map.flyTo([hotspot.lat, hotspot.lng], 15, { animate: true, duration: 1.5 });
    }
  }, [hotspot, map]);

  return null;
}

// Custom pulsing marker
function createMarkerIcon(severity: Hotspot['severity']): L.DivIcon {
  const color = severityColors[severity];
  const size = severity === 'critical' ? 18 : severity === 'warning' ? 14 : 11;
  const glowColor = color;

  const html = `
    <div class="marker-container" style="width:${size * 3}px; height:${size * 3}px; position:relative; display:flex; align-items:center; justify-content:center;">
      <div class="pulse-ring" style="
        position:absolute;
        width:${size * 2.5}px; height:${size * 2.5}px;
        border-radius:50%;
        border:2px solid ${glowColor};
        opacity:0;
        transform-origin:center;
      "></div>
      <div class="pulse-ring pulse-ring-2" style="
        position:absolute;
        width:${size * 2}px; height:${size * 2}px;
        border-radius:50%;
        border:2px solid ${glowColor};
        opacity:0;
        transform-origin:center;
      "></div>
      <div class="pulse-ring pulse-ring-3" style="
        position:absolute;
        width:${size * 1.5}px; height:${size * 1.5}px;
        border-radius:50%;
        border:2px solid ${glowColor};
        opacity:0;
        transform-origin:center;
      "></div>
      <div style="
        width:${size}px; height:${size}px;
        border-radius:50%;
        background:${glowColor};
        box-shadow: 0 0 ${size}px ${glowColor}, 0 0 ${size * 2}px ${glowColor}80;
        position:relative;
        z-index:1;
        cursor:pointer;
      "></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: '',
    iconSize: [size * 3, size * 3],
    iconAnchor: [(size * 3) / 2, (size * 3) / 2],
  });
}

// Map markers component
function Markers({ onMarkerClick }: { onMarkerClick: (hotspot: Hotspot) => void }) {
  const map = useMap();
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    hotspots.forEach(hotspot => {
      const icon = createMarkerIcon(hotspot.severity);
      const marker = L.marker([hotspot.lat, hotspot.lng], { icon });

      marker.addTo(map);
      marker.on('click', () => onMarkerClick(hotspot));

      // Tooltip
      marker.bindTooltip(`
        <div style="font-family:'Instrument Sans',sans-serif; font-size:12px; font-weight:600; color:#fff; background:#0D1B24; border:1px solid ${severityColors[hotspot.severity]}; padding:6px 10px; border-radius:6px; white-space:nowrap;">
          <span style="color:${severityColors[hotspot.severity]}">${hotspot.severity.toUpperCase()}</span> · ${hotspot.name}<br/>
          <span style="color:rgba(255,255,255,0.6)">Fill: ${hotspot.fillLevel}%</span>
        </div>
      `, {
        permanent: false,
        direction: 'top',
        offset: [0, -10],
        opacity: 1,
        className: 'custom-tooltip',
      });

      markersRef.current.push(marker);
    });

    return () => {
      markersRef.current.forEach(m => m.remove());
    };
  }, [map, onMarkerClick]);

  return null;
}

export default function MapView({ selectedHotspot, onMarkerClick, dataCount }: MapProps) {
  const [mapReady, setMapReady] = useState(false);

  return (
    <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <MapContainer
        center={[41.2995, 69.2401]}
        zoom={12}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
        whenReady={() => setMapReady(true)}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />
        {mapReady && (
          <>
            <FlyToController hotspot={selectedHotspot} />
            <Markers onMarkerClick={onMarkerClick} />
          </>
        )}
      </MapContainer>

      {/* AI Data Counter */}
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        background: 'rgba(5,10,14,0.9)',
        border: '1px solid rgba(0,255,178,0.3)',
        borderRadius: 8,
        padding: '8px 14px',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
      }}>
        <div style={{ fontSize: 10, color: 'rgba(0,255,178,0.7)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 }}>AI Processed</div>
        <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Syne, sans-serif', color: '#00FFB2' }}>
          {dataCount.toLocaleString()} <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>data pts</span>
        </div>
      </div>

      {/* Zoom controls replacement */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}>
        {/* Zoom controls are handled by Leaflet */}
      </div>

      {/* Map label */}
      <div style={{
        position: 'absolute',
        bottom: 16,
        left: 16,
        background: 'rgba(5,10,14,0.8)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 6,
        padding: '4px 10px',
        zIndex: 1000,
        fontSize: 11,
        color: 'rgba(255,255,255,0.4)',
      }}>
        © CartoDB · OpenStreetMap
      </div>
    </div>
  );
}
