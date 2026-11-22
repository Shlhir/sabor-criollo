import Image from "next/image";
import { photos } from "@/data/images";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";

const principles = [
  {
    title: "Mercado cada mañana",
    text: "Pescado, ajíes y tubérculos comprados el mismo día a productores de Lima y provincias.",
  },
  {
    title: "Recetas de familia",
    text: "La base son las recetas criollas de siempre; la técnica, la de una cocina profesional.",
  },
  {
    title: "Mesa sin apuro",
    text: "Platos para compartir y una sobremesa larga, como en un almuerzo de domingo.",
  },
];

export function About() {
  return (
    <section id="nosotros" className="tema-claro bg-crema py-24 text-noche sm:py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Fotos */}
        <div className="relative lg:col-span-6 lg:pr-10">
          <Reveal className="relative aspect-[4/5] overflow-hidden rounded-md sm:w-[82%]">
            <Image
              src={photos.chef.src}
              alt={photos.chef.alt}
              fill
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 70vw, 92vw"
              className="object-cover"
            />
          </Reveal>
          <Reveal
            delay={150}
            className="absolute -bottom-10 right-0 aspect-square w-[46%] overflow-hidden rounded-md border-[6px] border-crema sm:w-[40%]"
          >
            <Image
              src={photos.maiz.src}
              alt={photos.maiz.alt}
              fill
              sizes="(min-width: 1024px) 18vw, 40vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        {/* Historia */}
        <div className="lg:col-span-6 lg:pt-6">
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
            De la mesa familiar a {site.contact.address.district}
          </h2>
          <div className="mt-8 max-w-[36rem] space-y-5 text-[1.05rem] leading-[1.75] text-noche/80">
            <p>
              {site.name} abrió sus puertas en {site.foundedYear} con ocho mesas y las recetas que la familia preparaba
              los domingos en Barranco: el ají de gallina de la abuela, la causa de los cumpleaños y el seco que se
              servía con frejoles recién cocidos.
            </p>
            <p>
              Hoy la casa es más grande, pero el método es el mismo: ir al mercado cada mañana, cocinar a fuego lento y
              terminar cada plato al momento de servirlo.
            </p>
          </div>

          <dl className="mt-12 grid gap-8 border-t border-noche/15 pt-10 sm:grid-cols-3 sm:gap-6">
            {principles.map((p) => (
              <div key={p.title}>
                <dt className="font-display text-[1.3rem] leading-snug">{p.title}</dt>
                <dd className="mt-2.5 text-[0.95rem] leading-relaxed text-arcilla">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
