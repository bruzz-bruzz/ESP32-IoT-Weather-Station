# IoT Weather Station
[Link](https://esp32-iot-weather-station.vercel.app/)

The IoT Weather Station is a comprehensive project that monitors environmental conditions using an ESP32-based hardware setup. It captures data (temperature, humidity, pressure, light, VOCs), stores it in a Supabase database, and presents real-time analytics through a responsive React dashboard. The system also features machine learning capabilities to predict future weather patterns based on historical data.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Setup](#setup)
- [Hardware Details](#hardware-details)
- [Configuration](#configuration)
- [Run Locally](#run-locally)
- [API & Routes](#api-and-routes)
- [Architecture](#architecture)
- [Production Build](#production-build)
- [Troubleshooting](#troubleshooting)

## Features

- Displays humidity, pressure, temperature, light intensity, and VOC readings
- Reads sensor data from Supabase through an Express API
- Responsive React dashboard styled with Tailwind CSS
- About page with project information and device artwork
- Helmet security headers, CORS, and API rate limiting

## Project Structure

```text
.
├── AI/                     # Machine Learning model training and inference
│   ├── models/             # Trained model files (.pkl)
│   ├── builder.py          # Script for data fetching and model training
│   ├── getData.py          # Utility for querying the backend API
│   ├── main.py             # FastAPI application for prediction serving
│   ├── flowchart.mmd       # AI architecture diagram
│   ├── flowchart.png       # AI prediction flowchart image
│   └── requirements.txt    # Python dependencies
├── backend/                # Express API for data retrieval and AI prediction
│   ├── src/
│   │   └── server.ts       # Express server implementation
│   ├── flowchart.png       # Backend API flowchart image
│   └── .env                # Environment configuration
├── ESP32/                  # Hardware design and firmware
│   ├── weather_station.ino # Firmware source code
│   ├── 3D Prints/          # 3D model files (.stl)
│   └── Schematic.png       # Hardware circuit diagram
├── frontend/               # React + Vite dashboard for data visualization
│   ├── src/
│   │   ├── components/     # React components
│   │   └── main.tsx        # Application entry point
│   ├── flowchart.mmd       # Frontend architecture diagram
│   ├── flowchart.png       # Frontend dashboard flowchart image
│   └── .env                # Environment configuration
└── README.md               # Project documentation
```

## Details
- [AI](AI/README.md) - AI prediction using machine learning models
- [ESP32](ESP32/README.md) - IoT weather station hardware and firmware
- [Frontend](frontend/README.md) - React-based dashboard for data visualization
- [Backend](backend/README.md) - Node.js backend API for data fetching and storage
- [Archiver](archiver/README.md) - Data archiving and storage

## Requirements

- Node.js 18 or newer
- npm
- A Supabase project with a `sensor` table

## Setup

Install dependencies in both applications:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Schematic Diagram

![Schematic Diagram](ESP32/Schematic.png)

## Configuration

### Backend environment

Create `backend/.env`:

```env
supabaseURL=https://your-project.supabase.co
supabaseKey=your-supabase-key
ORIGIN=http://localhost:5173
```

The API reads the following columns from the `sensor` table:
- `created_at`, `humidity`, `pressure`, `temperature`, `light_intensity`, `voc_index`

### Frontend environment

Create `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:3000
```

## Run Locally

Start the backend in one terminal:
```bash
cd backend
npm run dev
```

Start the frontend in a second terminal:
```bash
cd frontend
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

## API & Routes

### Routes
| Route | Description |
| --- | --- |
| `/` | Live sensor dashboard |
| `/about` | Project overview |

### API (`GET /getData`)
Returns sensor readings from Supabase:

```json
{
  "data": [],
  "ok": true
}
```

The backend listens on port `3000` by default.

## Architecture

```text
Supabase sensor table
       |
       v
Express GET /getData  -->  React dashboard
       |
  CORS + Helmet + rate limiting
```

The frontend requests the API when the dashboard loads. The backend returns an object containing `data` and an `ok` status flag.

## Production Build

Build the frontend:
```bash
cd frontend
npm run build
```

Preview the production build:
```bash
cd frontend
npm run preview
```

## Troubleshooting

- If the dashboard shows no readings, confirm that the backend is running on port `3000` and that `VITE_BACKEND_URL` matches it.
- If the backend cannot connect to Supabase, check `supabaseURL` and `supabaseKey` in `backend/.env`.
- Restart the Vite dev server after changing frontend environment variables.
