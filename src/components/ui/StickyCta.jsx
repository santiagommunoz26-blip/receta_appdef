/** CTA fijo — figura sobre fondo (Gestalt) + región común */
export default function StickyCta({ children, aboveNav = false }) {
  const bottom = aboveNav
    ? 'bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))]'
    : 'bottom-0';

  return (
    <div className={`fixed left-0 right-0 z-40 pointer-events-none ${bottom}`}>
      <div className="page-container px-margin-mobile pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] pt-8 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-auto">
        {children}
      </div>
    </div>
  );
}
