import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { COPY } from "@/data/copy";
import { detectCountry, DEFAULT_COUNTRY, type CountryOffer } from "@/data/offer";
import { Reveal } from "@/components/Reveal";
import { StarField } from "@/components/StarField";
import { TarotCard } from "@/components/TarotCard";
import { GoldButton } from "@/components/GoldButton";
import { Countdown, SlotsMeter } from "@/components/Countdown";
import { Testimonials } from "@/components/Testimonials";
import { StickyCta, ScrollProgress } from "@/components/StickyCta";
import { Glyph, Divider } from "@/components/Glyph";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: COPY.meta.title },
      { name: "description", content: COPY.meta.description },
      { property: "og:title", content: COPY.meta.title },
      { property: "og:description", content: COPY.meta.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "es_MX" },
    ],
  }),
  component: Landing,
});

/* ============================================================
   Blocos reutilizáveis de seção
   ============================================================ */

function Section({
  children,
  id,
  className = "",
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`relative px-5 py-20 sm:py-24 lg:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="eyebrow mb-4 flex items-center justify-center gap-3 text-center">
      <span className="h-px w-6 bg-primary/40" />
      {children}
      <span className="h-px w-6 bg-primary/40" />
    </p>
  );
}

function Title({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-balance text-center font-display text-3xl leading-[1.12] text-foreground sm:text-4xl lg:text-[2.9rem] ${className}`}
    >
      {children}
    </h2>
  );
}

function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto mt-5 max-w-2xl text-pretty text-center text-[0.98rem] leading-relaxed text-muted-foreground sm:text-base">
      {children}
    </p>
  );
}

/* ============================================================
   Página
   ============================================================ */

