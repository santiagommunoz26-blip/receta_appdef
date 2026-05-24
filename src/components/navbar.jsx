import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav style={{ background: '#FDF6EE', borderBottom: '0.5px solid #E8D5BC', padding: '0 24px', height: '64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

      <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <span style={{ fontSize: '22px', fontWeight: 700, color: '#4A2C10', letterSpacing: '-1px' }}>
          cook<span style={{ color: '#D4793A' }}>ora</span>
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <Link to="/" style={{ textDecoration: 'none', fontSize: '14px', color: pathname === '/' ? '#D4793A' : '#A07850', fontWeight: pathname === '/' ? 500 : 400, borderBottom: pathname === '/' ? '2px solid #D4793A' : '2px solid transparent', paddingBottom: '4px', whiteSpace: 'nowrap' }}>
          Inicio
        </Link>
        <Link to="/recetas" style={{ textDecoration: 'none', fontSize: '14px', color: pathname === '/recetas' ? '#D4793A' : '#A07850', fontWeight: pathname === '/recetas' ? 500 : 400, borderBottom: pathname === '/recetas' ? '2px solid #D4793A' : '2px solid transparent', paddingBottom: '4px', whiteSpace: 'nowrap' }}>
          Explorar
        </Link>
        <Link to="/recetas" style={{ textDecoration: 'none', fontSize: '13px', color: '#A07850', border: '0.5px solid #E8D5BC', padding: '8px 16px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
          Mi cuenta
        </Link>
      </div>

    </nav>
  )
}

export default Navbar