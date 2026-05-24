import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const { pathname } = useLocation()

  return (
    <>
      {/* Desktop Navbar */}
      <header className="bg-surface sticky top-0 z-50 w-full border-b border-outline-variant" style={{ background: '#fff8f1', borderColor: '#dac2b4' }}>
        <div className="flex justify-between items-center w-full px-5 md:px-16 max-w-[1200px] mx-auto h-16">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold tracking-tight" style={{ color: '#1e1b17' }}>
              Cook<span style={{ color: '#934707' }}>ora</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="font-medium text-sm py-5 transition-colors" style={{ color: pathname === '/' ? '#934707' : '#554339', borderBottom: pathname === '/' ? '2px solid #934707' : '2px solid transparent' }}>
              Inicio
            </Link>
            <Link to="/recetas" className="font-medium text-sm py-5 transition-colors" style={{ color: pathname === '/recetas' ? '#934707' : '#554339', borderBottom: pathname === '/recetas' ? '2px solid #934707' : '2px solid transparent' }}>
              Explorar
            </Link>
          </nav>
          <button className="text-sm font-medium px-4 py-2 rounded-lg transition-all" style={{ color: '#934707' }}>
            Mi cuenta
          </button>
        </div>
      </header>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center py-2 px-5 z-50 border-t" style={{ background: '#f4ede5', borderColor: '#dac2b4' }}>
        <Link to="/" className="flex flex-col items-center justify-center gap-0.5">
          <span className="text-xs font-medium" style={{ color: pathname === '/' ? '#934707' : '#554339' }}>Inicio</span>
        </Link>
        <Link to="/recetas" className="flex flex-col items-center justify-center gap-0.5">
          <span className="text-xs font-medium" style={{ color: pathname === '/recetas' ? '#934707' : '#554339' }}>Explorar</span>
        </Link>
      </nav>
    </>
  )
}

export default Navbar