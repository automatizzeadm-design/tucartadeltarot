import { useEffect, useState } from "react";

import { slotsLeftToday } from "@/data/offer";

/**
 * Escassez honesta: o relógio fecha à meia-noite do FUSO DA VISITANTE
 * (no México fecha no horário do México, não no do Brasil) e o número de
 * vagas é estável no dia — não muda a cada refresh.
 */

function timeLeftToMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now.getTime());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  return { h, m, s };
}

const pad = (n: number) => String(n).padStart(2, "0");

export function Countdown({ label }: { label: string }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);
    setTime(timeLeftToMidnight());
    const id = window.setInterval(() => setTime(timeLeftToMidnight()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const blocks = [
    { value: mounted ? pad(time.h) : "--", unit: "horas" },
    { value: mounted ? pad(time.m) : "--", unit: "min" },
    { value: mounted ? pad(time.s) : "--", unit: "seg" },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="eyebrow text-center">{label}</p>
      <div className="flex items-start gap-2 sm:gap-3">
        {blocks.map((b, i) => (
          <div key={b.unit} className="flex items-start gap-2 sm:gap-3">
            <div className="flex min-w-[64px] flex-col items-center rounded-xl border border-primary/30 bg-background/70 px-3 py-2 backdrop-blur-sm sm:min-w-[76px]">
              <span className="font-display text-3xl leading-none text-gradient-gold tabular-nums sm:text-4xl">
                {b.value}
              </span>
              <span className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                {b.unit}
              </span>
            </div>
            {i < blocks.length - 1 && (
              <span className="pt-2 font-display text-2xl text-primary/40 animate-shimmer-glow">
                :
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function SlotsMeter({ label }: { label: string }) {
  const [slots, setSlots] = useState<number | null>(null);
  const total = 12;

  useEffect(() => {
    setSlots(slotsLeftToday());
  }, []);

  const filled = slots === null ? 0 : total - slots;
  const pct = slots === null ? 0 : (filled / total) * 100;

  return (
    <div className="w-full max-w-md">
      <div className="mb-2 flex items-end justify-between gap-3">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-display text-3xl leading-none text-gradient-gold tabular-nums">
          {slots ?? "–"}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full border border-primary/20 bg-background/60">
        <div
          className="h-full rounded-full bg-[image:var(--gradient-gold)] transition-[width] duration-[1400ms] ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-right text-[10px] uppercase tracking-[0.18em] text-primary/60">
        {slots === null ? "cargando…" : `${filled} de ${total} ya reservadas hoy`}
      </p>
    </div>
  );
}
