"use client";

import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/data/site";
import { getReservationSlots, parseISODate, restaurantNow, toISODate, getDaySchedule } from "@/lib/schedule";
import { btn } from "@/lib/ui";
import { useHydrated } from "@/lib/useHydrated";
import { reservationMessage, whatsappLink } from "@/lib/whatsapp";
import { AlertIcon, CheckIcon, WhatsAppIcon } from "./icons";

type FormValues = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  notes: string;
};

type Errors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = { name: "", phone: "", date: "", time: "", guests: "2", occasion: "", notes: "" };

const occasions = ["Cumpleaños", "Aniversario", "Reunión de trabajo", "Celebración familiar"];

const NOTES_MAX = 300;

/** Acepta 987654321, 987 654 321, +51 987 654 321 o 51987654321. */
function normalizePhone(value: string): string | null {
  const digits = value.replace(/[^\d]/g, "");
  const local = digits.startsWith("51") && digits.length === 11 ? digits.slice(2) : digits;
  return /^9\d{8}$/.test(local) ? local : null;
}

function formatDateLabel(date: Date): string {
  const label = date.toLocaleDateString("es-PE", { weekday: "long", day: "numeric", month: "long" });
  return label.charAt(0).toUpperCase() + label.slice(1);
}

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  const today = restaurantNow();
  today.setHours(0, 0, 0, 0);

  const name = values.name.trim();
  if (name.length < 3) errors.name = "Escribe tu nombre (mínimo 3 letras).";
  else if (!/^[\p{L}\s'.-]+$/u.test(name)) errors.name = "El nombre solo puede tener letras y espacios.";

  if (!values.phone.trim()) errors.phone = "Escribe tu celular para confirmar la reserva.";
  else if (!normalizePhone(values.phone)) errors.phone = "Escribe un celular peruano de 9 dígitos que empiece con 9.";

  const date = parseISODate(values.date);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + site.reservations.maxDaysAhead);

  if (!values.date) errors.date = "Elige la fecha de tu visita.";
  else if (!date) errors.date = "La fecha no es válida.";
  else if (date < today) errors.date = "Elige una fecha a partir de hoy.";
  else if (date > maxDate)
    errors.date = `Puedes reservar con hasta ${site.reservations.maxDaysAhead} días de anticipación.`;
  else if (getDaySchedule(date.getDay()).shifts.length === 0)
    errors.date = `Los ${getDaySchedule(date.getDay()).label.toLowerCase()} estamos cerrados. Elige otro día.`;
  else if (getReservationSlots(date).length === 0) errors.date = "Ya no quedan horarios para hoy. Elige otra fecha.";

  if (!errors.date && date) {
    if (!values.time) errors.time = "Elige una hora.";
    else if (!getReservationSlots(date).includes(values.time)) errors.time = "Esa hora no está disponible. Elige otra.";
  }

  const guests = Number(values.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > site.reservations.maxGuests)
    errors.guests = `Elige entre 1 y ${site.reservations.maxGuests} personas.`;

  if (values.notes.length > NOTES_MAX) errors.notes = `Máximo ${NOTES_MAX} caracteres.`;

  return errors;
}

