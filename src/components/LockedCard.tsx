import { useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { GoldButton } from "@/components/GoldButton";
import { cn } from "@/lib/utils";

/**
 * Cartão-postal lacrado — é o bloco de compra da página.
 *
 * Formato de postal, com selo no canto e a linha tracejada do verso. Dentro
 * dele fica tudo o que decide a compra: o cadeado, o texto, o preço e o botão.
 * Ao tocar o botão o cadeado abre, o postal acende e a visitante segue pro
 * formulário — a compra vira "destravar a carta", não "pagar um produto".
 */

type LockedCardProps = {
  /** Chamada acima do postal */
  eyebrow?: string;
  /** Título sobre o cadeado, ex.: "Desbloquea tu carta" */
  label: string;
  /** Texto de apoio dentro do postal */
  text?: string;
  /** Preço cheio, riscado */
  from: string;
  /** Preço que ela paga */
  price: string;
  /** Ex.: "pago único · sin mensualidades" */
  paymentNote?: string;
  cta: string;
  ctaSub?: string;
  /** Para onde ela vai depois de destravar */
  to?: string;
  className?: string;
};

const UNLOCK_MS = 850;

export function LockedCard({
  eyebrow,
  label,
  text,
  from,
  price,
  paymentNote,
  cta,
  ctaSub,
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

  const unlock = () => {
    if (unlocked) return;
    // Deixa o cadeado abrir antes de trocar de página
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

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border-2 px-5 py-7 sm:px-7",
          "bg-[linear-gradient(150deg,oklch(0.2_0.05_275)_0%,oklch(0.13_0.036_268)_60%,oklch(0.18_0.045_282)_100%)]",
          "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          unlocked
            ? "border-gold/85 shadow-[var(--shadow-halo)]"
            : "border-gold/60 shadow-[var(--shadow-halo)]",
        )}
      >
        {/* moldura tracejada do postal */}
        <span className="pointer-events-none absolute inset-[7px] rounded-xl border border-dashed border-gold/25" />

        {/* selo, no canto de cima à direita */}
        <span className="absolute right-5 top-5 flex h-10 w-9 items-center justify-center rounded-[3px] border border-dashed border-gold/40 text-base">
          🌙
        </span>

        <div className="relative">
          {/* envelope + cadeado */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-[2.6rem] leading-none drop-shadow-[0_4px_14px_oklch(0.05_0.03_268/0.9)]">
              ✉️
            </span>
            <span className="relative flex items-center justify-center">
              {!unlocked && (
                <span
                  className="absolute -inset-2 animate-pulse-ring rounded-full border border-gold/40"
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
          </div>

          <h3 className="mt-4 font-display text-[1.6rem] leading-tight text-foreground">{label}</h3>

          {text && (
            <p className="mx-auto mt-2.5 max-w-[24rem] text-[0.88rem] leading-relaxed text-muted-foreground">
              {text}
            </p>
          )}

          {/* preço */}
          <div className="mt-6">
            <p className="relative inline-block text-lg text-muted-foreground">
              {from}
              <span
                className="absolute inset-x-0 top-1/2 h-[2px] -rotate-3 bg-[oklch(0.62_0.21_25)]"
                aria-hidden
              />
            </p>
            <p className="font-price text-[3.4rem] font-bold leading-none text-[oklch(0.78_0.17_150)]">
              {price}
            </p>
            {paymentNote && (
              <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-rose">{paymentNote}</p>
            )}
          </div>

          <div className="mt-6">
            <GoldButton onClick={unlock} sublabel={ctaSub}>
              {cta}
            </GoldButton>
          </div>
        </div>

        {/* brilho que atravessa o postal */}
        <span className="pointer-events-none absolute inset-0 animate-card-sheen bg-[linear-gradient(105deg,transparent_35%,oklch(0.95_0.08_90/0.07)_50%,transparent_65%)]" />
      </div>
    </div>
  );
}
