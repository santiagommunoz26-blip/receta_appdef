import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { supabase } from '../lib/supabase'

const categorias = ['Todos', 'Desayunos', 'Almuerzos', 'Postres', 'Bebidas']

function Home() {
  const [recetas, setRecetas] = useState([])
  const [categoriaActiva, setCategoriaActiva] = useState('Todos')

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase.from('recetas').select('*')
      if (data) setRecetas(data)
    }
    cargar()
  }, [])

  const filtradas = categoriaActiva === 'Todos'
    ? recetas
    : recetas.filter(r => r.categoria === categoriaActiva)

  return (
    <div style={{ background: '#fff8f1', minHeight: '100vh', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-16">

        {/* Hero */}
        <section className="flex flex-col lg:flex-row items-center gap-16 py-16 min-h-[600px]">

          {/* Texto */}
            <div className="flex-1 space-y-7 flex flex-col justify-center">            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ background: '#ffdbc8', color: '#934707' }}>
              Más de 200 recetas
            </div>
            <h2 style={{ fontSize: '52px', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', color: '#1e1b17' }}>
              Cocina con<br />
              <span style={{ color: '#934707' }}>amor</span> y<br />
              buen sabor
            </h2>
            <p style={{ fontSize: '16px', color: '#554339', lineHeight: 1.7, maxWidth: '380px' }}>
              Descubre recetas artesanales hechas con ingredientes frescos y mucha pasión.
            </p>
            <div style={{ display: 'flex', background: '#ffffff', borderRadius: '14px', border: '1px solid #dac2b4', overflow: 'hidden', maxWidth: '400px' }}>
              <input
                type="text"
                placeholder="Buscar recetas, ingredientes..."
                style={{ flex: 1, border: 'none', background: 'transparent', padding: '14px 20px', fontSize: '14px', color: '#1e1b17', outline: 'none' }}
              />
              <button style={{ background: '#934707', border: 'none', padding: '14px 22px', cursor: 'pointer', color: '#ffffff', fontSize: '13px', fontWeight: 600 }}>
                Buscar
              </button>
            </div>
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              <Link to="/recetas" style={{ display: 'inline-block', background: '#934707', color: '#ffffff', padding: '14px 32px', borderRadius: '50px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                Explorar recetas
              </Link>
              <span style={{ fontSize: '13px', color: '#887367' }}>{recetas.length} recetas disponibles</span>
            </div>
          </div>

          {/* Collage */}
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', paddingBottom: '56px', alignSelf: 'center' }}>
            {recetas.slice(0, 4).map((r, i) => (
              <Link to={`/detalle/${r.id}`} key={r.id} style={{ display: 'block', transform: i % 2 === 1 ? 'translateY(28px)' : 'none' }}>
                <div style={{ position: 'relative', borderRadius: '18px', overflow: 'hidden', border: '1px solid #dac2b4' }}>
                  <img
                    src={r.imagen_url}
                    alt={r.titulo}
                    style={{ width: '100%', height: i % 2 === 0 ? '190px' : '230px', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(30,27,23,0.65))', padding: '24px 14px 14px' }}>
                    <p style={{ color: '#ffffff', fontSize: '12px', fontWeight: 600, margin: 0, lineHeight: 1.3 }}>{r.titulo}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Separador */}
        <div style={{ borderTop: '1px solid #e8e1da', marginBottom: '32px' }} />

        {/* Categorías */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#1e1b17' }}>Recetas populares</h3>
          <Link to="/recetas" style={{ fontSize: '13px', fontWeight: 600, color: '#934707', textDecoration: 'none' }}>Ver todas →</Link>
        </div>

        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '28px' }}>
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

        {/* Grid recetas */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginBottom: '80px' }}>
          {filtradas.map(r => (
            <Link to={`/detalle/${r.id}`} key={r.id} style={{ textDecoration: 'none' }}>
              <div className="group" style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid #dac2b4', background: '#ffffff', transition: 'transform 0.2s' }}
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
        </section>

      </main>
    </div>
  )
}

export default Home