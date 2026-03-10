import type { Hotspot } from "../data/hotspots";

interface AlertPopupProps {
  hotspot: Hotspot;
  onDismiss: () => void;
  onDispatch: () => void;
}

export default function AlertPopup({ hotspot, onDismiss, onDispatch }: AlertPopupProps) {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] animate-slide-up">
      <div className="bg-bg-card/95 backdrop-blur-md border border-critical/30 rounded-xl p-4 shadow-2xl shadow-critical/10 min-w-[320px] max-w-[400px]">
        {/* Header */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-critical animate-blink" />
          <span className="font-heading font-bold text-sm text-critical uppercase tracking-wider">
            Critical Alert
          </span>
        </div>

        {/* Content */}
        <div className="mb-4">
          <h3 className="font-heading font-bold text-base text-text-primary mb-1">
            {hotspot.name}
          </h3>
          <p className="text-xs text-text-secondary leading-relaxed">
            Fill level at <span className="text-critical font-semibold">{hotspot.fillLevel}%</span> capacity.
            Immediate attention required. Overflow risk is imminent.
          </p>
        </div>

        {/* Progress */}
        <div className="w-full bg-bg-primary rounded-full h-1.5 mb-4">
          <div
            className="h-1.5 rounded-full bg-critical"
            style={{ width: `${hotspot.fillLevel}%` }}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={onDispatch}
            className="flex-1 py-2 rounded-lg bg-critical text-white text-xs font-semibold uppercase tracking-wider hover:bg-critical/90 active:scale-[0.98] transition-all"
          >
            Dispatch Team
          </button>
          <button
            onClick={onDismiss}
            className="flex-1 py-2 rounded-lg bg-bg-hover border border-border text-text-secondary text-xs font-semibold uppercase tracking-wider hover:text-text-primary hover:border-text-secondary/30 transition-all"
          >
            Snooze
          </button>
        </div>
      </div>
    </div>
  );
}
