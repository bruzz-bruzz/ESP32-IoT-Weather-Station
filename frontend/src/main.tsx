import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './components/App.tsx'
import About from './components/About.tsx'
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/' element={<App/>}></Route>
      </Routes>
    </BrowserRouter>
)
