import type { NextConfig } from "next";

/**
 * Configuración de Next.js
 *
 * - output: "export" genera un sitio 100 % estático (carpeta /out) que se puede
 *   publicar en Vercel, Netlify, GitHub Pages o cualquier hosting.
 * - Las imágenes se optimizan con un "loader" propio (src/lib/image-loader.ts):
 *   el CDN de Unsplash entrega cada foto al tamaño justo y en formato moderno
 *   (WebP/AVIF). Si usas fotos propias en /public, el loader las deja tal cual.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    qualities: [70, 80],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
