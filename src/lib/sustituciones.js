import { normalizarIngrediente } from './recetas';
import { traducirIngrediente } from './espanol';

/** Sustitutos culinarios reales por ingrediente (clave normalizada en inglés) */
const POR_INGREDIENTE = {
  egg: ['Yema de huevo extra', 'Clara de huevo', 'Huevo de codorniz'],
  'egg yolk': ['Huevo entero', 'Maicena + agua (en postres)'],
  milk: ['Leche de almendras', 'Leche de avena', 'Leche condensada diluida'],
  rice: ['Quinoa', 'Cuscús', 'Arroz integral', 'Bulgur'],
  tomato: ['Puré de tomate', 'Tomates cherry', 'Salsa de tomate natural'],
  'chopped tomatoes': ['Tomate fresco picado', 'Puré de tomate'],
  'tinned tomatos': ['Tomate enlatado', 'Tomate triturado'],
  onion: ['Cebollín', 'Puerro', 'Chalote', 'Cebolla morada'],
  garlic: ['Ajo en polvo', 'Cebollín picado', 'Aceite de ajo'],
  chicken: ['Pechuga de pavo', 'Tofu firme', 'Setas portobello'],
  beef: ['Carne de cerdo', 'Lentejas cocidas', 'Champiñones salteados'],
  'minced beef': ['Carne picada de cerdo', 'Soja texturizada hidratada'],
  pork: ['Cerdo magro', 'Pollo desmenuzado', 'Seitán'],
  bread: ['Pan integral', 'Tortillas de maíz', 'Galletas saladas molidas'],
  cheese: ['Queso cremoso', 'Ricotta', 'Queso vegano rallado'],
  butter: ['Aceite de oliva', 'Margarina', 'Ghee'],
  'olive oil': ['Aceite de girasol', 'Aceite de aguacate', 'Aceite de canola'],
  'vegetable oil': ['Aceite de oliva', 'Aceite de girasol'],
  potato: ['Papa bonita', 'Camote', 'Yuca cocida'],
  potatoes: ['Papa', 'Batata', 'Ñame'],
  mushroom: ['Champiñón portobello', 'Setas shiitake', 'Berenjena en cubos'],
  mushrooms: ['Champiñones frescos', 'Zucchini', 'Calabacín'],
  carrot: ['Zanahoria baby', 'Zapallo italiano', 'Batata'],
  carrots: ['Zanahoria', 'Remolacha', 'Apio'],
  lemon: ['Limón', 'Vinagre de manzana', 'Lima'],
  'lemon juice': ['Vinagre blanco suave', 'Jugo de lima'],
  parsley: ['Cilantro fresco', 'Eneldo', 'Albahaca'],
  cilantro: ['Perejil', 'Menta fresca'],
  chickpeas: ['Garbanzos cocidos', 'Lentejas cocidas', 'Porotos blancos'],
  lentil: ['Lenteja roja', 'Lenteja pardina', 'Garbanzo'],
  lentils: ['Lentejas', 'Porotos negros', 'Arvejas partidas'],
  flour: ['Harina integral', 'Harina de avena', 'Harina sin gluten'],
  sugar: ['Miel', 'Azúcar mascabo', 'Stevia al gusto'],
  salt: ['Sal marina', 'Salsa de soja (menos cantidad)'],
  pepper: ['Pimienta negra', 'Pimienta blanca', 'Cayena (menos)'],
  'black pepper': ['Pimienta molida', 'Pimienta verde'],
  paprika: ['Pimentón dulce', 'Ají molido suave'],
  cumin: ['Comino molido', 'Curry suave'],
  turmeric: ['Cúrcuma', 'Azafrán (pizca)'],
  yogurt: ['Yogur natural', 'Crema agria ligera', 'Kefir'],
  cucumber: ['Pepino', 'Apio fresco', 'Zucchini crudo'],
  pepper: ['Pimiento morrón', 'Pimiento rojo', 'Ají dulce'],
  'green pepper': ['Pimiento verde', 'Pimiento amarillo', 'Zucchini'],
  'red pepper': ['Pimiento rojo', 'Tomate maduro', 'Pimiento morrón'],
  'romano pepper': ['Pimiento morrón', 'Pimiento italiano', 'Ají dulce'],
  chorizo: ['Salchicha española', 'Longaniza', 'Chorizo vegetal'],
  prawn: ['Camarón', 'Langostino', 'Calamar en aros'],
  mussel: ['Mejillón', 'Almeja', 'Vieira'],
  squid: ['Calamar', 'Pulpo tierno', 'Sepia'],
  saffron: ['Cúrcuma + pimentón', 'Colorante natural', 'Azafrán en hebras'],
  vanilla: ['Esencia de vainilla', 'Pasta de vainilla'],
  'vanilla pod': ['Extracto de vainilla', 'Vainilla líquida'],
  chocolate: ['Cacao amargo', 'Chocolate 70%'],
  almond: ['Nuez', 'Avellana', 'Maní tostado'],
  pistachio: ['Almendra', 'Nuez de Brasil', 'Castaña'],
  corn: ['Maíz en grano', 'Choclo desgranado', 'Arvejas'],
  sweetcorn: ['Choclo', 'Maíz dulce enlatado'],
  raisin: ['Pasas', 'Arándano seco', 'Dátiles picados'],
  pumpkin: ['Zapallo', 'Batata', 'Zucchini'],
  cabbage: ['Repollo', 'Col china', 'Acelga'],
  bean: ['Poroto', 'Lenteja', 'Garbanzo'],
  'kidney bean': ['Poroto rojo', 'Poroto negro', 'Lenteja'],
  shrimp: ['Camarón', 'Langostino'],
  salmon: ['Trucha', 'Atún fresco', 'Salmón ahumado'],
  tuna: ['Atún en agua', 'Sardina', 'Caballa'],
  cream: ['Crema de leche', 'Yogur espeso', 'Leche evaporada'],
  mayonnaise: ['Yogur + aceite', 'Mayonesa casera', 'Aguacate cremoso'],
  'soy sauce': ['Salsa de soja baja en sodio', 'Tamari', 'Miso diluido'],
  vinegar: ['Vinagre de manzana', 'Jugo de limón'],
  honey: ['Miel', 'Jarabe de maple', 'Azúcar rubia'],
  basil: ['Albahaca', 'Orégano fresco'],
  thyme: ['Tomillo', 'Orégano seco'],
  mint: ['Menta', 'Hierbabuena'],
  dill: ['Eneldo', 'Cilantro'],
  ginger: ['Jengibre fresco', 'Jengibre en polvo'],
  cinnamon: ['Canela', 'Clavo de olor (pizca)'],
  nutmeg: ['Nuez moscada', 'Canela'],
  yeast: ['Levadura fresca', 'Polvo de hornear (ajustar receta)'],
  pasta: ['Fideos', 'Macarrones', 'Fideo integral'],
  macaroni: ['Codo', 'Mostacholi', 'Spaghetti cortado'],
  rice: ['Arroz blanco', 'Arroz arborio', 'Arroz basmati'],
  'sushi rice': ['Arroz glutinoso', 'Arroz jazmín'],
  tofu: ['Tempeh', 'Seitán', 'Huevo (si no es vegano)'],
  avocado: ['Puré de calabaza', 'Hummus', 'Mayonesa de aguacate'],
  spinach: ['Espinaca', 'Acelga', 'Rúcula'],
  arugula: ['Rúcula', 'Espinaca baby', 'Lechuga oak leaf'],
  lettuce: ['Lechuga', 'Espinaca', 'Mix de hojas verdes'],
  'iceberg lettuce': ['Lechuga criolla', 'Lechuga romana'],
  pickle: ['Pepinillo', 'Zucchini encurtido'],
  mustard: ['Mostaza amarilla', 'Mostaza de Dijon'],
  wine: ['Caldo + vinagre', 'Jugo de uva'],
  sherry: ['Vino blanco', 'Jerez cocido'],
  stock: ['Caldo casero', 'Cubito disuelto en agua'],
  'vegetable stock': ['Agua con hierbas', 'Caldo de verduras'],
  water: ['Caldo ligero', 'Agua'],
  oil: ['Aceite vegetal', 'Aceite de oliva'],
  ghee: ['Mantequilla clarificada', 'Aceite'],
  tahini: ['Mantequilla de maní', 'Yogur espeso'],
  hummus: ['Puré de garbanzo', 'Baba ganoush'],
  filo: ['Masa filo', 'Masa de hojaldre fina'],
  pastry: ['Masa quebrada', 'Masa hojaldrada'],
  mozzarella: ['Queso fresco', 'Queso para gratinar'],
  parmesan: ['Queso rallado', 'Pecorino'],
  'cream cheese': ['Queso crema', 'Ricotta batida'],
  'sour cream': ['Yogur natural', 'Crema agria'],
  'creme fraiche': ['Crema espesa', 'Yogur griego'],
  beetroot: ['Remolacha', 'Zanahoria morada'],
  prune: ['Ciruela seca', 'Dátil'],
  bay: ['Laurel', 'Tomillo seco'],
  leaf: ['Hoja de laurel'],
  cardamom: ['Cardamomo', 'Canela + clavo'],
  coriander: ['Cilantro molido', 'Comino suave'],
  'garam masala': ['Curry en polvo', 'Comino + cilantro'],
  sumac: ['Limón rallado', 'Vinagre suave'],
  molasses: ['Miel oscura', 'Melaza de caña'],
  bulgur: ['Cuscús', 'Quinoa'],
  couscous: ['Cuscús integral', 'Sémola cocida'],
  semolina: ['Harina de trigo', 'Polenta fina'],
  oat: ['Avena', 'Harina de avena'],
  nut: ['Nueces mixtas', 'Almendras'],
  seed: ['Semillas de girasol', 'Semillas de calabaza'],
  wine: ['Caldo blanco', 'Agua con limón'],
};

