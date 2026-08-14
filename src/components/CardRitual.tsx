import { useState } from "react";
import { Sparkles, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CHANNELED_CARDS, type ChanneledCard } from "@/data/cards";
import cardBack from "@/assets/card-back.jpg";

export function CardRitual() {
  const [card, setCard] = useState<ChanneledCard | null>(null);
  const [drawing, setDrawing] = useState(false);

  const draw = () => {
    setDrawing(true);
    setCard(null);
    const next = CHANNELED_CARDS[Math.floor(Math.random() * CHANNELED_CARDS.length)];
    window.setTimeout(() => {
      setCard(next ?? null);
      setDrawing(false);
    }, 900);
  };

  return (
    <div className="grid items-center gap-12 md:grid-cols-[minmax(0,320px)_1fr]">
      <div className="relative mx-auto w-[240px] md:w-[300px]">
        <div className="pointer-events-none absolute -inset-8 rounded-full bg-primary/10 blur-3xl animate-shimmer-glow" />
        <img
          src={cardBack}
          alt="Verso de uma carta de tarot com sol e lua dourados"
          width={640}
          height={1024}
          loading="lazy"
          className={`relative w-full rounded-lg border border-border shadow-[var(--shadow-card)] transition-transform duration-700 ${
            drawing ? "scale-95 rotate-2 opacity-70" : "animate-float-slow"
          }`}
        />
      </div>

      <div className="min-h-[280px]">
        {card ? (
          <article key={card.id} className="animate-reveal-card surface-ritual rounded-lg p-8">
            <p className="eyebrow">{card.numeral} · {card.essence}</p>
            <h3 className="mt-3 text-4xl text-gradient-gold">{card.name}</h3>
            <p className="mt-5 text-lg leading-relaxed text-foreground/90">{card.message}</p>
            <p className="mt-4 border-l border-border pl-4 text-sm italic text-muted-foreground">
              {card.guidance}
            </p>
            <Button variant="veil" size="lg" className="mt-8" onClick={draw}>
              <RotateCcw /> Puxar outra
            </Button>
          </article>
        ) : (
          <div className="surface-ritual rounded-lg p-8 text-center md:text-left">
            <p className="eyebrow">O ritual</p>
            <h3 className="mt-3 text-3xl md:text-4xl">
              Respire fundo, pense na sua pergunta e puxe a carta.
            </h3>
            <p className="mt-4 text-muted-foreground">
              Uma carta por vez. A mensagem chega no tom que você consegue escutar hoje.
            </p>
            <Button
              variant="ritual"
              size="xl"
              className="mt-8"
              onClick={draw}
              disabled={drawing}
            >
              <Sparkles /> {drawing ? "Canalizando…" : "Puxar minha carta"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
