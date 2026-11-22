"use client";

import { useEffect, useState } from "react";
import { getOpenStatus } from "@/lib/schedule";

/** Aviso en vivo "Abierto ahora / Cerrado ahora", calculado con la hora de Lima. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<ReturnType<typeof getOpenStatus> | null>(null);

  useEffect(() => {
    const update = () => setStatus(getOpenStatus());
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <p className={`flex min-h-6 items-center gap-2.5 text-sm text-humo ${className}`} aria-live="polite">
      {status && (
        <>
          <span
            className={`size-2 shrink-0 rounded-full ${status.open ? "bg-[#5fbf7f]" : "bg-terracota-viva"}`}
            aria-hidden="true"
          />
          {status.text}
        </>
      )}
    </p>
  );
}
