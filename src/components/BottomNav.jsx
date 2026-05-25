import { Link, useLocation } from 'react-router-dom';

const items = [
  { to: '/home', icon: 'home', label: 'Home', match: ['/home'] },
  { to: '/recetas', icon: 'search', label: 'Search', match: ['/recetas'] },
  { to: '/favoritos', icon: 'favorite', label: 'Favorites', match: ['/favoritos'] },
  { to: '/ingredientes', icon: 'grocery', label: 'Pantry', match: ['/ingredientes'] },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-gutter-mobile py-2 bg-surface border-t border-outline-variant">
      {items.map(({ to, icon, label, match }) => {
        const activo = match.includes(pathname);
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center justify-center p-2 rounded-full transition-colors active:scale-90 duration-100 ${
              activo
                ? 'bg-secondary-container text-on-secondary-container px-4 py-1'
                : 'text-on-surface-variant hover:bg-surface-variant'
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={activo ? { fontVariationSettings: "'FILL' 1" } : undefined}
            >
              {icon}
            </span>
            <span className="font-label-sm text-label-sm">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}