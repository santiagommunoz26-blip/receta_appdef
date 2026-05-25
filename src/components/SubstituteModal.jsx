export default function SubstituteModal({ ingrediente, opciones, onElegir, onCerrar }) {
  if (!ingrediente) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-margin-mobile bg-inverse-surface/40">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl border border-outline-variant p-stack-lg shadow-lg">
        <div className="flex justify-between items-start mb-stack-md">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface">Sustituir ingrediente</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">{ingrediente}</p>
          </div>
          <button
            type="button"
            onClick={onCerrar}
            className="material-symbols-outlined text-outline hover:bg-surface-container rounded-full p-2"
          >
            close
          </button>
        </div>
        <div className="flex flex-col gap-stack-sm">
          {opciones.map((opcion) => (
            <button
              key={opcion}
              type="button"
              onClick={() => onElegir(opcion)}
              className="w-full text-left p-4 rounded-xl border border-outline-variant bg-surface-container-low hover:bg-surface-container transition-colors font-label-lg text-label-lg text-on-surface"
            >
              {opcion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}