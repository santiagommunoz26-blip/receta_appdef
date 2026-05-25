import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import RecetaCard from '../components/RecetaCard';
import { useAuth } from '../context/AuthContext';
import { useRecetas } from '../hooks/useRecetas';

const categorias = ['Todos', 'Postres', 'Vegetariano', 'Pollo', 'Carnes', 'Mariscos', 'Acompañamientos', 'Variado'];

export default function Home() {
  const { user } = useAuth();
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const { recetas, loading } = useRecetas();

  const filtradas =
    categoriaActiva === 'Todos'
      ? recetas
      : recetas.filter((r) => r.categoria === categoriaActiva);

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col pb-24">
      <AppHeader
        titulo="RecetaFácil"
        subtitulo={user ? `Hola, ${user.email?.split('@')[0]}` : 'Explorar'}
        showAccount
      />

      <main className="px-margin-mobile flex flex-col gap-stack-lg">
        <section>
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">
            Bienvenido
          </p>
          <h2 className="font-headline-xl text-headline-xl text-on-surface leading-tight mb-2">
            ¿Qué tienes en casa <span className="text-primary">hoy?</span>
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
            Descubre recetas con lo que ya tienes.
          </p>
          <Link
            to="/ingredientes"
            className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-lg text-label-lg active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">grocery</span>
            Buscar por ingredientes
          </Link>
        </section>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categorias.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoriaActiva(cat)}
              className={`px-4 py-2 rounded-full font-label-sm text-label-sm whitespace-nowrap border-2 transition-colors ${
                cat === categoriaActiva
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-on-surface-variant">Cargando recetas...</p>
        ) : (
          <div className="flex flex-col gap-stack-md">
            {filtradas.map((receta) => (
              <RecetaCard key={receta.id} receta={receta} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}