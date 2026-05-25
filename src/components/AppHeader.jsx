import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AppHeader({
  titulo = 'RecetaFácil',
  subtitulo,
  showBack = false,
  backTo = -1,
  showAccount = true,
  rightSlot,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const irAtras = () => {
    if (typeof backTo === 'string') navigate(backTo);
    else navigate(backTo);
  };

  const irCuenta = () => {
    if (user) navigate('/perfil');
    else navigate('/login');
  };

  return (
    <header className="sticky top-0 w-full z-40 flex justify-between items-center px-margin-mobile py-stack-md bg-surface">
      <div className="flex items-center gap-stack-sm min-w-0">
        {showBack ? (
          <button
            type="button"
            onClick={irAtras}
            className="material-symbols-outlined text-primary hover:bg-surface-container rounded-full p-2 transition-colors active:scale-95 duration-150"
            aria-label="Volver"
          >
            arrow_back
          </button>
        ) : null}
        <div className="flex flex-col min-w-0">
          {subtitulo ? (
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider truncate">
              {subtitulo}
            </span>
          ) : null}
          <span className="font-headline-xl text-headline-xl font-extrabold text-primary truncate">{titulo}</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {rightSlot}
        {showAccount ? (
          <button
            type="button"
            onClick={irCuenta}
            className="material-symbols-outlined text-primary hover:bg-surface-container rounded-full p-2 transition-colors active:scale-95 duration-150"
            aria-label={user ? 'Mi perfil' : 'Iniciar sesión'}
          >
            account_circle
          </button>
        ) : null}
      </div>
    </header>
  );
}