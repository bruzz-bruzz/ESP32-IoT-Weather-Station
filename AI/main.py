from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np
app = FastAPI()
pressureModel = joblib.load('models/pressure.pkl')
humidityModel = joblib.load('models/humidity.pkl')
temperatureModel = joblib.load('models/temperature.pkl')

class PredictionInput(BaseModel):
    features: list[float]
    type:str
@app.post("/predict")
def predict(data: PredictionInput):
    input_data = np.array(data.features).reshape(1, -1)
    if data.type == 'pressure':
        prediction = pressureModel.predict(input_data)
        return {"prediction": float(prediction[0])}
    elif data.type == 'humidity':
        prediction = humidityModel.predict(input_data)
        return {'prediction':float(prediction[0])}
    elif data.type == 'temperature':
        prediction = temperatureModel.predict(input_data)
        return {'prediction':float(prediction[0])}