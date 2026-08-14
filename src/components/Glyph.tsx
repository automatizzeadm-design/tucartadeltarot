/**
 * Ícones de traço dourado desenhados em SVG (nada de imagem externa).
 * Estética de gravura antiga de tarot: linha fina, simetria, símbolos.
 */

type GlyphName =
  | "eye"
  | "heart"
  | "hourglass"
  | "letter"
  | "orb"
  | "moon"
  | "sun"
  | "star"
  | "key"
  | "hand"
  | "shield"
  | "chalice";

export function Glyph({ name, className = "h-7 w-7" }: { name: GlyphName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 48 48",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "eye":
      return (
        <svg {...common}>
          <path d="M4 24s7.5-11 20-11 20 11 20 11-7.5 11-20 11S4 24 4 24Z" />
          <circle cx="24" cy="24" r="5.5" />
          <circle cx="24" cy="24" r="1.6" fill="currentColor" stroke="none" />
          <path d="M24 6v3M24 39v3M9 12l2 2M37 12l-2 2" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M24 40S8 30.5 8 19.8C8 14.4 12.1 10 17.2 10c3 0 5.6 1.5 6.8 3.8C25.2 11.5 27.8 10 30.8 10 35.9 10 40 14.4 40 19.8 40 30.5 24 40 24 40Z" />
          <path d="M24 19.5v10M20 24h8" opacity="0.5" />
        </svg>
      );
    case "hourglass":
      return (
        <svg {...common}>
          <path d="M14 6h20M14 42h20" />
          <path d="M16 6c0 8 8 12 8 18s-8 10-8 18M32 6c0 8-8 12-8 18s8 10 8 18" />
          <path d="M19 14h10" opacity="0.6" />
          <circle cx="24" cy="24" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "letter":
      return (
        <svg {...common}>
          <rect x="6" y="12" width="36" height="24" rx="3" />
          <path d="m6.5 14 16.2 11.4a2.3 2.3 0 0 0 2.6 0L41.5 14" />
          <path d="M24 30v6M21 33h6" opacity="0.55" />
        </svg>
      );
    case "orb":
      return (
        <svg {...common}>
          <circle cx="24" cy="21" r="12" />
          <path d="M14 33c2 3 5.5 5 10 5s8-2 10-5" />
          <path d="M12 39h24M16 42h16" />
          <path d="M18 17c1.5-3 4-4.5 7-4.5" opacity="0.65" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M31 6a18 18 0 1 0 11 32A20 20 0 0 1 31 6Z" />
          <path d="M36 12l1.2 3.2L40.5 16l-3.3 1.2L36 20l-1.2-2.8L31.5 16l3.3-.8Z" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="24" cy="24" r="9" />
          <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M38 10l-4 4M14 34l-4 4" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="m24 5 4.8 12.9L42 22l-13.2 4.1L24 39l-4.8-12.9L6 22l13.2-4.1Z" />
        </svg>
      );
    case "key":
      return (
        <svg {...common}>
          <circle cx="17" cy="17" r="8" />
          <path d="m22.8 22.8 16 16M33 33l4-4M28 28l3-3" />
        </svg>
      );
    case "hand":
      return (
        <svg {...common}>
          <path d="M16 26V12a3 3 0 0 1 6 0v10M22 22V9a3 3 0 0 1 6 0v13M28 22v-8a3 3 0 0 1 6 0v16c0 6-4.5 11-11 11s-11-4-11-10c0-3 1-5 1-5" />
          <circle cx="24" cy="30" r="2.4" opacity="0.7" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M24 5 8 11v13c0 10 7 16.5 16 19 9-2.5 16-9 16-19V11Z" />
          <path d="m17 24 5 5 10-10" />
        </svg>
      );
    case "chalice":
      return (
        <svg {...common}>
          <path d="M13 8h22l-2 10a9 9 0 0 1-18 0Z" />
          <path d="M24 27v11M16 40h16" />
        </svg>
      );
    default:
      return null;
  }
}

/** Ornamento divisório entre seções — losango com traços laterais. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-primary/50 ${className}`}
      aria-hidden
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary/40 sm:w-28" />
      <svg
        viewBox="0 0 24 24"
        className="h-3.5 w-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      >
        <path d="M12 2 22 12 12 22 2 12Z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary/40 sm:w-28" />
    </div>
  );
}
