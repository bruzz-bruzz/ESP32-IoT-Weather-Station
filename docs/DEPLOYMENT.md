# Deployment Guide

This project is designed to be modular. Below are suggested deployment strategies:

## 1. Supabase
- Host the `sensor` and `sensorarchive` tables on Supabase.

## 2. Backend (Node.js/Express)
- **Suggested Platform:** Render, Railway, or Fly.io.
- **Environment:** Set `supabaseURL`, `supabaseKey`, `ORIGIN` (Frontend URL), and `AI_URL`.

## 3. Frontend (React/Vite)
- **Suggested Platform:** Vercel, Netlify.
- **Environment:** Set `VITE_BACKEND_URL` to your deployed backend URL.

## 4. AI Service (Python/FastAPI)
- **Suggested Platform:** Render, AWS, or any server supporting Docker or Python.
- **Considerations:** Ensure model artifacts are persisted or rebuilt periodically.
