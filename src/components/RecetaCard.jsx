import { Link, useLocation } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';

export default function RecetaCard({ receta }) {
  const { esFavorito, toggle } = useFavoritos();
  const location = useLocation();

  return (
    <div className="relative">
      <Link
        to={`/detalle/${receta.id}`}
        state={{ from: location.pathname }}
        className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex h-32 hover:bg-surface-container transition-colors cursor-pointer group"
      >
        <div className="w-32 h-full flex-shrink-0">
          <img className="w-full h-full object-cover" src={receta.imagen_url} alt={receta.nombre} />
        </div>
        <div className="p-stack-md flex flex-col justify-between flex-grow pr-10">
          <h2 className="font-label-lg text-label-lg text-on-surface leading-tight line-clamp-2">{receta.nombre}</h2>
          <div className="flex gap-2 flex-wrap">
            <span className="font-label-sm text-label-sm bg-primary-container text-on-primary-container px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">schedule</span> {receta.tiempo}
            </span>
            <span className="font-label-sm text-label-sm bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full">
              {receta.dificultad}
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); toggle(receta.id); }}
        className="absolute top-3 right-3 p-1.5 rounded-full bg-surface/90 border border-outline-variant active:scale-95"
        aria-label="Favorito"
      >
        <span
          className="material-symbols-outlined text-primary text-[20px]"
          style={esFavorito(receta.id) ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          favorite
        </span>
      </button>
    </div>
  );
}