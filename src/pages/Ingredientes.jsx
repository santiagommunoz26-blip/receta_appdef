import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import StickyCta from '../components/ui/StickyCta';
import EmptyState from '../components/EmptyState';
import { useDespensa } from '../context/IngredientesContext';
import { useToast } from '../context/ToastContext';
import { SUGERIDOS_POPULARES, normalizarIngrediente } from '../lib/recetas';

const CATALOGO_BUSQUEDA = [
  ...SUGERIDOS_POPULARES,
  'Ajo', 'Cebolla', 'Pollo', 'Arroz', 'Huevo', 'Leche', 'Mantequilla', 'Queso', 'Papa',
  'Champiñones', 'Pimiento', 'Zanahoria', 'Limón', 'Harina', 'Azúcar', 'Garbanzos', 'Lentejas',
  'Aceite de oliva', 'Perejil', 'Tomate cherry', 'Atún', 'Salmón', 'Crema', 'Yogur',
];

export default function Ingredientes() {
  const navigate = useNavigate();
  const { despensa, agregar, quitar } = useDespensa();
  const { show } = useToast();
  const [busqueda, setBusqueda] = useState('');

  const sugeridosFiltrados = useMemo(() => {
    const q = normalizarIngrediente(busqueda);
    const enDespensa = new Set(despensa.map((d) => normalizarIngrediente(d)));
    return [...new Set(CATALOGO_BUSQUEDA)]
      .filter((nombre) => {
        if (enDespensa.has(normalizarIngrediente(nombre))) return false;
        if (!q) return SUGERIDOS_POPULARES.includes(nombre) || nombre.length <= 12;
        return normalizarIngrediente(nombre).includes(q);
      })
      .slice(0, 12);
  }, [busqueda, despensa]);

  function agregarIng(nombre) {
    if (agregar(nombre)) show(`Añadido: ${nombre}`);
    else show('Ya está en tu despensa', 'info');
  }

  function agregarDesdeBusqueda() {
    const texto = busqueda.trim();
    if (!texto) return;
    agregarIng(texto);
    setBusqueda('');
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col pb-[calc(11rem+env(safe-area-inset-bottom,0px))]">
      <AppHeader pageTitle="Tu despensa" showBack backTo="/home" showBrand={false} showAccount />

      <main className="page-container px-margin-mobile flex flex-col gap-section-gap py-stack-lg">
        <SectionHeader
          overline="Paso 1"
          title="¿Qué tienes disponible?"
          description="Añade lo que tengas en casa. Agrupamos ingredientes similares para encontrar recetas viables."
        />

        <label className="relative block">
          <span className="sr-only">Buscar ingrediente</span>
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant pointer-events-none">
            search
          </span>
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregarDesdeBusqueda()}
            placeholder="Ej. tomate, pollo, arroz…"
            className="w-full min-h-[52px] bg-surface-container-lowest border border-outline-variant rounded-card py-3 pl-12 pr-24 font-body-md text-body-md focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow shadow-card"
          />
          {busqueda.trim() ? (
            <button
              type="button"
              onClick={agregarDesdeBusqueda}
              className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[40px] px-4 bg-primary text-on-primary rounded-btn font-label-sm text-label-sm font-bold active:scale-95"
            >
              Añadir
            </button>
          ) : null}
        </label>

        <section>
          <SectionHeader
            title="En tu despensa"
            description={despensa.length ? `${despensa.length} ingredientes listos` : 'Aún no agregaste ninguno.'}
          />
          {despensa.length === 0 ? (
            <EmptyState
              variant="pantry"
              title="Despensa vacía"
              description="Toca un sugerido o escribe en el buscador para empezar."
            />
          ) : (
            <div className="flex flex-wrap gap-2" role="list">
              {despensa.map((ing) => (
                <div
                  key={ing}
                  role="listitem"
                  className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container pl-4 pr-2 py-2 rounded-pill shadow-sm"
                >
                  <span className="font-label-lg text-label-lg">{ing}</span>
                  <button
                    type="button"
                    onClick={() => quitar(ing)}
                    className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-on-secondary-container/10 active:scale-95"
                    aria-label={`Quitar ${ing}`}
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <SectionHeader title="Sugeridos" description="Un toque para añadir al instante." />
          <div className="flex flex-wrap gap-2">
            {sugeridosFiltrados.map((ing) => (
              <button
                key={ing}
                type="button"
                onClick={() => agregarIng(ing)}
                className="inline-flex items-center gap-1.5 min-h-[44px] bg-surface-container-lowest text-on-surface-variant border border-outline-variant px-4 rounded-pill hover:border-primary/40 hover:text-primary transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="font-label-lg text-label-lg">{ing}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <StickyCta aboveNav>
        <Button
          onClick={() => navigate(despensa.length ? '/recetas' : '/recetas?todas=1')}
          size="lg"
          icon="restaurant_menu"
        >
          {despensa.length ? 'Ver recetas con mi despensa' : 'Ver catálogo completo'}
        </Button>
      </StickyCta>

      <BottomNav />
    </div>
  );
}
