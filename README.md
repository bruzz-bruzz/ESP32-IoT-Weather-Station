# IoT Weather Station
[Link](https://esp32-iot-weather-station.vercel.app/)

The IoT Weather Station is a comprehensive project that monitors environmental conditions using an ESP32-based hardware setup. It captures data (temperature, humidity, pressure, light, VOCs), stores it in a Supabase database, and presents real-time analytics through a responsive React dashboard. The system also features machine learning capabilities to predict future weather patterns based on historical data.

## Documentation
- [API Documentation](docs/API.md)
- [Environment Variables](docs/ENVIRONMENT_VARIABLES.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Contributing Guidelines](docs/CONTRIBUTING.md)

## Project Structure
```text
.
├── AI/                     # Machine Learning model training and inference
├── backend/                # Express API for data retrieval and AI prediction
├── ESP32/                  # Hardware design and firmware
├── frontend/               # React + Vite dashboard for data visualization
└── docs/                   # Detailed project documentation
```

## Details
- [AI](AI/README.md) - AI prediction using machine learning models
- [ESP32](ESP32/README.md) - IoT weather station hardware and firmware
- [Frontend](frontend/README.md) - React-based dashboard for data visualization
- [Backend](backend/README.md) - Node.js backend API for data fetching and storage

## Setup & Running Locally
Please refer to the `README.md` in each component directory (`AI/`, `backend/`, `frontend/`) for specific setup instructions. Ensure all required environment variables are configured as per [docs/ENVIRONMENT_VARIABLES.md](docs/ENVIRONMENT_VARIABLES.md).

## Architecture
For a detailed overview of the system architecture, please refer to the architecture diagrams in the `README.md` files within each component directory.

