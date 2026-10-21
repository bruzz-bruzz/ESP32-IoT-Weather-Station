# Weather Station Dashboard

This is a responsive React-based dashboard designed to visualize real-time environmental data collected by the IoT weather station.

## How It Works
- **Tech Stack:** Built with React, Vite, TypeScript, and Tailwind CSS.
- **Data Visualization:** Uses `Chart.js` for rendering interactive line graphs of sensor data (temperature, humidity, pressure, etc.).
- **Data Flow:** The application fetches sensor readings from the backend API, which retrieves the data from a Supabase database.
- **Frontend Structure:**
  - `src/components/App.tsx`: The main entry point and orchestrator.
  - `src/components/Chart.tsx`: A reusable wrapper for `Chart.js` to render the line graphs.
  - `src/components/About.tsx` & `src/components/Github.tsx`: Informational components.

## Setup
1. Install dependencies: `npm install`
2. Configure `.env`: Set `VITE_BACKEND_URL` to point to the backend API.
3. Run the development server: `npm run dev`

## Flowchart
![Frontend Dashboard Flow](flowchart.png)
