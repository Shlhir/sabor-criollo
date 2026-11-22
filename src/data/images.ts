/**
 * FOTOGRAFÍAS
 * -----------------------------------------------------------------------------
 * ⚠️ DEMO: fotos de Unsplash (licencia gratuita, permite uso comercial,
 * https://unsplash.com/license). Son referenciales: no muestran el local ni los
 * platos reales de un restaurante. Antes de entregar el sitio a un cliente,
 * reemplázalas por fotos propias del negocio.
 *
 * Para usar una foto propia:
 *   1. Guárdala en /public/fotos/ (por ejemplo /public/fotos/ceviche.jpg).
 *      Recomendado: JPG o WebP de máximo 2000 px de ancho y menos de 400 KB.
 *   2. Cambia `src` por "/fotos/ceviche.jpg".
 *   3. Actualiza `alt` describiendo lo que se ve en la foto (accesibilidad y SEO).
 */

export type Photo = { src: string; alt: string };

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}`;

export const photos = {
  hero: {
    src: unsplash("1761314036542-6570ef45dbb3"),
    alt: "Ceviche mixto con chicharrón de calamar, camote, choclo y cancha en un plato hondo",
  },
  ceviche: {
    src: unsplash("1535399831218-d5bd36d1a6b3"),
    alt: "Ceviche clásico de pescado con cebolla morada, camote, choclo y lechuga",
  },
  lomoSaltado: {
    src: unsplash("1668724776332-a20685b85151"),
    alt: "Lomo saltado con cebolla morada, tomate y culantro sobre fondo oscuro",
  },
  causa: {
    src: unsplash("1766456127047-806cdecdc139"),
    alt: "Causa limeña en capas bañada en crema de ají amarillo, con choclo y habas",
  },
  anticuchos: {
    src: unsplash("1761315414620-7f0f3ebdd866"),
    alt: "Anticuchos a la parrilla con papas doradas y salsa de hierbas",
  },
  sudado: {
    src: unsplash("1761314036698-a7a6e8514905"),
    alt: "Pescado cocido en caldo de tomate y ají servido en una olla de barro",
  },
  piscoSour: {
    src: unsplash("1632995561510-38616ed64ff6"),
    alt: "Pisco sour con espuma blanca y gotas de amargo en una copa sobre barra de madera",
  },
  alfajores: {
    src: unsplash("1792859441713-fd71352388ac"),
    alt: "Tres alfajores rellenos de manjar blanco con bordes de coco rallado",
  },
  chef: {
    src: unsplash("1577219491135-ce391730fb2c"),
    alt: "Cocinero emplatando bajo lámparas de cobre en la cocina",
  },
  maiz: {
    src: unsplash("1632913582499-381c7c798787"),
    alt: "Mazorcas de maíz morado y maíz de colores andino en una canasta",
  },
  salon: {
    src: unsplash("1701722952679-beffce26d77a"),
    alt: "Salón del restaurante con luz cálida, sillas terracota y mesas de madera",
  },
  salonLamparas: {
    src: unsplash("1552960226-639240203497"),
    alt: "Lámparas encendidas sobre las mesas del salón por la noche",
  },
  salonMesas: {
    src: unsplash("1650490632010-e18cbb694dd1"),
    alt: "Mesa redonda preparada para la cena en un salón de luz tenue",
  },
  cevicheBowl: {
    src: unsplash("1652498199372-30dfd622ceef"),
    alt: "Ceviche con cebolla morada, ají limo, cancha y chifles en un plato de cerámica",
  },
  tiradito: {
    src: unsplash("1726514730505-498992196c96"),
    alt: "Tiradito de pescado en láminas finas sobre mármol negro",
  },
  cevicheOscuro: {
    src: unsplash("1731570225640-7ddad4231679"),
    alt: "Ceviche en leche de tigre servido en un cuenco de piedra",
  },
  coctel: {
    src: unsplash("1696594935685-1ad6ba69e83e"),
    alt: "Cóctel sour con espuma y gotas de amargo en un vaso corto",
  },
  bocaditos: {
    src: unsplash("1672067993158-e144b3a9143f"),
    alt: "Bocaditos de la casa servidos en fila sobre una pizarra",
  },
  emplatado: {
    src: unsplash("1775497950071-965cf9e20b2f"),
    alt: "Cocinero decorando un plato pequeño con hojas frescas",
  },
} satisfies Record<string, Photo>;

/** Fotos de la galería, en el orden en que aparecen. */
export const gallery: Photo[] = [
  photos.salon,
  photos.cevicheBowl,
  photos.anticuchos,
  photos.coctel,
  photos.tiradito,
  photos.emplatado,
  photos.salonLamparas,
  photos.cevicheOscuro,
];

/** Imagen que se muestra al compartir el enlace en WhatsApp, Facebook, etc. */
export const shareImage = `${photos.hero.src}?w=1200&h=630&fit=crop&q=80&fm=jpg`;
