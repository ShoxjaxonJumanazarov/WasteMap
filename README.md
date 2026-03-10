# WasteMap Pulse

Real-time waste monitoring dashboard for Tashkent, Uzbekistan.

![WasteMap Pulse](https://github.com/user-attachments/assets/b5ff0aa6-97c3-42dd-a9f2-94c9b79c04b1)

## Tech Stack

- **React 19** + **TypeScript** — UI framework
- **Vite** — build tool
- **Tailwind CSS v4** — utility-first styling
- **Leaflet / react-leaflet** — interactive map
- **Recharts** — data visualization charts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Features

- Dark futuristic theme with scanline overlay texture
- Live map centered on Tashkent with dark CartoDB tiles
- Pulsing animated markers colored by severity (critical / warning / normal)
- Left sidebar with city stats and scrollable hotspot cards
- Right panel with Activity Feed, Stats (weekly bar chart), and Report Form
- Click a hotspot card → map flies to that location
- Click a critical marker → alert popup with Dispatch / Snooze buttons
- Auto-alert popup after 2 seconds for the most critical zone
- AI data counter incrementing every 3 seconds
- Auto Demo mode that cycles through 4 views every 5 seconds
- Report form with location, issue type, severity, and description fields
