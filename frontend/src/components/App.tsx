import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Github from './Github.tsx'
import Chart from './Chart.tsx'
import './App.css'
type showDataType = 'Graph' | 'Table'
type chartGraphDataTypes = 'Humidity' | 'Pressure' | 'Temperature' | 'Light Intensity' | 'VOC Index'
export default function App(){
  const displayMap = {
    'Humidity':"Humidity (%)",
    "Temperature":"Temperature (°C)",
    "VOC Index":"VOC Index (1-500)",
    "Pressure":"Pressure (hPa)",
    "Light Intensity":"Light Intensity (Lux)"
  }
  const [logData,setLogData] = useState<any[]>([])
  const [loading,setLoading] = useState(false)
  const [dataType,setDataType] = useState<showDataType>("Graph")
  const [graphType,setGraphType] = useState<chartGraphDataTypes>("Humidity")
  const [currPage,setCurrPage] = useState(0)
  const [pages,setPages] = useState(0) //10 logs per page
  async function loadData(){
    setLoading(true)
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getData`)
      setLogData(res.data.data)
      setCurrPage(0)
      setPages(Math.floor(res.data.data.length / 10))
    } catch(e){
      setCurrPage(0)
      setPages(0)
      console.error(e)
    }
    setLoading(false)
  }
  function constructGraphData(){
    let labels:string[] = []
    let humidity:number[] = []
    let temperature:number[] = []
    let voc_index:number[] = []
    let pressure:number[] = []
    let light_intensity:number[] = []
    for(let i = 0; i < logData.length; i++){
      labels.push(new Date(Date.parse(logData[i].created_at)).toLocaleString())
      if(graphType === 'Humidity'){
        humidity.push(logData[i].humidity)
      }
      if(graphType === 'Temperature'){
        temperature.push(logData[i].temperature)
      }
      if(graphType === 'VOC Index'){
        voc_index.push(logData[i].voc_index)
      }
      if(graphType === 'Pressure'){
        pressure.push(logData[i].pressure)
      }
      if(graphType === "Light Intensity"){
        light_intensity.push(logData[i].light_intensity)
      }
    }
    let returnData = {
      labels:labels,
      datasets:[
        {
        label:"Humidity (%)",
        data:humidity,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.2
        },
        {
        label:"Pressure (hPa)",
        data:pressure,
        borderColor: 'rgb(115, 255, 0)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.2
        },
        {
        label:"Temperature (°C)",
        data:temperature,
        borderColor: 'rgb(236, 29, 14)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.2
        },
        {
        label:"VOC Index (1-500)",
        data:voc_index,
        borderColor: 'rgb(201, 24, 255)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.2
        },
        {
        label:"Light intensity (Lux)",
        data:light_intensity,
        borderColor: 'rgb(203, 236, 14)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.2
        },
      ]
    }
    return returnData
  }
  function getAverageForChart(){
    let sum = 0
    for(let i = 0; i < logData.length; i++){
      if(graphType === 'Humidity'){
        sum += logData[i].humidity
      }
      if(graphType === 'Temperature'){
        sum += logData[i].temperature
      }
      if(graphType === 'VOC Index'){
        sum += logData[i].vocIndex
      }
      if(graphType === 'Pressure'){
        sum += logData[i].pressure
      }
      if(graphType === 'Light Intensity'){
        sum += logData[i].light_intensity
      }
    }
    return isNaN((sum / logData.length)) ? 0: (sum / logData.length).toFixed(3)
  }
  useEffect(()=>{
    loadData()
  },[])
  return (
    <main className='min-h-screen bg-gradient-to-br from-[#edf4f1] via-[#f8faf6] to-[#e7f0ed] px-3 py-9 font-sans text-[#173042] sm:px-5 sm:py-16'>
      <section className='mx-auto mb-7 flex w-full max-w-[1180px] flex-col items-start justify-between gap-5 sm:mb-9 sm:flex-row sm:items-end sm:gap-6'>
        <div>
          <p className='mb-2.5 text-[0.7rem] font-bold tracking-[0.14em] text-[#19706a]'>ENVIRONMENTAL MONITORING</p>
          <h1 className='font-serif text-[clamp(2.2rem,5vw,4.4rem)] font-semibold leading-none text-[#173042]'>IoT Weather Station</h1>
          <p className='mt-3.5 text-[0.95rem] text-[#60746f]'>Live conditions.</p>
          <Link target='_blank' to='/about'>
            <p className='underline mt-3.5 text-[0.95rem] text-[#60746f]'>About this project</p>
          </Link>
        </div>
        <div className='inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-[#c7ddd5] bg-[#f7fcf8] px-3.5 py-2.5 text-[0.78rem] font-bold text-[#365c58]'>
          <span className='size-2 rounded-full bg-[#2da277] shadow-[0_0_0_4px_#d9f0e4]' />
          <span>Updates every 30 minutes</span>
        </div>
      </section>
      <section className='mx-auto w-full max-w-[1180px] overflow-hidden rounded-xl border border-[#d7e2dd] bg-white/80 shadow-[0_18px_45px_rgba(43,79,72,0.1)]' aria-labelledby='readings-title'>
        <div className='flex flex-col items-start justify-between gap-3 border-b border-[#e4ece8] px-5 py-5 sm:flex-row sm:items-center sm:px-7 sm:pb-5 sm:pt-6'>
          <div>
            <p className='mb-2.5 text-[0.7rem] font-bold tracking-[0.14em] text-[#19706a]'>RECENT READINGS</p>
            <h2 id='readings-title' className='font-serif text-[1.65rem] font-semibold text-[#173042]'>Sensor log</h2>
          </div>
          <span className='rounded-md bg-[#e9f4ef] px-2.5 py-1.5 text-[0.78rem] font-bold text-[#19706a]'>{logData.length} records</span>
          <div className='grid grid-cols-2'>
            <button className='m-2 text-center bg-[#f4f8f5] p-2 hover:cursor-pointer' onClick={()=>setDataType("Table")}>Table</button>
            <button className='m-2 text-center bg-[#f4f8f5] p-2 hover:cursor-pointer' onClick={()=>setDataType("Graph")}>Graph</button>
          </div>
        </div>
        {loading ? (
          <div className='px-6 py-16 text-center text-[#728681]'>Loading sensor readings...</div>
        ) : logData.length === 0 ? (
          <div className='px-6 py-16 text-center text-[#728681]'>No sensor readings are available yet.</div>
        ) : dataType === 'Table' ? (
          <div>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[800px] border-collapse text-right'>
              <thead className='bg-[#f4f8f5] text-[0.68rem] uppercase tracking-[0.08em] text-[#668078]'>
                <tr>
                  <th scope='col' className='px-6 py-4 text-left font-bold'>Date</th>
                  <th scope='col' className='px-6 py-4 font-bold'>Humidity <span className='font-normal normal-case text-[#96aaa3]'>(%)</span></th>
                  <th scope='col' className='px-6 py-4 font-bold'>Pressure <span className='font-normal normal-case text-[#96aaa3]'>(hPa)</span></th>
                  <th scope='col' className='px-6 py-4 font-bold'>Temperature <span className='font-normal normal-case text-[#96aaa3]'>(°C)</span></th>
                  <th scope='col' className='px-6 py-4 font-bold'>Light intensity <span className='font-normal normal-case text-[#96aaa3]'>(lux)</span></th>
                  <th scope='col' className='px-6 py-4 font-bold'>VOC index</th>
                </tr>
              </thead>
              <tbody>
                {logData.slice((currPage) * 10,(currPage + 1) * 10).map((item:any,idx:number)=>(
                  <tr key={idx} className='border-b border-[#e7efeb] transition-colors even:bg-[#fbfdfb] hover:bg-[#eef8f3] last:border-b-0'>
                    <td className='px-6 py-4 text-left text-[0.82rem] tabular-nums text-[#60746f]'>{new Date(Date.parse(item.created_at)).toLocaleString()}</td>
                    <td className='px-6 py-4 text-[0.9rem] tabular-nums text-[#29484a]'>{item.humidity}</td>
                    <td className='px-6 py-4 text-[0.9rem] tabular-nums text-[#29484a]'>{item.pressure}</td>
                    <td className='px-6 py-4 text-[0.9rem] font-bold tabular-nums text-[#c35d42]'>{item.temperature}</td>
                    <td className='px-6 py-4 text-[0.9rem] tabular-nums text-[#29484a]'>{item.light_intensity}</td>
                    <td className='px-6 py-4 text-[0.9rem] tabular-nums text-[#29484a]'>{item.voc_index}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='flex justify-center items-center'>
              <button className='m-2 text-center bg-[#f4f8f5] p-2 hover:cursor-pointer' title='Go back by one page' onClick={()=>{
                setCurrPage(page => {
                  if(page === 0){
                    return page
                  } return page - 1
                })
              }}>Back</button>
              <p className='m-2 text-center p-2'>{currPage + 1} of {pages + 1}</p>
              <button className='m-2 text-center bg-[#f4f8f5] p-2 hover:cursor-pointer' title='Go to the next page' onClick={()=>{
                setCurrPage(page => {
                  if(page === pages){
                    return page
                  } return page + 1
                })
              }}>Next</button>
          </div>
          </div>
        ) : 
        <div>
          <div className='overflow-x-auto'>
            <div className='flex justify-center items-center flex-col'>
              <select className='border rounded-lg p-2 bg-[#f4f8f5] text-center' value={graphType} onChange={(e)=>setGraphType(e.target.value as chartGraphDataTypes)}>
                <option value={"Humidity"}>Humidity</option>
                <option value={"Temperature"}>Temperature</option>
                <option value={"VOC Index"}>VOC Index</option>
                <option value={"Pressure"}>Pressure</option>
                <option value={"Light Intensity"}>Light Intensity</option>
              </select>
              <Chart data={constructGraphData()}/>
              <div className='m-4 p-4 border rounded-lg bg-[#f4f8f5] flex justify-center items-center flex-col'>
                <h3>Average {displayMap[graphType]}</h3>
                <p>{getAverageForChart()}</p>
              </div>
            </div>
          </div>
        </div>
        }
      </section>
      <Github repoURL="https://github.com/bruzz-bruzz/esp32-iot-weather-station-" profileURL="https://github.com/bruzz-bruzz"/>
    </main>
  )
}