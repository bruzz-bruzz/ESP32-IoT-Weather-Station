# Environment Variables

This document lists all required environment variables for the IoT Weather Station project.

## Root `.env` (Not strictly required, but useful)

## Backend (`backend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `supabaseURL` | Supabase Project URL | `https://your-project.supabase.co` |
| `supabaseKey` | Supabase API Key | `your-supabase-key` |
| `ORIGIN` | Allowed CORS Origin | `http://localhost:5173` |
| `AI_URL` | Prediction Service URL | `http://localhost:8000` |

## Frontend (`frontend/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_BACKEND_URL` | Backend API URL | `http://localhost:3000` |

## AI Service (`AI/.env`)
| Variable | Description | Example |
| :--- | :--- | :--- |
| `BACKEND` | Backend URL to fetch historical data | `https://backend-teal-two-14.vercel.app/archives` |
