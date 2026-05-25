import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import RecetaCard from '../components/RecetaCard';
import { useFavoritos } from '../context/FavoritosContext';
import { useRecetas } from '../hooks/useRecetas';
import { Link } from 'react-router-dom';

export default function Favoritos() {
  const { favoritos } = useFavoritos();
  const { recetas, loading } = useRecetas({ soloFavoritos: favoritos });

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col">
      <AppHeader titulo="RecetaFácil" subtitulo="Favoritos" showBack backTo="/recetas" />

      <main className="flex-grow px-margin-mobile pb-32">
        <h1 className="font-headline-lg text-headline-lg text-on-background mb-stack-md">Tus recetas guardadas</h1>

        {loading ? (
          <p className="text-on-surface-variant font-body-md">Cargando...</p>
        ) : recetas.length === 0 ? (
          <div className="text-center py-section-gap">
            <span className="material-symbols-outlined text-outline text-[48px] mb-stack-md block">favorite</span>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-lg">
              Aún no guardaste recetas. Toca el corazón en cualquier resultado.
            </p>
            <Link to="/recetas" className="inline-block px-6 py-3 bg-primary text-on-primary rounded-full font-label-lg text-label-lg">
              Explorar recetas
            </Link>
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