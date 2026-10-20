import joblib
import numpy as np
from getData import getData
from sklearn.model_selection import train_test_split
from sklearn.metrics import root_mean_squared_error, r2_score, mean_absolute_error
for col in ['temperature','pressure','humidity','light_intensity']:
    m = joblib.load(f'models/{col}.pkl')
    x,y = getData(col)
    x = np.array(x)
    y = np.array(y)
    xTrain,xTest,yTrain,yTest = train_test_split(x,y,test_size=0.3,random_state=42)
    print(f'Results for {col} model:')
    pred = m.predict(xTest)
    MSE = root_mean_squared_error(yTest,pred)
    R2 = r2_score(yTest,pred)
    MAE = mean_absolute_error(yTest,pred)
    print(f'MSE: {MSE}')
    print(f'R2: {R2}')
    print(f'MAE: {MAE}')