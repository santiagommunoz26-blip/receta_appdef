import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/navbar'

const recetas = [
  {
    id: 1, titulo: 'Pancakes de avena y miel', tiempo: '20 min', dificultad: 'Fácil', categoria: 'Desayunos', porciones: 4,
    descripcion: 'Unos pancakes esponjosos y nutritivos, perfectos para empezar el día con energía. Hechos con avena integral y endulzados naturalmente con miel.',
    ingredientes: ['1 taza de avena molida', '1 huevo', '1 taza de leche', '2 cucharadas de miel', '1 cucharadita de polvo de hornear', 'Pizca de sal'],
    pasos: ['Mezcla la avena, el polvo de hornear y la sal en un tazón.', 'En otro tazón bate el huevo, la leche y la miel.', 'Une las mezclas hasta obtener una masa homogénea.', 'Calienta una sartén a fuego medio y vierte porciones de masa.', 'Cocina 2-3 minutos por lado hasta dorar.']
  },
  {
    id: 2, titulo: 'Pasta al pesto casero', tiempo: '35 min', dificultad: 'Media', categoria: 'Almuerzos', porciones: 2,
    descripcion: 'Una pasta fresca con pesto hecho en casa, llena de sabor y aroma. El secreto está en usar albahaca fresca y un buen aceite de oliva.',
    ingredientes: ['250g de pasta', '2 tazas de albahaca fresca', '3 dientes de ajo', '50g de piñones', '60ml de aceite de oliva', 'Sal y pimienta al gusto'],
    pasos: ['Cocina la pasta según las instrucciones del paquete.', 'Procesa la albahaca, ajo y piñones en una licuadora.', 'Agrega el aceite de oliva poco a poco mientras procesas.', 'Mezcla el pesto con la pasta caliente.', 'Sirve de inmediato.']
  },
  {
    id: 3, titulo: 'Galletas de chocolate', tiempo: '45 min', dificultad: 'Fácil', categoria: 'Postres', porciones: 12,
    descripcion: 'Galletas crujientes por fuera y suaves por dentro, con trozos generosos de chocolate en cada mordida.',
    ingredientes: ['2 tazas de harina', '1 taza de mantequilla', '3/4 taza de azúcar', '2 huevos', '1 taza de chips de chocolate', '1 cucharadita de vainilla'],
    pasos: ['Precalienta el horno a 180°C.', 'Bate la mantequilla con el azúcar hasta cremar.', 'Agrega los huevos y la vainilla.', 'Incorpora la harina y los chips de chocolate.', 'Forma bolitas y hornea 12 minutos.']
  },
]

function Detalle() {
  const { id } = useParams()
  const receta = recetas.find(r => r.id === parseInt(id))

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
      <div style={{ height: '240px', background: '#FDEBD0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '14px', color: '#A07850' }}>imagen de la receta</span>
      </div>

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