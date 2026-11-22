"use client";

/**
 * Loader de imágenes para next/image.
 *
 * - Fotos de Unsplash (https://images.unsplash.com/...): se piden al ancho exacto
 *   que necesita cada pantalla y en formato moderno (auto=format → WebP/AVIF).
 * - Fotos locales (por ejemplo "/fotos/ceviche.jpg" dentro de /public): se
 *   devuelven sin cambios. Así puedes reemplazar las fotos de demostración por
 *   las reales del restaurante sin tocar este archivo.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith("https://images.unsplash.com/")) {
    const url = new URL(src);
    url.searchParams.set("w", String(width));
    url.searchParams.set("q", String(quality ?? 70));
    url.searchParams.set("auto", "format");
    url.searchParams.set("fit", "crop");
    return url.toString();
  }
  return src;
}
