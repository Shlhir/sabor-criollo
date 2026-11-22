/**
 * CARTA DEL RESTAURANTE
 * -----------------------------------------------------------------------------
 * Para cambiar un plato, edita su nombre, descripción o precio.
 * Para agregar uno nuevo, copia un bloque { ... } completo dentro de `items`.
 *
 * - price: número en soles, sin el "S/" (el sitio lo agrega solo).
 * - tags (opcional): "casa" (recomendación de la casa), "picante", "compartir".
 *
 * ⚠️ DEMO: precios referenciales para un restaurante de ticket medio en Lima.
 */
import { photos, type Photo } from "./images";

export type MenuTag = "casa" | "picante" | "compartir";

export type MenuItem = {
  name: string;
  description: string;
  price: number;
  tags?: MenuTag[];
};

export type MenuCategory = {
  id: string;
  title: string;
  intro: string;
  photo: Photo;
  items: MenuItem[];
};

export const tagLabels: Record<MenuTag, string> = {
  casa: "De la casa",
  picante: "Picante",
  compartir: "Para compartir",
};

export const menu: MenuCategory[] = [
  {
    id: "entradas",
    title: "Entradas",
    intro: "Para abrir la mesa mientras llega el pisco sour.",
    photo: photos.anticuchos,
    items: [
      {
        name: "Causa limeña de cangrejo",
        description: "Papa amarilla prensada con ají amarillo y limón, rellena de pulpa de cangrejo y palta.",
        price: 34,
        tags: ["casa"],
      },
      {
        name: "Anticuchos de corazón",
        description: "Tres palitos marinados en ají panca, a la parrilla, con papa dorada y choclo.",
        price: 32,
        tags: ["compartir"],
      },
      {
        name: "Tiradito al ají amarillo",
        description: "Láminas de pescado del día en crema de ají amarillo y leche de tigre.",
        price: 42,
        tags: ["picante"],
      },
      {
        name: "Papa a la huancaína",
        description: "Papa amarilla en crema de ají amarillo y queso fresco, con huevo y aceituna de botija.",
        price: 24,
      },
      {
        name: "Choritos a la chalaca",
        description: "Mejillones con salsa criolla de cebolla, tomate, choclo y limón.",
        price: 28,
        tags: ["compartir"],
      },
    ],
  },
  {
    id: "fondos",
    title: "Platos de fondo",
    intro: "Recetas criollas de siempre, cocinadas al momento.",
    photo: photos.sudado,
    items: [
      {
        name: "Ceviche clásico",
        description: "Pescado del día en leche de tigre con ají limo, cebolla morada, camote glaseado y choclo.",
        price: 48,
        tags: ["casa", "picante"],
      },
      {
        name: "Ceviche mixto con chicharrón de calamar",
        description: "Pescado, langostinos y pulpo en leche de tigre, con calamar crocante y cancha.",
        price: 56,
        tags: ["compartir"],
      },
      {
        name: "Lomo saltado",
        description: "Lomo fino salteado al wok con cebolla, tomate y sillao. Con papas fritas y arroz.",
        price: 58,
        tags: ["casa"],
      },
      {
        name: "Ají de gallina",
        description: "Gallina deshilachada en crema de ají amarillo y pecanas, con papa, huevo y arroz.",
        price: 42,
      },
      {
        name: "Sudado de pescado norteño",
        description: "Pescado en caldo de tomate, cebolla, ají y chicha de jora. Con yuca y arroz.",
        price: 52,
      },
      {
        name: "Seco de cordero con frejoles",
        description: "Cordero guisado a fuego lento en culantro y chicha de jora.",
        price: 62,
      },
    ],
  },
  {
    id: "bebidas",
    title: "Bebidas",
    intro: "Pisco de Ica, frutas de estación y chicha hecha en casa.",
    photo: photos.piscoSour,
    items: [
      {
        name: "Pisco sour clásico",
        description: "Pisco quebranta, limón, jarabe, clara de huevo y gotas de amargo.",
        price: 26,
        tags: ["casa"],
      },
      {
        name: "Maracuyá sour",
        description: "Pisco acholado con pulpa de maracuyá fresca.",
        price: 28,
      },
      {
        name: "Chilcano de pisco",
        description: "Pisco, ginger ale, limón y hielo.",
        price: 24,
      },
      {
        name: "Chicha morada (jarra de 1 L)",
        description: "Maíz morado hervido con piña, canela y clavo. Sin preservantes.",
        price: 26,
        tags: ["compartir"],
      },
      {
        name: "Limonada de hierbaluisa",
        description: "Limón recién exprimido con hierbaluisa fresca.",
        price: 14,
      },
    ],
  },
  {
    id: "postres",
    title: "Postres",
    intro: "Dulces limeños para cerrar despacio.",
    photo: photos.alfajores,
    items: [
      {
        name: "Suspiro a la limeña",
        description: "Manjar blanco de yemas cubierto con merengue al oporto y canela.",
        price: 22,
        tags: ["casa"],
      },
      {
        name: "Picarones con miel de chancaca",
        description: "Buñuelos de zapallo y camote, fritos al momento.",
        price: 22,
        tags: ["compartir"],
      },
      {
        name: "Alfajores de maicena",
        description: "Dos alfajores rellenos de manjar blanco con coco rallado.",
        price: 16,
      },
      {
        name: "Combinado limeño",
        description: "Mazamorra morada y arroz con leche, servidos tibios en el mismo plato.",
        price: 18,
      },
      {
        name: "Helado de lúcuma",
        description: "Helado artesanal de lúcuma con crocante de pecanas.",
        price: 18,
      },
    ],
  },
];

/** Tres platos destacados en la sección "Especialidades". */
export const specialties = [
  {
    name: "Ceviche clásico",
    photo: photos.ceviche,
    price: 48,
    story:
      "Pescado comprado cada mañana en el terminal de Villa María del Triunfo, cortado al momento y curado en limón piurano. Lo servimos con camote glaseado y choclo, como se come en las cevicherías de Lima.",
  },
  {
    name: "Lomo saltado",
    photo: photos.lomoSaltado,
    price: 58,
    story:
      "El encuentro de la cocina criolla y el chifa en un solo plato. Lomo fino salteado al wok a fuego alto, con cebolla morada, tomate y un toque de sillao que se termina frente a la llama.",
  },
  {
    name: "Causa limeña",
    photo: photos.causa,
    price: 34,
    story:
      "Papa amarilla prensada a mano con ají amarillo y limón, en capas con cangrejo y palta. Una receta familiar que se prepara en la mañana para servirla fresca todo el día.",
  },
];
