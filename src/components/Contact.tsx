import { site } from "@/data/site";
import { btn } from "@/lib/ui";
import { whatsappLink } from "@/lib/whatsapp";
import { HoursTable } from "./HoursTable";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

export function Contact() {
  const { address } = site.contact;

  return (
    <section id="contacto" className="tema-claro bg-crema py-24 text-noche sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
            Visítanos
          </h2>

          <address className="mt-10 space-y-6 not-italic">
            <div className="flex gap-4">
              <PinIcon className="mt-0.5 size-6 shrink-0 text-terracota" />
              <p className="leading-relaxed">
                <span className="font-semibold">{address.street}</span>
                <br />
                {address.district}, {address.city}
                <br />
                <span className="text-arcilla">{address.reference}</span>
              </p>
            </div>
            <div className="flex gap-4">
              <PhoneIcon className="mt-0.5 size-6 shrink-0 text-terracota" />
              <p className="leading-relaxed">
                <a
                  href={`tel:${site.contact.phoneHref}`}
                  className="inline-block py-1 font-semibold underline decoration-noche/25 underline-offset-4 hover:decoration-noche"
                >
                  {site.contact.phoneDisplay}
                </a>
                <br />
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-arcilla underline decoration-arcilla/30 underline-offset-4 hover:text-noche"
                >
                  Escríbenos por WhatsApp
                </a>
              </p>
            </div>
          </address>

          <div className="mt-12">
            <h3 className="font-display text-[1.5rem]">Horario de atención</h3>
            <div className="mt-4">
              <HoursTable />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <figure className="overflow-hidden rounded-lg border border-noche/10 bg-papel">
            <IllustratedMap />
            <figcaption className="flex flex-col gap-4 border-t border-noche/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <p className="text-[0.92rem] leading-relaxed text-arcilla">
                Mapa ilustrativo. Para llegar, abre la ubicación en Google Maps.
              </p>
              <a
                href={site.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${btn.outlineLight} shrink-0`}
              >
                Cómo llegar
              </a>
            </figcaption>
          </figure>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`${btn.primary} mt-6 w-full sm:w-auto`}
          >
            <WhatsAppIcon className="size-5" />
            Preguntar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/** Ilustración de la zona (no es un mapa real). */
function IllustratedMap() {
  return (
    <svg
      viewBox="0 0 640 420"
      className="block h-auto w-full"
      role="img"
      aria-label={`Ilustración de la ubicación de ${site.name} en ${site.contact.address.district}, cerca de un parque y del malecón`}
    >
      <rect width="640" height="420" fill="#efe4d1" />
      {/* Mar y malecón */}
      <path d="M0 0h120c-30 70-10 140-40 210s-10 150-30 210H0z" fill="#d9cbb3" />
      <path
        d="M120 0c-30 70-10 140-40 210s-10 150-30 210"
        fill="none"
        stroke="#c9a15a"
        strokeWidth="2"
        strokeDasharray="2 6"
        strokeLinecap="round"
      />
      <text
        x="34"
        y="214"
        fill="#6e5747"
        fontSize="13"
        fontFamily="var(--font-sans)"
        transform="rotate(-80 34 214)"
        letterSpacing="2"
      >
        Océano Pacífico
      </text>
      {/* Calles */}
      <g stroke="#faf5ec" strokeWidth="14" strokeLinecap="round">
        <path d="M150 70h470M140 170h480M120 270h500M100 365h520" />
        <path d="M230 20v390M350 20v390M470 20v390M580 20v390" />
      </g>
      <path d="M130 400L600 40" stroke="#faf5ec" strokeWidth="22" strokeLinecap="round" />
      <g stroke="#e3d6c1" strokeWidth="1.5">
        <path d="M150 70h470M140 170h480M120 270h500M100 365h520M230 20v390M350 20v390M470 20v390M580 20v390" />
      </g>
      {/* Parque */}
      <rect x="362" y="182" width="96" height="76" rx="6" fill="#b9c4a0" />
      <circle cx="390" cy="210" r="9" fill="#9fae84" />
      <circle cx="425" cy="232" r="11" fill="#9fae84" />
      <text x="410" y="282" textAnchor="middle" fill="#6e5747" fontSize="13" fontFamily="var(--font-sans)">
        Parque
      </text>
      {/* Ubicación */}
      <g transform="translate(292 228)">
        <circle r="34" fill="#9f4324" opacity="0.14" />
        <path d="M0 6s-17-14.7-17-27a17 17 0 0134 0C17-8.7 0 6 0 6z" fill="#9f4324" />
        <circle cy="-21" r="6" fill="#faf5ec" />
      </g>
      <g transform="translate(292 268)">
        <rect x="-74" y="0" width="148" height="34" rx="17" fill="#15110e" />
        <text y="22" textAnchor="middle" fill="#f3eada" fontSize="15" fontFamily="var(--font-display)">
          {site.name}
        </text>
      </g>
    </svg>
  );
}
