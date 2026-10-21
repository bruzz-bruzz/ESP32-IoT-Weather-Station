import './App.css'
import {Link} from 'react-router-dom'
import demoPic from '../assets/Demo.jpeg'
import schematicPic from '../assets/Schematic.png'
import Github from './Github.tsx'
import heroImage from '../assets/hero.png'
export default function About(){
    return(
        <main className='min-h-screen bg-gradient-to-br from-[#edf4f1] via-[#f8faf6] to-[#e7f0ed] px-5 py-10 font-sans text-[#173042] sm:px-8 sm:py-16'>
            <div className='mx-auto max-w-5xl'>
                <section className='grid items-center gap-10 overflow-hidden rounded-xl border border-[#d7e2dd] bg-white/80 px-7 py-10 shadow-[0_18px_45px_rgba(43,79,72,0.1)] sm:grid-cols-[1.05fr_0.95fr] sm:px-12 sm:py-14'>
                    <div>
                        <p className='mb-3 text-[0.7rem] font-bold tracking-[0.14em] text-[#19706a]'>ABOUT THE PROJECT</p>
                        <h1 className='max-w-xl font-serif text-4xl font-semibold leading-tight text-[#173042] sm:text-6xl'>Compact IoT Weather Station</h1>
                        <p className='mt-5 max-w-lg text-base leading-7 text-[#60746f]'>A small, connected station that turns environmental signals into useful, real-time data you can understand at a glance.</p>
                        <Link target='_blank' to='/'>
                        <p className='underline mt-5 max-w-lg text-base leading-7 text-[#60746f]'>Check it out!</p>
                        </Link>
                    </div>
                    <div className='flex justify-center sm:justify-end'>
                        <img className='w-56 drop-shadow-[0_22px_18px_rgba(86,44,180,0.2)] sm:w-72' src={heroImage} alt='Compact IoT weather station device' />
                    </div>
                </section>
                <section className='py-14 sm:py-20'>
                    <div className='mb-7 flex items-end justify-between gap-4'>
                        <div>
                            <p className='mb-2.5 text-[0.7rem] font-bold tracking-[0.14em] text-[#19706a]'>WHY IT MATTERS</p>
                            <h2 className='font-serif text-3xl font-semibold text-[#173042]'>Built for the everyday environment</h2>
                        </div>
                        <span className='hidden text-3xl text-[#b8d4cb] sm:block'>01—03</span>
                    </div>
                    <div className='grid gap-4 md:grid-cols-3'>
                        <article className='border-t-2 border-[#2da277] bg-white/70 p-6 shadow-sm'>
                            <span className='text-sm font-bold text-[#2da277]'>01</span>
                            <h3 className='mt-7 font-serif text-xl font-semibold text-[#173042]'>Compact in size</h3>
                            <p className='mt-3 text-sm leading-6 text-[#60746f]'>Place it anywhere to collect environmental data without taking over your space.</p>
                        </article>
                        <article className='border-t-2 border-[#d9914b] bg-white/70 p-6 shadow-sm'>
                            <span className='text-sm font-bold text-[#d9914b]'>02</span>
                            <h3 className='mt-7 font-serif text-xl font-semibold text-[#173042]'>IoT connectivity</h3>
                            <p className='mt-3 text-sm leading-6 text-[#60746f]'>Seamlessly log measurements to a database and keep your information in reach.</p>
                        </article>
                        <article className='border-t-2 border-[#7468b5] bg-white/70 p-6 shadow-sm'>
                            <span className='text-sm font-bold text-[#7468b5]'>03</span>
                            <h3 className='mt-7 font-serif text-xl font-semibold text-[#173042]'>Real-time monitoring</h3>
                            <p className='mt-3 text-sm leading-6 text-[#60746f]'>Track changing conditions as they happen and see the story in your sensor data.</p>
                        </article>
                    </div>
                        <div className='p-4 m-2 flex justify-center items-center flex-col gap-3'>
                            <img src={demoPic} className='w-1/2 h-2/3' alt='Demo of the IoT weather station in action' />
                            <p className='mb-3 text-[0.7rem] font-bold tracking-[0.14em] text-[#19706a]'>PHYSICAL CASE</p>
                        </div>
                        <div className='p-4 m-2 flex justify-center items-center flex-col gap-3'>
                            <img src={schematicPic} className='w-1/2 h-2/3' alt='Schematic of the IoT weather station design' />
                            <p className='mb-3 text-[0.7rem] font-bold tracking-[0.14em] text-[#19706a]'>SCHEMATIC DIAGRAM</p>
                    </div>
                </section>
                <footer className='border-t border-[#cbdcd5] pt-5'>
                    <Github repoURL="https://github.com/bruzz-bruzz/esp32-iot-weather-station-" profileURL="https://github.com/bruzz-bruzz"/>
                </footer>
            </div>
        </main>
    )
}