import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/navbar'
import { supabase } from '../lib/supabase'

function Detalle() {
  const { id } = useParams()
  const [receta, setReceta] = useState(null)

  useEffect(() => {
    async function cargar() {
      const { data } = await supabase.from('recetas').select('*').eq('id', id).single()
      if (data) {
        setReceta({
          ...data,
          ingredientes: data.ingredientes ? data.ingredientes.split(',') : [],
          pasos: data.pasos ? data.pasos.split('.').filter(p => p.trim() !== '') : [],
        })
      }
    }
    cargar()
  }, [id])

  if (!receta) {
    return (
      <div style={{ background: '#fff8f1', minHeight: '100vh' }}>
        <Navbar />
        <div className="flex items-center justify-center h-64">
          <p className="text-sm" style={{ color: '#554339' }}>Cargando receta...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24 md:pb-0" style={{ background: '#fff8f1', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero imagen */}
      <div className="w-full overflow-hidden" style={{ height: '420px' }}>
        <img
          src={receta.imagen_url}
          alt={receta.titulo}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-[1200px] mx-auto px-5 md:px-16 -mt-12 relative z-10">

        {/* Header card */}
        <div className="rounded-2xl p-6 md:p-10 mb-10 border" style={{ background: '#ffffff', borderColor: '#dac2b4' }}>
          <div className="flex flex-col gap-3">
            <span className="inline-flex w-fit px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider" style={{ background: '#f4ede5', color: '#554339' }}>
              {receta.categoria}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight" style={{ color: '#1e1b17' }}>
              {receta.titulo}
            </h1>
            <p className="text-base leading-relaxed max-w-2xl" style={{ color: '#554339' }}>
              {receta.descripcion}
            </p>
          </div>

          {/* Datos rápidos */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Tiempo', valor: receta.tiempo },
              { label: 'Nivel', valor: receta.dificultad },
              { label: 'Porciones', valor: receta.porciones || '2 pers' },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center text-center p-4 rounded-xl border" style={{ background: '#fff8f1', borderColor: '#dac2b4' }}>
                <span className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#554339' }}>{item.label}</span>
                <span className="text-base font-bold" style={{ color: '#1e1b17' }}>{item.valor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">

          {/* Ingredientes */}
          <section className="lg:col-span-4">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e1b17' }}>Ingredientes</h2>
            <ul className="space-y-3">
              {receta.ingredientes.map((ing, i) => (
                <li key={i} className="flex items-center gap-3 p-3 rounded-xl border" style={{ background: '#f9f3eb', borderColor: '#dac2b4' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#934707' }}></span>
                  <span className="text-sm" style={{ color: '#1e1b17' }}>{ing.trim()}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Pasos */}
          <section className="lg:col-span-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#1e1b17' }}>Preparación</h2>
            <div className="space-y-4">
              {receta.pasos.map((paso, i) => (
                <div key={i} className="flex gap-4 items-start p-5 rounded-xl border" style={{ background: '#ffffff', borderColor: '#dac2b4' }}>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: '#934707', color: '#ffffff' }}>
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed pt-2" style={{ color: '#554339' }}>{paso.trim()}</p>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Volver */}
        <div className="flex justify-center mb-20">
          <Link to="/recetas" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold border transition-all" style={{ background: '#ffffff', borderColor: '#dac2b4', color: '#554339', textDecoration: 'none' }}>
            ← Volver a recetas
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Detalle