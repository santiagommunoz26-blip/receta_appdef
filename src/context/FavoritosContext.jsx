import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const FavoritosContext = createContext(null);

function storageKey(userId) {
  return userId ? `recetafacil_fav_${userId}` : 'recetafacil_fav_guest';
}

export function FavoritosProvider({ children }) {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey(user?.id));
      setFavoritos(saved ? JSON.parse(saved) : []);
    } catch {
      setFavoritos([]);
    }
  }, [user?.id]);

  useEffect(() => {
    localStorage.setItem(storageKey(user?.id), JSON.stringify(favoritos));
  }, [favoritos, user?.id]);

  function toggle(id) {
    const sid = String(id);
    setFavoritos((prev) =>
      prev.includes(sid) ? prev.filter((f) => f !== sid) : [...prev, sid]
    );
  }

  function esFavorito(id) {
    return favoritos.includes(String(id));
  }

  return (
    <FavoritosContext.Provider value={{ favoritos, toggle, esFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const ctx = useContext(FavoritosContext);
  if (!ctx) throw new Error('useFavoritos debe usarse dentro de FavoritosProvider');
  return ctx;
}