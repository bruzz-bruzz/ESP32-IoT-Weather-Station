def getData(col):
    from datetime import datetime
    import requests
    import json
    res = requests.get('https://backend-teal-two-14.vercel.app/getData')
    data = res.json()['data']
    with open('data.json','w') as f:
        f.write(json.dumps({'data':data},indent=4))
    x,y = [],[]
    for z in data:
        iso = datetime.fromisoformat(z['created_at'])
        x.append([int(iso.timestamp())])
        y.append([z[col]])
    return x,y