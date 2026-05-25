import { calcularMatchReceta } from '../lib/recetas';
import { useDespensa } from '../context/IngredientesContext';

export default function MatchBadge({ receta, className = '' }) {
  const { despensa } = useDespensa();
  const match = calcularMatchReceta(receta, despensa);
  if (!match) return null;

  const color =
    match.porcentaje >= 80
      ? 'bg-primary text-on-primary'
      : match.porcentaje >= 55
        ? 'bg-primary-container/20 text-primary border border-primary/25'
        : 'bg-secondary-container/60 text-on-secondary-container';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-1 rounded-pill ${color}`}>
          <span className="material-symbols-outlined text-[14px]">inventory_2</span>
          {match.etiqueta}
        </span>
        <span className="font-label-sm text-label-sm text-on-surface-variant tabular-nums">
          {match.coincidencias}/{match.total}
        </span>
      </div>
      <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden" role="presentation">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 motion-safe:transition-all"
          style={{ width: `${match.porcentaje}%` }}
        />
      </div>
    </div>
  );
}
