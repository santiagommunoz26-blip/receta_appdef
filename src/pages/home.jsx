import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'

const recetas = [
  { id: 1, titulo: 'Pancakes de avena y miel', tiempo: '20 min', dificultad: 'Fácil', categoria: 'Desayunos' },
  { id: 2, titulo: 'Pasta al pesto casero', tiempo: '35 min', dificultad: 'Media', categoria: 'Almuerzos' },
  { id: 3, titulo: 'Galletas de chocolate', tiempo: '45 min', dificultad: 'Fácil', categoria: 'Postres' },
  { id: 4, titulo: 'Cazuela de verduras', tiempo: '50 min', dificultad: 'Media', categoria: 'Almuerzos' },
  { id: 5, titulo: 'Smoothie de frutas', tiempo: '10 min', dificultad: 'Fácil', categoria: 'Bebidas' },
  { id: 6, titulo: 'Tostadas con aguacate', tiempo: '15 min', dificultad: 'Fácil', categoria: 'Desayunos' },
]

const categorias = ['Todos', 'Desayunos', 'Almuerzos', 'Postres', 'Bebidas']

function Home() {
  return (
    <div style={{ background: '#FDF6EE', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: '#F5E6CE', padding: '48px 24px 40px', textAlign: 'center' }}>
        <div style={{ display: 'inline-block', background: '#D4793A', color: '#FDF6EE', fontSize: '12px', padding: '4px 14px', borderRadius: '20px', marginBottom: '16px', letterSpacing: '0.5px' }}>
          Más de 200 recetas
        </div>
        <h1 style={{ fontSize: '36px', fontWeight: 500, color: '#4A2C10', lineHeight: 1.2, marginBottom: '12px' }}>
          Cocina con amor<br />y buen sabor
        </h1>
        <p style={{ fontSize: '15px', color: '#8B6040', maxWidth: '380px', margin: '0 auto 28px', lineHeight: 1.6 }}>
          Descubre recetas artesanales hechas con ingredientes frescos y mucha pasión.
        </p>
        <div style={{ display: 'flex', background: '#FDF6EE', borderRadius: '30px', border: '0.5px solid #D4793A', overflow: 'hidden', maxWidth: '420px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Buscar recetas, ingredientes..."
            style={{ flex: 1, border: 'none', background: 'transparent', padding: '12px 20px', fontSize: '14px', color: '#4A2C10', outline: 'none' }}
          />
          <button style={{ background: '#D4793A', border: 'none', padding: '12px 20px', cursor: 'pointer', color: '#FDF6EE', fontSize: '14px' }}>
            Buscar
          </button>
        </div>
      </div>

      {/* Categorías */}
      <div style={{ padding: '24px 24px 8px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {categorias.map(cat => (
          <button key={cat} style={{ padding: '8px 18px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', border: '0.5px solid #E8D5BC', background: cat === 'Todos' ? '#D4793A' : '#FDF6EE', color: cat === 'Todos' ? '#FDF6EE' : '#8B6040' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Recetas */}
      <div style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <span style={{ fontSize: '17px', fontWeight: 500, color: '#4A2C10' }}>Recetas populares</span>
          <Link to="/recetas" style={{ fontSize: '13px', color: '#D4793A', textDecoration: 'none' }}>Ver todas →</Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {recetas.map(r => (
            <Link to={`/detalle/${r.id}`} key={r.id} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#FFF8F0', borderRadius: '12px', border: '0.5px solid #E8D5BC', overflow: 'hidden' }}>
                <div style={{ height: '110px', background: '#FDEBD0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#A07850' }}>
                  imagen
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#4A2C10', marginBottom: '6px', lineHeight: 1.3 }}>{r.titulo}</div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#A07850' }}>{r.tiempo}</span>
                    <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: '#F5E6CE', color: '#D4793A' }}>{r.dificultad}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home