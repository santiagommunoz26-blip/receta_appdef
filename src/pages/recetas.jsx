import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import RecetaCard from '../components/RecetaCard';
import EmptyState from '../components/EmptyState';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import { useDespensa } from '../context/IngredientesContext';
import { useRecetas } from '../hooks/useRecetas';

export default function Recetas() {
  const [params] = useSearchParams();
  const verTodas = params.get('todas') === '1';
  const { despensa } = useDespensa();
  const filtroDespensa = verTodas ? [] : despensa;
  const { recetas, loading, error } = useRecetas({ filtrarPorDespensa: filtroDespensa });

  const tituloResultados = useMemo(() => {
    if (verTodas || !despensa.length) return 'Catálogo completo';
    return 'Recetas para ti';
  }, [verTodas, despensa.length]);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col pb-nav-safe">
      <AppHeader pageTitle="Resultados" showBack backTo="/ingredientes" showBrand={false} />

      <main className="page-container px-margin-mobile flex flex-col gap-section-gap py-stack-lg">
        <SectionHeader
          overline={verTodas || !despensa.length ? 'Explorar' : 'Personalizado'}
          title={tituloResultados}
          description={
            !verTodas && despensa.length > 0
              ? `Con: ${despensa.join(', ')}`
              : 'Descubre platos de todo el mundo.'
          }
          action={
            <span className="inline-flex items-center font-label-lg text-label-lg text-primary bg-primary-container/15 px-3 py-1.5 rounded-pill shrink-0">
              {loading ? '…' : recetas.length}
            </span>
          }
        />

        {loading ? (
          <div className="flex flex-col gap-stack-md animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-28 rounded-card bg-surface-container" />
            ))}
          </div>
        ) : error ? (
          <p className="font-body-md text-body-md text-error bg-error-container/20 p-stack-md rounded-card">{error}</p>
        ) : recetas.length === 0 ? (
          <EmptyState
            variant="search"
            title="Sin coincidencias"
            description="No encontramos recetas con esos ingredientes. Prueba añadir más o explora el catálogo."
            action={
              <>
                <Button to="/recetas?todas=1" variant="tonal">
                  Ver todas las recetas
                </Button>
                <Link to="/ingredientes" className="font-label-sm text-label-sm text-primary underline block text-center mt-3">
                  Editar despensa
                </Link>
              </>
            }
          />
        ) : (
          <div className="flex flex-col gap-stack-md">
            {recetas.map((receta) => (
              <RecetaCard key={receta.id} receta={receta} />
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
}
