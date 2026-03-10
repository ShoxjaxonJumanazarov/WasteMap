export type Severity = "critical" | "warning" | "normal";

export interface Hotspot {
  id: string;
  name: string;
  severity: Severity;
  fillLevel: number;
  lat: number;
  lng: number;
}

export const hotspots: Hotspot[] = [
  {
    id: "yunusobod-a",
    name: "Yunusobod Zone A",
    severity: "critical",
    fillLevel: 96,
    lat: 41.3423,
    lng: 69.304,
  },
  {
    id: "chilonzor",
    name: "Chilonzor District",
    severity: "warning",
    fillLevel: 74,
    lat: 41.291,
    lng: 69.215,
  },
  {
    id: "mirzo-ulugbek",
    name: "Mirzo Ulugbek",
    severity: "warning",
    fillLevel: 61,
    lat: 41.349,
    lng: 69.29,
  },
  {
    id: "sergeli",
    name: "Sergeli District",
    severity: "normal",
    fillLevel: 38,
    lat: 41.229,
    lng: 69.259,
  },
  {
    id: "shayxontohur",
    name: "Shayxontohur",
    severity: "normal",
    fillLevel: 29,
    lat: 41.319,
    lng: 69.258,
  },
  {
    id: "yakkasaroy",
    name: "Yakkasaroy",
    severity: "critical",
    fillLevel: 88,
    lat: 41.282,
    lng: 69.27,
  },
  {
    id: "olmazor",
    name: "Olmazor District",
    severity: "warning",
    fillLevel: 67,
    lat: 41.305,
    lng: 69.21,
  },
];

export interface ActivityEvent {
  id: number;
  text: string;
  severity: Severity;
  time: string;
}

export const activityEvents: ActivityEvent[] = [
  { id: 1, text: "Yunusobod Zone A reached 96% capacity", severity: "critical", time: "2 min ago" },
  { id: 2, text: "Dispatch team assigned to Yakkasaroy", severity: "critical", time: "5 min ago" },
  { id: 3, text: "Chilonzor fill level rising — now 74%", severity: "warning", time: "8 min ago" },
  { id: 4, text: "Olmazor District flagged for review", severity: "warning", time: "12 min ago" },
  { id: 5, text: "Sergeli collection completed successfully", severity: "normal", time: "18 min ago" },
  { id: 6, text: "Mirzo Ulugbek sensor recalibrated", severity: "warning", time: "25 min ago" },
  { id: 7, text: "Shayxontohur levels within normal range", severity: "normal", time: "31 min ago" },
  { id: 8, text: "New route optimized for Chilonzor area", severity: "normal", time: "42 min ago" },
  { id: 9, text: "Yakkasaroy emergency dispatch requested", severity: "critical", time: "55 min ago" },
  { id: 10, text: "System health check passed — all sensors online", severity: "normal", time: "1 hr ago" },
];

export const weeklyData = [
  { day: "Mon", collected: 42, reported: 28 },
  { day: "Tue", collected: 55, reported: 35 },
  { day: "Wed", collected: 38, reported: 22 },
  { day: "Thu", collected: 62, reported: 41 },
  { day: "Fri", collected: 48, reported: 30 },
  { day: "Sat", collected: 35, reported: 19 },
  { day: "Sun", collected: 28, reported: 14 },
];