export function Reservation() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sentLink, setSentLink] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Fechas mínima y máxima del calendario. Se calculan en el navegador (no al compilar el sitio).
  const hydrated = useHydrated();
  const limits = useMemo(() => {
    if (!hydrated) return { min: undefined, max: undefined };
    const today = restaurantNow();
    const max = new Date(today);
    max.setDate(max.getDate() + site.reservations.maxDaysAhead);
    return { min: toISODate(today), max: toISODate(max) };
  }, [hydrated]);

  const selectedDate = parseISODate(values.date);
  const slots = selectedDate ? getReservationSlots(selectedDate) : [];

  const update = (field: keyof FormValues, value: string) => {
    const next = { ...values, [field]: value };
    // Si cambia la fecha y la hora elegida ya no existe ese día, se limpia.
    if (field === "date") {
      const d = parseISODate(value);
      if (!d || !getReservationSlots(d).includes(next.time)) next.time = "";
    }
    setValues(next);
    if (submitted || touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof FormValues) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  const show = (field: keyof FormValues) => (submitted || touched[field] ? errors[field] : undefined);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);

    const firstInvalid = (Object.keys(initialValues) as (keyof FormValues)[]).find((k) => found[k]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const date = parseISODate(values.date)!;
    const link = whatsappLink(
      reservationMessage({
        name: values.name.trim(),
        phone: values.phone.trim(),
        dateLabel: formatDateLabel(date),
        time: values.time,
        guests: Number(values.guests),
        occasion: values.occasion || undefined,
        notes: values.notes.trim() || undefined,
      }),
    );
    const win = window.open(link, "_blank");
    if (win) win.opener = null;
    setSentLink(link);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitted(false);
    setSentLink(null);
  };

  const closedDays = useMemo(
    () =>
      [0, 1, 2, 3, 4, 5, 6]
        .map(getDaySchedule)
        .filter((d) => d.shifts.length === 0)
        .map((d) => d.label.toLowerCase()),
    [],
  );

  return (
    <section id="reservas" className="bg-terracota py-24 text-papel sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5 lg:pr-6">
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
            Reserva tu mesa
          </h2>
          <p className="mt-7 max-w-md text-[1.05rem] leading-relaxed">
            Completa tus datos y te llevamos a WhatsApp con la solicitud lista para enviar. Te confirmamos la mesa por
            el mismo chat.
          </p>
          <ul className="mt-10 max-w-md space-y-5 border-t border-papel/30 pt-8 text-[0.98rem] leading-relaxed">
            <li>
              <strong className="font-semibold">Grupos de más de {site.reservations.maxGuests} personas:</strong>{" "}
              escríbenos directamente y armamos la mesa contigo.
            </li>
            <li>
              <strong className="font-semibold">Tolerancia:</strong> guardamos la mesa 15 minutos después de la hora
              reservada.
            </li>
            {closedDays.length > 0 && (
              <li>
                <strong className="font-semibold">Días de descanso:</strong> {closedDays.join(" y ")}.
              </li>
            )}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-lg bg-papel p-6 text-noche shadow-[0_30px_60px_-30px_rgb(21_17_14/0.55)] sm:p-10">
            {sentLink ? (
              <div className="py-6 text-center" role="status">
                <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#e7f4ec] text-whatsapp">
                  <CheckIcon className="size-7" />
                </span>
                <h3 className="mt-6 font-display text-[1.8rem] leading-tight">Tu solicitud está lista en WhatsApp</h3>
                <p className="mx-auto mt-4 max-w-md leading-relaxed text-arcilla">
                  Envía el mensaje que abrimos en WhatsApp. La reserva queda confirmada cuando te respondamos por ese
                  chat.
                </p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <a href={sentLink} target="_blank" rel="noopener noreferrer" className={btn.primary}>
                    <WhatsAppIcon className="size-5" />
                    Abrir WhatsApp de nuevo
                  </a>
                  <button type="button" onClick={reset} className={btn.outlineLight}>
                    Hacer otra reserva
                  </button>
                </div>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate aria-label="Formulario de reserva">
                <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
                  <Field id="name" label="Nombre y apellido" error={show("name")} className="sm:col-span-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      onBlur={() => blur("name")}
                      {...fieldProps("name", show("name"))}
                    />
                  </Field>

                  <Field id="phone" label="Celular" hint="Ej.: 987 654 321" error={show("phone")}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      onBlur={() => blur("phone")}
                      {...fieldProps("phone", show("phone"))}
                    />
                  </Field>

                  <Field id="guests" label="Personas" error={show("guests")}>
                    <select
                      id="guests"
                      name="guests"
                      value={values.guests}
                      onChange={(e) => update("guests", e.target.value)}
                      onBlur={() => blur("guests")}
                      {...fieldProps("guests", show("guests"))}
                    >
                      {Array.from({ length: site.reservations.maxGuests }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? "persona" : "personas"}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="date" label="Fecha" error={show("date")}>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      min={limits.min}
                      max={limits.max}
                      value={values.date}
                      onChange={(e) => update("date", e.target.value)}
                      onBlur={() => blur("date")}
                      {...fieldProps("date", show("date"))}
                    />
                  </Field>

                  <Field
                    id="time"
                    label="Hora"
                    hint={!selectedDate ? "Primero elige una fecha" : undefined}
                    error={show("time")}
                  >
                    <select
                      id="time"
                      name="time"
                      value={values.time}
                      disabled={!selectedDate || slots.length === 0}
                      onChange={(e) => update("time", e.target.value)}
                      onBlur={() => blur("time")}
                      {...fieldProps("time", show("time"))}
                    >
                      <option value="">{selectedDate && slots.length === 0 ? "Sin horarios" : "Elige una hora"}</option>
                      {slots.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field id="occasion" label="Ocasión (opcional)" className="sm:col-span-2">
                    <select
                      id="occasion"
                      name="occasion"
                      value={values.occasion}
                      onChange={(e) => update("occasion", e.target.value)}
                      {...fieldProps("occasion")}
                    >
                      <option value="">Sin ocasión especial</option>
                      {occasions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    id="notes"
                    label="Comentarios (opcional)"
                    hint={`${values.notes.length}/${NOTES_MAX}. Alergias, silla para bebé, mesa en terraza…`}
                    error={show("notes")}
                    className="sm:col-span-2"
                  >
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      maxLength={NOTES_MAX + 20}
                      value={values.notes}
                      onChange={(e) => update("notes", e.target.value)}
                      onBlur={() => blur("notes")}
                      {...fieldProps("notes", show("notes"))}
                    />
                  </Field>
                </div>

                <button type="submit" className={`${btn.primary} mt-9 w-full sm:w-auto`}>
                  <WhatsAppIcon className="size-5" />
                  Enviar reserva por WhatsApp
                </button>
                <p className="mt-4 text-sm leading-relaxed text-arcilla">
                  Se abrirá WhatsApp con tu solicitud. No guardamos tus datos en este sitio.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const inputBase =
  "block w-full min-h-12 rounded-md border bg-white px-4 py-3 text-[1rem] text-noche placeholder:text-arcilla/70 transition-colors duration-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracota disabled:cursor-not-allowed disabled:bg-crema/60 disabled:text-arcilla";

function fieldProps(id: string, error?: string) {
  return {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": `${id}-hint ${id}-error`,
    className: `${inputBase} ${error ? "border-[#b42318]" : "border-noche/20 hover:border-noche/40"}`,
  } as const;
}

function Field({
  id,
  label,
  hint,
  error,
  className = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[0.92rem] font-semibold">
        {label}
      </label>
      {children}
      <p id={`${id}-hint`} className={hint ? "mt-2 text-[0.85rem] text-arcilla" : "hidden"}>
        {hint}
      </p>
      <p
        id={`${id}-error`}
        className={error ? "mt-2 flex items-start gap-1.5 text-[0.88rem] font-medium text-[#b42318]" : ""}
        aria-live="polite"
      >
        {error && (
          <>
            <AlertIcon className="mt-px size-4 shrink-0" />
            {error}
          </>
        )}
      </p>
    </div>
  );
}
