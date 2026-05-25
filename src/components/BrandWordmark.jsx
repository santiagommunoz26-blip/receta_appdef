import { BRAND } from '../lib/brand';

/** Marca tipográfica — Fraunces para diferenciar de UI */
export default function BrandWordmark({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'text-headline-md',
    md: 'text-headline-xl',
    lg: 'text-display font-brand',
  };

  return (
    <span
      className={`font-brand ${sizes[size] || sizes.md} font-semibold tracking-tight leading-none ${className}`}
      aria-label={BRAND.name}
    >
      <span className="text-primary">Cook</span>
      <span className="text-secondary">ora</span>
    </span>
  );
}
