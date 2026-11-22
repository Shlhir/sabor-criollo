"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** "suave" = aparece subiendo levemente; "arco" = la foto se descubre de abajo hacia arriba. */
  variant?: "suave" | "arco";
  /** Retraso en milisegundos (para escalonar varios elementos). */
  delay?: number;
  className?: string;
};

/** Muestra su contenido con una animación sutil cuando entra en pantalla (una sola vez). */
export function Reveal({ children, variant = "suave", delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={variant === "arco" ? "arco" : ""}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined}
      className={className}
    >
      {children}
    </div>
  );
}
