import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { IngredientesProvider } from './context/IngredientesContext';
import { FavoritosProvider } from './context/FavoritosContext';
import { ToastProvider } from './context/ToastContext';

import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Home from './pages/home';
import Recetas from './pages/recetas';
import Detalle from './pages/detalle';
import ModoCocina from './pages/ModoCocina';
import CocinaExito from './pages/CocinaExito';
import Favoritos from './pages/Favoritos';
import Ingredientes from './pages/Ingredientes';
import Perfil from './pages/Perfil';
import GuiaMarca from './pages/GuiaMarca';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <IngredientesProvider>
            <FavoritosProvider>
              <Routes>
                <Route path="/" element={<Navigate to="/welcome" replace />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/recetas" element={<Recetas />} />
                <Route path="/detalle/:id" element={<Detalle />} />
                <Route path="/modo-cocina/:id" element={<ModoCocina />} />
                <Route path="/cocina-exito/:id" element={<CocinaExito />} />
                <Route path="/favoritos" element={<Favoritos />} />
                <Route path="/ingredientes" element={<Ingredientes />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/guia-marca" element={<GuiaMarca />} />
              </Routes>
            </FavoritosProvider>
          </IngredientesProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
