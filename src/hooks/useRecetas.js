import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { filtrarRecetasPorDespensa, normalizarReceta } from '../lib/recetas';

export function useRecetas({ filtrarPorDespensa = [], soloFavoritos = null } = {}) {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargar() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: err } = await supabase.from('recetas').select('*').order('nombre');
        if (err) throw err;

        let lista = (data || []).map(normalizarReceta);

        if (soloFavoritos != null) {
          lista = soloFavoritos.length
            ? lista.filter((r) => soloFavoritos.includes(String(r.id)))
            : [];
        }

        if (filtrarPorDespensa.length > 0) {
          lista = filtrarRecetasPorDespensa(lista, filtrarPorDespensa);
        }

        setRecetas(lista);
      } catch (e) {
        console.error('Error cargando recetas:', e);
        setError(e.message || 'No se pudieron cargar las recetas');
        setRecetas([]);
      } finally {
        setLoading(false);
      }
    }
    cargar();
  }, [soloFavoritos?.join(','), filtrarPorDespensa.join(',')]);

  return { recetas, loading, error };
}

export async function obtenerRecetaPorId(id) {
  const { data, error } = await supabase.from('recetas').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data ? normalizarReceta(data) : null;
}