function Landing() {
  const [country, setCountry] = useState<CountryOffer>(DEFAULT_COUNTRY);

  // Detecta o país pelo fuso do navegador pra mostrar o preço na moeda dela
  useEffect(() => {
    setCountry(detectCountry());
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      <StarField />
      <ScrollProgress />
      <StickyCta label={COPY.stickyCta.label} price={COPY.stickyCta.price} />

      <Hero />
      <Revelations />
      <Pain />
      <Mechanism />
      <Deliverables />
      <Authority />
      <AntiAi />
      <TestimonialsSection />
      <HardTruth />
      <Offer country={country} />
      <Futures />
      <Guarantee />
      <Scarcity />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <header className="relative flex min-h-[100svh] items-center px-5 pb-16 pt-24 sm:pt-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:gap-16">
        {/* Texto */}
        <div className="text-center lg:text-left">
          <p className="eyebrow animate-rise-fade mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/40 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-pulse-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            {COPY.hero.eyebrow}
          </p>

          <h1
            className="animate-rise-fade text-balance font-display text-[2.4rem] leading-[1.05] text-foreground sm:text-6xl lg:text-[4.1rem]"
            style={{ animationDelay: "120ms" }}
          >
            Descubre lo que él siente
            <br className="hidden sm:block" />{" "}
            <span className="text-gradient-gold italic">y nunca tuvo el valor</span>
            <br className="hidden sm:block" /> de decirte
          </h1>

          <p
            className="animate-rise-fade mx-auto mt-6 max-w-xl text-pretty text-[1.02rem] leading-relaxed text-muted-foreground lg:mx-0"
            style={{ animationDelay: "260ms" }}
          >
            {COPY.hero.lead}
          </p>

          <p
            className="animate-rise-fade mt-4 font-display text-lg italic text-foreground/90"
            style={{ animationDelay: "360ms" }}
          >
            {COPY.hero.personal}
          </p>

          <div
            className="animate-rise-fade mt-9 flex flex-col items-center gap-4 lg:items-start"
            style={{ animationDelay: "460ms" }}
          >
            <GoldButton to="/form">{COPY.hero.cta}</GoldButton>
            <p className="text-xs text-muted-foreground">{COPY.hero.secure}</p>
          </div>

          <ul
            className="animate-rise-fade mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
            style={{ animationDelay: "560ms" }}
          >
            {COPY.hero.badges.map((b) => (
              <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-primary">
                  <Glyph name="star" className="h-3.5 w-3.5" />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <figure
            className="animate-rise-fade mt-8 inline-flex items-center gap-3 rounded-2xl border border-primary/20 bg-background/40 px-4 py-3 backdrop-blur-sm"
            style={{ animationDelay: "660ms" }}
          >
            <span className="flex text-primary">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="m12 2.6 2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.7l-5.9 3.1 1.2-6.6-4.8-4.6 6.6-.9Z" />
                </svg>
              ))}
            </span>
            <figcaption className="text-left text-xs">
              <span className="block font-display text-sm text-foreground">
                “{COPY.hero.microProof.quote}”
              </span>
              <span className="text-muted-foreground">{COPY.hero.microProof.author}</span>
            </figcaption>
          </figure>
        </div>

        {/* Carta interativa */}
        <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[330px]">
          <div className="pointer-events-none absolute -inset-10 rounded-full bg-primary/10 blur-3xl animate-shimmer-glow" />

          {/* Cartas de trás, só decorativas */}
          <div className="pointer-events-none absolute inset-0 -rotate-12 scale-95 opacity-40">
            <div className="h-full w-full rounded-2xl border border-primary/25 bg-card/80" />
          </div>
          <div className="pointer-events-none absolute inset-0 rotate-6 scale-[0.97] opacity-60">
            <div className="h-full w-full rounded-2xl border border-primary/25 bg-card/90" />
          </div>

          <div className="relative animate-float-slow">
            <TarotCard
              numeral={COPY.hero.cardNumeral}
              title={COPY.hero.cardTitle}
              text={COPY.hero.cardReveal}
              glyph="moon"
              hint={COPY.hero.cardPrompt}
              footer={
                <span className="text-[10px] uppercase tracking-[0.2em] text-primary/70">
                  {COPY.hero.badges[0]}
                </span>
              }
            />
          </div>

          <p className="mt-5 text-center text-[11px] uppercase tracking-[0.25em] text-primary/60">
            ☾ ✦ ☽
          </p>
        </div>
      </div>
    </header>
  );
}

/* ---------------- LAS 3 REVELACIONES ---------------- */

function Revelations() {
  const glyphs = ["eye", "heart", "hourglass"] as const;

  return (
    <Section id="revelaciones">
      <Reveal>
        <Eyebrow>{COPY.revelations.eyebrow}</Eyebrow>
        <Title>{COPY.revelations.title}</Title>
        <Lead>{COPY.revelations.lead}</Lead>
      </Reveal>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {COPY.revelations.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 140} from="scale">
            <TarotCard
              numeral={item.numeral}
              title={item.title}
              text={item.text}
              glyph={glyphs[i] ?? "star"}
              hint={COPY.revelations.hint}
              autoFlipDelay={400 + i * 550}
            />
          </Reveal>
        ))}
      </div>

      <Reveal delay={200}>
        <div className="mt-12 flex justify-center">
          <GoldButton to="/form" size="md">
            {COPY.hero.cta}
          </GoldButton>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- ESPEJO DEL DOLOR ---------------- */

