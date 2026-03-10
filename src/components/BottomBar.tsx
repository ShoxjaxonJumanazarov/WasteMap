import { useState, useEffect, useRef, useCallback } from "react";
import type { Hotspot } from "../data/hotspots";
import type { NavTab } from "../App";

interface BottomBarProps {
  flyTo: (lat: number, lng: number, zoom?: number) => void;
  setActiveNav: (tab: NavTab) => void;
  setRightTab: (tab: "feed" | "stats" | "report") => void;
  hotspots: Hotspot[];
}

const DEMO_STEPS = [
  { label: "Overview", navTab: "map" as NavTab, rightTab: "feed" as const },
  { label: "Critical Zone", navTab: "map" as NavTab, rightTab: "feed" as const },
  { label: "Analytics", navTab: "analytics" as NavTab, rightTab: "stats" as const },
  { label: "Report", navTab: "report" as NavTab, rightTab: "report" as const },
];

export default function BottomBar({ flyTo, setActiveNav, setRightTab, hotspots }: BottomBarProps) {
  const [demoActive, setDemoActive] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const runStep = useCallback(
    (step: number) => {
      const current = DEMO_STEPS[step];
      setActiveNav(current.navTab);
      setRightTab(current.rightTab);

      if (step === 0) {
        flyTo(41.2995, 69.2401, 12);
      } else if (step === 1) {
        const critical = hotspots.find((h) => h.severity === "critical");
        if (critical) {
          flyTo(critical.lat, critical.lng, 15);
        }
      }
    },
    [flyTo, setActiveNav, setRightTab, hotspots]
  );

  const startDemo = useCallback(() => {
    setDemoActive(true);
    setDemoStep(0);
    runStep(0);

    intervalRef.current = setInterval(() => {
      setDemoStep((prev) => {
        const next = (prev + 1) % DEMO_STEPS.length;
        runStep(next);
        return next;
      });
    }, 5000);
  }, [runStep]);

  const stopDemo = useCallback(() => {
    setDemoActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-between px-4 py-1.5 bg-bg-secondary border-t border-border shrink-0 z-50">
      {/* Left */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-text-secondary">
          {hotspots.length} zones monitored
        </span>
        <span className="w-1 h-1 rounded-full bg-border" />
        <span className="text-[10px] text-text-secondary">
          All sensors online
        </span>
      </div>

      {/* Center - Demo */}
      <div className="flex items-center gap-2">
        {demoActive && (
          <div className="flex items-center gap-1.5 mr-2">
            {DEMO_STEPS.map((_step, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === demoStep ? "bg-accent scale-125" : "bg-border"
                }`}
              />
            ))}
            <span className="text-[10px] text-accent ml-1.5 font-medium">
              {DEMO_STEPS[demoStep].label}
            </span>
          </div>
        )}
        <button
          onClick={demoActive ? stopDemo : startDemo}
          className={`px-3 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider transition-all ${
            demoActive
              ? "bg-critical/15 text-critical border border-critical/30 hover:bg-critical/25"
              : "bg-accent/15 text-accent border border-accent/30 hover:bg-accent/25"
          }`}
        >
          {demoActive ? "Stop Demo" : "Auto Demo"}
        </button>
      </div>

      {/* Right */}
      <div className="text-[10px] text-text-secondary">
        WasteMap Pulse v1.0
      </div>
    </div>
  );
}
