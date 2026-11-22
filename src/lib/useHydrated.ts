import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Devuelve `true` solo en el navegador, después de cargar la página.
 * Sirve para mostrar datos que dependen de la fecha/hora del visitante
 * sin causar diferencias entre el HTML generado y el navegador.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
