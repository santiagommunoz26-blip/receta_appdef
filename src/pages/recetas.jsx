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
    <div className="pb-24 md:pb-0" style={{ background: '#fff8f1', minHeight: '100vh' }}>
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-5 md:px-16 pt-10 pb-20">

        {/* Encabezado */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight mb-2" style={{ color: '#1e1b17' }}>Explorar recetas</h1>
          <p className="text-sm" style={{ color: '#554339' }}>Encuentra tu próxima receta favorita</p>
        </div>

        {/* Búsqueda */}
        <div className="relative max-w-2xl mb-6">
          <input
            className="w-full pl-5 pr-4 py-4 text-sm rounded-xl outline-none border transition-all"
            style={{ background: '#ffffff', borderColor: '#dac2b4', color: '#1e1b17' }}
            placeholder="Buscar recetas, ingredientes..."
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
        </div>

        {/* Categorías */}
        <div className="flex gap-3 overflow-x-auto pb-2 mb-8">
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtradas.map(r => (
            <Link to={`/detalle/${r.id}`} key={r.id} className="group" style={{ textDecoration: 'none' }}>
              <div className="relative overflow-hidden rounded-xl mb-3 border" style={{ aspectRatio: '4/3', background: '#f9f3eb', borderColor: '#dac2b4' }}>
                <img
                  src={r.imagen_url}
                  alt={r.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <div className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: '#ffdbc8', color: '#934707' }}>
                    {r.categoria}
                  </div>
                </div>
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold group-hover:text-amber-700 transition-colors" style={{ color: '#1e1b17' }}>{r.titulo}</h3>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: '#554339' }}>{r.tiempo}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: '#f4ede5', color: '#554339' }}>{r.dificultad}</span>
                </div>
              </div>
            </Link>
          ))}
          {filtradas.length === 0 && (
            <div className="col-span-3 text-center py-20 text-sm" style={{ color: '#554339' }}>
              No se encontraron recetas.
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default Recetas