import { useMemo } from "react";

/**
 * Céu noturno do fundo — discreto, no espírito do site original:
 * um brilho no topo, um véu roxo e algumas estrelas piscando devagar.
 * As posições vêm de uma semente fixa (não usa Math.random) pra que servidor
 * e navegador desenhem o mesmo céu, sem piscar na hidratação.
 */

function seeded(i: number, salt = 1) {
  const x = Math.sin(i * 12.9898 * salt + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

type Star = { left: number; top: number; size: number; delay: number; duration: number };

export function StarField({ count = 42 }: { count?: number }) {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: seeded(i + 1) * 100,
        top: seeded(i + 1, 2) * 100,
        size: 1 + seeded(i + 1, 3) * 1.4,
        delay: seeded(i + 1, 4) * 6,
        duration: 4 + seeded(i + 1, 5) * 4,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Brilho celestial no topo + véu */}
      <div className="absolute inset-x-0 top-0 h-[70vh] bg-[radial-gradient(1100px_620px_at_50%_-12%,oklch(0.32_0.09_285/0.55),transparent_62%)]" />
      <div className="absolute right-0 top-[18%] h-[50vh] w-[70vw] bg-[radial-gradient(700px_520px_at_90%_20%,oklch(0.4_0.1_320/0.14),transparent_60%)]" />

      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-foreground/70 animate-twinkle"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
