import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const FavoritosContext = createContext(null);

function storageKey(userId) {
  return userId ? `cookora_fav_${userId}` : 'cookora_fav_guest';
}

function loadFavoritos(userId) {
  try {
    const key = storageKey(userId);
    let saved = localStorage.getItem(key);
    if (!saved && userId) {
      saved = localStorage.getItem(`recetafacil_fav_${userId}`);
      if (saved) localStorage.setItem(key, saved);
    }
    if (!saved) {
      saved = localStorage.getItem('recetafacil_fav_guest');
      if (saved) localStorage.setItem('cookora_fav_guest', saved);
    }
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function FavoritosProvider({ children }) {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    setFavoritos(loadFavoritos(user?.id));
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