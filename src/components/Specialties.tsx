import Image from "next/image";
import { specialties } from "@/data/menu";
import { formatPrice } from "@/lib/whatsapp";
import { Reveal } from "./Reveal";

export function Specialties() {
  return (
    <section id="especialidades" className="bg-noche py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-crema lg:col-span-7">
            Tres platos que definen la casa
          </h2>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-humo lg:col-span-5 lg:justify-self-end">
            Si es tu primera visita, empieza por aquí. Son los que más se piden y los que mejor cuentan quiénes somos.
          </p>
        </div>

        <ul className="mt-16 grid gap-16 md:grid-cols-3 md:gap-8 lg:mt-20 lg:gap-12">
          {specialties.map((dish, i) => (
            <li key={dish.name} className={i === 1 ? "md:mt-16" : undefined}>
              <article>
                <Reveal variant="arco" delay={i * 140} className="arco relative aspect-[3/4] bg-carbon">
                  <Image
                    src={dish.photo.src}
                    alt={dish.photo.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 92vw"
                    className="object-cover"
                  />
                </Reveal>
                <div className="mt-8 flex items-baseline justify-between gap-4 border-b border-oro/25 pb-4">
                  <h3 className="font-display text-[1.75rem] leading-tight text-crema">{dish.name}</h3>
                  <p className="shrink-0 text-lg font-semibold text-oro">
                    <span className="sr-only">Precio: </span>
                    {formatPrice(dish.price)}
                  </p>
                </div>
                <p className="mt-5 text-[0.98rem] leading-[1.7] text-humo">{dish.story}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
