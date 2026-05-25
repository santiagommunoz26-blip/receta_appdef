import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'recetafacil_despensa';
const IngredientesContext = createContext(null);

export function IngredientesProvider({ children }) {
  const [despensa, setDespensa] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['Huevo', 'Arroz', 'Tomate'];
    } catch {
      return ['Huevo', 'Arroz', 'Tomate'];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(despensa));
  }, [despensa]);

  function agregar(nombre) {
    const limpio = nombre.trim();
    if (!limpio) return;
    setDespensa((prev) => (prev.some((i) => i.toLowerCase() === limpio.toLowerCase()) ? prev : [...prev, limpio]));
  }

  function quitar(nombre) {
    setDespensa((prev) => prev.filter((i) => i !== nombre));
  }

  function limpiar() {
    setDespensa([]);
  }

  return (
    <IngredientesContext.Provider value={{ despensa, agregar, quitar, limpiar, setDespensa }}>
      {children}
    </IngredientesContext.Provider>
  );
}

export function useDespensa() {
  const ctx = useContext(IngredientesContext);
  if (!ctx) throw new Error('useDespensa debe usarse dentro de IngredientesProvider');
  return ctx;
}