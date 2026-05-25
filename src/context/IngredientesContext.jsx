import { createContext, useContext, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'cookora_despensa';
const LEGACY_KEY = 'recetafacil_despensa';
const IngredientesContext = createContext(null);

export function IngredientesProvider({ children }) {
  const [despensa, setDespensa] = useState(() => {
    try {
      let saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        saved = localStorage.getItem(LEGACY_KEY);
        if (saved) localStorage.setItem(STORAGE_KEY, saved);
      }
      return saved ? JSON.parse(saved) : ['Huevo', 'Arroz', 'Tomate'];
    } catch {
      return ['Huevo', 'Arroz', 'Tomate'];
    }
  });

  const despensaRef = useRef(despensa);
  useEffect(() => {
    despensaRef.current = despensa;
  }, [despensa]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(despensa));
  }, [despensa]);

  function agregar(nombre) {
    const limpio = nombre.trim();
    if (!limpio) return false;
    if (despensaRef.current.some((i) => i.toLowerCase() === limpio.toLowerCase())) return false;
    setDespensa((prev) => [...prev, limpio]);
    return true;
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