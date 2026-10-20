def getData(col):
    import requests
    res = requests.get('https://backend-teal-two-14.vercel.app/getData')
    data = res.json()['data']
    x, y = [], []
    for z in data:
        y.append(z[col])
        features = {
            "humidity": z["humidity"],
            "pressure": z["pressure"],
            "temperature": z["temperature"],
            "light_intensity": z["light_intensity"]
        }
        if col in features:
            del features[col]
        x.append(list(features.values()))
    return x, y