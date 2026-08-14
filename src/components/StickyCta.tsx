import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Barra fixa no rodapé com o botão de largura total — igual à do site original.
 * Só aparece depois da primeira dobra, quando a promessa já foi lida.
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
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/92 px-4 py-3 backdrop-blur-md transition-transform duration-500",
        show ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="mx-auto w-full max-w-[620px]">
        <Link
          to={to}
          className="gold-face block rounded-[18px] px-6 py-3.5 text-center text-[0.95rem] font-semibold text-primary-foreground shadow-[inset_0_1px_0_oklch(1_0_0/0.4)]"
        >
          {label}
        </Link>
        <p className="mt-1.5 text-center text-[11px] text-muted-foreground">{price}</p>
      </div>
    </div>
  );
}
