import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Item = {
  name: string;
  city: string;
  title: string;
  text: string;
};

/**
 * Depoimentos em carrossel horizontal — arrasta com o dedo, como no original.
 * Sem auto-play: menos movimento na tela, mais leitura.
 */
export function Testimonials({ items, dragHint }: { items: readonly Item[]; dragHint: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
    setActive(index);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const children = Array.from(track.children) as HTMLElement[];
    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let min = Infinity;
    children.forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - track.offsetLeft + child.clientWidth / 2 - center);
      if (dist < min) {
        min = dist;
        closest = i;
      }
    });
    setActive(closest);
  };

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-[18px] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[18px] pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t) => (
          <figure key={t.name} className="panel w-[86%] shrink-0 snap-center p-5 sm:w-[62%]">
            <div className="mb-2 flex items-center gap-1.5">
              <span className="flex text-gold" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, s) => (
                  <svg
                    key={s}
                    viewBox="0 0 24 24"
                    className="h-3 w-3"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="m12 2.6 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.7l-5.9 3.1 1.2-6.6-4.8-4.6 6.6-.9Z" />
                  </svg>
                ))}
              </span>
              <span className="text-[9px] uppercase tracking-[0.12em] text-rose">
                Clienta verificada
              </span>
            </div>

            <blockquote>
              <p className="font-display text-lg leading-snug text-foreground">“{t.title}”</p>
              <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted-foreground">
                {t.text}
              </p>
            </blockquote>

            <figcaption className="mt-4 border-t border-border pt-3 text-[11px] text-muted-foreground">
              <strong className="font-medium text-foreground">{t.name}</strong> · {t.city}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-1 flex justify-center gap-1.5">
        {items.map((t, i) => (
          <button
            key={t.name}
            type="button"
            aria-label={`Ver testimonio ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              active === i ? "w-6 bg-gold" : "w-1.5 bg-border hover:bg-gold/60",
            )}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] uppercase tracking-[0.16em] text-muted-foreground/70">
        {dragHint}
      </p>
    </div>
  );
}
