import { site } from "@/data/site";

/** Logotipo: un pequeño arco colonial junto al nombre del restaurante. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 24 30" className="h-7 w-auto text-oro" aria-hidden="true" focusable="false">
        <path d="M2 29V12a10 10 0 0120 0v17" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 29V13.5a5 5 0 0110 0V29" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
      </svg>
      <span className="font-display text-[1.35rem] leading-none tracking-[-0.01em]">{site.name}</span>
    </span>
  );
}
