
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import About from './pages/about'

import Hero from './pages/section'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
