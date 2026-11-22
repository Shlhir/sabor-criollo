import { site } from "@/data/site";

/** Enlace a WhatsApp (wa.me) con un mensaje opcional ya escrito. */
export function whatsappLink(message?: string): string {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Mensaje genérico para los botones "Reservar". */
export const defaultReservationMessage = `¡Hola, ${site.name}! Quisiera reservar una mesa.`;

export type ReservationData = {
  name: string;
  phone: string;
  dateLabel: string;
  time: string;
  guests: number;
  occasion?: string;
  notes?: string;
};

/** Texto que llega al WhatsApp del restaurante cuando alguien envía el formulario. */
export function reservationMessage(data: ReservationData): string {
  const lines = [
    `¡Hola, ${site.name}! Quisiera reservar una mesa:`,
    "",
    `• Nombre: ${data.name}`,
    `• Teléfono: ${data.phone}`,
    `• Fecha: ${data.dateLabel}`,
    `• Hora: ${data.time}`,
    `• Personas: ${data.guests}`,
  ];
  if (data.occasion) lines.push(`• Ocasión: ${data.occasion}`);
  if (data.notes) lines.push(`• Comentarios: ${data.notes}`);
  lines.push("", "Quedo atento(a) a la confirmación. ¡Gracias!");
  return lines.join("\n");
}

/** 48 → "S/ 48" */
export function formatPrice(value: number): string {
  return `S/ ${value.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
}
