export default function SubstituteModal({ ingrediente, opciones, onElegir, onCerrar }) {
  if (!ingrediente) return null;

  const deDespensa = opciones.filter((o) => o.startsWith('✓'));
  const otras = opciones.filter((o) => !o.startsWith('✓'));

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-margin-mobile bg-inverse-surface/40">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl border border-outline-variant p-stack-lg shadow-lg max-h-[85vh] overflow-y-auto">
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

        {deDespensa.length > 0 ? (
          <div className="mb-stack-md">
            <p className="font-label-sm text-label-sm text-primary uppercase tracking-wider mb-stack-sm">
              Con lo que ya tienes
            </p>
            <div className="flex flex-col gap-stack-sm">
              {deDespensa.map((opcion) => (
                <OpcionButton key={opcion} opcion={opcion} onElegir={onElegir} destacado />
              ))}
            </div>
          </div>
        ) : null}

        {otras.length > 0 ? (
          <div>
            <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-stack-sm">
              Ingredientes alternativos
            </p>
            <div className="flex flex-col gap-stack-sm">
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
      className={`w-full text-left p-4 rounded-xl border transition-colors font-label-lg text-label-lg ${
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
