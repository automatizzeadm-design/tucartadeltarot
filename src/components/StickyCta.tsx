import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Barra fixa no rodapé (celular) e pílula no canto (desktop).
 * Só aparece depois que a visitante rola além do primeiro dobra —
 * antes disso ela ainda está lendo a promessa.
 */
export function StickyCta({
  label,
  price,
  to = "/form",
}: {
  label: string;
  price: string;
  to?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 px-4 pb-4 transition-all duration-500 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:px-0 sm:pb-0",
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <Link
        to={to}
        className="flex items-center justify-center gap-3 rounded-full border border-primary/40 bg-background/85 px-5 py-3 shadow-[0_20px_50px_-20px_oklch(0.05_0.03_268/0.95)] backdrop-blur-md transition-transform hover:-translate-y-0.5"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
            <path d="M12 2.5 13.8 9 20 11l-6.2 2L12 19.5 10.2 13 4 11l6.2-2Z" />
          </svg>
        </span>
        <span className="text-left leading-tight">
          <strong className="block text-sm font-medium text-foreground">{label}</strong>
          <span className="text-[11px] text-muted-foreground">{price}</span>
        </span>
        <span className="ml-1 text-primary" aria-hidden>
          →
        </span>
      </Link>
    </div>
  );
}

/** Fio dourado no topo mostrando o quanto da página já foi lida. */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent" aria-hidden>
      <div
        className="h-full bg-[image:var(--gradient-gold)] shadow-[0_0_12px_oklch(0.82_0.13_85/0.8)] transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
