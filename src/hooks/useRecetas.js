import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { filtrarRecetasPorDespensa, normalizarReceta } from '../lib/recetas';

export function useRecetas({ filtrarPorDespensa = [], soloFavoritos = null } = {}) {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargar() {
      setLoading(true);
      try {
        const { data, error } = await supabase.from('recetas').select('*');
        if (error) throw error;
        let lista = (data || []).map(normalizarReceta);
        if (soloFavoritos && soloFavoritos.length > 0) {
          lista = lista.filter((r) => soloFavoritos.includes(r.id));
        }
        if (filtrarPorDespensa.length > 0) {
          lista = filtrarRecetasPorDespensa(lista, filtrarPorDespensa, 0.15);
        }
        setRecetas(lista);
      } catch (e) {
        console.error('Error cargando recetas:', e);
        setRecetas([]);
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [soloFavoritos?.join(','), filtrarPorDespensa.join(',')]);

  return { recetas, loading };
}

export async function obtenerRecetaPorId(id) {
  const { data, error } = await supabase.from('recetas').select('*').eq('id', id).single();
  if (error) throw error;
  return normalizarReceta(data);
}
