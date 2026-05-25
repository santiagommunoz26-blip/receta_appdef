import { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => dismiss(id), 2800);
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div
        className="fixed top-4 left-0 right-0 z-[100] flex flex-col items-center gap-2 px-margin-mobile pointer-events-none"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto page-container w-full max-w-sm flex items-center gap-3 px-4 py-3 rounded-card border shadow-float animate-toast-in ${
              t.type === 'error'
                ? 'bg-error-container text-on-error-container border-error/20'
                : t.type === 'info'
                  ? 'bg-surface-container-lowest text-on-surface border-outline-variant'
                  : 'bg-primary text-on-primary border-primary'
            }`}
          >
            <span className="material-symbols-outlined text-[22px] shrink-0">
              {t.type === 'error' ? 'error' : t.type === 'info' ? 'info' : 'check_circle'}
            </span>
            <p className="font-label-lg text-label-lg flex-1">{t.message}</p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de ToastProvider');
  return ctx;
}
