"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { gallery } from "@/data/images";
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from "./icons";
import { Reveal } from "./Reveal";

/** Tamaño de cada foto en la cuadrícula (móvil: 2 columnas, escritorio: 4). */
const tileClasses = ["col-span-2 lg:row-span-2", "", "lg:row-span-2", "", "", "", "", "col-span-2 lg:col-span-1"];

export function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const go = useCallback(
    (step: number) => setIndex((i) => (i === null ? i : (i + step + gallery.length) % gallery.length)),
    [],
  );

  // Flechas del teclado dentro del visor.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const onClose = () => setIndex(null);
    dialog.addEventListener("keydown", onKey);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      dialog.removeEventListener("close", onClose);
    };
  }, [go]);

  const current = index === null ? null : gallery[index];

  return (
    <section id="galeria" className="bg-noche py-24 sm:py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.015em] text-crema lg:col-span-7">
            La casa, de cerca
          </h2>
          <p className="max-w-md text-[1.05rem] leading-relaxed text-humo lg:col-span-5 lg:justify-self-end">
            Luz cálida, mesas de madera y una cocina que se deja ver. Toca una foto para verla completa.
          </p>
        </div>

        <ul className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 lg:mt-16 lg:auto-rows-[15rem] lg:grid-cols-4">
          {gallery.map((photo, i) => (
            <li key={photo.src} className={tileClasses[i] ?? ""}>
              <Reveal delay={(i % 4) * 90} className="h-full">
                <button
                  type="button"
                  onClick={() => open(i)}
                  className="group relative block size-full overflow-hidden rounded-md bg-carbon"
                  aria-label={`Ampliar foto: ${photo.alt}`}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes={i === 0 ? "(min-width: 1024px) 50vw, 92vw" : "(min-width: 1024px) 25vw, 46vw"}
                    className="object-cover transition-transform duration-700 ease-(--ease-suave) group-hover:scale-[1.04]"
                  />
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {/* Visor de fotos (diálogo nativo: accesible y cierra con Escape) */}
      <dialog
        ref={dialogRef}
        aria-label="Visor de fotos"
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-crema"
      >
        {current && index !== null && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p className="text-sm text-humo" aria-live="polite">
                {index + 1} de {gallery.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex size-11 items-center justify-center rounded-full hover:bg-crema/10"
                aria-label="Cerrar visor"
                autoFocus
              >
                <CloseIcon className="size-6" />
              </button>
            </div>

            <div className="relative mx-3 flex-1 sm:mx-20">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="100vw"
                quality={80}
                className="object-contain"
              />
            </div>

            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => go(-1)}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-crema/20 hover:bg-crema/10"
                aria-label="Foto anterior"
              >
                <ChevronLeftIcon className="size-6" />
              </button>
              <p className="text-center text-sm text-crema/80">{current.alt}</p>
              <button
                type="button"
                onClick={() => go(1)}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-crema/20 hover:bg-crema/10"
                aria-label="Foto siguiente"
              >
                <ChevronRightIcon className="size-6" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
