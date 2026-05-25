import { useId } from 'react';

/** Isotipo Cookora — sin texto embebido (escala limpio) */
export default function Logo({ size = 120, className = '' }) {
  const uid = useId().replace(/:/g, '');
  const gradId = `cookora-bg-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cookora"
    >
      <defs>
        <linearGradient id={gradId} x1="20" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b6d11" />
          <stop offset="1" stopColor="#275300" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="#edefe3" />
      <circle cx="60" cy="60" r="46" fill={`url(#${gradId})`} />
      <path
        d="M60 32c-14 0-22 10-22 22 0 8 4 14 10 18l-6 14h36l-6-14c6-4 10-10 10-18 0-12-8-22-22-22z"
        fill="#b8f389"
      />
      <path
        d="M60 42c-8 0-12 6-12 12 0 5 3 9 7 11l-3 9h10l-3-9c4-2 7-6 7-11 0-6-4-12-12-12z"
        fill="#f8fbee"
        opacity="0.9"
      />
      <ellipse cx="48" cy="58" rx="5" ry="8" fill="#fdc977" transform="rotate(-20 48 58)" />
      <ellipse cx="72" cy="56" rx="4" ry="7" fill="#fdc977" transform="rotate(18 72 56)" />
      <path
        d="M44 88h32c0 6-8 10-16 10s-16-4-16-10z"
        fill="#f8fbee"
        stroke="#c2c9b7"
        strokeWidth="1.5"
      />
    </svg>
  );
}
