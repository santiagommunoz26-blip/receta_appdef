import { useEffect, useRef } from 'react';

export default function SubstituteModal({ ingrediente, opciones, onElegir, onCerrar }) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!ingrediente) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKey(e) {
      if (e.key === 'Escape') onCerrar();
    }
    window.addEventListener('keydown', onKey);
    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [ingrediente, onCerrar]);

  if (!ingrediente) return null;

  const deDespensa = opciones.filter((o) => o.startsWith('✓'));
  const otras = opciones.filter((o) => !o.startsWith('✓'));

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-margin-mobile bg-inverse-surface/50 animate-fade-in motion-reduce:animate-none"
      role="presentation"
      onClick={onCerrar}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="substitute-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-surface-container-lowest rounded-t-card sm:rounded-card border border-outline-variant p-stack-lg shadow-float max-h-[85vh] overflow-y-auto animate-slide-up motion-reduce:animate-none outline-none"
      >
        <div className="flex justify-between items-start mb-stack-md">
          <div>
            <h3 id="substitute-title" className="font-headline-md text-headline-md text-on-surface">
              Sustituir ingrediente
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">{ingrediente}</p>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="flex items-center justify-center w-11 h-11 text-outline hover:bg-surface-container rounded-full motion-safe:active:scale-95"
            aria-label="Cerrar"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {deDespensa.length > 0 ? (
          <div className="mb-stack-md">
            <p className="text-overline text-primary mb-stack-sm">Con lo que ya tienes</p>
            <div className="flex flex-col gap-2">
              {deDespensa.map((opcion) => (
                <OpcionButton key={opcion} opcion={opcion} onElegir={onElegir} destacado />
              ))}
            </div>
          </div>
        ) : null}

        {otras.length > 0 ? (
          <div>
            <p className="text-overline text-on-surface-variant mb-stack-sm">Alternativas</p>
            <div className="flex flex-col gap-2">
              {otras.map((opcion) => (
                <OpcionButton key={opcion} opcion={opcion} onElegir={onElegir} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function OpcionButton({ opcion, onElegir, destacado = false }) {
  const texto = opcion.replace(/^✓\s*/, '').replace(/\s*\(en tu despensa\)$/, '');
  return (
    <button
      type="button"
      onClick={() => onElegir(texto)}
      className={`w-full text-left min-h-[52px] p-4 rounded-card border transition-colors font-label-lg text-label-lg motion-safe:active:scale-[0.99] ${
        destacado
          ? 'border-primary bg-primary-container/15 text-on-surface hover:bg-primary-container/25'
          : 'border-outline-variant bg-surface-container-low text-on-surface hover:bg-surface-container'
      }`}
    >
      {opcion.startsWith('✓') ? (
        <span className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
          {texto}
        </span>
      ) : (
        opcion
      )}
    </button>
  );
}
