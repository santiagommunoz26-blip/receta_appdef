import { useMemo, useState } from 'react';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import RecetaCard from '../components/RecetaCard';
import EmptyState from '../components/EmptyState';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { useRecetas } from '../hooks/useRecetas';

export default function Home() {
  const { user } = useAuth();
  const [categoriaActiva, setCategoriaActiva] = useState('Todos');
  const { recetas, loading } = useRecetas();

  const categorias = useMemo(() => {
    const cats = [...new Set(recetas.map((r) => r.categoria).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, 'es')
    );
    return ['Todos', ...cats];
  }, [recetas]);

  const filtradas =
    categoriaActiva === 'Todos' ? recetas : recetas.filter((r) => r.categoria === categoriaActiva);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col pb-nav-safe">
      <AppHeader showBrand pageTitle={user ? `Hola, ${user.email?.split('@')[0]}` : undefined} />

      <main className="page-container md:max-w-2xl px-margin-mobile flex flex-col gap-section-gap py-stack-lg">
        <section className="bg-surface-container-lowest rounded-card border border-outline-variant p-stack-lg shadow-card">
          <SectionHeader
            overline="Tu cocina"
            title="¿Qué cocinamos hoy?"
            description="Indica qué ingredientes tienes y te sugerimos recetas a tu medida."
          />
          <Button to="/ingredientes" icon="kitchen" className="mt-stack-md">
            Buscar por despensa
          </Button>
        </section>

        <section>
          <SectionHeader overline="Catálogo" title="Explorar por categoría" />
          {loading ? (
            <div className="flex gap-2 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 w-24 rounded-pill bg-surface-container animate-pulse shrink-0" />
              ))}
            </div>
          ) : (
            <div
              className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide"
              role="tablist"
              aria-label="Filtrar categorías"
            >
              {categorias.map((cat) => {
                const activa = cat === categoriaActiva;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={activa}
                    onClick={() => setCategoriaActiva(cat)}
                    className={`shrink-0 min-h-[40px] px-4 rounded-pill font-label-sm text-label-sm border-2 transition-colors ${
                      activa
                        ? 'bg-primary text-on-primary border-primary shadow-sm'
                        : 'bg-surface-container-lowest text-on-surface-variant border-outline-variant hover:border-primary/30'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <SectionHeader
            title={`${filtradas.length} recetas`}
            description={loading ? 'Cargando catálogo…' : 'Toca una tarjeta para ver el detalle.'}
          />
          {loading ? (
            <div className="flex flex-col gap-stack-md animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 rounded-card bg-surface-container" />
              ))}
            </div>
          ) : filtradas.length === 0 ? (
            <EmptyState
              variant="search"
              title="Sin resultados"
              description="No hay recetas en esta categoría. Prueba otra o explora el catálogo completo."
              action={<Button to="/recetas?todas=1" variant="tonal">Ver todas</Button>}
            />
          ) : (
            <div className="flex flex-col gap-stack-md">
              {filtradas.map((receta) => (
                <RecetaCard key={receta.id} receta={receta} />
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
