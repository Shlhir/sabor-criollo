import Image from "next/image";
import { photos } from "@/data/images";
import { site } from "@/data/site";
import { btn } from "@/lib/ui";
import { defaultReservationMessage, whatsappLink } from "@/lib/whatsapp";
import { OpenStatus } from "./OpenStatus";
import { WhatsAppIcon } from "./icons";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-noche pt-16 lg:pt-[4.5rem]">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-10 sm:px-8 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:py-14">
        <div className="max-w-xl">
          <p className="text-[0.95rem] text-oro">
            Cocina criolla en {site.contact.address.district}, desde {site.foundedYear}
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.9rem,8.4vw,5.6rem)] leading-[0.98] tracking-[-0.02em] text-crema">
            Cocina criolla, servida como en casa.
          </h1>
          <p className="mt-7 max-w-[34rem] text-[1.075rem] leading-relaxed text-crema/80">
            Ceviche con la pesca del día, guisos a fuego lento y pisco sour bien batido, en el corazón de{" "}
            {site.contact.address.district}.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(defaultReservationMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className={btn.primary}
            >
              <WhatsAppIcon className="size-5" />
              Reservar por WhatsApp
            </a>
            <a href="#carta" className={btn.outlineDark}>
              Ver la carta
            </a>
          </div>
          <OpenStatus className="mt-8" />
        </div>

        {/* Foto principal con forma de arco colonial */}
        <figure className="mx-auto w-full max-w-[26rem] px-3 sm:px-4 lg:max-w-[30rem]">
          <div className="relative">
            <div className="arco absolute -inset-3 border border-oro/35 sm:-inset-4" aria-hidden="true" />
            <div className="arco entrada-arco relative aspect-[4/5] bg-carbon">
              <Image
                src={photos.hero.src}
                alt={photos.hero.alt}
                fill
                preload
                quality={80}
                sizes="(min-width: 1024px) 480px, (min-width: 640px) 416px, 92vw"
                className="object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-7 text-center text-sm text-humo">
            Ceviche mixto con chicharrón de calamar
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
