import { useEffect, useMemo, useRef } from "react";

/**
 * Céu noturno do fundo: estrelas, névoa e um brilho que segue de leve o mouse.
 * As posições são geradas por uma semente fixa (não usa Math.random) pra que
 * servidor e navegador desenhem exatamente o mesmo céu — sem "piscar" na hidratação.
 */

function seeded(i: number, salt = 1) {
  const x = Math.sin(i * 12.9898 * salt + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

type Star = {
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  bright: boolean;
};

export function StarField({ count = 90 }: { count?: number }) {
  const layerRef = useRef<HTMLDivElement>(null);

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i + 1) * 100,
        top: seeded(i + 1, 2) * 100,
        size: 1 + seeded(i + 1, 3) * 2.2,
        delay: seeded(i + 1, 4) * 6,
        duration: 3 + seeded(i + 1, 5) * 5,
        bright: seeded(i + 1, 6) > 0.86,
      })),
    [count],
  );

  // Paralaxe suave: o céu se desloca alguns pixels conforme o mouse anda.
  useEffect(() => {
    const node = layerRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 14;
        const y = (e.clientY / window.innerHeight - 0.5) * 14;
        node.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Névoa de fundo */}
      <div className="absolute -left-[20%] top-[-10%] h-[70vh] w-[70vw] rounded-full bg-accent/25 blur-[120px] animate-drift-slow" />
      <div className="absolute -right-[15%] top-[35%] h-[60vh] w-[55vw] rounded-full bg-primary/10 blur-[130px] animate-drift-slower" />
      <div className="absolute bottom-[-20%] left-[20%] h-[55vh] w-[60vw] rounded-full bg-accent/20 blur-[140px] animate-drift-slow" />

      {/* Estrelas */}
      <div ref={layerRef} className="absolute inset-0 transition-transform duration-500 ease-out">
        {stars.map((s, i) => (
          <span
            key={i}
            className={`absolute rounded-full ${s.bright ? "bg-gold" : "bg-foreground/70"} animate-twinkle`}
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
              boxShadow: s.bright ? "0 0 8px currentColor" : undefined,
            }}
          />
        ))}
      </div>

      {/* Vinheta */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_35%,var(--veil)_100%)] opacity-80" />
    </div>
  );
}
