import { useEffect, useRef, useState, type ReactNode } from "react";

import { Glyph } from "@/components/Glyph";
import { cn } from "@/lib/utils";

/**
 * Carta de tarot com virada 3D. O verso é desenhado em SVG (sol, lua e estrelas),
 * a frente traz o numeral romano, o título e o texto.
 * Vira ao clicar, ao usar teclado (Enter/Espaço) ou automaticamente ao entrar na tela.
 */

type TarotCardProps = {
  numeral: string;
  title: string;
  text: string;
  glyph?: "eye" | "heart" | "hourglass" | "letter" | "orb" | "moon" | "sun" | "star";
  /** Vira sozinha quando entra na tela, com este atraso (ms). Se undefined, só vira no clique. */
  autoFlipDelay?: number;
  className?: string;
  hint?: string;
  footer?: ReactNode;
};

export function TarotCard({
  numeral,
  title,
  text,
  glyph = "star",
  autoFlipDelay,
  className,
  hint,
  footer,
}: TarotCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [touched, setTouched] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Vira sozinha ao entrar na tela (a não ser que a visitante já tenha virado na mão)
  useEffect(() => {
    if (autoFlipDelay === undefined) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          window.setTimeout(() => {
            setFlipped((prev) => (touched ? prev : true));
          }, autoFlipDelay);
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [autoFlipDelay, touched]);

  const toggle = () => {
    setTouched(true);
    setFlipped((f) => !f);
  };

  return (
    <div className={cn("group/card [perspective:1600px]", className)} ref={ref}>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? `${title}. ${text}` : `Carta ${numeral}. Toca para darle la vuelta`}
        onClick={toggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className={cn(
          "relative aspect-[2/3.1] w-full cursor-pointer rounded-2xl outline-none",
          "transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d]",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "group-hover/card:-translate-y-1.5",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* VERSO */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-primary/30 bg-card [backface-visibility:hidden] shadow-[var(--shadow-card)]">
          <div className="absolute inset-0 bg-[linear-gradient(150deg,oklch(0.24_0.06_275)_0%,oklch(0.16_0.05_268)_55%,oklch(0.22_0.06_282)_100%)]" />
          <div className="absolute inset-[6px] rounded-xl border border-primary/25" />
          <div className="absolute inset-[11px] rounded-lg border border-primary/10" />

          <svg
            viewBox="0 0 120 190"
            className="absolute inset-0 h-full w-full text-primary/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.7"
            aria-hidden
          >
            <circle cx="60" cy="72" r="26" />
            <circle cx="60" cy="72" r="19" opacity="0.6" />
            <path d="M60 46v-9M60 107v9M34 72h-9M95 72h9M42 54l-6-6M78 90l6 6M78 54l6-6M42 90l-6 6" />
            <path
              d="M69 65a15 15 0 1 0 0 14 12 12 0 0 1 0-14Z"
              fill="currentColor"
              fillOpacity="0.35"
            />
            <path
              d="M60 126l3.4 9.1L73 138l-9.6 2.9L60 150l-3.4-9.1L47 138l9.6-2.9Z"
              fill="currentColor"
              fillOpacity="0.25"
            />
            <path d="M28 160h64M32 166h56" opacity="0.5" />
            <path d="M20 24h80M20 30h80" opacity="0.35" />
          </svg>

          <div className="absolute inset-x-0 bottom-5 text-center">
            <p className="font-display text-lg tracking-[0.3em] text-primary/80">{numeral}</p>
          </div>

          {/* brilho que atravessa a carta */}
          <div className="pointer-events-none absolute inset-0 animate-card-sheen bg-[linear-gradient(105deg,transparent_35%,oklch(0.95_0.08_90/0.14)_50%,transparent_65%)]" />

          {hint && !flipped && (
            <div className="absolute inset-x-0 top-4 text-center">
              <span className="rounded-full border border-primary/30 bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary/90 backdrop-blur-sm">
                {hint}
              </span>
            </div>
          )}
        </div>

        {/* FRENTE */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl border border-primary/40 bg-card p-5 [backface-visibility:hidden] [transform:rotateY(180deg)] shadow-[var(--shadow-halo)]">
          <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_0%,oklch(0.32_0.08_285/0.5),transparent_70%)]" />
          <div className="absolute inset-[6px] rounded-xl border border-primary/20" />

          <div className="relative flex h-full flex-col items-center justify-between text-center">
            <span className="font-display text-sm tracking-[0.35em] text-primary/80">
              {numeral}
            </span>

            <div className="flex flex-col items-center gap-3">
              <span className="text-primary animate-shimmer-glow">
                <Glyph name={glyph} className="h-10 w-10" />
              </span>
              <h3 className="font-display text-xl leading-tight text-foreground sm:text-[1.4rem]">
                {title}
              </h3>
              <p className="text-[0.82rem] leading-relaxed text-muted-foreground">{text}</p>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              {footer}
              <span className="text-[9px] uppercase tracking-[0.25em] text-primary/45">
                Carta Canalizada
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
