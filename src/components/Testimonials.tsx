import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type Item = {
  name: string;
  city: string;
  title: string;
  text: string;
};

/**
 * Carrossel de depoimentos: arrasta com o dedo/mouse, anda sozinho a cada 6s
 * e para quando a visitante interage.
 */
export function Testimonials({ items, dragHint }: { items: readonly Item[]; dragHint: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
  };

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % items.length;
        scrollTo(next);
        return next;
      });
    }, 6000);
    return () => window.clearInterval(id);
  }, [items.length, paused]);

  // Mantém as bolinhas em sincronia quando a visitante arrasta na mão
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
    <div
      className="w-full"
      onPointerDown={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((t, i) => (
          <figure
            key={t.name}
            className={cn(
              "surface-ritual relative w-[85%] shrink-0 snap-center rounded-2xl border border-primary/20 p-6 transition-all duration-500 sm:w-[46%] lg:w-[31%]",
              active === i ? "opacity-100" : "opacity-70",
            )}
          >
            <div
              className="mb-3 flex items-center gap-1 text-primary"
              aria-label="5 de 5 estrellas"
            >
              {Array.from({ length: 5 }).map((_, s) => (
                <svg
                  key={s}
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="m12 2.6 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.7l-5.9 3.1 1.2-6.6-4.8-4.6 6.6-.9Z" />
                </svg>
              ))}
              <span className="ml-2 rounded-full border border-primary/25 px-2 py-0.5 text-[9px] uppercase tracking-[0.15em] text-primary/80">
                Clienta verificada
              </span>
            </div>

            <blockquote>
              <p className="font-display text-lg leading-snug text-foreground">“{t.title}”</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.text}</p>
            </blockquote>

            <figcaption className="mt-5 flex items-center gap-3 border-t border-primary/15 pt-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 font-display text-sm text-primary">
                {t.name.charAt(0)}
              </span>
              <span className="text-xs text-muted-foreground">
                <strong className="block font-medium text-foreground">{t.name}</strong>
                {t.city}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <div className="flex gap-1.5">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              aria-label={`Ver testimonio ${i + 1}`}
              onClick={() => {
                setActive(i);
                scrollTo(i);
              }}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                active === i
                  ? "w-7 bg-[image:var(--gradient-gold)]"
                  : "w-1.5 bg-primary/30 hover:bg-primary/60",
              )}
            />
          ))}
        </div>
      </div>
      <p className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
        {dragHint}
      </p>
    </div>
  );
}
