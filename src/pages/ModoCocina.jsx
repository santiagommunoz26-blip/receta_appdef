import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerRecetaPorId } from '../hooks/useRecetas';
import { parsePasos } from '../lib/recetas';
import { BRAND } from '../lib/brand';

export default function ModoCocina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receta, setReceta] = useState(null);
  const [pasoActual, setPasoActual] = useState(0);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [timerSegundos, setTimerSegundos] = useState(null);
  const [timerRestante, setTimerRestante] = useState(0);
  const [textoGrande, setTextoGrande] = useState(false);

  useEffect(() => {
    obtenerRecetaPorId(id).then(setReceta);
  }, [id]);

  const pasos = receta ? parsePasos(receta.instrucciones) : [];
  const paso = pasos[pasoActual] || pasos[0];
  const progreso = pasos.length ? ((pasoActual + 1) / pasos.length) * 100 : 0;

  useEffect(() => {
    if (timerSegundos == null) return undefined;
    setTimerRestante(timerSegundos);
    const interval = setInterval(() => {
      setTimerRestante((t) => {
        if (t <= 1) {
          clearInterval(interval);
          setTimerSegundos(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerSegundos]);

  if (!receta) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant font-body-md">
        Cargando modo cocina…
      </div>
    );
  }

  return (
    <div className="bg-surface-container-low text-on-surface min-h-screen flex flex-col">
      <div
        className="w-full h-1.5 bg-surface-container-highest"
        role="progressbar"
        aria-valuenow={Math.round(progreso)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso de la receta"
      >
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${progreso}%` }}
        />
      </div>

      <header className="sticky top-0 w-full z-40 bg-surface/95 backdrop-blur-md shadow-header">
        <div className="page-container flex justify-between items-center gap-3 px-margin-mobile py-stack-md min-h-[64px]">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => navigate(`/detalle/${id}`)}
              className="shrink-0 flex items-center justify-center w-11 h-11 rounded-full text-primary hover:bg-surface-container transition-colors active:scale-95"
              aria-label="Volver al detalle"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-overline text-primary">{BRAND.name}</span>
              <h1 className="font-headline-md text-headline-md text-on-surface truncate">{receta.nombre}</h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Paso {pasoActual + 1} de {pasos.length}
              </p>
            </div>
          </div>
          <div className="flex gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setTextoGrande((v) => !v)}
              className="flex items-center justify-center w-11 h-11 rounded-full text-primary hover:bg-surface-container transition-colors motion-safe:active:scale-95"
              aria-label={textoGrande ? 'Texto normal' : 'Texto grande'}
              aria-pressed={textoGrande}
            >
              <span className="material-symbols-outlined">format_size</span>
            </button>
            <button
              type="button"
              onClick={() => setMostrarLista((v) => !v)}
              className="flex items-center justify-center w-11 h-11 rounded-full text-primary hover:bg-surface-container transition-colors motion-safe:active:scale-95"
              aria-label={mostrarLista ? 'Ocultar lista de pasos' : 'Ver todos los pasos'}
              aria-pressed={mostrarLista}
            >
              <span
                className="material-symbols-outlined"
                style={mostrarLista ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                list
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 page-container px-margin-mobile flex flex-col items-center justify-center py-section-gap">
        {mostrarLista ? (
          <div className="w-full bg-surface-container-lowest border border-outline-variant rounded-card p-stack-lg max-h-[60vh] overflow-y-auto shadow-card">
            <h2 className="font-headline-md text-headline-md mb-stack-md">Todos los pasos</h2>
            <ol className="flex flex-col gap-2">
              {pasos.map((p, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => {
                      setPasoActual(i);
                      setMostrarLista(false);
                    }}
                    className={`text-left w-full min-h-[56px] p-4 rounded-card border transition-colors active:scale-[0.99] ${
                      i === pasoActual
                        ? 'border-primary bg-primary-container/15 shadow-sm'
                        : 'border-outline-variant hover:border-primary/25'
                    }`}
                  >
                    <span className="font-label-lg text-label-lg text-primary">{p.titulo}</span>
                    <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mt-1">{p.texto}</p>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <article className="relative w-full">
            <div className="bg-surface-container-lowest p-stack-lg md:p-8 rounded-card border-2 border-primary/15 flex flex-col gap-stack-lg shadow-float">
              {receta.imagen_url ? (
                <div className="w-full aspect-video rounded-card overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" src={receta.imagen_url} alt="" />
                </div>
              ) : null}
              <div className="flex flex-col gap-stack-md">
                <div className="flex items-center gap-stack-sm">
                  <span
                    className="w-10 h-10 flex items-center justify-center bg-primary text-on-primary font-bold rounded-full text-label-lg shrink-0"
                    aria-hidden
                  >
                    {pasoActual + 1}
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">{paso?.titulo}</h2>
                </div>
                <p
                  className={`text-on-surface leading-relaxed ${
                    textoGrande ? 'text-[1.35rem] md:text-[1.5rem] font-body-lg' : 'font-body-lg md:text-[1.2rem]'
                  }`}
                >
                  {paso?.texto}
                </p>
              </div>
              <p className="flex items-center gap-2 px-4 py-2 bg-secondary-container/50 rounded-pill font-label-sm text-label-sm text-on-secondary-container">
                <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                Lee el paso completo antes de empezar
              </p>
            </div>
          </article>
        )}
      </main>

      <footer className="page-container w-full px-margin-mobile py-stack-lg bg-surface border-t border-outline-variant">
        <div className="flex items-center justify-between gap-stack-md">
          <button
            type="button"
            disabled={pasoActual === 0}
            onClick={() => setPasoActual((p) => Math.max(0, p - 1))}
            className="flex-1 min-h-[52px] rounded-btn font-label-lg text-label-lg text-primary border-2 border-outline-variant hover:bg-surface-container-low transition-colors active:scale-95 flex items-center justify-center gap-1 disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>
            Anterior
          </button>
          <button
            type="button"
            onClick={() => {
              if (pasoActual < pasos.length - 1) setPasoActual((p) => p + 1);
              else navigate(`/cocina-exito/${id}`);
            }}
            className="flex-1 min-h-[52px] bg-primary text-on-primary rounded-btn font-label-lg text-label-lg shadow-float hover:opacity-95 transition-all active:scale-95 flex items-center justify-center gap-1"
          >
            {pasoActual < pasos.length - 1 ? 'Siguiente' : 'Finalizar'}
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </footer>

      <div className="fixed bottom-28 right-4 flex flex-col gap-3 z-30">
        <button
          type="button"
          onClick={() => setMostrarLista(true)}
          className="w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-float hover:scale-105 transition-transform active:scale-95"
          aria-label="Lista de pasos"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            list_alt
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTimerSegundos(300)}
          className="w-14 h-14 bg-surface-container-lowest text-on-surface rounded-full flex items-center justify-center border border-outline-variant shadow-card hover:scale-105 transition-transform active:scale-95"
          aria-label="Temporizador 5 minutos"
        >
          <span className="material-symbols-outlined">timer</span>
        </button>
      </div>

      {timerSegundos != null && timerRestante > 0 ? (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 bg-secondary-container text-on-secondary-container px-6 py-3 rounded-pill shadow-float z-50 font-headline-md text-headline-md tabular-nums"
          role="timer"
          aria-live="polite"
        >
          {Math.floor(timerRestante / 60)}:{String(timerRestante % 60).padStart(2, '0')}
        </div>
      ) : null}
    </div>
  );
}
