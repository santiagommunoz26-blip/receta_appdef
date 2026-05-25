import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BrandWordmark from './BrandWordmark';
import Logo from './Logo';
import { BRAND } from '../lib/brand';

export default function AppHeader({
  pageTitle,
  showBack = false,
  backTo = -1,
  showAccount = true,
  showBrand = true,
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
    <header className="sticky top-0 w-full z-40 bg-surface/95 backdrop-blur-md shadow-header">
      <div className="page-container flex justify-between items-center gap-3 px-margin-mobile py-stack-md min-h-[64px]">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {showBack ? (
            <button
              type="button"
              onClick={irAtras}
              className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full text-primary hover:bg-surface-container transition-colors active:scale-95"
              aria-label="Volver"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          ) : showBrand ? (
            <Logo size={40} className="shrink-0" />
          ) : null}

          <div className="flex flex-col min-w-0">
            {showBrand && !pageTitle ? (
              <>
                <BrandWordmark size="sm" />
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                  {BRAND.tagline}
                </span>
              </>
            ) : (
              <>
                {showBrand ? (
                  <span className="text-overline text-primary truncate">{BRAND.name}</span>
                ) : null}
                {pageTitle ? (
                  <h1 className="font-headline-lg text-headline-lg text-on-surface truncate">{pageTitle}</h1>
                ) : (
                  <BrandWordmark size="sm" />
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {rightSlot}
          {showAccount ? (
            <button
              type="button"
              onClick={irCuenta}
              className="flex items-center justify-center w-11 h-11 rounded-full text-primary hover:bg-surface-container transition-colors active:scale-95"
              aria-label={user ? 'Mi perfil' : 'Iniciar sesión'}
            >
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
