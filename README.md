# Carta Canalizada — LATAM (español)

Página de vendas da **Carta Canalizada** (leitura de tarot personalizada, entregue em até 60 min),
adaptada do original em português para o público hispanohablante da América Latina.

Stack: TanStack Start + React 19 + Tailwind v4 + shadcn/ui.
Sem imagens externas — cartas, ícones e céu estrelado são SVG e CSS.

**Live app**: https://tucartadeltarot.lovable.app

## Onde editar cada coisa

| Quero mudar…                                  | Arquivo                                       |
| --------------------------------------------- | --------------------------------------------- |
| **Qualquer texto** da página ou do formulário | `src/data/copy.ts`                            |
| Preço, moeda, país, link do checkout          | `src/data/offer.ts`                           |
| WhatsApp que recebe os pedidos                | `src/data/offer.ts` → `ORDER_WHATSAPP`        |
| Cores, fontes, sombras, animações             | `src/styles.css`                              |
| Ordem/estrutura das seções                    | `src/routes/index.tsx` (componente `Landing`) |
| Passos do formulário                          | `src/routes/form.tsx`                         |

> Todo o texto visível fica em `src/data/copy.ts`. Nenhuma frase está solta dentro dos
> componentes — dá pra revisar a copy inteira lendo um arquivo só.

## Preço por país

`src/data/offer.ts` tem a tabela em moeda local (MXN, COP, PEN, CLP, USD, EUR).
O país é detectado pelo **fuso horário do navegador** (sem API externa, sem custo) e a
visitante pode trocar manualmente no último passo do formulário.

## Checkout

Enquanto a plataforma de pagamento não estiver criada, o botão final envia o pedido
**pelo WhatsApp** já preenchido (nome, sobre quem é, situação, pergunta, contato e país).
Quando o checkout (Hotmart / Mercado Pago) existir, é só colocar a URL no campo
`checkout` de cada país em `src/data/offer.ts`.

## Rodar localmente

```sh
bun install
bun run dev      # http://localhost:8080
bun run build    # build de produção
bun run format   # prettier
```

## Lovable

Continue no [editor da Lovable](https://lovable.dev/projects/46ee7a40-d235-444a-9ebc-45983c2ac3eb).
Todo commit enviado pra `main` neste repositório sincroniza de volta pra Lovable, e vice-versa.
