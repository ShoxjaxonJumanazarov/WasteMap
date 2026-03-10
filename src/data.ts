export type Severity = 'critical' | 'warning' | 'normal';

export interface Hotspot {
  id: string;
  name: string;
  severity: Severity;
  fillLevel: number;
  lat: number;
  lng: number;
}

export const hotspots: Hotspot[] = [
  { id: '1', name: 'Yunusobod Zone A', severity: 'critical', fillLevel: 96, lat: 41.3423, lng: 69.3040 },
  { id: '2', name: 'Chilonzor District', severity: 'warning', fillLevel: 74, lat: 41.2910, lng: 69.2150 },
  { id: '3', name: 'Mirzo Ulugbek', severity: 'warning', fillLevel: 61, lat: 41.3490, lng: 69.2900 },
  { id: '4', name: 'Sergeli District', severity: 'normal', fillLevel: 38, lat: 41.2290, lng: 69.2590 },
  { id: '5', name: 'Shayxontohur', severity: 'normal', fillLevel: 29, lat: 41.3190, lng: 69.2580 },
  { id: '6', name: 'Yakkasaroy', severity: 'critical', fillLevel: 88, lat: 41.2820, lng: 69.2700 },
  { id: '7', name: 'Olmazor District', severity: 'warning', fillLevel: 67, lat: 41.3050, lng: 69.2100 },
];

export const activityFeed = [
  { id: 1, type: 'critical', text: 'Yunusobod Zone A reached 96% capacity', time: '2m ago' },
  { id: 2, type: 'warning', text: 'Collection route delayed — Chilonzor', time: '8m ago' },
  { id: 3, type: 'normal', text: 'Team dispatched to Yakkasaroy', time: '15m ago' },
  { id: 4, type: 'warning', text: 'Olmazor District approaching threshold', time: '23m ago' },
  { id: 5, type: 'normal', text: 'Sergeli District cleared — routine', time: '31m ago' },
  { id: 6, type: 'critical', text: 'Overflow alert: Yunusobod bin cluster B', time: '45m ago' },
  { id: 7, type: 'warning', text: 'Mirzo Ulugbek — sensor offline', time: '1h ago' },
  { id: 8, type: 'normal', text: 'Shayxontohur maintenance completed', time: '2h ago' },
];

export const weeklyData = [
  { day: 'Mon', collected: 42, missed: 8 },
  { day: 'Tue', collected: 55, missed: 5 },
  { day: 'Wed', collected: 48, missed: 12 },
  { day: 'Thu', collected: 61, missed: 4 },
  { day: 'Fri', collected: 53, missed: 7 },
  { day: 'Sat', collected: 38, missed: 3 },
  { day: 'Sun', collected: 29, missed: 2 },
];

export const severityColors: Record<Severity, string> = {
  critical: '#FF3B5C',
  warning: '#FF8C42',
  normal: '#00FFB2',
};