/** Grupos: si no hay match exacto, sugerir del mismo grupo */
const GRUPOS = {
  verdura: ['Zanahoria', 'Cebolla', 'Pimiento morrón', 'Zucchini', 'Tomate', 'Ajo', 'Perejil'],
  proteina: ['Pollo', 'Huevo', 'Lentejas', 'Garbanzos', 'Atún', 'Carne picada'],
  lacteo: ['Leche', 'Queso', 'Mantequilla', 'Yogur', 'Crema'],
  cereal: ['Arroz', 'Harina', 'Pan', 'Pasta', 'Avena'],
  condimento: ['Sal', 'Pimienta', 'Aceite de oliva', 'Comino', 'Pimentón'],
  marisco: ['Camarón', 'Mejillón', 'Calamar', 'Pulpo'],
};

const PALABRAS_GRUPO = [
  [['tomato', 'pepper', 'onion', 'garlic', 'carrot', 'cucumber', 'cabbage', 'pumpkin', 'beet', 'lettuce', 'parsley', 'cilantro', 'mint', 'dill', 'bean', 'corn', 'mushroom', 'potato', 'squash', 'chilli', 'chili'], 'verdura'],
  [['chicken', 'beef', 'pork', 'lamb', 'fish', 'salmon', 'tuna', 'prawn', 'shrimp', 'mussel', 'squid', 'egg', 'tofu'], 'proteina'],
  [['milk', 'cheese', 'butter', 'cream', 'yogurt', 'yoghurt', 'mozzarella'], 'lacteo'],
  [['rice', 'flour', 'bread', 'pasta', 'macaroni', 'oat', 'lentil', 'chickpea', 'dal', 'corn', 'bulgur'], 'cereal'],
  [['salt', 'cumin', 'paprika', 'turmeric', 'spice', 'sauce', 'oil', 'vinegar', 'mustard'], 'condimento'],
  [['prawn', 'mussel', 'squid', 'shrimp', 'tiger'], 'marisco'],
];

