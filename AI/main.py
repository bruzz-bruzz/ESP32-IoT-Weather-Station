from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import joblib
from builder import build
from apscheduler.schedulers.background import BackgroundScheduler
import numpy as np
def updateModels(app: FastAPI):
    app.state.pressureModel = joblib.load('models/pressure.pkl')
    app.state.humidityModel = joblib.load('models/humidity.pkl')
    app.state.temperatureModel = joblib.load('models/temperature.pkl')
    app.state.lightIntensityModel = joblib.load('models/light_intensity.pkl')
def cron(app: FastAPI):
    try:
        build()
        updateModels(app)
        print("✅ MODELS RETRAINED AND LOADED.")
    except Exception as e:
        print(f"❌ Error during retrain/reload: {e}")
@asynccontextmanager
async def lifespan(app: FastAPI):
    updateModels(app)
    scheduler.add_job(cron, 'interval', days=7, args=[app])
    scheduler.start()
    yield
    scheduler.shutdown()
app = FastAPI(lifespan=lifespan)
scheduler = BackgroundScheduler()
class PredictionInput(BaseModel):
    features: list[float]
    type: str
@app.post("/predict")
def predict(data: PredictionInput, request: Request):
    input_data = np.array(data.features).reshape(-1, 1)
    if data.type == 'pressure':
        prediction = request.app.state.pressureModel.predict(input_data)
        return {"prediction": float(prediction[0])}
    elif data.type == 'humidity':
        prediction = request.app.state.humidityModel.predict(input_data)
        return {'prediction': float(prediction[0])}
    elif data.type == 'temperature':
        prediction = request.app.state.temperatureModel.predict(input_data)
        return {'prediction': float(prediction[0])}
    elif data.type == 'light_intensity':
        prediction = request.app.state.lightIntensityModel.predict(input_data)
        return {'prediction': float(prediction[0])}
    else:
        raise HTTPException(status_code=400, detail="Invalid prediction type")
