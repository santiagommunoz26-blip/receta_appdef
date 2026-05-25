import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import SubstituteModal from '../components/SubstituteModal';
import { useDespensa } from '../context/IngredientesContext';
import { useFavoritos } from '../context/FavoritosContext';
import { obtenerRecetaPorId } from '../hooks/useRecetas';
import {
  expandirDespensa,
  ingredienteCoincide,
  obtenerSustitutos,
  traducirIngrediente,
} from '../lib/recetas';

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { despensa } = useDespensa();
  const { esFavorito, toggle } = useFavoritos();
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sustituciones, setSustituciones] = useState({});
  const [modalIngrediente, setModalIngrediente] = useState(null);

  const despensaKeys = useMemo(() => expandirDespensa(despensa), [despensa]);

  useEffect(() => {
    let activo = true;
    setLoading(true);
    obtenerRecetaPorId(id)
      .then((data) => {
        if (activo) setReceta(data);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });
    return () => {
      activo = false;
    };
  }, [id]);

  const ingredientesUI = useMemo(() => {
    if (!receta) return [];
    return receta.ingredientesList.map((ing, index) => {
      const sustituido = sustituciones[index];
      const nombreMostrar = sustituido || (ing.medida ? `${ing.medida} de ${ing.nombre}` : ing.nombre);
      const tieneDespensa = ingredienteCoincide(ing.nombreOriginal || ing.nombre, despensaKeys);
      const faltante = despensa.length > 0 && !tieneDespensa && !sustituido;
      return { ...ing, index, nombreMostrar, faltante, sustituido };
    });
  }, [receta, sustituciones, despensaKeys, despensa.length]);

  function aplicarSustituto(opcion) {
    if (modalIngrediente == null) return;
    setSustituciones((prev) => ({ ...prev, [modalIngrediente.index]: opcion }));
    setModalIngrediente(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant">
        Cargando receta...
      </div>
    );
  }

  if (!receta) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 px-margin-mobile">
        <p className="font-body-md text-body-md">Receta no encontrada.</p>
        <button type="button" onClick={() => navigate('/recetas')} className="text-primary font-label-lg">
          Volver a resultados
        </button>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen pb-32">
      <header className="sticky top-0 w-full z-40 flex justify-between items-center px-margin-mobile py-stack-md bg-surface">
        <button
          type="button"
          onClick={() => navigate(location.state?.from || '/recetas')}
          className="hover:bg-surface-container rounded-full transition-colors p-2 active:scale-95"
        >
          <span className="material-symbols-outlined text-primary">arrow_back</span>
        </button>
        <span className="font-headline-xl text-headline-xl font-extrabold text-primary">RecetaFácil</span>
        <button
          type="button"
          onClick={() => toggle(receta.id)}
          className="hover:bg-surface-container rounded-full transition-colors p-2 active:scale-95"
        >
          <span
            className="material-symbols-outlined text-primary"
            style={esFavorito(receta.id) ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            favorite
          </span>
        </button>
      </header>

      <div className="w-full h-80 overflow-hidden relative">
        <img className="w-full h-full object-cover" src={receta.imagen_url} alt={receta.nombre} />
        <div className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-sm px-4 py-2 rounded-full border border-outline-variant flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">star</span>
          <span className="font-label-lg text-label-lg">4.8</span>
        </div>
      </div>

      <main className="px-margin-mobile mt-stack-lg">
        <div className="flex flex-col gap-stack-sm mb-stack-lg">
          <h1 className="font-headline-xl text-headline-xl text-on-surface leading-tight">{receta.nombre}</h1>
          <div className="flex flex-wrap gap-stack-md mt-2">
            <div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-2 border border-outline-variant">
              <span className="material-symbols-outlined text-primary text-[20px]">schedule</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant">{receta.tiempo}</span>
            </div>
            <div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-2 border border-outline-variant">
              <span className="material-symbols-outlined text-primary text-[20px]">restaurant_menu</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant">{receta.dificultad}</span>
            </div>
            <div className="bg-surface-container-low px-4 py-2 rounded-xl flex items-center gap-2 border border-outline-variant">
              <span className="material-symbols-outlined text-primary text-[20px]">group</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant">{receta.porciones}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 mb-section-gap flex-wrap">
          <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm">
            {receta.categoria}
          </span>
          {receta.area ? (
            <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm">
              {receta.area}
            </span>
          ) : null}
        </div>

        <section className="flex flex-col gap-stack-md">
          <div className="flex justify-between items-center">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Ingredientes</h2>
            <span className="font-label-sm text-label-sm text-on-surface-variant">{ingredientesUI.length} items</span>
          </div>
          <div className="flex flex-col gap-stack-sm">
            {ingredientesUI.map((ing) => (
              <div
                key={ing.index}
                className={`p-4 rounded-xl border ${
                  ing.faltante
                    ? 'bg-secondary-fixed border-secondary-fixed-dim flex flex-col gap-3'
                    : 'bg-surface-container-lowest border-outline-variant flex items-center justify-between'
                }`}
              >
                <div className="flex items-center gap-4">
                  {ing.faltante ? (
                    <span className="material-symbols-outlined text-on-secondary-container">warning</span>
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  )}
                  <span
                    className={`font-body-md text-body-md ${
                      ing.faltante ? 'text-on-secondary-container font-bold' : 'text-on-surface'
                    }`}
                  >
                    {ing.nombreMostrar}
                    {ing.sustituido ? (
                      <span className="block font-label-sm text-label-sm text-primary mt-1">
                        Sustituye a {ing.nombre}
                      </span>
                    ) : null}
                  </span>
                </div>
                {ing.faltante ? (
                  <>
                    <span className="font-label-sm text-label-sm text-on-secondary-fixed-variant bg-on-secondary-container/10 px-2 py-0.5 rounded self-start">
                      Faltante
                    </span>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setModalIngrediente(ing)}
                        className="font-label-lg text-label-lg text-on-secondary-fixed-variant border border-on-secondary-fixed-variant/30 px-4 py-1.5 rounded-full hover:bg-on-secondary-fixed-variant/5 transition-colors"
                      >
                        Sustituir
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="material-symbols-outlined text-outline-variant">check_circle</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-section-gap">
          <div className="bg-primary-container p-6 rounded-2xl text-on-primary-container">
            <div className="flex items-center gap-3 mb-2">
              <span className="material-symbols-outlined">lightbulb</span>
              <h3 className="font-headline-md text-headline-md">Tip de Chef</h3>
            </div>
            <p className="font-body-md text-body-md opacity-90">
              Usa el modo cocina para seguir los pasos sin perderte. Puedes sustituir ingredientes que no tengas en casa.
            </p>
          </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 w-full p-margin-mobile bg-gradient-to-t from-background via-background/95 to-transparent z-40">
        <Link
          to={`/modo-cocina/${receta.id}`}
          state={{ from: `/detalle/${receta.id}` }}
          className="w-full bg-primary text-on-primary py-5 rounded-[24px] font-headline-md text-headline-md shadow-lg active:scale-95 duration-150 transition-all flex items-center justify-center gap-3"
        >
          <span className="material-symbols-outlined">play_circle</span>
          Iniciar modo cocina
        </Link>
      </div>

      <SubstituteModal
        ingrediente={modalIngrediente ? traducirIngrediente(modalIngrediente.nombre) : null}
        opciones={modalIngrediente ? obtenerSustitutos(modalIngrediente.key) : []}
        onElegir={aplicarSustituto}
        onCerrar={() => setModalIngrediente(null)}
      />
    </div>
  );
}