function grupoDe(norm) {
  for (const [palabras, grupo] of PALABRAS_GRUPO) {
    if (palabras.some((p) => norm.includes(p))) return grupo;
  }
  return null;
}

function buscarEnMapa(norm) {
  if (POR_INGREDIENTE[norm]) return [...POR_INGREDIENTE[norm]];
  const resultados = [];
  for (const [clave, lista] of Object.entries(POR_INGREDIENTE)) {
    if (norm.includes(clave) || clave.includes(norm)) {
      lista.forEach((s) => resultados.push(s));
    }
  }
  return resultados;
}

function sustitutosDeDespensa(norm, despensa) {
  if (!despensa?.length) return [];
  const grupoFaltante = grupoDe(norm);
  const nombresSustitutos = buscarEnMapa(norm).map((s) => normalizarIngrediente(traducirIngrediente(s)));

  return despensa.filter((item) => {
    const itemNorm = normalizarIngrediente(item);
    if (itemNorm === norm) return false;
    if (grupoFaltante && grupoDe(itemNorm) === grupoFaltante) return true;
    return nombresSustitutos.some(
      (s) => s && (itemNorm.includes(s) || s.includes(itemNorm))
    );
  });
}

/**
 * @param {object} ing - { key, nombre, nombreOriginal }
 * @param {string[]} despensa
 */
export function obtenerSustitutosPara(ing, despensa = []) {
  const norm = ing.key || normalizarIngrediente(ing.nombreOriginal || ing.nombre);
  const vistos = new Set();
  const enDespensa = [];
  const alternativas = [];

  for (const item of sustitutosDeDespensa(norm, despensa)) {
    const etiqueta = `✓ ${item} (en tu despensa)`;
    if (!vistos.has(etiqueta)) {
      vistos.add(etiqueta);
      enDespensa.push(etiqueta);
    }
  }

  for (const s of buscarEnMapa(norm)) {
    const es = traducirIngrediente(s) || s;
    if (!vistos.has(es)) {
      vistos.add(es);
      alternativas.push(es);
    }
  }

  const grupo = grupoDe(norm);
  if (grupo && GRUPOS[grupo]) {
    for (const s of GRUPOS[grupo]) {
      if (!vistos.has(s) && normalizarIngrediente(s) !== norm) {
        vistos.add(s);
        alternativas.push(s);
      }
    }
  }

  if (!alternativas.length && ing.nombreOriginal) {
    const traducido = traducirIngrediente(ing.nombreOriginal);
    if (traducido && traducido !== ing.nombre) {
      alternativas.push(`Similar: ${traducido}`);
    }
  }

  const lista = [...enDespensa, ...alternativas].slice(0, 8);

  if (lista.length === 0) {
    return [
      'Consulta un ingrediente parecido en tu despensa',
      'Omite si es opcional para decorar',
      'Busca versión seca o enlatada del mismo producto',
    ];
  }

  return lista;
}
