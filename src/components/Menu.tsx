"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";
import { menu, tagLabels } from "@/data/menu";
import { formatPrice } from "@/lib/whatsapp";

export function Menu() {
  const [activeId, setActiveId] = useState(menu[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Navegación con flechas entre pestañas (patrón accesible de "tabs").
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: (index + 1) % menu.length,
      ArrowLeft: (index - 1 + menu.length) % menu.length,
      Home: 0,
      End: menu.length - 1,
    };
    if (!(e.key in keys)) return;
    e.preventDefault();
    const next = menu[keys[e.key]];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  };

  return (
    <section id="carta" className="tema-claro bg-crema py-24 text-noche sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.015em]">
            Nuestra carta
          </h2>
          <p className="text-[0.95rem] text-arcilla">Precios en soles. Incluyen IGV.</p>
        </div>

        {/* Pestañas */}
        <div
          role="tablist"
          aria-label="Categorías de la carta"
          className="-mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:px-0"
        >
          {menu.map((cat, i) => {
            const selected = cat.id === activeId;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  tabRefs.current[cat.id] = el;
                }}
                id={`tab-${cat.id}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={`panel-${cat.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(cat.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`min-h-11 shrink-0 rounded-full border px-5 py-2.5 text-[0.95rem] font-medium transition-colors duration-300 ${
                  selected
                    ? "border-noche bg-noche text-crema"
                    : "border-noche/20 text-noche/75 hover:border-noche/50 hover:text-noche"
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Paneles: todos están en el HTML (bueno para Google); solo se muestra el activo. */}
        {menu.map((cat) => (
          <div
            key={cat.id}
            id={`panel-${cat.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${cat.id}`}
            hidden={cat.id !== activeId}
            tabIndex={0}
            className="mt-10 grid gap-10 focus-visible:outline-offset-8 lg:mt-14 lg:grid-cols-12 lg:gap-14"
          >
            <div className="lg:col-span-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-papel lg:sticky lg:top-28 lg:aspect-[4/5]">
                <Image
                  src={cat.photo.src}
                  alt={cat.photo.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, 92vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-8">
              <h3 className="font-display text-[1.9rem] leading-tight">{cat.title}</h3>
              <p className="mt-2 text-arcilla">{cat.intro}</p>

              <ul className="mt-8 divide-y divide-noche/10 border-y border-noche/10">
                {cat.items.map((item) => (
                  <li key={item.name} className="py-6">
                    <div className="flex items-baseline">
                      <h4 className="font-display text-[1.25rem] leading-snug sm:text-[1.35rem]">{item.name}</h4>
                      <span className="puntos-guia" aria-hidden="true" />
                      <p className="shrink-0 font-semibold tabular-nums">
                        <span className="sr-only">Precio: </span>
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    <p className="mt-2 max-w-[38rem] text-[0.97rem] leading-relaxed text-arcilla">{item.description}</p>
                    {item.tags && (
                      <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] font-medium text-terracota">
                        {item.tags.map((t) => (
                          <span key={t}>{tagLabels[t]}</span>
                        ))}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
