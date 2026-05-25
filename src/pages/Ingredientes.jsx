import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import { useDespensa } from '../context/IngredientesContext';
import { ALIAS_INGREDIENTES, SUGERIDOS_POPULARES, normalizarIngrediente } from '../lib/recetas';

const CATALOGO_BUSQUEDA = [
  ...SUGERIDOS_POPULARES,
  ...Object.keys(ALIAS_INGREDIENTES).map((k) => k.charAt(0).toUpperCase() + k.slice(1)),
  'Garlic', 'Onion', 'Chicken', 'Rice', 'Egg', 'Milk', 'Butter', 'Cheese', 'Salmon', 'Mushrooms',
];

export default function Ingredientes() {
  const navigate = useNavigate();
  const { despensa, agregar, quitar } = useDespensa();
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

  function agregarDesdeBusqueda() {
    const texto = busqueda.trim();
    if (!texto) return;
    agregar(texto);
    setBusqueda('');
  }

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col">
      <AppHeader subtitulo="Ingredientes" showBack backTo="/" />

      <main className="flex-1 px-margin-mobile pt-stack-sm pb-32">
        <div className="mb-stack-lg">
          <h1 className="font-headline-xl text-headline-xl text-primary mb-4">¿Qué tienes disponible?</h1>
          <div className="h-40 w-full rounded-xl overflow-hidden mb-section-gap">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfSOr1pom_vPsFdRHTcQD7ZnuBOlMeyyIZ-Trx-dRpf4-qy4ufWLcJsO6AqxYCSr_biVBWWjhB6usV1JJo0MG0dFclJC8L9qvfajve-VteT8e2gfCIbzk9pr1OCl3uC6KCh7Lt67ycR4cZ8GCHHifaTsFNHt6_zddARWL9gNBxIBppueggElSDOmfFVe873CX4B5m5Q638KH1oWW5ZsdRfUHA1uhlBYGLj81U3CAOBspyFtYAAV-u75QpfHVnd-zcSaLPZ2lql8OYZ"
              alt="Ingredientes frescos"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative mb-section-gap">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregarDesdeBusqueda()}
            placeholder="Busca ingredientes..."
            className="w-full bg-surface-container-low border-none rounded-xl py-4 pl-12 pr-14 font-body-md text-body-md focus:ring-2 focus:ring-primary outline-none transition-all"
          />
          {busqueda.trim() ? (
            <button
              type="button"
              onClick={agregarDesdeBusqueda}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-on-primary px-3 py-1.5 rounded-lg font-label-sm text-label-sm"
            >
              Añadir
            </button>
          ) : null}
        </div>

        <section className="mb-section-gap">
          <div className="flex items-center justify-between mb-stack-md">
            <h2 className="font-headline-md text-headline-md text-on-surface">Agregados</h2>
            <span className="text-label-sm font-label-sm text-outline-variant uppercase tracking-wider">
              {despensa.length} items
            </span>
          </div>
          {despensa.length === 0 ? (
            <p className="font-body-md text-body-md text-on-surface-variant">
              Agrega ingredientes para encontrar recetas que puedas cocinar hoy.
            </p>
          ) : (
            <div className="flex flex-wrap gap-stack-sm">
              {despensa.map((ing) => (
                <div
                  key={ing}
                  className="inline-flex items-center bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full gap-2"
                >
                  <span className="font-label-lg text-label-lg">{ing}</span>
                  <button
                    type="button"
                    onClick={() => quitar(ing)}
                    className="material-symbols-outlined text-[18px] hover:bg-on-secondary-container/10 rounded-full"
                  >
                    close
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-stack-md">Sugeridos</h2>
          <div className="flex flex-wrap gap-stack-sm">
            {sugeridosFiltrados.map((ing) => (
              <button
                key={ing}
                type="button"
                onClick={() => agregar(ing)}
                className="inline-flex items-center bg-surface-container text-on-surface-variant px-4 py-2 rounded-full gap-2 hover:bg-surface-container-highest transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="font-label-lg text-label-lg">{ing}</span>
              </button>
            ))}
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-margin-mobile bg-gradient-to-t from-surface via-surface to-transparent pt-10">
        <button
          type="button"
          onClick={() => navigate(despensa.length ? '/recetas' : '/recetas?todas=1')}
          className="w-full bg-primary text-on-primary py-4 rounded-full font-label-lg text-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          <span>{despensa.length ? 'Ver recetas con mi despensa' : 'Ver todas las recetas'}</span>
          <span className="material-symbols-outlined">restaurant_menu</span>
        </button>
      </div>
    </div>
  );
}