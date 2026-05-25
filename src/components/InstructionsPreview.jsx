import { useState } from 'react';
import { parsePasos } from '../lib/recetas';

export default function InstructionsPreview({ instrucciones }) {
  const [abierto, setAbierto] = useState(false);
  const pasos = parsePasos(instrucciones);
  const preview = pasos.slice(0, 2);

  return (
    <section className="bg-surface-container-lowest border border-outline-variant rounded-card shadow-card overflow-hidden">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        className="w-full flex items-center justify-between gap-3 p-stack-md min-h-[56px] text-left hover:bg-surface-container-low/50 transition-colors"
        aria-expanded={abierto}
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">menu_book</span>
          <h2 className="font-headline-md text-headline-md text-on-surface">Instrucciones</h2>
        </div>
        <span className="material-symbols-outlined text-on-surface-variant">
          {abierto ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      <div className={`px-stack-md pb-stack-md ${abierto ? '' : 'border-t border-outline-variant/50'}`}>
        {(abierto ? pasos : preview).map((p, i) => (
          <p key={i} className="font-body-md text-body-md text-on-surface-variant mb-3 last:mb-0 leading-relaxed">
            <span className="font-label-lg text-label-lg text-primary">{p.titulo}: </span>
            {p.texto}
          </p>
        ))}
        {!abierto && pasos.length > 2 ? (
          <p className="font-label-sm text-label-sm text-primary mt-1">
            +{pasos.length - 2} pasos más — expande o usa modo cocina
          </p>
        ) : null}
      </div>
    </section>
  );
}
