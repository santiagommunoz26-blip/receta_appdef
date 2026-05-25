import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

export default function Welcome() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) navigate('/home', { replace: true });
  }, [user, loading, navigate]);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col items-center">
      <div className="w-full px-margin-mobile pt-stack-md flex justify-start">
        <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Bienvenida</span>
      </div>

      <main className="flex-grow w-full max-w-md px-margin-mobile flex flex-col items-center justify-center space-y-section-gap">
        <div className="flex flex-col items-center space-y-stack-md">
          <div className="w-48 h-48 bg-surface-container-lowest rounded-full flex items-center justify-center border border-outline-variant shadow-sm">
            <Logo size={160} />
          </div>
          <h1 className="font-headline-xl text-headline-xl text-primary font-extrabold text-center">RecetaFácil</h1>
        </div>

        <div className="w-full flex flex-col items-center space-y-stack-lg">
          <p className="font-headline-lg text-headline-lg text-on-surface text-center px-4">
            ¿Qué tienes en casa hoy?
          </p>
          <div className="w-full flex flex-col items-center space-y-stack-md pt-stack-md">
            <Link
              to="/ingredientes"
              className="w-full py-4 bg-primary text-on-primary font-headline-md text-headline-md rounded-[24px] text-center active:scale-95 transition-transform duration-150 ease-in-out"
            >
              Empezar
            </Link>
            <Link
              to="/login"
              className="w-full py-4 bg-transparent text-primary font-label-lg text-label-lg rounded-[24px] text-center active:scale-95 transition-transform duration-150 ease-in-out"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full py-stack-lg flex flex-col items-center space-y-stack-sm opacity-60">
        <div className="flex space-x-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <div className="w-2 h-2 rounded-full bg-outline-variant" />
          <div className="w-2 h-2 rounded-full bg-outline-variant" />
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">Cocina sin estrés.</span>
      </footer>
    </div>
  );
}
