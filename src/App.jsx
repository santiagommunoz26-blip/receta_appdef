import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { IngredientesProvider } from './context/IngredientesContext';
import { FavoritosProvider } from './context/FavoritosContext';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Home from './pages/Home';
import Recetas from './pages/Recetas';
import Detalle from './pages/Detalle';
import ModoCocina from './pages/ModoCocina';
import Favoritos from './pages/Favoritos';
import Ingredientes from './pages/Ingredientes';
import Perfil from './pages/Perfil';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <IngredientesProvider>
          <FavoritosProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/welcome" replace />} />
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/recetas" element={<Recetas />} />
              <Route path="/detalle/:id" element={<Detalle />} />
              <Route path="/modo-cocina/:id" element={<ModoCocina />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/ingredientes" element={<Ingredientes />} />
              <Route path="/perfil" element={<Perfil />} />
            </Routes>
          </FavoritosProvider>
        </IngredientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}