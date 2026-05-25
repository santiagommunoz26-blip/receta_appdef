import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useDespensa } from '../context/IngredientesContext';
import { useFavoritos } from '../context/FavoritosContext';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import { BRAND } from '../lib/brand';

export default function Perfil() {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const { despensa } = useDespensa();
  const { favoritos } = useFavoritos();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant">
        Cargando…
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
    <div className="min-h-screen bg-background text-on-surface flex flex-col pb-nav-safe">
      <AppHeader pageTitle="Mi perfil" showBack backTo="/home" showAccount={false} showBrand={false} />

      <main className="page-container px-margin-mobile flex flex-col gap-section-gap py-stack-lg">
        <SectionHeader overline={BRAND.name} title="Tu cuenta" description={user.email} />

        <section className="grid grid-cols-2 gap-stack-md" aria-label="Resumen de actividad">
          <div className="bg-primary-container/20 rounded-card p-stack-md border border-outline-variant shadow-card text-center">
            <p className="font-headline-lg text-headline-lg text-primary">{favoritos.length}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Favoritos</p>
          </div>
          <div className="bg-secondary-container/40 rounded-card p-stack-md border border-outline-variant shadow-card text-center">
            <p className="font-headline-lg text-headline-lg text-on-secondary-container">{despensa.length}</p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">En despensa</p>
          </div>
        </section>

        <nav className="flex flex-col gap-2" aria-label="Accesos rápidos">
          <Link
            to="/favoritos"
            className="flex items-center justify-between min-h-[56px] p-4 bg-surface-container-lowest border border-outline-variant rounded-card hover:border-primary/30 transition-colors shadow-card"
          >
            <span className="font-label-lg text-label-lg">Ver favoritos</span>
            <span className="material-symbols-outlined text-primary">chevron_right</span>
          </Link>

          <Link
            to="/ingredientes"
            className="flex items-center justify-between min-h-[56px] p-4 bg-surface-container-lowest border border-outline-variant rounded-card hover:border-primary/30 transition-colors shadow-card"
          >
            <span className="font-label-lg text-label-lg">Editar despensa</span>
            <span className="material-symbols-outlined text-primary">chevron_right</span>
          </Link>
        </nav>

        <Link
          to="/guia-marca"
          className="flex items-center justify-between min-h-[56px] p-4 bg-primary/5 border border-primary/20 rounded-card hover:bg-primary/10 transition-colors"
        >
          <span className="font-label-lg text-label-lg text-primary">Guía de marca Cookora</span>
          <span className="material-symbols-outlined text-primary">palette</span>
        </Link>

        <Button variant="secondary" onClick={cerrarSesion} className="!text-error !border-error/40">
          Cerrar sesión
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}
