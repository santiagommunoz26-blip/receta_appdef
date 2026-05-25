import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import RecetaCard from '../components/RecetaCard';
import { useDespensa } from '../context/IngredientesContext';
import { useRecetas } from '../hooks/useRecetas';

export default function Recetas() {
  const [params] = useSearchParams();
  const verTodas = params.get('todas') === '1';
  const { despensa } = useDespensa();
  const filtroDespensa = verTodas ? [] : despensa;
  const { recetas, loading, error } = useRecetas({ filtrarPorDespensa: filtroDespensa });

  const tituloResultados = useMemo(() => {
    if (verTodas || !despensa.length) return 'Todas las recetas';
    return 'Recetas para ti';
  }, [verTodas, despensa.length]);

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <AppHeader titulo="RecetaFácil" subtitulo="Resultados" showBack backTo="/ingredientes" />

      <main className="flex-grow px-margin-mobile pb-32">
        <div className="pt-stack-md pb-stack-lg">
          <div className="flex items-baseline justify-between gap-2">
            <h1 className="font-headline-lg text-headline-lg text-on-background">{tituloResultados}</h1>
            <span className="font-label-lg text-label-lg text-primary bg-primary-container/10 px-3 py-1 rounded-full shrink-0">
              {recetas.length} resultados
            </span>
          </div>
          {!verTodas && despensa.length > 0 ? (
            <p className="font-label-sm text-label-sm text-on-surface-variant mt-2">
              Según: {despensa.join(', ')}
            </p>
          ) : null}
        </div>

        {loading ? (
          <p className="text-on-surface-variant">Buscando recetas...</p>
        ) : error ? (
          <p className="text-error font-body-md">{error}</p>
        ) : recetas.length === 0 ? (
          <div className="text-center py-section-gap">
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
              No encontramos recetas con esos ingredientes. Prueba agregar más o ver todas.
            </p>
            <a href="/recetas?todas=1" className="text-primary font-label-lg text-label-lg underline">
              Ver catálogo completo
            </a>
          </div>
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