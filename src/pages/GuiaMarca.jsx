import { Link } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BrandWordmark from '../components/BrandWordmark';
import Logo from '../components/Logo';
import Button from '../components/ui/Button';
import { BRAND } from '../lib/brand';

const colores = [
  { nombre: 'Primary', hex: '#275300', token: 'primary' },
  { nombre: 'Primary container', hex: '#3b6d11', token: 'primary-container' },
  { nombre: 'Secondary', hex: '#7d570e', token: 'secondary' },
  { nombre: 'Secondary container', hex: '#fdc977', token: 'secondary-container' },
  { nombre: 'Surface', hex: '#f8fbee', token: 'surface' },
  { nombre: 'On surface', hex: '#191d16', token: 'on-surface' },
];

export default function GuiaMarca() {
  return (
    <div className="min-h-screen bg-background text-on-surface pb-stack-lg">
      <AppHeader pageTitle="Guía de marca" showBack backTo="/perfil" showBrand={false} showAccount={false} />

      <main className="page-container md:max-w-2xl px-margin-mobile flex flex-col gap-section-gap py-stack-lg">
        <section className="text-center flex flex-col items-center gap-stack-md">
          <Logo size={96} />
          <BrandWordmark size="lg" />
          <p className="font-body-md text-body-md text-on-surface-variant">{BRAND.description}</p>
          <p className="text-overline text-primary">{BRAND.tagline}</p>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md mb-stack-md">Logotipo</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md leading-relaxed">
            Isotipo (olla + ingredientes) + wordmark <strong>Cook</strong>
            <span className="text-secondary">ora</span>. Mantén zona de respeto equivalente al radio del círculo.
          </p>
          <div className="flex flex-wrap gap-4 p-stack-lg bg-surface-container-lowest rounded-card border border-outline-variant">
            <Logo size={64} />
            <Logo size={48} />
            <BrandWordmark />
          </div>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md mb-stack-md">Color</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">
            Paleta Material 3 — verde naturaleza (confianza, frescura) y ámbar (calidez, cocina).
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {colores.map((c) => (
              <div
                key={c.token}
                className="rounded-card border border-outline-variant overflow-hidden shadow-card"
              >
                <div className="h-14" style={{ backgroundColor: c.hex }} />
                <div className="p-3 bg-surface-container-lowest">
                  <p className="font-label-lg text-label-lg">{c.nombre}</p>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md mb-stack-md">Tipografía</h2>
          <ul className="flex flex-col gap-stack-md font-body-md text-body-md text-on-surface-variant">
            <li>
              <span className="font-brand text-headline-lg text-primary block mb-1">Fraunces — marca</span>
              Títulos de bienvenida y wordmark.
            </li>
            <li>
              <span className="font-headline-md text-headline-md text-on-surface block mb-1">Nunito Sans — UI</span>
              Cuerpo, etiquetas y navegación. Pesos 400–800.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md mb-stack-md">Componentes</h2>
          <div className="flex flex-col gap-stack-md">
            <Button size="md">Botón primario</Button>
            <Button variant="secondary">Botón secundario</Button>
            <Button variant="tonal">Botón tonal</Button>
            <div className="p-stack-md rounded-card border border-outline-variant shadow-card bg-surface-container-lowest">
              <p className="font-label-lg text-label-lg">Tarjeta de receta</p>
              <p className="font-body-md text-body-md text-on-surface-variant">Radio 16px, sombra card.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-headline-md text-headline-md mb-stack-md">Principios UX</h2>
          <ul className="list-disc pl-5 flex flex-col gap-2 font-body-md text-body-md text-on-surface-variant leading-relaxed">
            <li>Proximidad: secciones agrupadas con encabezado común.</li>
            <li>Jerarquía: overline → título → cuerpo.</li>
            <li>Feedback: toasts y estados de carga visibles.</li>
            <li>Accesibilidad: foco visible, targets ≥ 48px, contraste AA.</li>
          </ul>
        </section>

        <Button to="/welcome" variant="ghost" size="sm">
          Volver a inicio
        </Button>
      </main>
    </div>
  );
}
