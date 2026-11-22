/** Estilos de botones reutilizables (clases de Tailwind). */

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3.5 text-[0.95rem] font-semibold tracking-[0.01em] transition-[background-color,color,border-color,transform] duration-300 ease-(--ease-suave) active:scale-[0.98] min-h-12";

export const btn = {
  /** Botón principal (terracota) para reservar. */
  primary: `${base} bg-terracota text-papel hover:bg-[#8a3a1f]`,
  /** Botón con borde dorado, para fondos oscuros. */
  outlineDark: `${base} border border-oro/60 text-crema hover:border-oro hover:bg-oro/10`,
  /** Botón con borde, para fondos claros. */
  outlineLight: `${base} border border-noche/30 text-noche hover:border-noche hover:bg-noche/5`,
};
