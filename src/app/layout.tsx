import type { Metadata, Viewport } from "next";
import "@fontsource/gloock/latin-400.css";
import "@fontsource-variable/hanken-grotesk/index.css";
import "./globals.css";
import { schedule, site } from "@/data/site";
import { shareImage } from "@/data/images";

const title = `${site.name} | Restaurante de comida peruana en ${site.contact.address.district}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description: site.description,
  keywords: ["restaurante peruano", "comida criolla", "ceviche", "lomo saltado", "Miraflores", "Lima", "reservas"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    images: [{ url: shareImage, width: 1200, height: 630, alt: "Ceviche mixto de Sabor Criollo" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [shareImage],
  },
};

export const viewport: Viewport = {
  themeColor: "#15110e",
  colorScheme: "dark light",
};

/** Datos estructurados para Google (ficha de restaurante). */
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  description: site.description,
  url: site.url,
  image: shareImage,
  telephone: site.contact.phoneHref,
  servesCuisine: ["Peruana", "Criolla"],
  priceRange: "S/ 40 – S/ 90",
  acceptsReservations: true,
  menu: `${site.url}/#carta`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.contact.address.street,
    addressLocality: site.contact.address.district,
    addressRegion: site.contact.address.city,
    addressCountry: site.contact.address.country,
  },
  openingHoursSpecification: schedule.flatMap((d) =>
    d.shifts.map((s) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: dayNames[d.day],
      opens: s.open,
      closes: s.close,
    })),
  ),
  sameAs: site.social.map((s) => s.url),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-PE" suppressHydrationWarning>
      <head>
        {/* Activa las animaciones de scroll solo si JavaScript funciona. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-crema focus:px-5 focus:py-3 focus:text-noche"
        >
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
