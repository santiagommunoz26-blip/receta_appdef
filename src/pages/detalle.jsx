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
      <div style={{ background: '#FDF6EE', minHeight: '100vh' }}>
        <Navbar />
        <div style={{ textAlign: 'center', padding: '60px 24px', color: '#A07850' }}>
          <p style={{ fontSize: '16px', marginBottom: '16px' }}>Receta no encontrada.</p>
          <Link to="/recetas" style={{ color: '#D4793A', fontSize: '14px' }}>Volver a recetas</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#FDF6EE', minHeight: '100vh' }}>
      <Navbar />

      {/* Imagen hero */}
      <img
  src={receta.imagen_url}
  alt={receta.titulo}
  style={{ width: '100%', height: '240px', objectFit: 'cover' }}
/>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 24px' }}>

        {/* Encabezado */}
        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '12px', background: '#F5E6CE', color: '#D4793A', padding: '4px 12px', borderRadius: '20px' }}>{receta.categoria}</span>
          <h1 style={{ fontSize: '28px', fontWeight: 500, color: '#4A2C10', marginTop: '12px', marginBottom: '8px', lineHeight: 1.2 }}>{receta.titulo}</h1>
          <p style={{ fontSize: '15px', color: '#8B6040', lineHeight: 1.6 }}>{receta.descripcion}</p>
        </div>

        {/* Datos rápidos */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {[
            { label: 'Tiempo', valor: receta.tiempo },
            { label: 'Dificultad', valor: receta.dificultad },
            { label: 'Porciones', valor: receta.porciones },
          ].map(item => (
            <div key={item.label} style={{ background: '#FFF8F0', border: '0.5px solid #E8D5BC', borderRadius: '12px', padding: '12px 20px', textAlign: 'center', flex: 1, minWidth: '80px' }}>
              <div style={{ fontSize: '11px', color: '#A07850', marginBottom: '4px' }}>{item.label}</div>
              <div style={{ fontSize: '15px', fontWeight: 500, color: '#4A2C10' }}>{item.valor}</div>
            </div>
          ))}
        </div>

        {/* Ingredientes */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#4A2C10', marginBottom: '16px' }}>Ingredientes</h2>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {receta.ingredientes.map((ing, i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#5C3D1E' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4793A', flexShrink: 0 }}></span>
                {ing}
              </li>
            ))}
          </ul>
        </div>

        {/* Pasos */}
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 500, color: '#4A2C10', marginBottom: '16px' }}>Preparación</h2>
          <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {receta.pasos.map((paso, i) => (
              <li key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <span style={{ background: '#D4793A', color: '#FDF6EE', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 500, flexShrink: 0 }}>{i + 1}</span>
                <p style={{ fontSize: '14px', color: '#5C3D1E', lineHeight: 1.6, paddingTop: '4px' }}>{paso}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Volver */}
        <Link to="/recetas" style={{ display: 'inline-block', background: '#D4793A', color: '#FDF6EE', padding: '12px 28px', borderRadius: '30px', fontSize: '14px', textDecoration: 'none' }}>
          Volver a recetas
        </Link>

      </div>
    </div>
  )
}

export default Detalle