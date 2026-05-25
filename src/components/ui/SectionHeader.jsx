/** Encabezado de sección — proximidad + jerarquía (Gestalt) */
export default function SectionHeader({ overline, title, description, action }) {
  return (
    <header className="flex items-start justify-between gap-stack-md mb-stack-md">
      <div className="flex flex-col gap-1 min-w-0">
        {overline ? (
          <p className="text-overline text-on-surface-variant">{overline}</p>
        ) : null}
        {title ? (
          <h2 className="font-headline-md text-headline-md text-on-surface">{title}</h2>
        ) : null}
        {description ? (
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </header>
  );
}
