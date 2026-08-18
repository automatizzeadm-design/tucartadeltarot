import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { Glyph } from "@/components/Glyph";
import { cn } from "@/lib/utils";

/**
 * Carta lacrada da seção de preço.
 *
 * A carta aparece de costas, coberta por um véu escuro e um cadeado que treme de
 * leve — a resposta está ali, só não foi liberada ainda. Ao tocar, o cadeado abre,
 * o véu se dissolve e a visitante segue pro formulário.
 *
 * A metáfora é o produto: ela já tem a carta, falta destravar.
 */

type LockedCardProps = {
  /** Chamada acima da carta, ex.: "Tu respuesta ya está escrita" */
  eyebrow?: string;
  /** Texto sobre o cadeado, ex.: "Desbloquea tu carta" */
  label: string;
  /** Linha de apoio abaixo do cadeado */
  sublabel?: string;
  /** Para onde a visitante vai depois de destravar */
  to?: string;
  className?: string;
};

const UNLOCK_MS = 750;

export function LockedCard({
  eyebrow,
  label,
  sublabel,
  to = "/form",
  className,
}: LockedCardProps) {
  const navigate = useNavigate();
  const [unlocked, setUnlocked] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const unlock = (e: React.MouseEvent) => {
    if (unlocked) return;
    // Deixa a animação acontecer antes de trocar de página
    e.preventDefault();
    setUnlocked(true);
    timer.current = window.setTimeout(() => {
      void navigate({ to });
    }, UNLOCK_MS);
  };

  return (
    <div className={cn("text-center", className)}>
      {eyebrow && (
        <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
      )}

      <Link
        to={to}
        onClick={unlock}
        aria-label={label}
        className={cn(
          "group/lock relative mx-auto block aspect-[2/3.1] w-[180px] overflow-hidden rounded-2xl",
          "border border-primary/30 bg-card shadow-[var(--shadow-card)] outline-none",
          "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          unlocked && "shadow-[var(--shadow-halo)]",
        )}
      >
        {/* verso da carta */}
        <span className="absolute inset-0 bg-[linear-gradient(150deg,oklch(0.19_0.05_275)_0%,oklch(0.125_0.036_268)_55%,oklch(0.17_0.045_282)_100%)]" />
        <span className="absolute inset-[6px] rounded-xl border border-primary/25" />
        <span className="absolute inset-[11px] rounded-lg border border-primary/10" />

        <svg
          viewBox="0 0 120 190"
          className="absolute inset-0 h-full w-full text-primary/60"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          aria-hidden
        >
          <circle cx="60" cy="70" r="24" />
          <circle cx="60" cy="70" r="17" opacity="0.6" />
          <path d="M60 46v-8M60 102v8M36 70h-8M92 70h8M43 53l-6-6M77 87l6 6M77 53l6-6M43 87l-6 6" />
          <path d="M28 158h64M32 164h56" opacity="0.5" />
          <path d="M20 24h80M20 30h80" opacity="0.35" />
        </svg>

        {/* véu — a carta está lacrada até ela tocar */}
        <span
          className={cn(
            "absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_45%,oklch(0.05_0.03_268/0.55),oklch(0.05_0.03_268/0.88))]",
            unlocked && "animate-veil-lift",
          )}
        />

        {/* cadeado */}
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-4">
          <span className="relative flex h-16 w-16 items-center justify-center">
            {!unlocked && (
              <span
                className="absolute inset-0 animate-pulse-ring rounded-full border border-primary/40"
                aria-hidden
              />
            )}
            <span
              className={cn(
                "relative text-primary",
                unlocked ? "animate-lock-pop" : "animate-lock-rattle",
              )}
            >
              <Glyph name={unlocked ? "lock-open" : "lock"} className="h-11 w-11" />
            </span>
          </span>

          <span
            className={cn(
              "font-display text-[1.05rem] leading-tight text-foreground transition-opacity duration-300",
              unlocked && "opacity-0",
            )}
          >
            {label}
          </span>
        </span>

        {/* brilho que atravessa a carta */}
        <span className="pointer-events-none absolute inset-0 animate-card-sheen bg-[linear-gradient(105deg,transparent_35%,oklch(0.95_0.08_90/0.07)_50%,transparent_65%)]" />
      </Link>

      {sublabel && (
        <p className="mt-3 text-[0.82rem] leading-relaxed text-muted-foreground">{sublabel}</p>
      )}
    </div>
  );
}
