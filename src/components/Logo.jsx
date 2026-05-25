/** Logo de marca RecetaFácil */
export default function Logo({ size = 120, className = '' }) {
  const s = size;
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="RecetaFácil"
    >
      <circle cx="60" cy="60" r="56" fill="#edefe3" stroke="#c2c9b7" strokeWidth="2" />
      <circle cx="60" cy="60" r="44" fill="#275300" />
      <path
        d="M60 28c-8 12-20 18-20 32a20 20 0 1 0 40 0c0-14-12-20-20-32z"
        fill="#b8f389"
      />
      <path
        d="M60 38c-4 8-10 12-10 20a10 10 0 1 0 20 0c0-8-6-12-10-20z"
        fill="#3b6d11"
      />
      <ellipse cx="48" cy="52" rx="6" ry="9" fill="#fdc977" transform="rotate(-25 48 52)" />
      <ellipse cx="72" cy="50" rx="5" ry="8" fill="#fdc977" transform="rotate(20 72 50)" />
      <path
        d="M38 78h44c0 8-10 14-22 14s-22-6-22-14z"
        fill="#f8fbee"
        stroke="#c2c9b7"
        strokeWidth="1.5"
      />
      <path
        d="M42 74h36l-4 6H46l-4-6z"
        fill="#775308"
        opacity="0.85"
      />
      <circle cx="88" cy="36" r="14" fill="#fdc977" stroke="#775308" strokeWidth="1.5" />
      <text
        x="88"
        y="41"
        textAnchor="middle"
        fill="#275300"
        fontSize="14"
        fontWeight="800"
        fontFamily="Nunito Sans, sans-serif"
      >
        R
      </text>
    </svg>
  );
}
