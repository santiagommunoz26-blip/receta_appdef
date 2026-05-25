import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BrandWordmark from '../components/BrandWordmark';
import Logo from '../components/Logo';
import Button from '../components/ui/Button';
import { BRAND } from '../lib/brand';

export default function Login() {
  const navigate = useNavigate();
  const { signIn, signUp, user, loading: authLoading } = useAuth();
  const [modo, setModo] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (!authLoading && user) navigate('/home', { replace: true });
  }, [user, authLoading, navigate]);

  if (authLoading || user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant font-body-md">
        Cargando…
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMensaje('');
    setCargando(true);
    try {
      if (modo === 'login') {
        await signIn(email.trim(), password);
        navigate('/home');
      } else {
        await signUp(email.trim(), password);
        setMensaje('Cuenta creada. Revisa tu correo si se requiere confirmación, o inicia sesión.');
        setModo('login');
      }
    } catch (err) {
      setMensaje(err.message || 'No se pudo completar la operación.');
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      <div className="page-container px-margin-mobile pt-stack-md">
        <Link
          to="/welcome"
          className="inline-flex items-center justify-center w-11 h-11 rounded-full text-primary hover:bg-surface-container transition-colors"
          aria-label="Volver"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
      </div>

      <main className="page-container flex-1 px-margin-mobile flex flex-col justify-center w-full pb-stack-lg">
        <div className="flex flex-col items-center text-center gap-stack-md mb-section-gap">
          <Logo size={72} />
          <BrandWordmark size="md" />
          <p className="font-body-md text-body-md text-on-surface-variant">{BRAND.tagline}</p>
        </div>

        <h1 className="font-headline-lg text-headline-lg text-on-surface text-center mb-2">
          {modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant text-center mb-section-gap">
          Guarda favoritos y sincroniza tu despensa en todos tus dispositivos.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md" noValidate>
          <div>
            <label htmlFor="email" className="font-label-sm text-label-sm text-on-surface-variant block mb-2">
              Correo
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[52px] bg-surface-container-lowest border border-outline-variant rounded-card py-3 px-4 font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none shadow-card"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="font-label-sm text-label-sm text-on-surface-variant block mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete={modo === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full min-h-[52px] bg-surface-container-lowest border border-outline-variant rounded-card py-3 px-4 font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none shadow-card"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {mensaje ? (
            <p className="font-label-sm text-label-sm text-error bg-error-container/30 p-3 rounded-card" role="alert">
              {mensaje}
            </p>
          ) : null}

          <Button type="submit" disabled={cargando} size="lg">
            {cargando ? 'Cargando…' : modo === 'login' ? 'Entrar' : 'Registrarme'}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => {
            setModo(modo === 'login' ? 'signup' : 'login');
            setMensaje('');
          }}
          className="mt-stack-lg font-label-lg text-label-lg text-primary text-center w-full min-h-[48px] py-2 active:scale-95"
        >
          {modo === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>

        <Link
          to="/ingredientes"
          className="mt-stack-md text-center font-label-sm text-label-sm text-on-surface-variant block py-2"
        >
          Continuar sin cuenta
        </Link>
      </main>
    </div>
  );
}
