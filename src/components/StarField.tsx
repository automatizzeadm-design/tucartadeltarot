/**
 * Céu noturno do fundo — quase nada, de propósito.
 *
 * Antes eram 42 estrelas piscando forte pela tela inteira, mais dois halos
 * roxos sobrepostos. Isso competia com o texto e deixava a página agitada.
 * Agora: um halo só, bem discreto, e um punhado de estrelas fracas confinadas
 * ao topo — onde ficam a marca e a carta. Da dobra pra baixo o fundo é liso,
 * pra leitura não ter concorrência.
 *
 * As posições são fixas (nada de Math.random) pra servidor e navegador
 * desenharem o mesmo céu e não piscar na hidratação.
 */

/** Poucas e escolhidas a dedo — com 7 estrelas, posição é composição. */
const STARS = [
  { left: 12, top: 9, size: 1.6, delay: 0, duration: 9 },
  { left: 27, top: 22, size: 1.1, delay: 3.5, duration: 11 },
  { left: 48, top: 5, size: 1.3, delay: 6, duration: 10 },
  { left: 71, top: 16, size: 1.7, delay: 1.5, duration: 12 },
  { left: 88, top: 28, size: 1.2, delay: 4.5, duration: 9.5 },
  { left: 62, top: 37, size: 1, delay: 7.5, duration: 13 },
  { left: 18, top: 44, size: 1.1, delay: 2.5, duration: 11.5 },
] as const;

export function StarField() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* Um único halo, no topo, fraco — só pra a marca não nascer no vazio */}
      <div className="absolute inset-x-0 top-0 h-[60vh] bg-[radial-gradient(900px_460px_at_50%_-14%,oklch(0.3_0.07_282/0.28),transparent_60%)]" />

      {/* Estrelas só na faixa de cima; embaixo o fundo fica limpo */}
      <div className="absolute inset-x-0 top-0 h-[62vh]">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute animate-twinkle rounded-full bg-foreground/45"
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
    </div>
  );
}
