import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDespensa } from '../context/IngredientesContext';
import { useFavoritos } from '../context/FavoritosContext';
import AppHeader from '../components/AppHeader';

export default function Perfil() {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const { despensa } = useDespensa();
  const { favoritos } = useFavoritos();

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center text-on-surface-variant">
        Cargando...
      </div>
    );
  }

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  async function cerrarSesion() {
    await signOut();
    navigate('/');
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col pb-stack-lg">
      <AppHeader titulo="Mi perfil" showBack backTo="/home" showAccount={false} />

      <main className="px-margin-mobile flex flex-col gap-section-gap">
        <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-stack-lg">
          <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-2">Cuenta</p>
          <p className="font-headline-md text-headline-md text-on-surface">{user.email}</p>
        </section>

        <section className="grid grid-cols-2 gap-stack-md">
          <div className="bg-primary-container/20 rounded-xl p-stack-md border border-outline-variant">
            <p className="font-headline-lg text-headline-lg text-primary">{favoritos.length}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Favoritos</p>
          </div>
          <div className="bg-secondary-container/30 rounded-xl p-stack-md border border-outline-variant">
            <p className="font-headline-lg text-headline-lg text-on-secondary-container">{despensa.length}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">En despensa</p>
          </div>
        </section>

        <Link
          to="/favoritos"
          className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:bg-surface-container transition-colors"
        >
          <span className="font-label-lg text-label-lg">Ver favoritos</span>
          <span className="material-symbols-outlined text-primary">chevron_right</span>
        </Link>

        <Link
          to="/ingredientes"
          className="flex items-center justify-between p-4 bg-surface-container-lowest border border-outline-variant rounded-xl hover:bg-surface-container transition-colors"
        >
          <span className="font-label-lg text-label-lg">Editar despensa</span>
          <span className="material-symbols-outlined text-primary">chevron_right</span>
        </Link>

        <button
          type="button"
          onClick={cerrarSesion}
          className="w-full py-4 border border-error text-error rounded-[24px] font-label-lg text-label-lg active:scale-95 transition-transform"
        >
          Cerrar sesión
        </button>
      </main>
    </div>
  );
}