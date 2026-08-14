import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * CTA principal: pedra dourada com brilho que atravessa o botão e pulso lento.
 * Usa <Link> quando aponta pra uma rota interna e <a>/<button> nos outros casos.
 */

type GoldButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  size?: "md" | "lg";
  className?: string;
  sublabel?: ReactNode;
  full?: boolean;
};

export function GoldButton({
  children,
  to,
  href,
  onClick,
  size = "lg",
  className,
  sublabel,
  full,
}: GoldButtonProps) {
  const classes = cn(
    "group/cta relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full",
    "font-sans font-medium tracking-wide text-primary-foreground",
    "bg-[image:var(--gradient-gold)] shadow-[0_18px_45px_-18px_oklch(0.82_0.13_85/0.85)]",
    "transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_26px_60px_-20px_oklch(0.82_0.13_85/0.95)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:translate-y-0 active:scale-[0.99] animate-cta-pulse",
    size === "lg" ? "px-8 py-4 text-[0.95rem] sm:px-10 sm:text-base" : "px-6 py-3 text-sm",
    full && "w-full",
    className,
  );

  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full animate-cta-sheen bg-[linear-gradient(100deg,transparent_20%,oklch(1_0_0/0.55)_50%,transparent_80%)]" />
      <span className="relative flex items-center gap-2">
        <Sparkle />
        <span>{children}</span>
        <Sparkle />
      </span>
    </>
  );

  const wrapper = (node: ReactNode) =>
    sublabel ? (
      <span className={cn("flex flex-col items-center gap-2", full && "w-full")}>
        {node}
        <span className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
          {sublabel}
        </span>
      </span>
    ) : (
      node
    );

  if (to)
    return wrapper(
      <Link to={to} className={classes}>
        {inner}
      </Link>,
    );
  if (href)
    return wrapper(
      <a href={href} className={classes}>
        {inner}
      </a>,
    );
  return wrapper(
    <button type="button" onClick={onClick} className={classes}>
      {inner}
    </button>,
  );
}

function Sparkle() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 opacity-80" fill="currentColor" aria-hidden>
      <path d="M12 2.5 13.8 9 20 11l-6.2 2L12 19.5 10.2 13 4 11l6.2-2Z" />
    </svg>
  );
}
