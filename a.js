async function a(){
    const res = await fetch("https://esp32-iot-weather-station-ai-predictor.onrender.com/predict",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            "features":[Date.parse("2026-10-14T21:04:39.884069+00:00")],
            "type":"temperature"
        })

    })
    const data = await res.json()
    return data
}
console.log(await a())