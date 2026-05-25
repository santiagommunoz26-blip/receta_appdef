import { obtenerInstruccionesEs } from '../data/instruccionesEs';
import {
  formatearIngredienteEs,
  traducirArea,
  traducirCategoria,
  traducirIngrediente as traducirIngredienteBase,
  traducirMedida,
} from './espanol';

/** Normaliza texto de ingrediente para comparar despensa vs receta */
export function normalizarIngrediente(texto) {
  return (texto || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Alias español → términos en inglés (base MealDB) */
export const ALIAS_INGREDIENTES = {
  huevo: ['egg', 'egg yolk', 'egg whites'],
  huevos: ['egg', 'egg yolk', 'egg whites'],
  arroz: ['rice'],
  tomate: ['tomato', 'cherry tomatoes', 'tomato puree', 'plum tomatoes'],
  tomates: ['tomato', 'cherry tomatoes', 'tomato puree'],
  cebolla: ['onion', 'spring onions', 'shallots'],
  ajo: ['garlic', 'garlic sauce'],
  pollo: ['chicken', 'chicken breast', 'chicken thighs'],
  aceite: ['olive oil', 'extra virgin olive oil', 'vegetable oil', 'sunflower oil'],
  sal: ['salt', 'sea salt'],
  leche: ['milk', 'whole milk'],
  pan: ['bread', 'bread rolls'],
  queso: ['cheese', 'cheddar cheese', 'parmesan'],
  papa: ['potatoes', 'potato'],
  papas: ['potatoes', 'potato'],
  pescado: ['fish', 'salmon', 'tuna', 'cod'],
  carne: ['beef', 'minced beef', 'pork', 'lamb'],
  azucar: ['sugar', 'caster sugar'],
  harina: ['flour', 'plain flour', 'self-raising flour'],
  mantequilla: ['butter'],
  limon: ['lemon', 'lemon juice'],
  pimienta: ['pepper', 'black pepper'],
  champinon: ['mushrooms', 'mushroom'],
  hongos: ['mushrooms', 'mushroom'],
  pimiento: ['pepper', 'red pepper', 'green pepper', 'bell pepper'],
  zanahoria: ['carrots', 'carrot'],
  aguacate: ['avocado'],
};

export const SUSTITUCIONES = {
  egg: ['Tofu firme en cubos', 'Semillas de chía remojadas', 'Puré de manzana'],
  rice: ['Quinoa cocida', 'Cuscús', 'Bulgur'],
  tomato: ['Pimiento rojo asado', 'Salsa de tomate natural'],
  onion: ['Puerro', 'Cebollín', 'Chalote'],
  garlic: ['Ajo en polvo', 'Cebollín picado'],
  chicken: ['Pavo en cubos', 'Tofu marinado', 'Garbanzos'],
  milk: ['Leche de avena', 'Leche de almendras', 'Yogur natural'],
  bread: ['Tortillas integrales', 'Galletas de arroz'],
  cheese: ['Queso vegano', 'Nutritional yeast'],
  mushrooms: ['Berenjena en cubos', 'Calabacín'],
  'olive oil': ['Aceite de girasol', 'Aceite de aguacate'],
  butter: ['Aceite de oliva', 'Margarina vegetal'],
  salmon: ['Trucha', 'Atún fresco', 'Tofu ahumado'],
  avocado: ['Hummus', 'Puré de calabaza'],
};

export const SUGERIDOS_POPULARES = [
  'Huevo', 'Arroz', 'Tomate', 'Cebolla', 'Pollo', 'Ajo', 'Sal', 'Aceite',
  'Leche', 'Pan', 'Queso', 'Papa', 'Pescado', 'Carne',
];

function parseJsonArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function expandirDespensa(ingredientesUsuario) {
  const keys = new Set();
  for (const ing of ingredientesUsuario) {
    const norm = normalizarIngrediente(ing);
    keys.add(norm);
    const alias = ALIAS_INGREDIENTES[norm];
    if (alias) alias.forEach((a) => keys.add(normalizarIngrediente(a)));
    keys.add(norm);
  }
  return keys;
}

export function ingredienteCoincide(nombreIngrediente, despensaKeys) {
  const norm = normalizarIngrediente(nombreIngrediente);
  if (despensaKeys.has(norm)) return true;
  for (const key of despensaKeys) {
    if (norm.includes(key) || key.includes(norm)) return true;
    const alias = ALIAS_INGREDIENTES[key];
    if (alias?.some((a) => norm.includes(normalizarIngrediente(a)))) return true;
  }
  for (const [es, enList] of Object.entries(ALIAS_INGREDIENTES)) {
    if (despensaKeys.has(es) && enList.some((en) => norm.includes(normalizarIngrediente(en)))) {
      return true;
    }
  }
  return false;
}

export function estimarTiempo(instrucciones) {
  if (!instrucciones) return '25 min';
  const pasos = parsePasos(instrucciones).length;
  const minutos = Math.min(90, Math.max(15, pasos * 8 + 10));
  return `${minutos} min`;
}

export function parsePasos(instrucciones) {
  if (!instrucciones?.trim()) {
    return [{ titulo: 'Preparación', texto: 'No hay instrucciones disponibles para esta receta.' }];
  }

  const bloques = instrucciones
    .split(/\r?\n\r?\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  const limpiarPaso = (texto) =>
    texto
      .replace(/^(?:paso|step|STEP|PASO)\s*\d+\s*[:\-.]?\s*/i, '')
      .replace(/^\d+\s*[\n.]?\s*/, '')
      .trim();

  if (bloques.length > 1) {
    return bloques.map((texto, i) => ({
      titulo: `Paso ${i + 1}`,
      texto: limpiarPaso(texto),
    }));
  }

  const lineas = instrucciones
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  if (lineas.length > 1) {
    return lineas.map((texto, i) => ({
      titulo: `Paso ${i + 1}`,
      texto: limpiarPaso(texto),
    }));
  }

  return [{ titulo: 'Preparación', texto: instrucciones.trim() }];
}

export function normalizarReceta(row) {
  const nombres = parseJsonArray(row.ingredientes);
  const medidas = parseJsonArray(row.medidas);

  const ingredientesList = nombres
    .map((nombre, i) => {
      const original = nombre?.trim() || '';
      return {
        nombre: traducirIngredienteBase(original),
        nombreOriginal: original,
        medida: traducirMedida(medidas[i]?.trim() || ''),
        key: normalizarIngrediente(original),
      };
    })
    .filter((i) => i.nombre);

  return {
    id: String(row.id),
    nombre: row.nombre,
    categoria: traducirCategoria(row.categoria || 'Variado'),
    area: traducirArea(row.area || ''),
    imagen_url: row.imagen_url,
    instrucciones: obtenerInstruccionesEs(row.id, row.instrucciones || ''),
    ingredientesList,
    tiempo: estimarTiempo(row.instrucciones),
    dificultad: ingredientesList.length > 9 ? 'Media' : 'Fácil',
    porciones: ingredientesList.length > 6 ? '4 porciones' : '2 porciones',
  };
}

export function puntuarReceta(receta, despensaKeys) {
  if (!despensaKeys.size) return 0;
  const total = receta.ingredientesList.length || 1;
  const coincidencias = receta.ingredientesList.filter((ing) =>
    ingredienteCoincide(ing.nombre, despensaKeys)
  ).length;
  return coincidencias / total;
}

export function filtrarRecetasPorDespensa(recetas, despensa) {
  if (!despensa.length) return recetas;
  const keys = expandirDespensa(despensa);
  
  // Si tienes pocos ingredientes, sé más flexible
  const maxFaltantes = despensa.length <= 2 ? 5 : 3;
  
  return recetas
    .map((r) => {
      const faltantes = r.ingredientesList.filter(
        (ing) => !ingredienteCoincide(ing.nombre, keys)
      ).length;
      return { receta: r, faltantes };
    })
    .filter(({ faltantes }) => faltantes <= maxFaltantes)
    .sort((a, b) => a.faltantes - b.faltantes)
    .map(({ receta }) => receta);
}

export function obtenerSustitutos(ingredienteKey) {
  const norm = normalizarIngrediente(ingredienteKey);
  if (SUSTITUCIONES[norm]) return SUSTITUCIONES[norm];
  for (const [key, lista] of Object.entries(SUSTITUCIONES)) {
    if (norm.includes(key) || key.includes(norm)) return lista;
  }
  return ['Versión vegana', 'Opción sin gluten', 'Ingrediente de temporada'];
}

export function traducirIngrediente(nombre) {
  return traducirIngredienteBase(nombre);
}

export function formatearIngrediente(nombre, medida) {
  return formatearIngredienteEs(nombre, medida);
}
