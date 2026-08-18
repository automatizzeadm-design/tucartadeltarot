import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Cartão-postal lacrado da seção de preço.
 *
 * Formato de postal (deitado), com selo no canto e a linha tracejada do verso.
 * O envelope aparece ao lado de um cadeado fechado que treme de leve: a
 * resposta já está escrita, só não foi liberada. Ao tocar, o cadeado abre,
 * o véu sai e a visitante segue pro formulário.
 */

type LockedCardProps = {
  /** Chamada acima do postal */
  eyebrow?: string;
  /** Texto sobre o cadeado, ex.: "Desbloquea tu carta" */
  label: string;
  /** Linha de apoio abaixo do postal */
  sublabel?: string;
  /** Para onde a visitante vai depois de destravar */
  to?: string;
  className?: string;
};

const UNLOCK_MS = 750;

export function LockedCard({ eyebrow, label, sublabel, to = "/form", className }: LockedCardProps) {
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
          "group/lock relative mx-auto block aspect-[3/2] w-full max-w-[330px] overflow-hidden rounded-2xl",
          "border-2 border-primary/45 bg-card shadow-[var(--shadow-card)] outline-none",
          "transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          unlocked && "border-primary/80 shadow-[var(--shadow-halo)]",
        )}
      >
        {/* papel do postal */}
        <span className="absolute inset-0 bg-[linear-gradient(150deg,oklch(0.2_0.05_275)_0%,oklch(0.13_0.036_268)_60%,oklch(0.18_0.045_282)_100%)]" />
        <span className="absolute inset-[7px] rounded-xl border border-dashed border-primary/25" />

        {/* selo, no canto de cima à direita */}
        <span className="absolute right-4 top-4 flex h-9 w-8 items-center justify-center rounded-[3px] border border-dashed border-primary/40 text-sm">
          🔮
        </span>

        {/* linha do verso do postal */}
        <span className="absolute inset-y-[22%] right-[24%] w-px bg-primary/15" />

        {/* véu — o postal está lacrado até ela tocar */}
        <span
          className={cn(
            "absolute inset-0 bg-[radial-gradient(80%_65%_at_45%_50%,oklch(0.05_0.03_268/0.5),oklch(0.05_0.03_268/0.85))]",
            unlocked && "animate-veil-lift",
          )}
        />

        {/* envelope + cadeado */}
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5">
          <span className="flex items-center gap-3">
            <span className="text-[2.6rem] leading-none drop-shadow-[0_4px_14px_oklch(0.05_0.03_268/0.9)]">
              💌
            </span>
            <span className="relative flex items-center justify-center">
              {!unlocked && (
                <span
                  className="absolute -inset-2 animate-pulse-ring rounded-full border border-primary/40"
                  aria-hidden
                />
              )}
              <span
                className={cn(
                  "relative text-[2.2rem] leading-none",
                  unlocked ? "animate-lock-pop" : "animate-lock-rattle",
                )}
              >
                {unlocked ? "🔓" : "🔒"}
              </span>
            </span>
          </span>

          <span
            className={cn(
              "font-display text-[1.15rem] leading-tight text-foreground transition-opacity duration-300",
              unlocked && "opacity-0",
            )}
          >
            {label}
          </span>
        </span>

        {/* brilho que atravessa o postal */}
        <span className="pointer-events-none absolute inset-0 animate-card-sheen bg-[linear-gradient(105deg,transparent_35%,oklch(0.95_0.08_90/0.07)_50%,transparent_65%)]" />
      </Link>

      {sublabel && (
        <p className="mt-3 text-[0.82rem] leading-relaxed text-muted-foreground">{sublabel}</p>
      )}
    </div>
  );
}
