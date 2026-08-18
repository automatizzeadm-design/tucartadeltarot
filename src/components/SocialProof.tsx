import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Avisos que sobem no canto inferior esquerdo, um de cada vez.
 *
 * Aparece, fica alguns segundos, sai, espera e volta com outro nome/frase.
 * Só monta no cliente (nada é renderizado no servidor), então pode sortear
 * sem risco de divergência na hidratação.
 *
 * Para ligar em pedidos reais, basta passar `items` já prontos em vez de
 * deixar o componente sortear de `names` × `messages`.
 */

type SocialProofProps = {
  names: readonly string[];
  messages: readonly string[];
  /** Espera antes do primeiro aviso */
  initialDelayMs?: number;
  /** Quanto tempo cada aviso fica na tela */
  visibleMs?: number;
  /** Intervalo entre um aviso e o próximo */
  gapMs?: number;
};

export function SocialProof({
  names,
  messages,
  initialDelayMs = 9000,
  visibleMs = 5200,
  gapMs = 17000,
}: SocialProofProps) {
  const [text, setText] = useState<string | null>(null);
  const [shown, setShown] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!names.length || !messages.length) return;

    const push = (fn: () => void, ms: number) => {
      timers.current.push(window.setTimeout(fn, ms));
    };

    let round = 0;

    const cycle = () => {
      const name = names[Math.floor(Math.random() * names.length)]!;
      // Percorre as frases em ordem embaralhada pelo nome, pra não repetir
      // a mesma mensagem duas vezes seguidas
      const message = messages[round % messages.length]!;
      round += 1;

      setText(message.replace("{name}", name));
      setShown(true);

      push(() => setShown(false), visibleMs);
      push(cycle, gapMs);
    };

    push(cycle, initialDelayMs);

    return () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      timers.current = [];
    };
  }, [names, messages, initialDelayMs, visibleMs, gapMs]);

  if (!text) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-5 left-4 z-40 max-w-[min(19rem,calc(100vw-2rem))]"
      role="status"
      aria-live="polite"
    >
      <div
        className={cn(
          "flex items-center gap-2.5 rounded-xl px-4 py-3",
          "bg-[oklch(0.55_0.15_150)] text-white shadow-[0_16px_40px_-16px_oklch(0.2_0.08_150/0.8)]",
          "transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          shown ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0",
        )}
      >
        <span className="text-base leading-none" aria-hidden>
          ✨
        </span>
        <p className="text-[0.82rem] font-medium leading-snug">{text}</p>
      </div>
    </div>
  );
}
