# API Documentation

This project uses an Express.js backend to bridge the ESP32 sensors and the React dashboard, interacting with Supabase and a Python-based AI service.

## Backend Routes

### GET /getData
Fetches all sensor readings from the `sensor` table.
- **Response:**
  ```json
  {
    "data": [
      {
        "created_at": "2026-10-21T10:00:00Z",
        "humidity": 45.0,
        "pressure": 1013.2,
        "temperature": 22.5,
        "light_intensity": 500,
        "voc_index": 50
      }
    ],
    "ok": true
  }
  ```

### GET /archives
Fetches all historical sensor readings from the `sensorarchive` table.

### POST /predict
Forwards prediction requests to the AI service.
- **Body:**
  ```json
  {
    "type": "temperature",
    "features": [14] 
  }
  ```
- **Response:** Returns the predicted value.

## AI Service Routes (FastAPI)

### POST /predict
- **Input:** JSON payload with `type` (e.g., "temperature") and `features` (list of integers/floats).
- **Output:** JSON containing the predicted numerical value.

