import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

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
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant">
        Cargando...
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
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <div className="w-full px-margin-mobile pt-stack-md">
        <Link to="/welcome" className="material-symbols-outlined text-primary inline-flex p-2 hover:bg-surface-container rounded-full">
          arrow_back
        </Link>
      </div>

      <main className="flex-grow px-margin-mobile flex flex-col justify-center max-w-md mx-auto w-full pb-stack-lg">
        <div className="flex justify-center mb-stack-lg">
          <Logo size={80} />
        </div>
        <h1 className="font-headline-xl text-headline-xl text-primary font-extrabold mb-2">
          {modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant mb-section-gap">
          Guarda favoritos y sincroniza tu despensa en todos tus dispositivos.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2">Correo</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-low rounded-xl py-4 px-4 font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none"
              placeholder="tu@correo.com"
            />
          </div>
          <div>
            <label className="font-label-sm text-label-sm text-on-surface-variant block mb-2">Contraseña</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-low rounded-xl py-4 px-4 font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {mensaje ? (
            <p className="font-label-sm text-label-sm text-error bg-error-container/30 p-3 rounded-lg">{mensaje}</p>
          ) : null}

          <button
            type="submit"
            disabled={cargando}
            className="w-full py-4 bg-primary text-on-primary font-headline-md text-headline-md rounded-[24px] active:scale-95 transition-transform disabled:opacity-60"
          >
            {cargando ? 'Cargando...' : modo === 'login' ? 'Entrar' : 'Registrarme'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setModo(modo === 'login' ? 'signup' : 'login');
            setMensaje('');
          }}
          className="mt-stack-lg font-label-lg text-label-lg text-primary text-center w-full py-2"
        >
          {modo === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
        </button>

        <Link
          to="/ingredientes"
          className="mt-stack-md text-center font-label-sm text-label-sm text-outline block"
        >
          Continuar sin cuenta
        </Link>
      </main>
    </div>
  );
}