import { schedule, site, type DaySchedule } from "@/data/site";

/** Fecha y hora actuales en la zona horaria del restaurante (Lima), sin importar dónde esté el visitante. */
export function restaurantNow(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: site.timeZone }));
}

/** "12:30" → 750 (minutos desde la medianoche). */
export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** 750 → "12:30". */
export function fromMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function getDaySchedule(day: number): DaySchedule {
  return schedule.find((d) => d.day === day) ?? { day, label: "", shifts: [] };
}

/** "2026-11-20" → objeto Date a medianoche local (evita desfases de zona horaria). */
export function parseISODate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
}

/** Date → "2026-11-20" en hora local. */
export function toISODate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/**
 * Horarios disponibles para reservar en una fecha.
 * Si la fecha es hoy, solo se ofrecen horarios con al menos 60 minutos de anticipación.
 */
export function getReservationSlots(date: Date, now: Date = restaurantNow()): string[] {
  const { slotMinutes, lastSeatingBeforeClose } = site.reservations;
  const isToday = toISODate(date) === toISODate(now);
  const earliest = isToday ? now.getHours() * 60 + now.getMinutes() + 60 : 0;

  return getDaySchedule(date.getDay()).shifts.flatMap(({ open, close }) => {
    const slots: string[] = [];
    const last = toMinutes(close) - lastSeatingBeforeClose;
    for (let t = toMinutes(open); t <= last; t += slotMinutes) {
      if (t >= earliest) slots.push(fromMinutes(t));
    }
    return slots;
  });
}

/** "12:30 – 16:30 y 19:00 – 23:00" o "Cerrado". */
export function formatShifts(day: DaySchedule): string {
  if (day.shifts.length === 0) return "Cerrado";
  return day.shifts.map((s) => `${s.open} – ${s.close}`).join(" y ");
}

/** Estado actual del local para el aviso "Abierto ahora". */
export function getOpenStatus(now: Date = restaurantNow()): { open: boolean; text: string } {
  const minutes = now.getHours() * 60 + now.getMinutes();
  const today = getDaySchedule(now.getDay());

  const current = today.shifts.find((s) => minutes >= toMinutes(s.open) && minutes < toMinutes(s.close));
  if (current) return { open: true, text: `Abierto ahora, cierra a las ${current.close}` };

  const laterToday = today.shifts.find((s) => toMinutes(s.open) > minutes);
  if (laterToday) return { open: false, text: `Cerrado ahora, abre hoy a las ${laterToday.open}` };

  for (let i = 1; i <= 7; i++) {
    const next = getDaySchedule((now.getDay() + i) % 7);
    if (next.shifts.length > 0) {
      const when = i === 1 ? "mañana" : `el ${next.label.toLowerCase()}`;
      return { open: false, text: `Cerrado ahora, abre ${when} a las ${next.shifts[0].open}` };
    }
  }
  return { open: false, text: "Cerrado" };
}
