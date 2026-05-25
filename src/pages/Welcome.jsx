import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BrandWordmark from '../components/BrandWordmark';
import Logo from '../components/Logo';
import Button from '../components/ui/Button';
import { BRAND } from '../lib/brand';
import { isOnboardingDone } from '../lib/onboarding';

export default function Welcome() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate('/home', { replace: true });
  }, [user, loading, navigate]);

  const rutaComenzar = isOnboardingDone() ? '/ingredientes' : '/onboarding';

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      <main className="flex-1 page-container px-margin-mobile flex flex-col items-center justify-center py-section-gap">
        <div className="flex flex-col items-center text-center gap-stack-lg w-full max-w-sm">
          <div className="p-4 rounded-full bg-surface-container-lowest border border-outline-variant shadow-card">
            <Logo size={140} />
          </div>

          <div className="flex flex-col gap-2">
            <BrandWordmark size="lg" className="justify-center" />
            <p className="text-overline text-on-surface-variant">{BRAND.description}</p>
          </div>

          <h1 className="font-headline-lg text-headline-lg text-on-surface leading-snug px-2">
            ¿Qué tienes en casa <span className="text-primary font-brand">hoy?</span>
          </h1>

          <div className="w-full flex flex-col gap-stack-md pt-stack-sm">
            <Button to={rutaComenzar} size="lg" icon="arrow_forward">
              Comenzar
            </Button>
            <Button to="/login" variant="secondary" size="lg">
              Iniciar sesión
            </Button>
            <Button to="/recetas?todas=1" variant="ghost" size="sm">
              Explorar recetas sin registrarme
            </Button>
          </div>
        </div>
      </main>

      <footer className="page-container px-margin-mobile pb-stack-lg text-center">
        <p className="font-label-sm text-label-sm text-on-surface-variant">{BRAND.tagline}.</p>
      </footer>
    </div>
  );
}
