def getData(col):
    import requests
    from datetime import datetime
    from dotenv import load_dotenv
    import os
    load_dotenv()
    res = requests.get(os.getenv("BACKEND"))
    data = res.json()['data']
    x, y = [], []
    for z in data:
        y.append(z[col])
        dt_str = z['created_at']
        dt_obj = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
        hour = dt_obj.hour
        x.append([hour])
    return x, y