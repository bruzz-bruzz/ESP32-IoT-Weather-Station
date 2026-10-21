# AI Components for IoT Weather Station

This directory contains the machine learning components for the IoT weather station project.

## How the Model is Trained
- **Data Acquisition:** The `builder.py` script uses `getData.py` to fetch historical data from the backend API.
- **Model Training:** It trains a `RandomForestRegressor` model for each sensor type (temperature, pressure, humidity, light intensity) using `scikit-learn`.
- **Persistence:** Trained models are serialized and saved as `.pkl` files in the `models/` directory using `joblib`.
- **Automatic Retraining:** The FastAPI app (`main.py`) uses `apscheduler` to automatically trigger `builder.py` and reload models every 7 days.

## Function of Each File
- `main.py`: FastAPI application that loads the pre-trained models upon startup and exposes a `/predict` endpoint.
- `builder.py`: Main script for fetching data, training the `RandomForestRegressor` models, and saving them.
- `getData.py`: Utility module for querying the backend API.
- `models/`: Directory where trained model artifacts (`.pkl`) are stored.
- `requirements.txt`: Python dependencies.
- `test.py`: Testing script for verification.

## Setup
1. `pip install -r requirements.txt`

## Usage
- Train Models: `python builder.py`
- Start API: `uvicorn main:app --reload`
- API Endpoint: **POST** `/predict` (expects `features` list and `type`)

