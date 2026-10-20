from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
from builder import build
from apscheduler.schedulers.background import BackgroundScheduler
import numpy as np
def updateModels():
    global pressureModel, humidityModel, temperatureModel
    pressureModel = joblib.load('models/pressure.pkl')
    humidityModel = joblib.load('models/humidity.pkl')
    temperatureModel = joblib.load('models/temperature.pkl')
def cron():
    try:
        build()
        updateModels()
        print("✅ MODELS RETRAINED AND LOADED.")
    except Exception as e:
        print(f"❌ Error during retrain/reload: {e}")
@asynccontextmanager
async def lifespan(app: FastAPI):
    scheduler.add_job(cron, 'interval', days=7)
    scheduler.start()
    yield
    scheduler.shutdown()
app = FastAPI(lifespan=lifespan)
scheduler = BackgroundScheduler()
pressureModel = joblib.load('models/pressure.pkl')
humidityModel = joblib.load('models/humidity.pkl')
temperatureModel = joblib.load('models/temperature.pkl')
class PredictionInput(BaseModel):
    features: list[float]
    type: str
@app.post("/predict")
def predict(data: PredictionInput):
    input_data = np.array(data.features).reshape(-1, 1)
    if data.type == 'pressure':
        prediction = pressureModel.predict(input_data)
        return {"prediction": float(prediction[0])}
    elif data.type == 'humidity':
        prediction = humidityModel.predict(input_data)
        return {'prediction': float(prediction[0])}
    elif data.type == 'temperature':
        prediction = temperatureModel.predict(input_data)
        return {'prediction': float(prediction[0])}
    else:
        raise HTTPException(status_code=400, detail="Invalid prediction type")