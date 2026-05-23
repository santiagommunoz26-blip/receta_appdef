import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav style={{ background: '#FDF6EE', borderBottom: '0.5px solid #E8D5BC' }}
      className="px-4 py-4 flex justify-between items-center flex-wrap gap-3">
      <div className="text-xl font-medium" style={{ color: '#7C4A1E' }}>
        Recetas
      </div>
      <div className="flex gap-4">
        <Link to="/" className="text-sm" style={{ color: '#D4793A', fontWeight: 500 }}>Inicio</Link>
        <Link to="/recetas" className="text-sm" style={{ color: '#A07850' }}>Explorar</Link>
        <Link to="/recetas" className="text-sm" style={{ color: '#A07850' }}>Favoritos</Link>
      </div>
      <div className="text-sm cursor-pointer" style={{ color: '#A07850' }}>Mi cuenta</div>
    </nav>
  )
}

export default Navbar