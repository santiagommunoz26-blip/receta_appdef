import { Link } from 'react-router-dom';

const variants = {
  primary: 'bg-primary text-on-primary shadow-float hover:opacity-95',
  secondary: 'bg-surface-container-lowest text-primary border-2 border-outline-variant hover:bg-surface-container-low',
  ghost: 'bg-transparent text-primary hover:bg-surface-container-low',
  tonal: 'bg-primary-container/25 text-primary hover:bg-primary-container/35',
};

const sizes = {
  lg: 'min-h-[52px] px-6 text-label-lg rounded-btn',
  md: 'min-h-[48px] px-5 text-label-lg rounded-btn',
  sm: 'min-h-[40px] px-4 text-label-sm rounded-btn',
};

/** Botón accesible — área táctil ≥ 48px (usabilidad móvil) */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  to,
  state,
  type = 'button',
  onClick,
  disabled,
  icon,
}) {
  const base =
    'inline-flex items-center justify-center gap-2 w-full font-bold transition-all duration-150 motion-safe:active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none';

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {icon ? <span className="material-symbols-outlined text-[22px]">{icon}</span> : null}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} state={state} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
