import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * CTA principal — bloco de largura total, gradiente dourado vertical e
 * cantos de 18px, como no site brasileiro. O brilho que atravessa o botão
 * é a única firula, e ela é discreta.
 */

type GoldButtonProps = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  /** Deixa o botão com largura automática (usado em espaços apertados) */
  inline?: boolean;
  className?: string;
  sublabel?: ReactNode;
};

export function GoldButton({
  children,
  to,
  href,
  onClick,
  inline,
  className,
  sublabel,
}: GoldButtonProps) {
  const classes = cn(
    "group/cta relative block overflow-hidden rounded-[18px] text-center",
    "gold-face font-sans text-[0.95rem] font-semibold tracking-wide text-primary-foreground",
    "px-6 py-4 shadow-[0_12px_30px_-8px_oklch(0.72_0.12_76/0.45),inset_0_1px_0_oklch(1_0_0/0.4)]",
    "transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    inline ? "inline-block w-auto px-8" : "w-full",
    className,
  );

  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 -translate-x-full animate-cta-sheen bg-[linear-gradient(100deg,transparent_25%,oklch(1_0_0/0.2)_50%,transparent_75%)]" />
      <span className="relative">{children}</span>
    </>
  );

  const wrapper = (node: ReactNode) =>
    sublabel ? (
      <span className="block">
        {node}
        <span className="mt-2 block text-center text-[0.72rem] text-muted-foreground">
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
