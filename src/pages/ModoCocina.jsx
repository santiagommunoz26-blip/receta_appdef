import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { obtenerRecetaPorId } from '../hooks/useRecetas';
import { parsePasos } from '../lib/recetas';

export default function ModoCocina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receta, setReceta] = useState(null);
  const [pasoActual, setPasoActual] = useState(0);
  const [mostrarLista, setMostrarLista] = useState(false);
  const [timerSegundos, setTimerSegundos] = useState(null);
  const [timerRestante, setTimerRestante] = useState(0);

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
      <div className="min-h-screen bg-background flex items-center justify-center text-on-surface-variant">
        Cargando modo cocina...
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <div className="w-full h-2 bg-surface-container-highest">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progreso}%` }}
        />
      </div>

      <header className="sticky top-0 w-full z-40 flex justify-between items-center px-margin-mobile py-stack-md bg-surface">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => navigate(`/detalle/${id}`)}
            className="flex items-center justify-center p-2 hover:bg-surface-container rounded-full transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
          <div className="flex flex-col min-w-0">
            <h1 className="font-headline-md text-headline-md font-bold text-on-surface truncate">{receta.nombre}</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Paso {pasoActual + 1} de {pasos.length}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setMostrarLista((v) => !v)}
          className="flex items-center justify-center p-2 hover:bg-surface-container rounded-full transition-colors active:scale-95"
        >
          <span
            className="material-symbols-outlined text-primary"
            style={mostrarLista ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            visibility
          </span>
        </button>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-margin-mobile py-section-gap">
        {mostrarLista ? (
          <div className="w-full max-w-lg bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg max-h-[60vh] overflow-y-auto">
            <h2 className="font-headline-md text-headline-md mb-stack-md">Todos los pasos</h2>
            <ol className="flex flex-col gap-stack-md">
              {pasos.map((p, i) => (
                <li key={i}>
                  <button
                    type="button"
                    onClick={() => {
                      setPasoActual(i);
                      setMostrarLista(false);
                    }}
                    className={`text-left w-full p-3 rounded-lg border ${
                      i === pasoActual ? 'border-primary bg-primary-container/10' : 'border-outline-variant'
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
          <div className="relative w-full max-w-lg">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary-container rounded-full opacity-40 -z-10" />
            <div className="bg-surface-container-lowest p-stack-lg rounded-xl border border-outline-variant flex flex-col gap-stack-lg">
              {receta.imagen_url ? (
                <div className="w-full aspect-video rounded-lg overflow-hidden bg-surface-container">
                  <img className="w-full h-full object-cover" src={receta.imagen_url} alt={receta.nombre} />
                </div>
              ) : null}
              <div className="flex flex-col gap-stack-md">
                <div className="flex items-center gap-stack-sm">
                  <span className="w-8 h-8 flex items-center justify-center bg-primary text-on-primary font-bold rounded-full text-label-lg">
                    {pasoActual + 1}
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">{paso?.titulo}</h2>
                </div>
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">{paso?.texto}</p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <div className="flex items-center gap-2 px-4 py-2 bg-secondary-container rounded-full text-on-secondary-container">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                  <span className="font-label-sm text-label-sm">Lee el paso completo antes de empezar</span>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-container opacity-10 rounded-full -z-10" />
          </div>
        )}
      </main>

      <footer className="w-full px-margin-mobile py-stack-lg bg-surface border-t border-outline-variant">
        <div className="max-w-lg mx-auto flex items-center justify-between gap-stack-md">
          <button
            type="button"
            disabled={pasoActual === 0}
            onClick={() => setPasoActual((p) => Math.max(0, p - 1))}
            className="flex-1 px-6 py-4 rounded-full font-label-lg text-label-lg text-primary hover:bg-surface-container-low transition-colors active:scale-95 flex items-center justify-center gap-2 disabled:opacity-40"
          >
            <span className="material-symbols-outlined">chevron_left</span>
            Anterior
          </button>
          <button
            type="button"
            onClick={() => {
              if (pasoActual < pasos.length - 1) setPasoActual((p) => p + 1);
              else navigate(`/detalle/${id}`);
            }}
            className="flex-1 px-6 py-4 bg-primary text-on-primary rounded-full font-label-lg text-label-lg hover:opacity-90 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {pasoActual < pasos.length - 1 ? 'Siguiente' : 'Finalizar'}
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </footer>

      <div className="fixed bottom-32 right-margin-mobile flex flex-col gap-3">
        <button
          type="button"
          onClick={() => setMostrarLista(true)}
          className="w-14 h-14 bg-secondary text-on-secondary rounded-full flex items-center justify-center shadow-lg hover:rotate-12 transition-transform"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            list_alt
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTimerSegundos(300)}
          className="w-14 h-14 bg-surface-container-highest text-on-surface rounded-full flex items-center justify-center border border-outline-variant hover:scale-110 transition-transform"
        >
          <span className="material-symbols-outlined">timer</span>
        </button>
      </div>

      {timerSegundos != null && timerRestante > 0 ? (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-secondary-container text-on-secondary-container px-6 py-3 rounded-full shadow-lg z-50 font-headline-md text-headline-md">
          {Math.floor(timerRestante / 60)}:{String(timerRestante % 60).padStart(2, '0')}
        </div>
      ) : null}
    </div>
  );
}