const illustrations = {
  pantry: (
    <svg viewBox="0 0 120 100" className="w-32 h-28" aria-hidden>
      <rect x="20" y="30" width="80" height="55" rx="12" fill="#edefe3" stroke="#c2c9b7" />
      <circle cx="45" cy="55" r="10" fill="#fdc977" />
      <circle cx="75" cy="52" r="8" fill="#b8f389" />
      <path d="M35 30V22h50v8" stroke="#275300" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  ),
  favorites: (
    <svg viewBox="0 0 120 100" className="w-32 h-28" aria-hidden>
      <path
        d="M60 78 L30 48c-12-12-2-32 15-28 8 2 12 8 15 14 3-6 7-12 15-14 17-4 27 16 15 28z"
        fill="#fdc977"
        stroke="#7d570e"
        strokeWidth="1.5"
      />
      <circle cx="60" cy="38" r="28" fill="#edefe3" opacity="0.6" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 120 100" className="w-32 h-28" aria-hidden>
      <circle cx="52" cy="48" r="22" fill="none" stroke="#275300" strokeWidth="4" />
      <line x1="68" y1="64" x2="88" y2="84" stroke="#275300" strokeWidth="4" strokeLinecap="round" />
      <path d="M42 48h20M52 38v20" stroke="#c2c9b7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  success: (
    <svg viewBox="0 0 120 100" className="w-36 h-32" aria-hidden>
      <circle cx="60" cy="50" r="36" fill="#b8f389" opacity="0.5" />
      <circle cx="60" cy="50" r="28" fill="#275300" />
      <path
        d="M48 50 L56 58 L74 40"
        stroke="#f8fbee"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  onboarding: {
    pantry: (
      <svg viewBox="0 0 200 160" className="w-full max-w-[200px] h-auto" aria-hidden>
        <rect x="40" y="50" width="120" height="90" rx="16" fill="#edefe3" stroke="#c2c9b7" />
        <circle cx="85" cy="95" r="14" fill="#fdc977" />
        <circle cx="125" cy="90" r="11" fill="#b8f389" />
        <path d="M60 50V35h80v15" stroke="#275300" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
    ),
    recipes: (
      <svg viewBox="0 0 200 160" className="w-full max-w-[200px] h-auto" aria-hidden>
        <rect x="35" y="40" width="130" height="100" rx="12" fill="#fff" stroke="#c2c9b7" />
        <rect x="35" y="40" width="130" height="36" rx="12" fill="#275300" />
        <rect x="50" y="90" width="70" height="8" rx="4" fill="#edefe3" />
        <rect x="50" y="108" width="50" height="8" rx="4" fill="#fdc977" opacity="0.8" />
      </svg>
    ),
    cook: (
      <svg viewBox="0 0 200 160" className="w-full max-w-[200px] h-auto" aria-hidden>
        <circle cx="100" cy="80" r="50" fill="#edefe3" />
        <path d="M75 95h50" stroke="#275300" strokeWidth="6" strokeLinecap="round" />
        <circle cx="100" cy="65" r="8" fill="#275300" />
        <path d="M100 73v12" stroke="#275300" strokeWidth="4" />
      </svg>
    ),
  },
};

export default function EmptyState({ variant = 'search', title, description, action }) {
  const art = illustrations[variant] ?? illustrations.search;

  return (
    <div className="flex flex-col items-center text-center gap-stack-md py-section-gap px-4">
      <div className="flex items-center justify-center">{art}</div>
      {title ? <h2 className="font-headline-md text-headline-md text-on-surface">{title}</h2> : null}
      {description ? (
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs leading-relaxed">{description}</p>
      ) : null}
      {action ? <div className="w-full max-w-xs">{action}</div> : null}
    </div>
  );
}

export function OnboardingArt({ step }) {
  const art = illustrations.onboarding[step];
  return <div className="flex justify-center mb-stack-lg">{art}</div>;
}
