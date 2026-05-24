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
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
          <p style={{ fontSize: '14px', color: '#887367' }}>Cargando receta...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#fff8f1', minHeight: '100vh' }} className="pb-24 md:pb-0">
      <Navbar />

      {/* Hero imagen con overlay */}
      <div style={{ position: 'relative', width: '100%', height: '480px', overflow: 'hidden' }}>
        <img
          src={receta.imagen_url}
          alt={receta.titulo}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(30,27,23,0.75) 100%)' }} />
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: '1200px', padding: '0 64px' }}>
          <span style={{ display: 'inline-block', background: '#ffdbc8', color: '#934707', fontSize: '11px', fontWeight: 700, padding: '5px 14px', borderRadius: '20px', marginBottom: '12px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
            {receta.categoria}
          </span>
          <h1 style={{ fontSize: '42px', fontWeight: 700, color: '#ffffff', letterSpacing: '-1px', lineHeight: 1.1, maxWidth: '700px' }}>
            {receta.titulo}
          </h1>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-5 md:px-16 py-12">

        {/* Descripción y datos rápidos */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'start', marginBottom: '48px' }}>
          <p style={{ fontSize: '17px', color: '#554339', lineHeight: 1.7, maxWidth: '600px' }}>
            {receta.descripcion}
          </p>
          <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
            {[
              { label: 'Tiempo', valor: receta.tiempo },
              { label: 'Nivel', valor: receta.dificultad },
              { label: 'Porciones', valor: receta.porciones || '2' },
            ].map(item => (
              <div key={item.label} style={{ textAlign: 'center', padding: '16px 20px', borderRadius: '14px', border: '1px solid #dac2b4', background: '#ffffff', minWidth: '90px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: '#887367', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{item.label}</div>
                <div style={{ fontSize: '16px', fontWeight: 700, color: '#1e1b17' }}>{item.valor}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Separador */}
        <div style={{ borderTop: '1px solid #e8e1da', marginBottom: '48px' }} />

        {/* Contenido */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '48px', marginBottom: '60px' }}>

          {/* Ingredientes */}
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1e1b17', marginBottom: '20px' }}>Ingredientes</h2>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {receta.ingredientes.map((ing, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', border: '1px solid #e8e1da', background: '#ffffff' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#934707', flexShrink: 0 }}></span>
                  <span style={{ fontSize: '14px', color: '#1e1b17' }}>{ing.trim()}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pasos */}
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1e1b17', marginBottom: '20px' }}>Preparación</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {receta.pasos.map((paso, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', padding: '20px', borderRadius: '14px', border: '1px solid #e8e1da', background: '#ffffff' }}>
                  <div style={{ flexShrink: 0, width: '36px', height: '36px', borderRadius: '50%', background: '#934707', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>
                    {i + 1}
                  </div>
                  <p style={{ fontSize: '15px', color: '#554339', lineHeight: 1.7, paddingTop: '6px' }}>{paso.trim()}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Volver */}
        <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '40px' }}>
          <Link to="/recetas" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 32px', borderRadius: '50px', border: '1px solid #dac2b4', background: '#ffffff', color: '#554339', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
            ← Volver a recetas
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Detalle