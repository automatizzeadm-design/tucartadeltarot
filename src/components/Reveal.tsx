import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Atraso em ms — usado pra escalonar itens de uma lista */
  delay?: number;
  /** Direção da entrada */
  from?: "bottom" | "left" | "right" | "scale";
  as?: "div" | "section" | "li" | "article";
};

/**
 * Revela o conteúdo quando ele entra na tela (IntersectionObserver).
 * Respeita "prefers-reduced-motion": quem pediu menos movimento vê tudo estático.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "bottom",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as as "div";

  return (
    <Tag
      ref={ref as never}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform",
        !visible && "opacity-0",
        !visible && from === "bottom" && "translate-y-10",
        !visible && from === "left" && "-translate-x-10",
        !visible && from === "right" && "translate-x-10",
        !visible && from === "scale" && "scale-95",
        visible && "translate-x-0 translate-y-0 scale-100 opacity-100",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
