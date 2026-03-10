import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { activityEvents, weeklyData } from "../data/hotspots";
import type { Severity } from "../data/hotspots";
import type { NavTab } from "../App";

interface RightPanelProps {
  activeTab: "feed" | "stats" | "report";
  setActiveTab: (tab: "feed" | "stats" | "report") => void;
  activeNav: NavTab;
}

function dotColor(severity: Severity): string {
  switch (severity) {
    case "critical": return "bg-critical";
    case "warning": return "bg-warning";
    case "normal": return "bg-normal";
  }
}

function ActivityFeed() {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {activityEvents.map((event) => (
        <div
          key={event.id}
          className="flex items-start gap-2.5 p-2.5 rounded-lg bg-bg-card border border-border hover:bg-bg-hover transition-colors"
        >
          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColor(event.severity)}`} />
          <div className="min-w-0">
            <p className="text-xs text-text-primary leading-relaxed">{event.text}</p>
            <span className="text-[10px] text-text-secondary">{event.time}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function StatsTab() {
  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-4">
      {/* Weekly Chart */}
      <div>
        <h4 className="font-heading text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
          Weekly Collection
        </h4>
        <div className="h-40 bg-bg-card rounded-lg border border-border p-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1A2A38" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: "#6B8A99" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#6B8A99" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "#0D1720",
                  border: "1px solid #1A2A38",
                  borderRadius: "8px",
                  fontSize: "11px",
                  color: "#E8F0F2",
                }}
              />
              <Bar dataKey="collected" fill="#00FFB2" radius={[3, 3, 0, 0]} />
              <Bar dataKey="reported" fill="#FF8C42" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Collection Efficiency */}
      <div className="bg-bg-card rounded-lg border border-border p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-secondary">Collection Efficiency</span>
          <span className="text-sm font-heading font-bold text-accent">87%</span>
        </div>
        <div className="w-full bg-bg-primary rounded-full h-2">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-accent/60 to-accent progress-shimmer"
            style={{ width: "87%" }}
          />
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-bg-card rounded-lg border border-border p-3">
        <span className="text-xs text-text-secondary">Avg Response Time</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-2xl font-heading font-bold text-warning">18</span>
          <span className="text-xs text-text-secondary">min</span>
        </div>
      </div>
    </div>
  );
}

function ReportForm() {
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState("");
  const [issueType, setIssueType] = useState("");
  const [severity, setSeverity] = useState<"critical" | "warning" | "low">("warning");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setLocation("");
      setIssueType("");
      setSeverity("warning");
      setDescription("");
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-3 space-y-3">
      {/* Location */}
      <div>
        <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold mb-1 block">
          Location
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-bg-card border border-border rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-accent/50 transition"
        >
          <option value="">Select zone...</option>
          <option value="yunusobod">Yunusobod Zone A</option>
          <option value="chilonzor">Chilonzor District</option>
          <option value="mirzo-ulugbek">Mirzo Ulugbek</option>
          <option value="sergeli">Sergeli District</option>
          <option value="shayxontohur">Shayxontohur</option>
          <option value="yakkasaroy">Yakkasaroy</option>
          <option value="olmazor">Olmazor District</option>
        </select>
      </div>

      {/* Issue Type */}
      <div>
        <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold mb-1 block">
          Issue Type
        </label>
        <select
          value={issueType}
          onChange={(e) => setIssueType(e.target.value)}
          className="w-full bg-bg-card border border-border rounded-lg px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-accent/50 transition"
        >
          <option value="">Select issue...</option>
          <option value="overflow">Container Overflow</option>
          <option value="damage">Container Damage</option>
          <option value="illegal">Illegal Dumping</option>
          <option value="odor">Strong Odor</option>
          <option value="blocked">Blocked Access</option>
        </select>
      </div>

      {/* Severity Selector */}
      <div>
        <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold mb-1.5 block">
          Severity
        </label>
        <div className="flex gap-2">
          {(["critical", "warning", "low"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSeverity(s)}
              className={`flex-1 py-1.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border transition-all ${
                severity === s
                  ? s === "critical"
                    ? "bg-critical/20 border-critical/50 text-critical"
                    : s === "warning"
                    ? "bg-warning/20 border-warning/50 text-warning"
                    : "bg-normal/20 border-normal/50 text-normal"
                  : "bg-bg-card border-border text-text-secondary hover:bg-bg-hover"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="text-[10px] text-text-secondary uppercase tracking-wider font-semibold mb-1 block">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Describe the issue..."
          className="w-full bg-bg-card border border-border rounded-lg px-3 py-2 text-xs text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent/50 transition resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className={`w-full py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
          submitted
            ? "bg-accent/20 text-accent border border-accent/30"
            : "bg-accent text-bg-primary hover:bg-accent/90 active:scale-[0.98]"
        }`}
      >
        {submitted ? "✓ Submitted!" : "Submit Report"}
      </button>
    </form>
  );
}

export default function RightPanel({ activeTab, setActiveTab, activeNav }: RightPanelProps) {
  // If activeNav is "analytics", show stats. If "report", show report form
  const effectiveTab = activeNav === "analytics" ? "stats" : activeNav === "report" ? "report" : activeTab;

  return (
    <aside className="w-[260px] lg:w-[280px] bg-bg-secondary border-l border-border flex flex-col shrink-0 hidden lg:flex">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {(["feed", "stats", "report"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2.5 text-[10px] font-semibold uppercase tracking-wider transition-all ${
              effectiveTab === tab
                ? "text-accent border-b-2 border-accent"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab === "feed" ? "Activity" : tab === "stats" ? "Stats" : "Report"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {effectiveTab === "feed" && <ActivityFeed />}
      {effectiveTab === "stats" && <StatsTab />}
      {effectiveTab === "report" && <ReportForm />}
    </aside>
  );
}
