"use client";

import { useEffect, useState } from "react";
import { defaultReservationMessage, whatsappLink } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/** Botón flotante de WhatsApp. Aparece al dejar atrás la portada. */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={whatsappLink(defaultReservationMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Reservar por WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-[0_12px_30px_-8px_rgb(0_0_0/0.55)] transition-[opacity,transform] duration-500 ease-(--ease-suave) hover:scale-105 sm:bottom-7 sm:right-7 sm:size-[3.75rem] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
