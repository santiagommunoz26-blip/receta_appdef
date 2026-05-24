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
    <div className="pb-24 md:pb-0" style={{ background: '#fff8f1', minHeight: '100vh' }}>
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-16">

        {/* Hero */}
        <section className="flex flex-col lg:flex-row items-center gap-12 py-16">

          {/* Texto izquierda */}
          <div className="flex-1 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase" style={{ background: '#ffdbc8', color: '#934707' }}>
              Más de 200 recetas
            </div>
            <h2 className="text-5xl font-bold leading-tight tracking-tight" style={{ color: '#1e1b17' }}>
              Cocina con<br /><span style={{ color: '#934707' }}>amor</span> y<br />buen sabor
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#554339' }}>
              Descubre recetas artesanales hechas con ingredientes frescos y mucha pasión.
            </p>
            <div className="relative max-w-md">
              <input
                className="w-full px-5 py-4 text-sm rounded-xl outline-none border"
                style={{ background: '#ffffff', borderColor: '#dac2b4', color: '#1e1b17' }}
                placeholder="Buscar recetas, ingredientes..."
                type="text"
              />
            </div>
            <Link to="/recetas" className="inline-block px-8 py-3.5 rounded-full text-sm font-semibold transition-all" style={{ background: '#934707', color: '#ffffff' }}>
              Explorar recetas
            </Link>
          </div>

          {/* Collage derecha */}
          <div className="flex-1 grid grid-cols-2 gap-4" style={{ paddingBottom: '24px' }}>
            {recetas.slice(0, 4).map((r, i) => (
              <Link to={`/detalle/${r.id}`} key={r.id} style={{ display: 'block', transform: i % 2 === 1 ? 'translateY(24px)' : 'none' }}>
                <img
                  src={r.imagen_url}
                  alt={r.titulo}
                  className="w-full object-cover rounded-2xl"
                  style={{ height: i % 2 === 0 ? '180px' : '220px', borderRadius: '16px' }}
                />
              </Link>
            ))}
          </div>
        </section>

        {/* Categorías */}
        <section className="mb-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {categorias.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className="px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: cat === categoriaActiva ? '#934707' : '#f4ede5',
                  color: cat === categoriaActiva ? '#ffffff' : '#554339',
                  border: '0.5px solid',
                  borderColor: cat === categoriaActiva ? '#934707' : '#dac2b4',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Título sección */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold" style={{ color: '#1e1b17' }}>Recetas populares</h3>
          <Link to="/recetas" className="text-sm font-medium" style={{ color: '#934707', textDecoration: 'none' }}>Ver todas →</Link>
        </div>

        {/* Grid de recetas */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filtradas.map(r => (
            <Link to={`/detalle/${r.id}`} key={r.id} className="group cursor-pointer" style={{ textDecoration: 'none' }}>
              <div className="relative overflow-hidden rounded-xl mb-3" style={{ aspectRatio: '4/3', background: '#f9f3eb' }}>
                <img
                  src={r.imagen_url}
                  alt={r.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold" style={{ color: '#1e1b17' }}>{r.titulo}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: '#554339' }}>{r.tiempo}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#ffdbc8', color: '#934707' }}>{r.dificultad}</span>
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