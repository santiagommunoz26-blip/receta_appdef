import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { supabase } from '../lib/supabase'

const categorias = ['Todos', 'Desayunos', 'Almuerzos', 'Postres', 'Bebidas']

function Home() {
  const [recetas, setRecetas] = useState([])

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase.from('recetas').select('*')
      if (data) setRecetas(data)
    }
    cargar()
  }, [])

  return (

    <div style={{ background: '#FDF6EE', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ background: '#F5E6CE', padding: '64px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: '480px' }}>
          <div style={{ display: 'inline-block', background: '#D4793A', color: '#FDF6EE', fontSize: '11px', padding: '5px 14px', borderRadius: '20px', marginBottom: '20px', letterSpacing: '1px', textTransform: 'uppercase' }}>
            Más de 200 recetas
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 700, color: '#4A2C10', lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-1.5px' }}>
            Cocina con<br /><span style={{ color: '#D4793A' }}>amor</span> y<br />buen sabor
          </h1>
          <p style={{ fontSize: '16px', color: '#8B6040', marginBottom: '32px', lineHeight: 1.7 }}>
            Descubre recetas artesanales hechas con ingredientes frescos y mucha pasión.
          </p>
          <div style={{ display: 'flex', background: '#FDF6EE', borderRadius: '30px', border: '0.5px solid #D4793A', overflow: 'hidden', maxWidth: '420px' }}>
            <input
              type="text"
              placeholder="Buscar recetas, ingredientes..."
              style={{ flex: 1, border: 'none', background: 'transparent', padding: '14px 22px', fontSize: '14px', color: '#4A2C10', outline: 'none' }}
            />
            <button style={{ background: '#D4793A', border: 'none', padding: '14px 24px', cursor: 'pointer', color: '#FDF6EE', fontSize: '14px', fontWeight: 500 }}>
              Buscar
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', flexShrink: 0 }}>
          {recetas.slice(0, 4).map((r, i) => (
            <Link to={`/detalle/${r.id}`} key={r.id} style={{ textDecoration: 'none' }}>
              <div style={{ width: '140px', height: '140px', borderRadius: '16px', overflow: 'hidden', position: 'relative', transform: i % 2 === 1 ? 'translateY(16px)' : 'none' }}>
                <img src={r.imagen_url} alt={r.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(74,44,16,0.7))', padding: '8px', borderRadius: '0 0 16px 16px' }}>
                  <div style={{ fontSize: '11px', color: '#FDF6EE', fontWeight: 500, lineHeight: 1.2 }}>{r.titulo}</div>
                </div>
              </div>
            </Link>
          ))}
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
                <img
  src={r.imagen_url}
  alt={r.titulo}
  style={{ width: '100%', height: '110px', objectFit: 'cover' }}
/>
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