import { useEffect, useState } from "react";

import { slotsLeftToday } from "@/data/offer";

/**
 * Escassez honesta: o relógio fecha à meia-noite do FUSO DA VISITANTE
 * (no México fecha no horário do México) e o número de vagas é estável
 * no dia — não muda a cada refresh da página.
 */

function timeLeftToMidnight() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end.getTime() - now.getTime());
  return {
    h: Math.floor(diff / 3_600_000),
    m: Math.floor((diff % 3_600_000) / 60_000),
    s: Math.floor((diff % 60_000) / 1000),
  };
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
    { value: mounted ? pad(time.h) : "--", unit: "h" },
    { value: mounted ? pad(time.m) : "--", unit: "min" },
    { value: mounted ? pad(time.s) : "--", unit: "seg" },
  ];

  return (
    <div className="text-center">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <div className="mt-2 flex items-center justify-center gap-2">
        {blocks.map((b) => (
          <div
            key={b.unit}
            className="min-w-[58px] rounded-xl border border-border bg-background/60 px-2 py-1.5"
          >
            <span className="block font-display text-2xl leading-none text-gold tabular-nums">
              {b.value}
            </span>
            <span className="mt-0.5 block text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
              {b.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SlotsMeter({ label }: { label: string }) {
  const [slots, setSlots] = useState<number | null>(null);

  useEffect(() => {
    setSlots(slotsLeftToday());
  }, []);

  return (
    <p className="flex items-center justify-center gap-2 text-sm text-foreground">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-rose animate-pulse-ring" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-rose" />
      </span>
      Quedan{" "}
      <strong className="font-display text-2xl leading-none text-gold tabular-nums">
        {slots ?? "–"}
      </strong>{" "}
      {label}
    </p>
  );
}
