import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import Button from '../components/ui/Button';
import { obtenerRecetaPorId } from '../hooks/useRecetas';

function Confetti() {
  const colors = ['#b8f389', '#fdc977', '#275300', '#3b6d11'];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 rounded-sm animate-confetti motion-reduce:animate-none"
          style={{
            left: `${(i * 17) % 100}%`,
            top: '-8px',
            backgroundColor: colors[i % colors.length],
            animationDelay: `${(i % 8) * 0.12}s`,
            animationDuration: `${1.8 + (i % 5) * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function CocinaExito() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    obtenerRecetaPorId(id).then((r) => setNombre(r?.nombre || 'tu receta'));
  }, [id]);

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col relative overflow-hidden">
      <Confetti />
      <main className="flex-1 page-container px-margin-mobile flex flex-col items-center justify-center relative z-10">
        <EmptyState
          variant="success"
          title="¡Listo!"
          description={`Terminaste ${nombre}. Esperamos que haya quedado delicioso.`}
        />
        <div className="w-full max-w-xs flex flex-col gap-stack-md mt-stack-lg">
          <Button to={`/detalle/${id}`} size="lg" variant="secondary">
            Ver receta otra vez
          </Button>
          <Button to="/home" size="lg" icon="home">
            Volver al inicio
          </Button>
          <Button to="/recetas" variant="ghost" size="sm">
            Explorar más recetas
          </Button>
        </div>
      </main>
    </div>
  );
}
