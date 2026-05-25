import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import RecetaCard from '../components/RecetaCard';
import EmptyState from '../components/EmptyState';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import { useFavoritos } from '../context/FavoritosContext';
import { useRecetas } from '../hooks/useRecetas';

export default function Favoritos() {
  const { favoritos } = useFavoritos();
  const { recetas, loading } = useRecetas({ soloFavoritos: favoritos });

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col pb-nav-safe">
      <AppHeader pageTitle="Favoritos" showBack backTo="/home" showBrand={false} />

      <main className="page-container px-margin-mobile flex flex-col gap-section-gap py-stack-lg">
        <SectionHeader
          overline="Tu colección"
          title="Recetas guardadas"
          description="Las que marcaste con el corazón aparecen aquí."
        />

        {loading ? (
          <div className="flex flex-col gap-stack-md animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="h-28 rounded-card bg-surface-container" />
            ))}
          </div>
        ) : recetas.length === 0 ? (
          <EmptyState
            variant="favorites"
            title="Sin favoritos aún"
            description="Toca el corazón en cualquier receta para guardarla aquí."
            action={
              <Button to="/recetas" icon="travel_explore">
                Explorar recetas
              </Button>
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
