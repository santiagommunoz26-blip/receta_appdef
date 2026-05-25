import { useState } from 'react';

export default function ImageWithPlaceholder({ src, alt = '', className = '', imgClassName = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-surface-container ${className}`}>
      {!loaded && !error ? (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-surface-container to-surface-container-highest" />
      ) : null}
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 motion-safe:transition-opacity ${
            loaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-outline-variant bg-surface-container">
          <span className="material-symbols-outlined text-[32px]">restaurant</span>
          <span className="font-label-sm text-label-sm">Sin imagen</span>
        </div>
      )}
    </div>
  );
}
