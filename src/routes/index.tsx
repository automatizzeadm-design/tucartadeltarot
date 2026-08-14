import { createFileRoute } from "@tanstack/react-router";
import { Moon, Feather, Heart, Clock, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CardRitual } from "@/components/CardRitual";
import heroImage from "@/assets/hero-tarot.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Carta Canalizada — Tarot, mensagens e leituras" },
      {
        name: "description",
        content:
          "Puxe sua carta canalizada gratuita e agende leituras de tarot com escuta acolhedora e mensagens claras.",
      },
      { property: "og:title", content: "Carta Canalizada — Tarot, mensagens e leituras" },
      {
        property: "og:description",
        content: "Puxe sua carta canalizada gratuita e agende uma leitura de tarot.",
      },
    ],
  }),
  component: Index,
});

const STEPS = [
  {
    icon: Moon,
    title: "Você silencia",
    text: "Uma pergunta por vez. Sem pressa, sem plateia, sem precisar explicar nada.",
  },
  {
    icon: Feather,
    title: "A carta se apresenta",
    text: "O baralho responde ao que está vivo agora — não ao que você planejou perguntar.",
  },
  {
    icon: Heart,
    title: "A mensagem é traduzida",
    text: "Nada de profecia assustadora. Linguagem simples, direção prática e acolhimento.",
  },
];

const READINGS = [
  {
    name: "Carta do dia",
    price: "Gratuita",
    time: "1 minuto",
    items: ["Uma carta canalizada", "Mensagem e orientação", "Sem cadastro"],
    highlight: false,
  },
  {
    name: "Leitura canalizada",
    price: "R$ 180",
    time: "50 minutos",
    items: ["Tiragem de 5 cartas", "Chamada ao vivo", "Áudio-resumo depois", "Ritual sugerido"],
    highlight: true,
  },
  {
    name: "Mapa do ciclo",
    price: "R$ 320",
    time: "3 encontros",
    items: ["Leitura trimestral", "Acompanhamento por mensagem", "Cartas de trânsito", "Diário guiado"],
    highlight: false,
  },
];

const FAQ = [
  {
    q: "O tarot prevê o futuro?",
    a: "Não como profecia. O tarot mostra as forças em jogo agora e as escolhas disponíveis. O futuro continua sendo seu.",
  },
  {
    q: "Posso perguntar sobre outra pessoa?",
    a: "Trabalhamos sempre a partir do seu ponto de vista. Podemos olhar a relação, nunca invadir a intimidade de terceiros.",
  },
  {
    q: "E se vier uma carta difícil?",
    a: "Cartas como a Torre ou a Lua não são castigo. Elas nomeiam o que já dói e apontam o caminho de saída.",
  },
  {
    q: "Como é feita a leitura online?",
    a: "Por videochamada, com as cartas abertas na sua frente. Você recebe as fotos da tiragem e um áudio-resumo depois.",
  },
];

function Index() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-[family-name:var(--font-display)] text-xl tracking-wide text-gradient-gold">
          Carta Canalizada
        </span>
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground md:flex">
          <a href="#ritual" className="transition-colors hover:text-primary">Ritual</a>
          <a href="#leituras" className="transition-colors hover:text-primary">Leituras</a>
          <a href="#duvidas" className="transition-colors hover:text-primary">Dúvidas</a>
        </nav>
        <Button variant="veil" size="sm" asChild>
          <a href="#leituras">Agendar</a>
        </Button>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <img
            src={heroImage}
            alt="Altar de tarot com cartas douradas, velas e fases da lua"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,var(--veil))]" />
          <div className="relative mx-auto max-w-3xl px-6 py-28 text-center md:py-40">
            <p className="eyebrow">Tarot · Mensagens do invisível</p>
            <h1 className="mt-6 text-5xl leading-[1.05] md:text-7xl">
              A carta que <span className="text-gradient-gold italic">chega até você</span> quando
              as palavras faltam
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Leituras canalizadas para quem quer clareza, não medo. Comece puxando sua carta do
              dia — de graça, agora.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button variant="ritual" size="xl" asChild>
                <a href="#ritual">Puxar minha carta</a>
              </Button>
              <Button variant="veil" size="xl" asChild>
                <a href="#leituras">Ver leituras</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Ritual */}
        <section id="ritual" className="mx-auto max-w-6xl px-6 py-24">
          <CardRitual />
        </section>

        {/* Como funciona */}
        <section className="border-y border-border/60 bg-secondary/20 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="eyebrow text-center">Como funciona</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-center text-4xl md:text-5xl">
              Três passos, nenhum susto
            </h2>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {STEPS.map((step) => (
                <div key={step.title} className="surface-ritual rounded-lg p-8">
                  <step.icon className="size-6 text-primary" />
                  <h3 className="mt-5 text-2xl">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leituras */}
        <section id="leituras" className="mx-auto max-w-6xl px-6 py-24">
          <p className="eyebrow text-center">Leituras</p>
          <h2 className="mt-4 text-center text-4xl md:text-5xl">Escolha a profundidade</h2>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {READINGS.map((r) => (
              <div
                key={r.name}
                className={`flex flex-col rounded-lg p-8 ${
                  r.highlight
                    ? "surface-ritual ring-1 ring-primary/40"
                    : "border border-border/60 bg-card/40"
                }`}
              >
                {r.highlight && <p className="eyebrow mb-4">Mais escolhida</p>}
                <h3 className="text-3xl">{r.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <Clock className="size-3" /> {r.time}
                </p>
                <p className="mt-6 text-4xl text-gradient-gold">{r.price}</p>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-muted-foreground">
                  {r.items.map((i) => (
                    <li key={i} className="flex gap-3">
                      <Star className="mt-0.5 size-3.5 shrink-0 text-primary" />
                      {i}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={r.highlight ? "ritual" : "veil"}
                  size="lg"
                  className="mt-8"
                  asChild
                >
                  <a href="#ritual">{r.price === "Gratuita" ? "Puxar agora" : "Agendar"}</a>
                </Button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="duvidas" className="mx-auto max-w-3xl px-6 pb-28">
          <p className="eyebrow text-center">Dúvidas</p>
          <h2 className="mt-4 text-center text-4xl md:text-5xl">Antes de puxar</h2>
          <Accordion type="single" collapsible className="mt-12">
            {FAQ.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-border/60">
                <AccordionTrigger className="text-left font-[family-name:var(--font-display)] text-xl">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </main>

      <footer className="border-t border-border/60 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
          <span className="font-[family-name:var(--font-display)] text-lg text-gradient-gold">
            Carta Canalizada
          </span>
          <p className="text-xs text-muted-foreground">
            Conteúdo de autoconhecimento. Não substitui acompanhamento médico ou psicológico.
          </p>
        </div>
      </footer>
    </div>
  );
}
