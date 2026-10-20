# AI Component for IoT Weather Station

This directory contains the machine learning components for the IoT weather station project. It handles fetching historical sensor data, training regression models, and serving predictions via a FastAPI web service.

## Components

- **`main.py`**: A FastAPI application that serves pre-trained models to provide predictions for temperature, pressure, and humidity.
- **`builder.py`**: A script that fetches data, trains `RandomForestRegressor` models for each sensor type, and saves them as `.pkl` files.
- **`getData.py`**: A utility script to fetch raw data from the backend API and format it for model training.
- **`models/`**: Directory where trained model files (`.pkl`) are stored.
- **`requirements.txt`**: List of Python dependencies.
- **`test.py`**: Script for testing the models or API.

## Setup

1. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### 1. Training Models
To fetch the latest data and retrain the models, run:
```bash
python builder.py
```
This will update the models in the `models/` directory.

### 2. Running the Prediction Server
To start the FastAPI server to serve predictions:
```bash
uvicorn main:app --reload
```
The API will be available at `http://127.0.0.1:8000`.

### 3. API Endpoint
- **POST** `/predict`: Send a JSON body to get a prediction.
  - Request body format:
    ```json
    {
      "features": [1729450000],
      "type": "temperature"
    }
    ```
    *(Note: `features` expects a list of timestamps, `type` can be 'temperature', 'pressure', or 'humidity')*

