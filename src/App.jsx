import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Recetas from './pages/Recetas'
import Detalle from './pages/Detalle'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recetas" element={<Recetas />} />
        <Route path="/detalle/:id" element={<Detalle />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App