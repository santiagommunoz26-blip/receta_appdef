import { Link, useLocation } from 'react-router-dom';
import { useFavoritos } from '../context/FavoritosContext';
import { useToast } from '../context/ToastContext';
import ImageWithPlaceholder from './ImageWithPlaceholder';
import MatchBadge from './MatchBadge';

export default function RecetaCard({ receta }) {
  const { esFavorito, toggle } = useFavoritos();
  const { show } = useToast();
  const location = useLocation();
  const fav = esFavorito(receta.id);

  function onFavorito(e) {
    e.preventDefault();
    toggle(receta.id);
    show(fav ? 'Quitado de favoritos' : 'Guardado en favoritos', fav ? 'info' : 'success');
  }

  return (
    <article className="relative group motion-safe:transition-transform">
      <Link
        to={`/detalle/${receta.id}`}
        state={{ from: location.pathname }}
        className="flex overflow-hidden bg-surface-container-lowest border border-outline-variant rounded-card shadow-card hover:shadow-card-hover hover:border-primary/20 transition-all duration-200 min-h-[120px] md:min-h-[128px]"
      >
        <ImageWithPlaceholder
          src={receta.imagen_url}
          alt=""
          className="w-[108px] md:w-[120px] shrink-0 min-h-[120px]"
        />
        <div className="flex flex-col justify-between flex-1 p-stack-md pr-12 gap-2">
          <h3 className="font-label-lg text-label-lg text-on-surface leading-snug line-clamp-2">
            {receta.nombre}
          </h3>
          <MatchBadge receta={receta} />
          <div className="flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm bg-surface-container text-on-surface-variant px-2.5 py-1 rounded-pill">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              {receta.tiempo}
            </span>
            <span className="font-label-sm text-label-sm bg-secondary-container/80 text-on-secondary-container px-2.5 py-1 rounded-pill">
              {receta.dificultad}
            </span>
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={onFavorito}
        className={`absolute top-3 right-3 flex items-center justify-center w-10 h-10 rounded-full bg-surface/95 border border-outline-variant shadow-card motion-safe:active:scale-95 ${
          fav ? 'animate-heart-pop motion-reduce:animate-none' : ''
        }`}
        aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      >
        <span
          className="material-symbols-outlined text-primary text-[22px]"
          style={fav ? { fontVariationSettings: "'FILL' 1" } : undefined}
        >
          favorite
        </span>
      </button>
    </article>
  );
}
