import type { NavTab } from "../App";

interface NavbarProps {
  activeNav: NavTab;
  setActiveNav: (tab: NavTab) => void;
}

const navItems: { key: NavTab; label: string }[] = [
  { key: "map", label: "Live Map" },
  { key: "analytics", label: "Analytics" },
  { key: "report", label: "Report" },
  { key: "routes", label: "Routes" },
];

export default function Navbar({ activeNav, setActiveNav }: NavbarProps) {
  return (
    <nav className="flex items-center justify-between px-4 lg:px-6 py-2.5 bg-bg-secondary border-b border-border shrink-0 z-50">
      {/* Logo */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00FFB2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>
        <h1 className="font-heading font-bold text-lg text-text-primary tracking-tight hidden sm:block">
          WasteMap <span className="text-accent">Pulse</span>
        </h1>
      </div>

      {/* Nav Pills */}
      <div className="flex items-center gap-1 bg-bg-primary rounded-lg p-1">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActiveNav(item.key)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
              activeNav === item.key
                ? "bg-accent/15 text-accent shadow-sm"
                : "text-text-secondary hover:text-text-primary hover:bg-bg-hover"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* LIVE badge */}
        <div className="flex items-center gap-2 bg-critical/10 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-critical animate-blink" />
          <span className="text-critical text-xs font-semibold tracking-wider">LIVE</span>
        </div>

        {/* City tag */}
        <div className="hidden md:flex items-center gap-1.5 text-text-secondary text-xs">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Tashkent · UZ</span>
        </div>
      </div>
    </nav>
  );
}