function Pain() {
  return (
    <Section id="dolor" className="border-y border-primary/10 bg-background/30 backdrop-blur-sm">
      <Reveal>
        <Eyebrow>{COPY.pain.eyebrow}</Eyebrow>
        <Title>{COPY.pain.title}</Title>
        <Lead>{COPY.pain.lead}</Lead>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {COPY.pain.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 120}>
            <article className="group surface-ritual h-full rounded-2xl border border-primary/15 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/35">
              <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full border border-primary/25 font-display text-lg text-primary transition-colors group-hover:border-primary/60">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl leading-snug text-foreground">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={160}>
        <div className="mx-auto mt-12 max-w-3xl space-y-4 text-center">
          {COPY.pain.closing.map((p, i) => (
            <p
              key={i}
              className={
                i === COPY.pain.closing.length - 1
                  ? "font-display text-xl italic leading-relaxed text-foreground sm:text-2xl"
                  : "text-[0.98rem] leading-relaxed text-muted-foreground"
              }
            >
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- MECANISMO ---------------- */

function Mechanism() {
  return (
    <Section id="metodo">
      <Reveal>
        <Eyebrow>{COPY.mechanism.eyebrow}</Eyebrow>
        <Title className="mx-auto max-w-4xl">{COPY.mechanism.title}</Title>
      </Reveal>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_minmax(0,0.9fr)] lg:items-center">
        <Reveal from="left">
          <div className="space-y-5">
            {COPY.mechanism.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  i === 2
                    ? "border-l-2 border-primary/50 pl-5 font-display text-xl italic leading-relaxed text-foreground"
                    : "text-[0.98rem] leading-relaxed text-muted-foreground"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Roda ritual com os 4 passos */}
        <Reveal from="right" delay={120}>
          <div className="relative mx-auto w-full max-w-md">
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-[86%] w-[86%] rounded-full border border-dashed border-primary/20 animate-orbit-spin" />
            </div>

            <ol className="relative space-y-3">
              {COPY.mechanism.steps.map((s, i) => (
                <li
                  key={s.step}
                  className="group flex items-start gap-4 rounded-2xl border border-primary/15 bg-card/70 p-4 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:bg-card"
                  style={{ marginLeft: `${i * 10}px` }}
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/35 font-display text-sm text-primary">
                    {s.step}
                  </span>
                  <div>
                    <h3 className="font-display text-lg leading-tight text-foreground">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-[0.82rem] leading-relaxed text-muted-foreground">
                      {s.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- ENTREGABLES ---------------- */

function Deliverables() {
  const glyphs = ["letter", "orb", "moon"] as const;

  return (
    <Section id="recibes" className="border-y border-primary/10 bg-background/30 backdrop-blur-sm">
      <Reveal>
        <Eyebrow>{COPY.deliverables.eyebrow}</Eyebrow>
        <Title>{COPY.deliverables.title}</Title>
        <Lead>{COPY.deliverables.lead}</Lead>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-3">
        {COPY.deliverables.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 130} from="scale">
            <article className="group relative h-full overflow-hidden rounded-2xl border border-primary/20 bg-card/80 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/45">
              <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
              <span className="text-primary">
                <Glyph name={glyphs[i] ?? "letter"} className="h-9 w-9" />
              </span>
              <h3 className="mt-5 font-display text-xl leading-snug text-foreground">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- AUTORIDAD ---------------- */

function Authority() {
  return (
    <Section id="quien-soy">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_1fr] lg:items-center">
        <Reveal from="left">
          <div className="relative mx-auto w-full max-w-[320px]">
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-primary/10 blur-3xl" />
            {/* Retrato simbólico em SVG — mão com carta e lua */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-primary/25 bg-[linear-gradient(160deg,oklch(0.24_0.06_275),oklch(0.15_0.05_268))]">
              <svg
                viewBox="0 0 300 400"
                className="absolute inset-0 h-full w-full text-primary/60"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                aria-hidden
              >
                <circle cx="150" cy="120" r="58" />
                <circle cx="150" cy="120" r="46" opacity="0.5" />
                <path
                  d="M172 100a26 26 0 1 0 0 40 21 21 0 0 1 0-40Z"
                  fill="currentColor"
                  fillOpacity="0.3"
                />
                <path d="M150 40v-14M150 214v14M78 120H64M236 120h14M99 69l-10-10M201 171l10 10M201 69l10-10M99 171l-10 10" />
                <path d="M96 250h108l-14 96H110Z" />
                <path d="M120 268h60M120 288h60M120 308h40" opacity="0.55" />
                <path
                  d="m150 352 5 14 14 5-14 5-5 14-5-14-14-5 14-5Z"
                  fill="currentColor"
                  fillOpacity="0.4"
                />
              </svg>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background to-transparent p-5 pt-16 text-center">
                <p className="font-display text-2xl text-foreground">{COPY.brand.author}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-primary/70">
                  {COPY.brand.role}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal from="right" delay={120}>
          <p className="eyebrow mb-4">{COPY.authority.eyebrow}</p>
          <h2 className="text-balance font-display text-3xl leading-tight text-foreground sm:text-4xl">
            {COPY.authority.title}
          </h2>
          <div className="mt-6 space-y-4">
            {COPY.authority.paragraphs.map((p, i) => (
              <p key={i} className="text-[0.98rem] leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>

          <dl className="mt-9 grid grid-cols-3 gap-3">
            {COPY.authority.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-primary/20 bg-card/60 p-4 text-center backdrop-blur-sm"
              >
                <dt className="font-display text-2xl text-gradient-gold">{s.value}</dt>
                <dd className="mt-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

/* ---------------- ANTI-IA ---------------- */

function AntiAi() {
  return (
    <Section id="aviso">
      <Reveal>
        <div className="frame-ritual mx-auto max-w-4xl rounded-3xl p-8 sm:p-12">
          <Eyebrow>{COPY.antiAi.eyebrow}</Eyebrow>
          <Title>{COPY.antiAi.title}</Title>

          <p className="mx-auto mt-6 max-w-2xl text-center text-[0.98rem] leading-relaxed text-muted-foreground">
            {COPY.antiAi.lead}
          </p>

          <p className="mt-6 text-center font-display text-2xl italic text-destructive">
            {COPY.antiAi.warning}
          </p>

          <p className="mt-8 text-center text-sm text-muted-foreground">{COPY.antiAi.intro}</p>

          <ul className="mx-auto mt-5 max-w-2xl space-y-3">
            {COPY.antiAi.nots.map((n, i) => (
              <Reveal as="li" key={n} delay={i * 110}>
                <span className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-foreground/90">
                  <span className="mt-0.5 text-destructive" aria-hidden>
                    ✕
                  </span>
                  {n}
                </span>
              </Reveal>
            ))}
          </ul>

          <Divider className="my-8" />

          <div className="space-y-3 text-center">
            {COPY.antiAi.closing.map((p, i) => (
              <p
                key={i}
                className={
                  i === 1
                    ? "font-display text-xl italic text-foreground"
                    : "text-[0.98rem] leading-relaxed text-muted-foreground"
                }
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- TESTIMONIOS ---------------- */

function TestimonialsSection() {
  return (
    <Section
      id="testimonios"
      className="border-y border-primary/10 bg-background/30 backdrop-blur-sm"
    >
      <Reveal>
        <Eyebrow>{COPY.testimonials.eyebrow}</Eyebrow>
        <Title>{COPY.testimonials.title}</Title>
        <Lead>{COPY.testimonials.lead}</Lead>
      </Reveal>

      <Reveal delay={140}>
        <div className="mt-12">
          <Testimonials items={COPY.testimonials.items} dragHint={COPY.testimonials.dragHint} />
        </div>
      </Reveal>

      <Reveal delay={200}>
        <div className="mt-10 flex flex-col items-center gap-5">
          <p className="text-center font-display text-xl text-foreground">
            <span className="text-gradient-gold">✦</span> {COPY.testimonials.counter}
          </p>
          <GoldButton to="/form">{COPY.testimonials.cta}</GoldButton>
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/60">
            {COPY.testimonials.note}
          </p>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- VERDAD DURA ---------------- */

function HardTruth() {
  return (
    <Section id="verdad">
      <Reveal>
        <Eyebrow>{COPY.hardTruth.eyebrow}</Eyebrow>
        <Title className="mx-auto max-w-3xl">
          <span className="mark-gold">{COPY.hardTruth.title}</span>
        </Title>
      </Reveal>

      <div className="mx-auto mt-8 max-w-2xl space-y-4">
        {COPY.hardTruth.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 120}>
            <p className="text-center text-[0.98rem] leading-relaxed text-muted-foreground">{p}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={260}>
        <p className="mt-9 text-center font-display text-2xl italic text-foreground sm:text-3xl">
          {COPY.hardTruth.highlight}
        </p>
      </Reveal>
    </Section>
  );
}

/* ---------------- OFERTA ---------------- */

function Offer({ country }: { country: CountryOffer }) {
  return (
    <Section id="oferta">
      <Reveal>
        <Eyebrow>{COPY.offer.eyebrow}</Eyebrow>
        <Title className="mx-auto max-w-4xl">{COPY.offer.title}</Title>
      </Reveal>

      <Reveal delay={120} from="scale">
        <div className="frame-ritual relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-52 w-52 rounded-full bg-primary/15 blur-3xl animate-shimmer-glow" />

          <p className="relative text-center text-[0.95rem] leading-relaxed text-muted-foreground">
            {COPY.offer.anchorText.replace("{anchor}", country.anchor)}
          </p>

          <Divider className="my-8" />

          <h3 className="text-center font-display text-2xl text-foreground">
            {COPY.offer.includesTitle}
          </h3>

          <ul className="mx-auto mt-6 max-w-xl space-y-3">
            {COPY.offer.includes.map((item, i) => (
              <Reveal as="li" key={item} delay={i * 90}>
                <span className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90">
                  <span className="mt-0.5 shrink-0 text-primary">
                    <Glyph name="star" className="h-4 w-4" />
                  </span>
                  {item}
                </span>
              </Reveal>
            ))}
          </ul>

          {/* Preço */}
          <div className="relative mt-10 flex flex-col items-center">
            <div className="flex items-end gap-4">
              <span className="relative font-display text-2xl text-muted-foreground/70">
                <span className="relative">
                  {country.from}
                  <span className="absolute inset-x-0 top-1/2 h-px -rotate-6 bg-destructive/70" />
                </span>
              </span>
              <span className="font-display text-6xl leading-none text-gradient-gold sm:text-7xl">
                {country.price}
              </span>
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              {COPY.offer.paymentNote}
            </p>

            <div className="mt-8 w-full max-w-md">
              <GoldButton to="/form" full sublabel={COPY.offer.ctaSub}>
                {COPY.offer.cta}
              </GoldButton>
            </div>

            <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <span className="text-primary">
                <Glyph name="shield" className="h-4 w-4" />
              </span>
              {COPY.offer.guaranteeStrip}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- DOS FUTUROS ---------------- */

function Futures() {
  return (
    <Section id="caminos" className="border-y border-primary/10 bg-background/30 backdrop-blur-sm">
      <Reveal>
        <Eyebrow>{COPY.futures.eyebrow}</Eyebrow>
        <Title>{COPY.futures.title}</Title>
        <Lead>{COPY.futures.lead}</Lead>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <Reveal from="left">
          <article className="h-full rounded-3xl border border-primary/35 bg-[linear-gradient(160deg,oklch(0.26_0.07_280/0.6),transparent)] p-7 transition-transform duration-500 hover:-translate-y-1">
            <header className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--gradient-gold)] text-primary-foreground">
                <Glyph name="sun" className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl text-foreground">{COPY.futures.good.label}</h3>
            </header>
            <ul className="space-y-4">
              {COPY.futures.good.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-foreground/90"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>

        <Reveal from="right" delay={120}>
          <article className="h-full rounded-3xl border border-destructive/25 bg-destructive/5 p-7 transition-transform duration-500 hover:-translate-y-1">
            <header className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-destructive/40 text-destructive">
                <Glyph name="hourglass" className="h-5 w-5" />
              </span>
              <h3 className="font-display text-xl text-foreground/80">{COPY.futures.bad.label}</h3>
            </header>
            <ul className="space-y-4">
              {COPY.futures.bad.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive/70" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <p className="mt-12 text-center font-display text-2xl italic text-foreground">
          {COPY.futures.closing}
        </p>
      </Reveal>
    </Section>
  );
}

/* ---------------- GARANTÍA ---------------- */

function Guarantee() {
  return (
    <Section id="garantia">
      <Reveal from="scale">
        <div className="frame-ritual mx-auto max-w-3xl rounded-3xl p-8 text-center sm:p-12">
          <Eyebrow>{COPY.guarantee.eyebrow}</Eyebrow>

          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-primary/40 bg-background/60">
            <span className="text-primary animate-shimmer-glow">
              <Glyph name="shield" className="h-11 w-11" />
            </span>
          </div>

          <p className="eyebrow mb-2">{COPY.guarantee.badge}</p>
          <Title>{COPY.guarantee.title}</Title>

          <div className="mx-auto mt-6 max-w-xl space-y-4">
            {COPY.guarantee.paragraphs.map((p, i) => (
              <p key={i} className="text-[0.95rem] leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </div>

          <p className="mt-7 font-display text-2xl italic text-gradient-gold">
            {COPY.guarantee.highlight}
          </p>

          <p className="mt-6 font-display text-lg text-foreground">{COPY.guarantee.signature}</p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-primary/60">
            {COPY.brand.role}
          </p>

          <div className="mt-9 flex justify-center">
            <GoldButton to="/form" sublabel={COPY.guarantee.ctaSub}>
              {COPY.guarantee.cta}
            </GoldButton>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- ESCASEZ ---------------- */

function Scarcity() {
  return (
    <Section id="cupos" className="border-y border-primary/10 bg-background/30 backdrop-blur-sm">
      <Reveal>
        <Eyebrow>{COPY.scarcity.eyebrow}</Eyebrow>
        <Title>{COPY.scarcity.title}</Title>
      </Reveal>

      <Reveal delay={140}>
        <div className="mt-12 flex flex-col items-center gap-10">
          <SlotsMeter label={COPY.scarcity.slotsLabel} />
          <Countdown label={COPY.scarcity.timerLabel} />
          <p className="mx-auto max-w-2xl text-center text-[0.95rem] leading-relaxed text-muted-foreground">
            {COPY.scarcity.text}
          </p>
          <GoldButton to="/form">{COPY.offer.cta}</GoldButton>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */

function Faq() {
  return (
    <Section id="preguntas">
      <Reveal>
        <Eyebrow>{COPY.faq.eyebrow}</Eyebrow>
        <Title className="mx-auto max-w-3xl">{COPY.faq.title}</Title>
      </Reveal>

      <Reveal delay={140}>
        <Accordion type="single" collapsible className="mx-auto mt-12 max-w-3xl space-y-3">
          {COPY.faq.items.map((item, i) => (
            <AccordionItem
              key={item.q}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-primary/20 bg-card/60 px-5 backdrop-blur-sm transition-colors data-[state=open]:border-primary/45"
            >
              <AccordionTrigger className="py-5 text-left font-display text-lg leading-snug text-foreground hover:no-underline">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}

/* ---------------- CIERRE ---------------- */

function FinalCta() {
  return (
    <Section id="final" className="pb-28">
      <Reveal from="scale">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-primary/30 bg-[linear-gradient(170deg,oklch(0.24_0.07_280/0.75),oklch(0.14_0.05_268/0.9))] p-10 text-center sm:p-14">
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/25 blur-3xl animate-shimmer-glow" />
          </div>

          <div className="relative">
            <span className="mx-auto mb-6 flex h-12 w-12 items-center justify-center text-primary">
              <Glyph name="moon" className="h-9 w-9" />
            </span>
            <Title>{COPY.finalCta.title}</Title>
            <Lead>{COPY.finalCta.text}</Lead>
            <div className="mt-9 flex justify-center">
              <GoldButton to="/form" sublabel={COPY.finalCta.sub}>
                {COPY.finalCta.cta}
              </GoldButton>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="border-t border-primary/15 px-5 pb-32 pt-12 sm:pb-12">
      <div className="mx-auto max-w-4xl text-center">
        <p className="font-display text-2xl text-gradient-gold">{COPY.brand.name}</p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-primary/60">
          {COPY.brand.role}
        </p>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {COPY.footer.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="mx-auto mt-8 max-w-3xl text-[11px] leading-relaxed text-muted-foreground/70">
          {COPY.footer.disclaimer}
        </p>
        <p className="mt-4 text-[11px] text-muted-foreground/50">{COPY.footer.rights}</p>
      </div>
    </footer>
  );
}
