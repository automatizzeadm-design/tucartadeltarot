/**
 * Preço, moeda e checkout por país da LATAM.
 * A detecção é feita pelo fuso horário do navegador (sem API externa, sem custo,
 * funciona offline). O visitante também pode trocar o país manualmente no formulário.
 *
 * Para ajustar preço, é só mexer aqui — a página inteira lê deste arquivo.
 */

export type CountryCode =
  | "MX"
  | "CO"
  | "PE"
  | "CL"
  | "AR"
  | "EC"
  | "UY"
  | "PY"
  | "BO"
  | "VE"
  | "CR"
  | "PA"
  | "GT"
  | "DO"
  | "US"
  | "ES"
  | "INT";

export type CountryOffer = {
  code: CountryCode;
  name: string;
  flag: string;
  dial: string;
  currency: string;
  /** Preço da consulta 1:1 usado como ancoragem */
  anchor: string;
  /** Preço "de" (riscado) */
  from: string;
  /** Preço "por" (o que ela paga) */
  price: string;
  /** URL do checkout — trocar quando a plataforma de pagamento estiver criada */
  checkout: string;
};

/**
 * Enquanto a plataforma de pagamento (Hotmart / Mercado Pago) não estiver criada,
 * o pedido cai direto no WhatsApp com todos os dados preenchidos.
 * Troque pelo número que vai receber os pedidos (só dígitos, com código do país).
 */
export const ORDER_WHATSAPP = "5511999999999";

const CHECKOUT_PLACEHOLDER = "#pedido";

export const COUNTRIES: CountryOffer[] = [
  {
    code: "MX",
    name: "México",
    flag: "🇲🇽",
    dial: "+52",
    currency: "MXN",
    anchor: "$1.290 MXN",
    from: "$369 MXN",
    price: "$189 MXN",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "CO",
    name: "Colombia",
    flag: "🇨🇴",
    dial: "+57",
    currency: "COP",
    anchor: "$280.000 COP",
    from: "$99.000 COP",
    price: "$39.900 COP",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "PE",
    name: "Perú",
    flag: "🇵🇪",
    dial: "+51",
    currency: "PEN",
    anchor: "S/ 260",
    from: "S/ 99",
    price: "S/ 39",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "CL",
    name: "Chile",
    flag: "🇨🇱",
    dial: "+56",
    currency: "CLP",
    anchor: "$64.000 CLP",
    from: "$24.900 CLP",
    price: "$8.900 CLP",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "AR",
    name: "Argentina",
    flag: "🇦🇷",
    dial: "+54",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "EC",
    name: "Ecuador",
    flag: "🇪🇨",
    dial: "+593",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "UY",
    name: "Uruguay",
    flag: "🇺🇾",
    dial: "+598",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "PY",
    name: "Paraguay",
    flag: "🇵🇾",
    dial: "+595",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "BO",
    name: "Bolivia",
    flag: "🇧🇴",
    dial: "+591",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "VE",
    name: "Venezuela",
    flag: "🇻🇪",
    dial: "+58",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "CR",
    name: "Costa Rica",
    flag: "🇨🇷",
    dial: "+506",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "PA",
    name: "Panamá",
    flag: "🇵🇦",
    dial: "+507",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "GT",
    name: "Guatemala",
    flag: "🇬🇹",
    dial: "+502",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "DO",
    name: "Rep. Dominicana",
    flag: "🇩🇴",
    dial: "+1",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "US",
    name: "Estados Unidos",
    flag: "🇺🇸",
    dial: "+1",
    currency: "USD",
    anchor: "US$ 120",
    from: "US$ 47",
    price: "US$ 17",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "ES",
    name: "España",
    flag: "🇪🇸",
    dial: "+34",
    currency: "EUR",
    anchor: "€ 89",
    from: "€ 34",
    price: "€ 12",
    checkout: CHECKOUT_PLACEHOLDER,
  },
  {
    code: "INT",
    name: "Otro país",
    flag: "🌎",
    dial: "+",
    currency: "USD",
    anchor: "US$ 68",
    from: "US$ 24",
    price: "US$ 8,90",
    checkout: CHECKOUT_PLACEHOLDER,
  },
];

export const DEFAULT_COUNTRY: CountryOffer = COUNTRIES[0]!;

/** Fuso horário do navegador → país. Cobre as capitais/zonas mais usadas da LATAM. */
const TIMEZONE_MAP: Record<string, CountryCode> = {
  "America/Mexico_City": "MX",
  "America/Monterrey": "MX",
  "America/Tijuana": "MX",
  "America/Cancun": "MX",
  "America/Merida": "MX",
  "America/Chihuahua": "MX",
  "America/Hermosillo": "MX",
  "America/Mazatlan": "MX",
  "America/Bogota": "CO",
  "America/Lima": "PE",
  "America/Santiago": "CL",
  "Pacific/Easter": "CL",
  "America/Argentina/Buenos_Aires": "AR",
  "America/Argentina/Cordoba": "AR",
  "America/Argentina/Mendoza": "AR",
  "America/Argentina/Salta": "AR",
  "America/Argentina/Tucuman": "AR",
  "America/Buenos_Aires": "AR",
  "America/Guayaquil": "EC",
  "Pacific/Galapagos": "EC",
  "America/Montevideo": "UY",
  "America/Asuncion": "PY",
  "America/La_Paz": "BO",
  "America/Caracas": "VE",
  "America/Costa_Rica": "CR",
  "America/Panama": "PA",
  "America/Guatemala": "GT",
  "America/Santo_Domingo": "DO",
  "America/New_York": "US",
  "America/Chicago": "US",
  "America/Denver": "US",
  "America/Los_Angeles": "US",
  "America/Phoenix": "US",
  "America/Miami": "US",
  "Europe/Madrid": "ES",
};

export function detectCountry(): CountryOffer {
  if (typeof window === "undefined") return DEFAULT_COUNTRY;
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const code = TIMEZONE_MAP[tz];
    if (code) return COUNTRIES.find((c) => c.code === code) ?? DEFAULT_COUNTRY;
    // Fallback pelo idioma do navegador (ex.: es-MX, es-CO)
    const lang = navigator.language || "";
    const region = lang.split("-")[1]?.toUpperCase();
    if (region) {
      const byRegion = COUNTRIES.find((c) => c.code === region);
      if (byRegion) return byRegion;
    }
  } catch {
    /* segue com o padrão */
  }
  return DEFAULT_COUNTRY;
}

export function countryByCode(code: string | null | undefined): CountryOffer {
  return COUNTRIES.find((c) => c.code === code) ?? DEFAULT_COUNTRY;
}

/** Vagas do dia — número estável por data (não "reseta" a cada refresh da página). */
export function slotsLeftToday(min = 4, max = 9) {
  const now = new Date();
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const pseudo = (seed * 9301 + 49297) % 233280;
  const base = min + Math.floor((pseudo / 233280) * (max - min + 1));
  // Diminui conforme o dia avança: de manhã tem mais cupos, à noite tem menos.
  const hourPenalty = Math.floor(now.getHours() / 6);
  return Math.max(2, base - hourPenalty);
}
