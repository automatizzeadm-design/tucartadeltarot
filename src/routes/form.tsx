import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

import { FORM_COPY, COPY } from "@/data/copy";
import {
  COUNTRIES,
  DEFAULT_COUNTRY,
  detectCountry,
  ORDER_WHATSAPP,
  slotsLeftToday,
  type CountryOffer,
} from "@/data/offer";
import { StarField } from "@/components/StarField";
import { GoldButton } from "@/components/GoldButton";
import { Glyph } from "@/components/Glyph";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/form")({
  head: () => ({
    meta: [
      { title: FORM_COPY.meta.title },
      { name: "description", content: FORM_COPY.meta.description },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderForm,
});

type OrderData = {
  name: string;
  target: string;
  situation: string;
  question: string;
  channel: string;
  contact: string;
  country: string;
};

const EMPTY: OrderData = {
  name: "",
  target: "",
  situation: "",
  question: "",
  channel: "",
  contact: "",
  country: DEFAULT_COUNTRY.code,
};

const TOTAL_STEPS = 5;
const STORAGE_KEY = "carta-canalizada-pedido";

/** Quanto tempo a reação da Yeda fica na tela antes de avançar sozinha */
const REACTION_MS = 1700;
/** Cada linha da tiragem */
const READING_LINE_MS = 1150;

/**
 * Troca {name} e {target} pelos nomes que ela digitou.
 * Se ainda não digitou, cai num neutro em vez de deixar a chave crua na tela.
 */
function fill(text: string, data: { name?: string; target?: string }) {
  return text
    .replace(/\{name\}/g, data.name?.trim() || "Tú")
    .replace(/\{target\}/g, data.target?.trim() || "él");
}

function OrderForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OrderData>(EMPTY);
  const [error, setError] = useState("");
  const [country, setCountry] = useState<CountryOffer>(DEFAULT_COUNTRY);
  /** Resposta da Yeda à situação escolhida, visível antes de avançar */
  const [reaction, setReaction] = useState("");
  /** Índice da linha da tiragem; -1 = não está tirando as cartas */
  const [readingLine, setReadingLine] = useState(-1);
  const [slots, setSlots] = useState<number | null>(null);

  // País pelo fuso + pedido salvo (se ela saiu e voltou, não perde o que escreveu)
  useEffect(() => {
    const detected = detectCountry();
    setCountry(detected);
    setData((d) => ({ ...d, country: detected.code }));
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<OrderData>;
        setData((d) => ({ ...d, ...parsed }));
        if (parsed.country)
          setCountry(COUNTRIES.find((c) => c.code === parsed.country) ?? detected);
      }
    } catch {
      /* ignora storage indisponível */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      /* ignora storage indisponível */
    }
  }, [data]);

  useEffect(() => {
    setError("");
    setReaction("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  useEffect(() => {
    setSlots(slotsLeftToday());
  }, []);

  // Tiragem das cartas: as linhas passam uma a uma e, na última, abre a revisão
  useEffect(() => {
    if (readingLine < 0) return;
    const isLast = readingLine >= FORM_COPY.reading.lines.length - 1;
    const timer = window.setTimeout(
      () => {
        if (isLast) {
          setReadingLine(-1);
          setStep(TOTAL_STEPS);
        } else {
          setReadingLine((l) => l + 1);
        }
      },
      isLast ? READING_LINE_MS + 350 : READING_LINE_MS,
    );
    return () => window.clearTimeout(timer);
  }, [readingLine]);

  const set = (key: keyof OrderData, value: string) => setData((d) => ({ ...d, [key]: value }));

  const goNext = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const validateAndNext = () => {
    const s = FORM_COPY.steps;
    if (step === 0 && !data.name.trim()) return setError(s.name.error);
    if (step === 1 && !data.target.trim()) return setError(s.target.error);
    if (step === 3 && !data.question.trim()) return setError(s.question.error);
    if (step === 4 && (!data.channel || !data.contact.trim())) return setError(s.delivery.error);
    // Depois da última resposta ela vê a tiragem acontecer, e só então o preço
    if (step === 4) return setReadingLine(0);
    goNext();
  };

  const confirm = () => {
    const message = [
      "✦ Nuevo pedido de Carta Canalizada ✦",
      `Nombre: ${data.name}`,
      `Sobre: ${data.target}`,
      `Situación: ${data.situation || "—"}`,
      `Pregunta: ${data.question}`,
      `Entrega: ${data.channel} — ${data.contact}`,
      `País: ${country.name} (${country.price})`,
    ].join("\n");

    const target = country.checkout.startsWith("http")
      ? `${country.checkout}${country.checkout.includes("?") ? "&" : "?"}name=${encodeURIComponent(data.name)}&contact=${encodeURIComponent(data.contact)}`
      : `https://wa.me/${ORDER_WHATSAPP}?text=${encodeURIComponent(message)}`;

    window.location.href = target;
  };

  const progress =
    ((Math.min(step, TOTAL_STEPS) + (step === TOTAL_STEPS ? 0 : 0)) / TOTAL_STEPS) * 100;

  return (
    <main className="relative min-h-[100svh] px-5 py-10 sm:py-14">
      <StarField />

      {/* Tiragem: a landing promete que ela "abre o Tarot e acessa o campo".
          Aqui é onde a visitante finalmente vê isso acontecer — e o preço só
          aparece depois do trabalho, nunca antes dele. */}
      {readingLine >= 0 && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 px-8 backdrop-blur-sm"
          role="status"
          aria-live="polite"
        >
          <span className="relative flex h-24 w-24 items-center justify-center">
            <span className="absolute inset-0 animate-orbit-spin rounded-full border border-dashed border-primary/40" />
            <span className="absolute inset-0 animate-pulse-ring rounded-full border border-primary/30" />
            <span className="text-primary animate-shimmer-glow">
              <Glyph name="moon" className="h-10 w-10" />
            </span>
          </span>

          <p
            key={readingLine}
            className="mt-8 max-w-[22rem] animate-rise-fade text-balance text-center font-display text-2xl leading-snug text-foreground"
          >
            {fill(FORM_COPY.reading.lines[readingLine] ?? "", data)}
          </p>
        </div>
      )}

      <div className="mx-auto w-full max-w-[620px]">
        {/* Cabeçalho */}
        <header className="mb-8 text-center">
          <Link to="/" className="inline-block">
            <p className="font-display text-2xl text-gradient-gold">{FORM_COPY.header.title}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-primary/60">
              {FORM_COPY.header.author}
            </p>
          </Link>

          {/* A escassez existia na landing e sumia justo aqui, na tela de
              maior intenção. Só aparece depois de montar, pra não divergir
              entre servidor e navegador. */}
          {slots !== null && (
            <p className="mt-4 inline-block rounded-full border border-primary/25 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.16em] text-primary/80">
              {FORM_COPY.scarcity.slots.replace("{n}", String(slots))}
            </p>
          )}
        </header>

        {/* Progresso ritual: 5 cartinhas que acendem */}
        <div className="mb-8">
          <div className="mb-3 flex items-center justify-center gap-2">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  "h-8 w-5 rounded-[4px] border transition-all duration-500",
                  i < step
                    ? "border-primary/60 bg-[image:var(--gradient-gold)] opacity-90"
                    : i === step
                      ? "border-primary bg-primary/20 shadow-[0_0_18px_oklch(0.82_0.13_85/0.5)]"
                      : "border-primary/20 bg-card/60",
                )}
              />
            ))}
          </div>
          <p className="text-center text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            {step < TOTAL_STEPS
              ? FORM_COPY.header.stepLabel
                  .replace("{current}", String(step + 1))
                  .replace("{total}", String(TOTAL_STEPS))
              : FORM_COPY.review.subtitle}
          </p>
          <div className="mx-auto mt-3 h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-card">
            <div
              className="h-full rounded-full bg-[image:var(--gradient-gold)] transition-[width] duration-700 ease-out"
              style={{ width: `${step === TOTAL_STEPS ? 100 : progress}%` }}
            />
          </div>
        </div>

        {/* Card do passo */}
        <div key={step} className="panel animate-rise-fade p-6 sm:p-8">
          {step === 0 && (
            <StepShell
              title={FORM_COPY.steps.name.title}
              subtitle={FORM_COPY.steps.name.subtitle}
              glyph="star"
            >
              <Field
                label={FORM_COPY.steps.name.label}
                value={data.name}
                onChange={(v) => set("name", v)}
                placeholder={FORM_COPY.steps.name.placeholder}
                autoFocus
                onEnter={validateAndNext}
              />
            </StepShell>
          )}

          {step === 1 && (
            <StepShell
              title={FORM_COPY.steps.target.title}
              subtitle={FORM_COPY.steps.target.subtitle}
              glyph="heart"
            >
              <Field
                label={FORM_COPY.steps.target.label}
                value={data.target}
                onChange={(v) => set("target", v)}
                placeholder={FORM_COPY.steps.target.placeholder}
                autoFocus
                onEnter={validateAndNext}
              />
            </StepShell>
          )}

          {step === 2 && (
            <StepShell
              title={fill(FORM_COPY.steps.situation.title, data)}
              subtitle={FORM_COPY.steps.situation.subtitle}
              glyph="hourglass"
            >
              <div className="grid gap-2.5">
                {FORM_COPY.steps.situation.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={!!reaction}
                    onClick={() => {
                      set("situation", opt.value);
                      // A Yeda responde antes de avançar — é o primeiro
                      // momento do quiz em que ela recebe algo de volta
                      setReaction(opt.reaction);
                      window.setTimeout(goNext, REACTION_MS);
                    }}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl border px-4 py-4 text-left transition-all duration-300",
                      data.situation === opt.value
                        ? "border-primary bg-primary/10"
                        : "border-primary/20 bg-card/60 hover:-translate-y-0.5 hover:border-primary/50",
                      reaction && data.situation !== opt.value && "opacity-40",
                    )}
                  >
                    <span className="text-xl">{opt.icon}</span>
                    <span className="text-sm text-foreground">{opt.value}</span>
                    <span
                      className="ml-auto text-primary opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden
                    >
                      →
                    </span>
                  </button>
                ))}
              </div>

              {reaction && (
                <p
                  className="mt-5 animate-rise-fade border-l-2 border-primary/50 pl-4 text-left font-display text-lg italic leading-relaxed text-foreground"
                  aria-live="polite"
                >
                  {reaction}
                </p>
              )}
            </StepShell>
          )}

          {step === 3 && (
            <StepShell
              title={fill(FORM_COPY.steps.question.title, data)}
              subtitle={FORM_COPY.steps.question.subtitle}
              glyph="orb"
            >
              <textarea
                value={data.question}
                onChange={(e) => set("question", e.target.value)}
                placeholder={FORM_COPY.steps.question.placeholder}
                rows={4}
                autoFocus
                className="w-full resize-none rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring"
              />

              {/* Campo livre é onde mais se abandona. Um toque preenche,
                  e ela segue podendo editar o texto do jeito dela. */}
              <p className="mt-4 text-center text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {FORM_COPY.steps.question.chipsLabel}
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {FORM_COPY.steps.question.chips.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => set("question", chip)}
                    className={cn(
                      "rounded-full border px-3.5 py-2 text-[0.78rem] transition-all duration-200",
                      data.question === chip
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-primary/20 bg-card/60 text-muted-foreground hover:border-primary/50 hover:text-foreground",
                    )}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </StepShell>
          )}

          {step === 4 && (
            <StepShell
              title={FORM_COPY.steps.delivery.title}
              subtitle={FORM_COPY.steps.delivery.subtitle}
              glyph="letter"
            >
              <div className="grid grid-cols-2 gap-2.5">
                {FORM_COPY.steps.delivery.options.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set("channel", opt.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-2xl border px-4 py-5 transition-all duration-300",
                      data.channel === opt.value
                        ? "border-primary bg-primary/10"
                        : "border-primary/20 bg-card/60 hover:-translate-y-0.5 hover:border-primary/50",
                    )}
                  >
                    <span className="text-2xl">{opt.icon}</span>
                    <span className="text-xs text-foreground">{opt.value}</span>
                  </button>
                ))}
              </div>

              {data.channel && (
                <div className="mt-5 animate-rise-fade space-y-4">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {FORM_COPY.steps.delivery.countryLabel}
                    </label>
                    <select
                      value={country.code}
                      onChange={(e) => {
                        const next =
                          COUNTRIES.find((c) => c.code === e.target.value) ?? DEFAULT_COUNTRY;
                        setCountry(next);
                        set("country", next.code);
                      }}
                      className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3 text-sm text-foreground focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.name} {c.dial !== "+" ? `(${c.dial})` : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    label={
                      data.channel === "WhatsApp"
                        ? FORM_COPY.steps.delivery.whatsappLabel
                        : FORM_COPY.steps.delivery.emailLabel
                    }
                    value={data.contact}
                    onChange={(v) => set("contact", v)}
                    placeholder={
                      data.channel === "WhatsApp"
                        ? `${country.dial} ${FORM_COPY.steps.delivery.whatsappPlaceholder}`
                        : FORM_COPY.steps.delivery.emailPlaceholder
                    }
                    type={data.channel === "WhatsApp" ? "tel" : "email"}
                    onEnter={validateAndNext}
                  />
                </div>
              )}
            </StepShell>
          )}

          {step === TOTAL_STEPS && (
            <div className="animate-rise-fade">
              <div className="mb-6 text-center">
                <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-primary/40 text-primary animate-shimmer-glow">
                  <Glyph name="chalice" className="h-7 w-7" />
                </span>
                <h1 className="text-balance font-display text-2xl text-foreground">
                  {fill(FORM_COPY.review.title, data)}
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">{FORM_COPY.review.text}</p>
              </div>

              <dl className="space-y-2">
                {[
                  { label: FORM_COPY.review.labels.name, value: data.name, goTo: 0 },
                  { label: FORM_COPY.review.labels.target, value: data.target, goTo: 1 },
                  { label: FORM_COPY.review.labels.situation, value: data.situation, goTo: 2 },
                  { label: FORM_COPY.review.labels.question, value: data.question, goTo: 3 },
                  {
                    label: FORM_COPY.review.labels.delivery,
                    value: `${data.channel} · ${data.contact}`,
                    goTo: 4,
                  },
                ].map((row) => (
                  <button
                    key={row.label}
                    type="button"
                    onClick={() => setStep(row.goTo)}
                    className="flex w-full items-start gap-3 rounded-xl border border-primary/15 bg-card/50 px-4 py-3 text-left transition-colors hover:border-primary/40"
                  >
                    <dt className="w-24 shrink-0 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {row.label}
                    </dt>
                    <dd className="flex-1 text-sm text-foreground">{row.value || "—"}</dd>
                    <span className="text-xs text-primary/60" aria-hidden>
                      ✎
                    </span>
                  </button>
                ))}
              </dl>
              <p className="mt-2 text-center text-[10px] uppercase tracking-[0.16em] text-muted-foreground/60">
                {FORM_COPY.review.editHint}
              </p>

              {/* Oferta reafirmada na hora da decisão — antes o preço
                  aparecia sozinho e ela tinha que lembrar do que levava */}
              <div className="mt-7 rounded-2xl border border-primary/20 bg-card/40 p-5">
                <p className="text-center text-[10px] uppercase tracking-[0.18em] text-primary/80">
                  {FORM_COPY.review.stackTitle}
                </p>
                <ul className="mt-3 grid gap-2">
                  {FORM_COPY.review.stack.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.86rem] leading-relaxed text-foreground/90"
                    >
                      <span className="mt-0.5 shrink-0 text-primary" aria-hidden>
                        ✦
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Preço */}
              <div className="mt-4 rounded-2xl border border-primary/30 bg-background/50 p-6 text-center">
                <div className="flex items-end justify-center gap-3">
                  <span className="relative font-display text-xl text-muted-foreground/70">
                    {country.from}
                    <span className="absolute inset-x-0 top-1/2 h-px -rotate-6 bg-destructive/70" />
                  </span>
                  <span className="font-display text-5xl leading-none text-gradient-gold">
                    {country.price}
                  </span>
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {FORM_COPY.review.paymentNote}
                </p>
              </div>

              <div className="mt-7">
                <GoldButton onClick={confirm}>{FORM_COPY.review.cta}</GoldButton>
              </div>

              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span className="text-primary">
                  <Glyph name="shield" className="h-3.5 w-3.5" />
                </span>
                {FORM_COPY.review.secure}
              </p>
              <p className="mx-auto mt-3 max-w-[26rem] text-center text-[11px] leading-relaxed text-muted-foreground/70">
                {FORM_COPY.review.guaranteeNote}
              </p>
            </div>
          )}

          {/* Erro */}
          {error && (
            <p className="mt-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-center text-xs text-destructive">
              {error}
            </p>
          )}

          {/* Navegação */}
          {step < TOTAL_STEPS && (
            <div className="mt-7 flex items-center gap-3">
              {step > 0 && (
                <button
                  type="button"
                  onClick={goBack}
                  className="rounded-full border border-primary/25 px-5 py-3 text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  {FORM_COPY.header.back}
                </button>
              )}
              {step !== 2 && (
                <div className="flex-1">
                  <GoldButton onClick={validateAndNext}>
                    {step === 4 ? FORM_COPY.steps.delivery.review : FORM_COPY.header.next}
                  </GoldButton>
                </div>
              )}
            </div>
          )}

          {step === TOTAL_STEPS && (
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={goBack}
                className="text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {FORM_COPY.header.back}
              </button>
            </div>
          )}
        </div>

        {/* Reforço de segurança */}
        <p className="mt-8 text-center text-[11px] leading-relaxed text-muted-foreground/60">
          {COPY.hero.secure} · {COPY.offer.guaranteeStrip}
        </p>
      </div>
    </main>
  );
}

/* ---------------- Peças do formulário ---------------- */

function StepShell({
  title,
  subtitle,
  glyph,
  children,
}: {
  title: string;
  subtitle: string;
  glyph: "star" | "heart" | "hourglass" | "orb" | "letter";
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-6 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 text-primary">
          <Glyph name={glyph} className="h-6 w-6" />
        </span>
        <h1 className="text-balance font-display text-2xl leading-snug text-foreground sm:text-[1.7rem]">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoFocus,
  onEnter,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoFocus?: boolean;
  onEnter?: () => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            e.preventDefault();
            onEnter();
          }
        }}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-input bg-background/60 px-4 py-3.5 text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
