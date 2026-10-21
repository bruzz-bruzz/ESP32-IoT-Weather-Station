# ESP32 Firmware

This directory contains the firmware for the ESP32-based weather station and related hardware documentation.

## How It Works
- **Sensor Reading:** The ESP32 wakes up from deep sleep, initializes sensors (BMP280, SGP40, DHT11, HW-486), reads environmental data, and calculates values.
- **Data Transmission:** The data is serialized to JSON and sent via an HTTP POST request to the Supabase endpoint.
- **Power Management:** After transmitting data, the ESP32 enters deep sleep for a configurable amount of time (15 minutes) to conserve power, then cycles again.

## Folder Layout
- `weather_station.ino`: Main Arduino firmware.
- `schematic.svg`: Wiring diagram for the sensor array (generated via `schematic.py`).
- `schematic.py`: Script to regenerate the schematic.
- `3D Prints`: STL Files used for 3D printing the enclosure.

## Hardware Components
- ESP32
- Sensors: BMP280 (Temperature/Pressure), SGP40 (VOC), DHT11 (Temp/Humidity), HW-486 (Light Intensity).

## Setup
1. Open `weather_station.ino` in the Arduino IDE.
2. Configure Wi-Fi credentials (`ssid`, `password`) and Supabase endpoints (`supabase_url`, `anon_key`).
3. Flash the firmware to your ESP32 board.

