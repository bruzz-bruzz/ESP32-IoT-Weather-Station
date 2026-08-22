import {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Github from './Github.tsx'
import './App.css'
export default function App(){
  const [logData,setLogData] = useState<any[]>([])
  const [loading,setLoading] = useState(false)
  async function loadData(){
    setLoading(true)
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getData`)
      setLogData(res.data.data)
    } catch(e){
      console.error(e)
    }
    setLoading(false)
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
          <span>Updates every 15 minutes</span>
        </div>
      </section>
      <section className='mx-auto w-full max-w-[1180px] overflow-hidden rounded-xl border border-[#d7e2dd] bg-white/80 shadow-[0_18px_45px_rgba(43,79,72,0.1)]' aria-labelledby='readings-title'>
        <div className='flex flex-col items-start justify-between gap-3 border-b border-[#e4ece8] px-5 py-5 sm:flex-row sm:items-center sm:px-7 sm:pb-5 sm:pt-6'>
          <div>
            <p className='mb-2.5 text-[0.7rem] font-bold tracking-[0.14em] text-[#19706a]'>RECENT READINGS</p>
            <h2 id='readings-title' className='font-serif text-[1.65rem] font-semibold text-[#173042]'>Sensor log</h2>
          </div>
          <span className='rounded-md bg-[#e9f4ef] px-2.5 py-1.5 text-[0.78rem] font-bold text-[#19706a]'>{logData.length} records</span>
        </div>
        {loading ? (
          <div className='px-6 py-16 text-center text-[#728681]'>Loading sensor readings...</div>
        ) : logData.length === 0 ? (
          <div className='px-6 py-16 text-center text-[#728681]'>No sensor readings are available yet.</div>
        ) : (
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
                {logData.map((item:any,idx:number)=>(
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
        )}
      </section>
      <Github repoURL="A" profileURL="B"/>
    </main>
  )
}