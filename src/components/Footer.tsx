import { navLinks, site } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";
import { Logo } from "./Logo";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./icons";

const socialIcons = { Instagram: InstagramIcon, Facebook: FacebookIcon, TikTok: TikTokIcon } as const;

export function Footer() {
  const year = new Date().getFullYear();
  const { address } = site.contact;

  return (
    <footer className="bg-noche pb-28 pt-20 text-crema sm:pb-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 border-b border-oro/20 pb-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm leading-relaxed text-humo">
              {site.tagline}. Almuerzos y cenas de martes a domingo.
            </p>
            <ul className="mt-7 flex gap-3" aria-label="Redes sociales">
              {site.social.map((s) => {
                const Icon = socialIcons[s.name as keyof typeof socialIcons];
                return (
                  <li key={s.name}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} en ${s.name}`}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-oro/30 text-crema transition-colors hover:border-oro hover:text-oro"
                    >
                      {Icon && <Icon className="size-[1.1rem]" />}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-label="Pie de página" className="md:col-span-3">
            <h2 className="font-display text-lg text-oro">Secciones</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-1">
              {navLinks.map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="inline-block py-1.5 text-crema/80 hover:text-crema">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="font-display text-lg text-oro">Contacto</h2>
            <address className="mt-4 space-y-1 not-italic leading-relaxed text-crema/80">
              <p>
                {address.street}, {address.district}, {address.city}
              </p>
              <p>
                <a href={`tel:${site.contact.phoneHref}`} className="inline-block py-1.5 hover:text-crema">
                  {site.contact.phoneDisplay}
                </a>
              </p>
              <p>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1.5 hover:text-crema"
                >
                  WhatsApp
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-8 text-[0.85rem] leading-relaxed text-humo md:flex-row md:justify-between">
          <p>
            © {year} {site.name}. Sitio de demostración: el restaurante y la dirección son ficticios; WhatsApp y
            teléfono contactan al desarrollador del sitio.
          </p>
          <p>
            Fotografías:{" "}
            <a
              href="https://unsplash.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-crema"
            >
              Unsplash
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
