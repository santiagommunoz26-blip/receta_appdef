import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/navbar'
import { supabase } from '../lib/supabase'

const categorias = ['Todos', 'Desayunos', 'Almuerzos', 'Postres', 'Bebidas']

function Recetas() {
  const [recetas, setRecetas] = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase.from('recetas').select('*')
      if (data) setRecetas(data)
    }
    cargar()
  }, [])

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
              <img
  src={r.imagen_url}
  alt={r.titulo}
  style={{ width: '100%', height: '130px', objectFit: 'cover' }}
/>
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