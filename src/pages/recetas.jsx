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
    <div style={{ background: '#fff8f1', minHeight: '100vh' }} className="pb-24 md:pb-0">
      <Navbar />

      {/* Banner superior */}
      <div style={{ background: '#f4ede5', borderBottom: '1px solid #e8e1da', padding: '40px 0' }}>
        <div className="max-w-[1200px] mx-auto px-5 md:px-16">
          <h1 style={{ fontSize: '40px', fontWeight: 700, color: '#1e1b17', letterSpacing: '-1px', marginBottom: '8px' }}>
            Explorar recetas
          </h1>
          <p style={{ fontSize: '15px', color: '#554339', marginBottom: '24px' }}>
            Encuentra tu próxima receta favorita entre {recetas.length} opciones
          </p>
          {/* Búsqueda */}
          <div style={{ display: 'flex', background: '#ffffff', borderRadius: '14px', border: '1px solid #dac2b4', overflow: 'hidden', maxWidth: '520px' }}>
            <input
              type="text"
              placeholder="Buscar recetas, ingredientes..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{ flex: 1, border: 'none', background: 'transparent', padding: '14px 20px', fontSize: '14px', color: '#1e1b17', outline: 'none' }}
            />
            <button style={{ background: '#934707', border: 'none', padding: '14px 22px', cursor: 'pointer', color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>
              Buscar
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-5 md:px-16 py-10">

        {/* Categorías */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '32px' }}>
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              style={{
                padding: '9px 20px',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                border: '1px solid',
                transition: 'all 0.2s',
                background: cat === categoriaActiva ? '#934707' : '#ffffff',
                color: cat === categoriaActiva ? '#ffffff' : '#554339',
                borderColor: cat === categoriaActiva ? '#934707' : '#dac2b4',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contador */}
        <p style={{ fontSize: '13px', color: '#887367', marginBottom: '20px' }}>
          {filtradas.length} receta{filtradas.length !== 1 ? 's' : ''} encontrada{filtradas.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {filtradas.map(r => (
            <Link to={`/detalle/${r.id}`} key={r.id} style={{ textDecoration: 'none' }}>
              <div
                style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #dac2b4', background: '#ffffff', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                  <img
                    src={r.imagen_url}
                    alt={r.titulo}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#ffdbc8', color: '#934707', fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px' }}>
                    {r.categoria}
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1e1b17', marginBottom: '10px', lineHeight: 1.4 }}>{r.titulo}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '12px', color: '#887367' }}>{r.tiempo}</span>
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#dac2b4' }}></span>
                    <span style={{ fontSize: '12px', color: '#887367' }}>{r.dificultad}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {filtradas.length === 0 && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', color: '#887367', fontSize: '14px' }}>
              No se encontraron recetas.
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default Recetas