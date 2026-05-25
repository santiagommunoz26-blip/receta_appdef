import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import SubstituteModal from '../components/SubstituteModal';
import ImageWithPlaceholder from '../components/ImageWithPlaceholder';
import InstructionsPreview from '../components/InstructionsPreview';
import MatchBadge from '../components/MatchBadge';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import StickyCta from '../components/ui/StickyCta';
import { useDespensa } from '../context/IngredientesContext';
import { useFavoritos } from '../context/FavoritosContext';
import { useToast } from '../context/ToastContext';
import { obtenerRecetaPorId } from '../hooks/useRecetas';
import { expandirDespensa, ingredienteCoincide } from '../lib/recetas';
import { obtenerSustitutosPara } from '../lib/sustituciones';

export default function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { despensa } = useDespensa();
  const { esFavorito, toggle } = useFavoritos();
  const { show } = useToast();
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
    show(`Sustituido por ${opcion}`);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant font-body-md">
        Cargando receta…
      </div>
    );
  }

  if (!receta) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-stack-md px-margin-mobile">
        <p className="font-body-md text-body-md">Receta no encontrada.</p>
        <Button onClick={() => navigate('/recetas')} variant="tonal">
          Volver a resultados
        </Button>
      </div>
    );
  }

  const fav = esFavorito(receta.id);
  const favoritoBtn = (
    <button
      type="button"
      onClick={() => {
        toggle(receta.id);
        show(fav ? 'Quitado de favoritos' : 'Guardado en favoritos', fav ? 'info' : 'success');
      }}
      className="flex items-center justify-center w-11 h-11 rounded-full text-primary hover:bg-surface-container transition-colors motion-safe:active:scale-95"
      aria-label={fav ? 'Quitar de favoritos' : 'Guardar en favoritos'}
    >
      <span
        className="material-symbols-outlined"
        style={fav ? { fontVariationSettings: "'FILL' 1" } : undefined}
      >
        favorite
      </span>
    </button>
  );

  return (
    <div className="min-h-screen bg-background text-on-surface pb-cta-safe">
      <AppHeader
        pageTitle={receta.nombre}
        showBack
        backTo={location.state?.from || '/recetas'}
        showBrand={false}
        rightSlot={favoritoBtn}
      />

      <div className="page-container md:max-w-4xl px-margin-mobile md:px-6">
        <div className="md:grid md:grid-cols-2 md:gap-section-gap md:items-start">
          <div className="relative w-full aspect-[4/3] max-h-80 md:max-h-none md:sticky md:top-24 rounded-card overflow-hidden bg-surface-container shadow-card">
            <ImageWithPlaceholder src={receta.imagen_url} alt={receta.nombre} className="w-full h-full min-h-[240px]" />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <span className="bg-surface/95 backdrop-blur-sm px-3 py-1.5 rounded-pill border border-outline-variant font-label-sm text-label-sm flex items-center gap-1 shadow-card">
                <span className="material-symbols-outlined text-primary text-[18px]">schedule</span>
                {receta.tiempo}
              </span>
              <span className="bg-surface/95 backdrop-blur-sm px-3 py-1.5 rounded-pill border border-outline-variant font-label-sm text-label-sm shadow-card">
                {receta.dificultad}
              </span>
            </div>
          </div>

          <main className="flex flex-col gap-section-gap py-stack-lg md:py-0">
        <MatchBadge receta={receta} className="mb-1" />
        <div className="flex flex-wrap gap-2">
          <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-pill font-label-sm text-label-sm">
            {receta.categoria}
          </span>
          {receta.area ? (
            <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-pill font-label-sm text-label-sm border border-outline-variant">
              {receta.area}
            </span>
          ) : null}
          <span className="bg-surface-container-low text-on-surface-variant px-3 py-1 rounded-pill font-label-sm text-label-sm border border-outline-variant flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">group</span>
            {receta.porciones}
          </span>
        </div>

        <section>
          <SectionHeader
            title="Ingredientes"
            description={`${ingredientesUI.length} elementos · revisa lo que tienes en despensa`}
          />
          <div className="flex flex-col gap-2">
            {ingredientesUI.map((ing) => (
              <div
                key={ing.index}
                className={`p-4 rounded-card border min-h-[56px] ${
                  ing.faltante
                    ? 'bg-secondary-fixed border-secondary-fixed-dim flex flex-col gap-3'
                    : 'bg-surface-container-lowest border-outline-variant flex items-center justify-between gap-3 shadow-card'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {ing.faltante ? (
                    <span className="material-symbols-outlined text-on-secondary-container shrink-0">warning</span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0" aria-hidden />
                  )}
                  <span
                    className={`font-body-md text-body-md ${
                      ing.faltante ? 'text-on-secondary-container font-bold' : 'text-on-surface'
                    }`}
                  >
                    {ing.nombreMostrar}
                    {ing.sustituido ? (
                      <span className="block font-label-sm text-label-sm text-primary mt-0.5">
                        Sustituye a {ing.nombre}
                      </span>
                    ) : null}
                  </span>
                </div>
                {ing.faltante ? (
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-label-sm text-label-sm text-on-secondary-fixed-variant bg-on-secondary-container/10 px-2 py-0.5 rounded-pill">
                      Faltante
                    </span>
                    <button
                      type="button"
                      onClick={() => setModalIngrediente(ing)}
                      className="min-h-[40px] font-label-lg text-label-lg text-on-secondary-fixed-variant border border-on-secondary-fixed-variant/30 px-4 rounded-pill hover:bg-on-secondary-fixed-variant/5 transition-colors active:scale-95"
                    >
                      Sustituir
                    </button>
                  </div>
                ) : (
                  <span className="material-symbols-outlined text-primary shrink-0">check_circle</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <InstructionsPreview instrucciones={receta.instrucciones} />

        <aside className="bg-primary-container/30 border border-primary/10 p-stack-lg rounded-card">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary">lightbulb</span>
            <h3 className="font-headline-md text-headline-md text-on-surface">Consejo</h3>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Usa el modo cocina para seguir los pasos sin perderte. Puedes sustituir ingredientes que no tengas.
          </p>
        </aside>
          </main>
        </div>
      </div>

      <StickyCta>
        <Button to={`/modo-cocina/${receta.id}`} state={{ from: `/detalle/${receta.id}` }} size="lg" icon="play_circle">
          Iniciar modo cocina
        </Button>
      </StickyCta>

      <SubstituteModal
        ingrediente={modalIngrediente?.nombre ?? null}
        opciones={modalIngrediente ? obtenerSustitutosPara(modalIngrediente, despensa) : []}
        onElegir={aplicarSustituto}
        onCerrar={() => setModalIngrediente(null)}
      />
    </div>
  );
}
