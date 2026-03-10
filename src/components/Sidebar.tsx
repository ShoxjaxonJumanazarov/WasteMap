import type { Hotspot, Severity } from "../data/hotspots";

interface SidebarProps {
  hotspots: Hotspot[];
  selectedHotspot: Hotspot | null;
  onHotspotClick: (hotspot: Hotspot) => void;
}

function severityColor(severity: Severity): string {
  switch (severity) {
    case "critical": return "text-critical";
    case "warning": return "text-warning";
    case "normal": return "text-normal";
  }
}

function severityBg(severity: Severity): string {
  switch (severity) {
    case "critical": return "bg-critical/10 border-critical/30";
    case "warning": return "bg-warning/10 border-warning/30";
    case "normal": return "bg-normal/10 border-normal/30";
  }
}

function severityBarColor(severity: Severity): string {
  switch (severity) {
    case "critical": return "bg-critical";
    case "warning": return "bg-warning";
    case "normal": return "bg-normal";
  }
}

export default function Sidebar({ hotspots, selectedHotspot, onHotspotClick }: SidebarProps) {
  const critical = hotspots.filter((h) => h.severity === "critical").length;
  const warning = hotspots.filter((h) => h.severity === "warning").length;
  const normal = hotspots.filter((h) => h.severity === "normal").length;

  return (
    <aside className="w-[280px] lg:w-[300px] bg-bg-secondary border-r border-border flex flex-col shrink-0 hidden md:flex">
      {/* City Stats */}
      <div className="p-4 border-b border-border">
        <h2 className="font-heading font-semibold text-sm text-text-secondary mb-3 uppercase tracking-wider">
          City Overview
        </h2>
        <div className="grid grid-cols-3 gap-2">
          <StatBox count={critical} label="Critical" color="text-critical" bg="bg-critical/10" />
          <StatBox count={warning} label="Warning" color="text-warning" bg="bg-warning/10" />
          <StatBox count={normal} label="Normal" color="text-normal" bg="bg-normal/10" />
        </div>
      </div>

      {/* Hotspot Cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <h3 className="font-heading text-xs font-semibold text-text-secondary uppercase tracking-wider px-1 mb-2">
          Hotspot Zones
        </h3>
        {hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            onClick={() => onHotspotClick(hotspot)}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
              selectedHotspot?.id === hotspot.id
                ? `${severityBg(hotspot.severity)} border-opacity-60`
                : "bg-bg-card border-border hover:border-border hover:bg-bg-hover"
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-medium text-text-primary truncate mr-2">
                {hotspot.name}
              </span>
              <span className={`text-xs font-semibold uppercase ${severityColor(hotspot.severity)}`}>
                {hotspot.severity}
              </span>
            </div>
            <div className="w-full bg-bg-primary rounded-full h-1.5 mb-1">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ${severityBarColor(hotspot.severity)}`}
                style={{ width: `${hotspot.fillLevel}%` }}
              />
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] text-text-secondary">Fill Level</span>
              <span className={`text-[10px] font-semibold ${severityColor(hotspot.severity)}`}>
                {hotspot.fillLevel}%
              </span>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}

function StatBox({ count, label, color, bg }: { count: number; label: string; color: string; bg: string }) {
  return (
    <div className={`${bg} rounded-lg p-2.5 text-center`}>
      <div className={`text-xl font-heading font-bold ${color}`}>{count}</div>
      <div className="text-[10px] text-text-secondary font-medium">{label}</div>
    </div>
  );
}
