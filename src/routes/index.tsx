import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { COPY } from "@/data/copy";
import { detectCountry, DEFAULT_COUNTRY, paymentsFor, type CountryOffer } from "@/data/offer";
import { Reveal } from "@/components/Reveal";
import { StarField } from "@/components/StarField";
import { TarotCard } from "@/components/TarotCard";
import { GoldButton } from "@/components/GoldButton";
import { Countdown, SlotsMeter } from "@/components/Countdown";
import { Testimonials } from "@/components/Testimonials";
import { LockedCard } from "@/components/LockedCard";
import { SocialProof } from "@/components/SocialProof";
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
   Peças de layout — uma coluna só, 620px, mobile-first
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
    <section id={id} className={`py-12 ${className}`}>
      {children}
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-center">
      <span className="pill">{children}</span>
    </p>
  );
}

function Title({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-balance text-center font-display text-[1.75rem] leading-[1.15] text-foreground sm:text-[2.1rem] ${className}`}
    >
      {children}
    </h2>
  );
}

function Text({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`mt-4 text-[0.95rem] leading-relaxed text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}

/* ============================================================
   Página
   ============================================================ */

function Landing() {
  const [country, setCountry] = useState<CountryOffer>(DEFAULT_COUNTRY);

  useEffect(() => {
    setCountry(detectCountry());
  }, []);

  return (
    <main className="relative overflow-x-hidden pb-16">
      <StarField />
      <SocialProof names={COPY.socialProof.names} messages={COPY.socialProof.messages} />

      <div className="mx-auto w-full max-w-[620px] px-[18px]">
        <Topbar />
        <Hero />
        <Divider className="py-2" />
        <Revelations />
        <Pain />
        <Divider className="py-2" />
        <Mechanism />
        <Deliverables />
        <Divider className="py-2" />
        <Authority />
        <AntiAi />
        <Testimonies />
        <HardTruth />
        <Offer country={country} />
        <Futures />
        <Guarantee />
        <Scarcity />
        <Faq />
        <FinalCta />
      </div>

      <Footer />
    </main>
  );
}

/* ---------------- TOPO ---------------- */

function Topbar() {
  return (
    <header className="pt-8 text-center">
      <div className="animate-rise-fade relative mx-auto w-full max-w-[280px] sm:max-w-[340px]">
        {/* Halo dourado pulsando devagar atrás da arte */}
        <span
          className="animate-logo-glow pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(58%_58%_at_50%_50%,oklch(0.82_0.13_85/0.3),transparent_72%)]"
          aria-hidden
        />
        {/*
          A logo é arte dourada sobre fundo PRETO, e o fundo da página é azul-noite.
          `mix-blend-mode: screen` apaga o preto do PNG e deixa só o dourado,
          então não aparece um retângulo preto em volta.
        */}
        <img
          src={COPY.brand.logo}
          alt={`${COPY.brand.name} — ${COPY.brand.role}`}
          width={1200}
          height={400}
          className="animate-logo-float mx-auto h-auto w-full [mix-blend-mode:screen]"
        />
      </div>

    </header>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="pt-6 text-center">
      <Pill>{COPY.hero.eyebrow}</Pill>

      <h1 className="animate-rise-fade text-balance font-display text-[2.1rem] leading-[1.1] text-foreground sm:text-[2.7rem]">
        Descubre lo que él siente <span className="italic text-gold">y nunca tuvo el valor</span> de
        decirte
      </h1>

      <p className="animate-rise-fade mt-5 text-[0.98rem] leading-relaxed text-muted-foreground">
        {COPY.hero.lead}
      </p>

      {/* Carta — o "produto" na tela, e a única peça que reage ao toque */}
      <div className="mx-auto mt-8 w-[210px]">
        <TarotCard
          numeral={COPY.hero.cardNumeral}
          title={COPY.hero.cardTitle}
          text={COPY.hero.cardReveal}
          glyph="moon"
          hint={COPY.hero.cardPrompt}
        />
      </div>

      <p className="animate-rise-fade mt-7 font-display text-lg italic text-foreground/90">
        {COPY.hero.personal}
      </p>

      <div className="mt-6">
        <GoldButton to="/form">{COPY.hero.cta}</GoldButton>
        <p className="mt-2.5 text-center text-[12px] text-muted-foreground">{COPY.hero.secure}</p>
      </div>

      <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        {COPY.hero.badges.map((b) => (
          <li key={b} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-gold" />
            {b}
          </li>
        ))}
      </ul>

      <figure className="panel mt-6 p-4">
        <span className="flex justify-center gap-0.5 text-gold">
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
        <figcaption className="mt-2">
          <span className="block font-display text-base text-foreground">
            “{COPY.hero.microProof.quote}”
          </span>
          <span className="text-[11px] text-muted-foreground">{COPY.hero.microProof.author}</span>
        </figcaption>
      </figure>
    </section>
  );
}

/* ---------------- LAS 3 REVELACIONES ---------------- */

function Revelations() {
  return (
    <Section id="revelaciones">
      <Pill>{COPY.revelations.eyebrow}</Pill>
      <Title>{COPY.revelations.title}</Title>
      <Text className="text-center">{COPY.revelations.lead}</Text>

      <div className="mt-6 grid gap-3">
        {COPY.revelations.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 90}>
            <article className="panel p-5">
              <div className="flex items-start gap-4">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-[1.35rem] leading-none">
                  {item.emoji}
                </span>
                <div>
                  <p className="font-display text-xs tracking-[0.3em] text-gold/60">
                    {item.numeral}
                  </p>
                  <h3 className="mt-0.5 font-display text-xl leading-snug text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-7">
        <GoldButton to="/form">{COPY.hero.cta}</GoldButton>
      </div>
    </Section>
  );
}

/* ---------------- ESPEJO DEL DOLOR ---------------- */

function Pain() {
  return (
    <Section id="dolor">
      <Pill>{COPY.pain.eyebrow}</Pill>
      <Title>{COPY.pain.title}</Title>
      <Text className="text-center">{COPY.pain.lead}</Text>

      <div className="mt-6 grid gap-3">
        {COPY.pain.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 90}>
            <article className="panel p-5">
              <h3 className="font-display text-lg leading-snug text-foreground">{item.title}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </article>
          </Reveal>
        ))}
      </div>

      {COPY.pain.closing.map((p, i) => (
        <p
          key={i}
          className={
            i === COPY.pain.closing.length - 1
              ? "mt-6 text-center font-display text-xl italic leading-relaxed text-foreground"
              : "mt-6 text-[0.95rem] leading-relaxed text-muted-foreground"
          }
        >
          {p}
        </p>
      ))}
    </Section>
  );
}

