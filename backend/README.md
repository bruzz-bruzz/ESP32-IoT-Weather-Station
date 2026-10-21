# Backend API

Express.js API that bridges the ESP32 sensors and the frontend dashboard using Supabase as the data store.

## Features
- Serves sensor readings for the frontend.
- Implements security headers (Helmet), CORS, and rate limiting.

## API Routes
- **GET** `/getData`: Fetches all sensor readings from the `sensor` table in Supabase. Returns the data or an empty array with a status flag.
- **GET** `/archives`: Fetches all historical sensor readings from the `sensorarchive` table in Supabase.
- **POST** `/predict`: Forwards prediction requests to the AI service (defined in `process.env.AI_URL`), expecting `type` and `features` in the body.

## Setup
1. Install dependencies: `npm install`
2. Configure `.env` with Supabase credentials (`supabaseURL`, `supabaseKey`), `ORIGIN` for CORS, and `AI_URL` for prediction service.
3. Run: `npm run dev`

## Database Schema
- Expects a `sensor` table with columns: `created_at`, `humidity`, `pressure`, `temperature`, `light_intensity`, `voc_index`.
- Expects a `sensorarchive` table for historical data.

