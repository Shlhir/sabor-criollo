"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks } from "@/data/site";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon } from "./icons";
import { btn } from "@/lib/ui";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Fondo sólido al bajar de la portada.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Resalta en el menú la sección que se está viendo.
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter((el): el is HTMLElement => Boolean(el));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Menú móvil: bloquea el scroll, cierra con Escape y mantiene el foco dentro.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && panelRef.current) {
        const focusables = [toggle, ...panelRef.current.querySelectorAll<HTMLElement>("a")].filter(
          Boolean,
        ) as HTMLElement[];
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      toggle?.focus();
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500 ${
        solid ? "border-b border-oro/15 bg-noche/92 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-[4.5rem]">
        <a
          href="#inicio"
          className="relative z-10 text-crema"
          aria-label="Sabor Criollo, ir al inicio"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? "true" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[0.92rem] transition-colors duration-300 ${
                    active === link.id ? "text-oro" : "text-crema/80 hover:text-crema"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <a href="#reservas" className={`${btn.primary} min-h-0 px-5 py-2.5 text-sm`}>
              Reservar mesa
            </a>
          </span>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 -mr-2 inline-flex size-11 items-center justify-center rounded-full text-crema lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {/* Menú móvil a pantalla completa */}
      <div
        id="menu-movil"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto bg-noche lg:hidden"
      >
        <nav aria-label="Menú móvil" className="flex min-h-full flex-col px-6 pb-10 pt-8">
          <ul className="flex flex-col">
            {navLinks.map((link, i) => (
              <li key={link.id} className="border-b border-oro/15">
                <a
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className="entrada block py-4 font-display text-[2rem] leading-tight text-crema"
                  style={{ animationDelay: `${i * 45}ms` }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#reservas" onClick={() => setOpen(false)} className={`${btn.primary} mt-10 w-full`}>
            Reservar mesa
          </a>
        </nav>
      </div>
    </header>
  );
}
