import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'

const recetas = [
  { id: 1, titulo: 'Pancakes de avena y miel', tiempo: '20 min', dificultad: 'Fácil', categoria: 'Desayunos' },
  { id: 2, titulo: 'Pasta al pesto casero', tiempo: '35 min', dificultad: 'Media', categoria: 'Almuerzos' },
  { id: 3, titulo: 'Galletas de chocolate', tiempo: '45 min', dificultad: 'Fácil', categoria: 'Postres' },
  { id: 4, titulo: 'Cazuela de verduras', tiempo: '50 min', dificultad: 'Media', categoria: 'Almuerzos' },
  { id: 5, titulo: 'Smoothie de frutas', tiempo: '10 min', dificultad: 'Fácil', categoria: 'Bebidas' },
  { id: 6, titulo: 'Tostadas con aguacate', tiempo: '15 min', dificultad: 'Fácil', categoria: 'Desayunos' },
  { id: 7, titulo: 'Sopa de tomate casera', tiempo: '30 min', dificultad: 'Fácil', categoria: 'Almuerzos' },
  { id: 8, titulo: 'Brownie de chocolate', tiempo: '40 min', dificultad: 'Media', categoria: 'Postres' },
  { id: 9, titulo: 'Limonada de jengibre', tiempo: '10 min', dificultad: 'Fácil', categoria: 'Bebidas' },
]

const categorias = ['Todos', 'Desayunos', 'Almuerzos', 'Postres', 'Bebidas']

function Recetas() {
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  const filtradas = recetas.filter(r => {
    const coincideCategoria = categoriaActiva === 'Todos' || r.categoria === categoriaActiva
    const coincideBusqueda = r.titulo.toLowerCase().includes(busqueda.toLowerCase())
    return coincideCategoria && coincideBusqueda
  })

  return (
    <div style={{ background: '#FDF6EE', minHeight: '100vh' }}>
      <Navbar />

      {/* Encabezado */}
      <div style={{ padding: '32px 24px 16px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 500, color: '#4A2C10', marginBottom: '16px' }}>
          Explorar recetas
        </h1>
        <input
          type="text"
          placeholder="Buscar recetas..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          style={{ width: '100%', maxWidth: '420px', border: '0.5px solid #E8D5BC', background: '#FFF8F0', borderRadius: '30px', padding: '10px 20px', fontSize: '14px', color: '#4A2C10', outline: 'none' }}
        />
      </div>

      {/* Categorías */}
      <div style={{ padding: '0 24px 16px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {categorias.map(cat => (
          <button
            key={cat}
            onClick={() => setCategoriaActiva(cat)}
            style={{ padding: '8px 18px', borderRadius: '20px', fontSize: '13px', cursor: 'pointer', border: '0.5px solid #E8D5BC', background: cat === categoriaActiva ? '#D4793A' : '#FDF6EE', color: cat === categoriaActiva ? '#FDF6EE' : '#8B6040' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de recetas */}
      <div style={{ padding: '0 24px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
        {filtradas.map(r => (
          <Link to={`/detalle/${r.id}`} key={r.id} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#FFF8F0', borderRadius: '12px', border: '0.5px solid #E8D5BC', overflow: 'hidden' }}>
              <div style={{ height: '130px', background: '#FDEBD0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#A07850' }}>
                imagen
              </div>
              <div style={{ padding: '12px' }}>
                <div style={{ fontSize: '13px', fontWeight: 500, color: '#4A2C10', marginBottom: '8px', lineHeight: 1.3 }}>{r.titulo}</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: '#A07850' }}>{r.tiempo}</span>
                  <span style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '10px', background: '#F5E6CE', color: '#D4793A' }}>{r.dificultad}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {filtradas.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#A07850', fontSize: '14px' }}>
            No se encontraron recetas.
          </div>
        )}
      </div>
    </div>
  )
}

export default Recetas