/* ---------------- MECANISMO ---------------- */

function Mechanism() {
  return (
    <Section id="metodo">
      <Pill>{COPY.mechanism.eyebrow}</Pill>
      <Title>{COPY.mechanism.title}</Title>

      {COPY.mechanism.paragraphs.map((p, i) => (
        <p
          key={i}
          className={
            i === COPY.mechanism.paragraphs.length - 1
              ? "mt-4 text-[0.95rem] leading-relaxed text-foreground underline decoration-gold/70 decoration-1 underline-offset-[6px]"
              : "mt-4 text-[0.95rem] leading-relaxed text-muted-foreground"
          }
        >
          {p}
        </p>
      ))}

      <ol className="mt-6 grid gap-2">
        {COPY.mechanism.steps.map((s) => (
          <li key={s.step} className="panel flex items-start gap-3 p-4">
            <span className="text-[1.5rem] leading-none">{s.step}</span>
            <div>
              <h3 className="font-display text-base leading-tight text-foreground">{s.title}</h3>
              <p className="mt-0.5 text-[0.82rem] leading-relaxed text-muted-foreground">
                {s.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------------- ENTREGABLES ---------------- */

function Deliverables() {
  return (
    <Section id="recibes">
      <Pill>{COPY.deliverables.eyebrow}</Pill>
      <Title>{COPY.deliverables.title}</Title>
      <Text className="text-center">{COPY.deliverables.lead}</Text>

      <div className="mt-6 grid gap-3">
        {COPY.deliverables.items.map((item, i) => (
          <Reveal key={item.title} delay={i * 90}>
            <article className="panel p-5 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-border text-[1.5rem] leading-none">
                {item.emoji}
              </span>
              <h3 className="mt-3 font-display text-xl leading-snug text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted-foreground">
                {item.text}
              </p>
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
      <Pill>{COPY.authority.eyebrow}</Pill>
      <Title>{COPY.authority.title}</Title>

      <div className="panel mt-6 p-6 text-center">
        {/* Retrato da Ana Yeda. Enquanto COPY.brand.photo estiver vazio,
            entra o emblema de lua no lugar. */}
        {COPY.brand.photo ? (
          <img
            src={COPY.brand.photo}
            alt={COPY.brand.photoAlt}
            width={112}
            height={112}
            loading="lazy"
            className="mx-auto h-28 w-28 rounded-full border-2 border-gold/50 object-cover shadow-[var(--shadow-halo)]"
          />
        ) : (
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-border text-gold">
            <Glyph name="moon" className="h-9 w-9" />
          </span>
        )}
        <p className="mt-4 font-display text-2xl text-gold">{COPY.brand.author}</p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {COPY.brand.role}
        </p>

        {COPY.authority.paragraphs.map((p, i) => (
          <p
            key={i}
            className="mt-4 text-left text-[0.92rem] leading-relaxed text-muted-foreground"
          >
            {p}
          </p>
        ))}

        <dl className="mt-6 grid grid-cols-3 gap-2">
          {COPY.authority.stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border px-2 py-3">
              <dt className="font-display text-lg text-gold">{s.value}</dt>
              <dd className="mt-0.5 text-[9px] uppercase tracking-[0.1em] text-muted-foreground">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

/* ---------------- ANTI-IA ---------------- */

function AntiAi() {
  return (
    <Section id="aviso">
      {/* Bloco único: chapéu, título e texto todos dentro do mesmo quadro */}
      <div className="panel border-rose/30 p-6">
        <Pill>{COPY.antiAi.eyebrow}</Pill>
        <Title>{COPY.antiAi.title}</Title>

        <p className="mt-5 text-[0.95rem] leading-relaxed text-muted-foreground">
          {COPY.antiAi.lead}
        </p>
        <p className="mt-4 text-center font-display text-xl italic text-rose">
          {COPY.antiAi.warning}
        </p>

        <p className="mt-5 text-[0.9rem] text-muted-foreground">{COPY.antiAi.intro}</p>
        <ul className="mt-3 grid gap-2">
          {COPY.antiAi.nots.map((n) => (
            <li
              key={n}
              className="flex items-start gap-2.5 rounded-xl border border-border px-3.5 py-2.5 text-[0.88rem] text-foreground/90"
            >
              <span className="mt-0.5 text-rose" aria-hidden>
                ✕
              </span>
              {n}
            </li>
          ))}
        </ul>

        {COPY.antiAi.closing.map((p, i) => (
          <p
            key={i}
            className={
              i === COPY.antiAi.closing.length - 1
                ? "mt-5 text-center font-display text-lg italic text-foreground"
                : "mt-5 text-[0.95rem] leading-relaxed text-muted-foreground"
            }
          >
            {p}
          </p>
        ))}
      </div>
    </Section>
  );
}

/* ---------------- TESTIMONIOS ---------------- */

function Testimonies() {
  return (
    <Section id="testimonios">
      <Pill>{COPY.testimonials.eyebrow}</Pill>
      <Title>{COPY.testimonials.title}</Title>
      <Text className="text-center">{COPY.testimonials.lead}</Text>

      <div className="mt-6">
        <Testimonials items={COPY.testimonials.items} dragHint={COPY.testimonials.dragHint} />
      </div>

      <p className="mt-5 text-center font-display text-lg text-foreground">
        <span className="text-gold">✦</span> {COPY.testimonials.counter}
      </p>

      <div className="mt-5">
        <GoldButton to="/form">{COPY.testimonials.cta}</GoldButton>
      </div>

      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.12em] text-muted-foreground/60">
        {COPY.testimonials.note}
      </p>
    </Section>
  );
}

/* ---------------- VERDAD DURA ---------------- */

function HardTruth() {
  return (
    <Section id="verdad">
      <Pill>{COPY.hardTruth.eyebrow}</Pill>
      <Title>{COPY.hardTruth.title}</Title>

      {COPY.hardTruth.paragraphs.map((p, i) => (
        <p key={i} className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">
          {p}
        </p>
      ))}

      <p className="mt-6 text-center font-display text-xl italic text-foreground">
        {COPY.hardTruth.highlight}
      </p>
    </Section>
  );
}

/* ---------------- OFERTA ---------------- */

function Offer({ country }: { country: CountryOffer }) {
  return (
    <Section id="oferta">
      <Pill>{COPY.offer.eyebrow}</Pill>
      <Title>{COPY.offer.title}</Title>

      {/* Ancoragem de preço fica FORA do quadro de compra: ela contextualiza,
          o quadro decide. Misturar as duas coisas diluía o bloco. */}
      <p className="mt-5 text-[0.92rem] leading-relaxed text-muted-foreground">
        {COPY.offer.anchorText.replace("{anchor}", country.anchor)}
      </p>

      {/* O que ela leva — painel discreto, só inventário */}
      <div className="panel mt-7 p-6">
        <h3 className="text-center font-display text-xl text-foreground">
          {COPY.offer.includesTitle}
        </h3>

        <ul className="mt-4 grid gap-2.5 text-left">
          {COPY.offer.includes.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[0.9rem] text-foreground/90">
              <span className="mt-0.5 shrink-0 text-gold" aria-hidden>
                ✦
              </span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* O postal É o bloco de compra: cadeado, texto, preço e botão juntos.
          Comprar deixa de ser "pagar" e vira "destravar a carta". */}
      <LockedCard
        className="mt-6"
        eyebrow={COPY.offer.lockedCard.eyebrow}
        label={COPY.offer.lockedCard.label}
        text={COPY.offer.lockedCard.text}
        from={country.from}
        price={country.price}
        paymentNote={COPY.offer.paymentNote}
        cta={COPY.offer.cta}
        ctaSub={COPY.offer.ctaSub}
      />

      <p className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
        <span className="text-gold">
          <Glyph name="shield" className="h-3.5 w-3.5" />
        </span>
        {COPY.offer.guaranteeStrip}
      </p>

      {/* Meios de pagamento locais — na LATAM é o que destrava quem não tem cartão internacional */}
      <div className="mt-5 rounded-xl border border-border px-4 py-3 text-center">
        <p className="text-[10px] uppercase tracking-[0.16em] text-gold/70">
          {COPY.offer.paymentsLabel}
        </p>
        <p className="mt-1.5 text-[0.82rem] leading-relaxed text-foreground/90">
          {COPY.offer.paymentsText.replace("{payments}", paymentsFor(country.code))}
        </p>
      </div>
    </Section>
  );
}

/* ---------------- DOS FUTUROS ---------------- */

function Futures() {
  return (
    <Section id="caminos">
      <Pill>{COPY.futures.eyebrow}</Pill>
      <Title>{COPY.futures.title}</Title>
      <Text className="text-center">{COPY.futures.lead}</Text>

      <div className="mt-6 grid gap-3">
        <article className="panel border-gold/35 p-5">
          <h3 className="flex items-center gap-2 font-display text-lg text-gold">
            <Glyph name="sun" className="h-5 w-5" /> {COPY.futures.good.label}
          </h3>
          <ul className="mt-3 grid gap-2.5">
            {COPY.futures.good.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-foreground/90"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="panel border-rose/25 p-5">
          <h3 className="flex items-center gap-2 font-display text-lg text-rose">
            <Glyph name="hourglass" className="h-5 w-5" /> {COPY.futures.bad.label}
          </h3>
          <ul className="mt-3 grid gap-2.5">
            {COPY.futures.bad.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-[0.9rem] leading-relaxed text-muted-foreground"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose/70" />
                {item}
              </li>
            ))}
          </ul>
        </article>
      </div>

      <p className="mt-6 text-center font-display text-xl italic text-foreground">
        {COPY.futures.closing}
      </p>
    </Section>
  );
}

/* ---------------- GARANTÍA ---------------- */

function Guarantee() {
  return (
    <Section id="garantia">
      <Pill>{COPY.guarantee.eyebrow}</Pill>

      <div className="panel mt-4 p-6 text-center">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 text-gold">
          <Glyph name="shield" className="h-9 w-9" />
        </span>
        <p className="mt-3 text-[13px] font-semibold text-rose">{COPY.guarantee.badge}</p>
        <h2 className="mt-1 font-display text-2xl text-foreground">{COPY.guarantee.title}</h2>

        {COPY.guarantee.paragraphs.map((p, i) => (
          <p
            key={i}
            className="mt-4 text-left text-[0.92rem] leading-relaxed text-muted-foreground"
          >
            {p}
          </p>
        ))}

        <p className="mt-5 font-display text-xl italic text-gold">{COPY.guarantee.highlight}</p>

        <p className="mt-5 font-display text-lg italic text-muted-foreground">
          {COPY.guarantee.signature}
        </p>
        <p className="text-[10px] uppercase tracking-[0.22em] text-gold/60">{COPY.brand.role}</p>

        <div className="mt-6">
          <GoldButton to="/form" sublabel={COPY.guarantee.ctaSub}>
            {COPY.guarantee.cta}
          </GoldButton>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- ESCASEZ ---------------- */

function Scarcity() {
  return (
    <Section id="cupos">
      <Pill>{COPY.scarcity.eyebrow}</Pill>
      <Title>{COPY.scarcity.title}</Title>

      <div className="panel mt-6 border-rose/35 p-6">
        <div className="flex flex-col items-center gap-5">
          <SlotsMeter label={COPY.scarcity.slotsLabel} />
          <Countdown label={COPY.scarcity.timerLabel} />
        </div>

        <p className="mt-5 text-[0.92rem] leading-relaxed text-muted-foreground">
          {COPY.scarcity.text}
        </p>

        <div className="mt-6">
          <GoldButton to="/form">{COPY.offer.cta}</GoldButton>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */

function Faq() {
  return (
    <Section id="preguntas">
      <Pill>{COPY.faq.eyebrow}</Pill>
      <Title>{COPY.faq.title}</Title>

      <Accordion type="single" collapsible className="mt-6 grid gap-2.5">
        {COPY.faq.items.map((item, i) => (
          <AccordionItem
            key={item.q}
            value={`item-${i}`}
            className="panel overflow-hidden px-4 data-[state=open]:border-gold/40"
          >
            <AccordionTrigger className="py-4 text-left font-display text-base leading-snug text-foreground hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-4 text-[0.88rem] leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  );
}

/* ---------------- CIERRE ---------------- */

function FinalCta() {
  return (
    <Section id="final">
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center text-gold">
          <Glyph name="moon" className="h-8 w-8" />
        </span>
        <Title className="mt-4">{COPY.finalCta.title}</Title>
        <Text className="text-center">{COPY.finalCta.text}</Text>

        <div className="mt-6">
          <GoldButton to="/form" sublabel={COPY.finalCta.sub}>
            {COPY.finalCta.cta}
          </GoldButton>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- FOOTER ---------------- */

function Footer() {
  return (
    <footer className="mt-4 border-t border-border px-[18px] py-10">
      <div className="mx-auto max-w-[620px] text-center">
        <p className="font-display text-xl text-gold">{COPY.brand.name}</p>

        <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {COPY.footer.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[12px] text-muted-foreground transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <p className="mx-auto mt-6 max-w-[480px] text-[11px] leading-relaxed text-muted-foreground/70">
          {COPY.footer.disclaimer}
        </p>
        <p className="mt-3 text-[11px] text-muted-foreground/50">{COPY.footer.rights}</p>
      </div>
    </footer>
  );
}
