import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BrandWordmark from '../components/BrandWordmark';
import { OnboardingArt } from '../components/EmptyState';
import Button from '../components/ui/Button';
import { setOnboardingDone } from '../lib/onboarding';

const slides = [
  {
    step: 'pantry',
    title: 'Tu despensa, tu punto de partida',
    description: 'Añade lo que tienes en casa. Cookora entiende sinónimos y nombres en español.',
  },
  {
    step: 'recipes',
    title: 'Recetas que encajan contigo',
    description: 'Verás cuántos ingredientes coinciden y podrás filtrar por categoría.',
  },
  {
    step: 'cook',
    title: 'Cocina paso a paso',
    description: 'Modo cocina con temporizador, lista de pasos y sustituciones inteligentes.',
  },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  function finalizar() {
    setOnboardingDone();
    navigate('/ingredientes', { replace: true });
  }

  function siguiente() {
    if (isLast) finalizar();
    else setIndex((i) => i + 1);
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col">
      <header className="page-container flex justify-between items-center px-margin-mobile py-stack-md">
        <BrandWordmark size="sm" />
        <button
          type="button"
          onClick={finalizar}
          className="font-label-lg text-label-lg text-primary min-h-[44px] px-3 rounded-btn hover:bg-surface-container-low motion-safe:active:scale-95"
        >
          Omitir
        </button>
      </header>

      <main className="flex-1 page-container px-margin-mobile flex flex-col items-center justify-center text-center max-w-sm mx-auto w-full">
        <OnboardingArt step={slide.step} />
        <div className="flex gap-2 mb-stack-lg" role="tablist" aria-label="Progreso del tutorial">
          {slides.map((_, i) => (
            <span
              key={i}
              role="presentation"
              className={`h-2 rounded-full transition-all duration-300 motion-safe:transition-all ${
                i === index ? 'w-8 bg-primary' : 'w-2 bg-outline-variant'
              }`}
            />
          ))}
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface mb-3">{slide.title}</h1>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{slide.description}</p>
      </main>

      <footer className="page-container px-margin-mobile pb-stack-lg flex flex-col gap-stack-sm">
        <Button onClick={siguiente} size="lg" icon={isLast ? 'check' : 'arrow_forward'}>
          {isLast ? 'Empezar' : 'Siguiente'}
        </Button>
        {!isLast ? (
          <button
            type="button"
            onClick={finalizar}
            className="font-label-sm text-label-sm text-on-surface-variant py-2 motion-safe:active:scale-95"
          >
            Ya conozco la app
          </button>
        ) : null}
      </footer>
    </div>
  );
}
