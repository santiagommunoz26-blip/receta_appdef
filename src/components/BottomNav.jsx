import { Link, useLocation } from 'react-router-dom';

const items = [
  { to: '/home', icon: 'home', label: 'Inicio', match: ['/home'] },
  { to: '/recetas', icon: 'travel_explore', label: 'Explorar', match: ['/recetas'] },
  { to: '/favoritos', icon: 'favorite', label: 'Favoritos', match: ['/favoritos'] },
  { to: '/ingredientes', icon: 'kitchen', label: 'Despensa', match: ['/ingredientes'] },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 left-0 w-full z-50 bg-surface/95 backdrop-blur-md border-t border-outline-variant shadow-header"
      aria-label="Navegación principal"
    >
      <div className="page-container flex justify-around items-stretch px-gutter-mobile pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        {items.map(({ to, icon, label, match }) => {
          const activo = match.includes(pathname);
          return (
            <Link
              key={to}
              to={to}
              aria-current={activo ? 'page' : undefined}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[72px] min-h-[56px] rounded-card transition-colors active:scale-95 ${
                activo
                  ? 'bg-primary/10 text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
            >
              <span
                className="material-symbols-outlined text-[26px]"
                style={activo ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                {icon}
              </span>
              <span className={`font-label-sm text-label-sm ${activo ? 'font-bold' : ''}`}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
