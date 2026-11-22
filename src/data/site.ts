/**
 * DATOS DEL NEGOCIO
 * -----------------------------------------------------------------------------
 * Este es el archivo principal para personalizar el sitio. Todo lo que cambies
 * aquí se actualiza automáticamente en la portada, el formulario de reservas,
 * la sección de contacto, el footer y los datos para Google (SEO).
 *
 * ⚠️  DEMO: el nombre, la dirección y las redes sociales son ficticios. El
 *     WhatsApp y el teléfono son del desarrollador del sitio. Reemplázalos por los datos reales antes de usar el sitio con
 *     un cliente.
 */

export const site = {
  name: "Sabor Criollo",
  tagline: "Cocina criolla peruana en Miraflores",
  /** URL final del sitio publicado (se usa para SEO y redes sociales). */
  url: "https://sabor-criollo-alpha.vercel.app",
  description:
    "Restaurante de cocina criolla peruana en Miraflores, Lima: ceviche del día, lomo saltado, causa limeña y pisco sour. Reserva tu mesa por WhatsApp.",
  foundedYear: 2009,
  /** Zona horaria del local (para "Abierto ahora" y los horarios de reserva). */
  timeZone: "America/Lima",

  contact: {
    /**
     * Número de WhatsApp en formato internacional, SOLO dígitos:
     * código de país (51 para Perú) + número de celular. Ej.: "51987654321".
     * ⚠️ DEMO: número del desarrollador del sitio (recibe las reservas de prueba).
     *    Cámbialo por el número real del restaurante.
     */
    whatsapp: "51920478477",
    /** Teléfono tal como se muestra en pantalla. */
    phoneDisplay: "+51 920 478 477",
    /** Teléfono para el enlace "llamar" (formato internacional con +). */
    phoneHref: "+51920478477",
    address: {
      street: "Pasaje Las Buganvillas 230",
      district: "Miraflores",
      city: "Lima",
      country: "PE",
      /** Referencia corta para los clientes. */
      reference: "A dos cuadras del Parque Kennedy",
    },
    /** Enlace del botón "Cómo llegar" (Google Maps). */
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Miraflores%2C%20Lima%2C%20Per%C3%BA",
  },

  /**
   * Redes sociales. ⚠️ DEMO: apuntan a la página principal de cada red.
   * Reemplaza cada `url` por el perfil real del negocio.
   */
  social: [
    { name: "Instagram", url: "https://www.instagram.com/" },
    { name: "Facebook", url: "https://www.facebook.com/" },
    { name: "TikTok", url: "https://www.tiktok.com/" },
  ],

  reservations: {
    /** Máximo de personas que se pueden reservar desde la web. */
    maxGuests: 12,
    /** Cuántos días hacia adelante se puede reservar. */
    maxDaysAhead: 60,
    /** Minutos entre cada horario disponible. */
    slotMinutes: 30,
    /** La última reserva se acepta estos minutos antes del cierre. */
    lastSeatingBeforeClose: 60,
  },
} as const;

/**
 * HORARIO DE ATENCIÓN
 * -----------------------------------------------------------------------------
 * day: 0 = domingo, 1 = lunes, … 6 = sábado.
 * Cada día puede tener varios turnos (almuerzo y cena). Un día sin turnos
 * aparece como "Cerrado" y no se puede elegir en el formulario de reservas.
 */
export type Shift = { open: string; close: string };
export type DaySchedule = { day: number; label: string; shifts: Shift[] };

export const schedule: DaySchedule[] = [
  { day: 1, label: "Lunes", shifts: [] },
  {
    day: 2,
    label: "Martes",
    shifts: [
      { open: "12:30", close: "16:30" },
      { open: "19:00", close: "23:00" },
    ],
  },
  {
    day: 3,
    label: "Miércoles",
    shifts: [
      { open: "12:30", close: "16:30" },
      { open: "19:00", close: "23:00" },
    ],
  },
  {
    day: 4,
    label: "Jueves",
    shifts: [
      { open: "12:30", close: "16:30" },
      { open: "19:00", close: "23:00" },
    ],
  },
  {
    day: 5,
    label: "Viernes",
    shifts: [
      { open: "12:30", close: "16:30" },
      { open: "19:00", close: "23:30" },
    ],
  },
  {
    day: 6,
    label: "Sábado",
    shifts: [
      { open: "12:30", close: "16:30" },
      { open: "19:00", close: "23:30" },
    ],
  },
  { day: 0, label: "Domingo", shifts: [{ open: "12:30", close: "17:00" }] },
];

/** Enlaces del menú de navegación (el `id` debe coincidir con el de cada sección). */
export const navLinks = [
  { id: "nosotros", label: "Nosotros" },
  { id: "especialidades", label: "Especialidades" },
  { id: "carta", label: "Carta" },
  { id: "galeria", label: "Galería" },
  { id: "reservas", label: "Reservas" },
  { id: "contacto", label: "Contacto" },
] as const;
