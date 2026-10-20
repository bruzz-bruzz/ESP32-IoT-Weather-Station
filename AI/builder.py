def build():
    import numpy as np
    from getData import getData
    import joblib
    from sklearn.ensemble import RandomForestRegressor  
    from sklearn.model_selection import train_test_split
    for col in ['temperature','pressure','humidity','light_intensity']:
        x,y = getData(col)
        x = np.array(x)
        y = np.array(y)
        xTrain,xTest,yTrain,yTest = train_test_split(x,y,test_size=0.3,random_state=42)
        model = RandomForestRegressor(n_estimators=500,max_depth=None,random_state=42)
        model.fit(xTrain,yTrain)
        joblib.dump(model,f'models/{col}.pkl')
        print(f'{col} DONE.')
build()