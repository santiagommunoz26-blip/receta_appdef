import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-margin-mobile gap-stack-lg">
      <div className="flex flex-col items-center gap-stack-md text-center">
        <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-5xl">restaurant</span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-primary font-extrabold">RecetaFácil</h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xs">
          Descubre recetas deliciosas con los ingredientes que ya tienes en casa.
        </p>
      </div>
      <div className="flex flex-col gap-stack-sm w-full max-w-xs">
        <Link
          to="/login"
          className="w-full text-center py-4 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:opacity-90 transition-opacity"
        >
          Comenzar
        </Link>
        <Link
          to="/home"
          className="w-full text-center py-4 rounded-full bg-surface-container text-on-surface font-label-lg text-label-lg font-bold hover:bg-surface-container-high transition-colors"
        >
          Explorar sin cuenta
        </Link>
      </div>
    </div>
  );
}
