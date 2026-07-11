import { cn } from "@/lib/utils";

/**
 * Brand badge for a payment method. Renders a small pill with the
 * brand name in the brand's official colorway (text + bg tint).
 *
 * Brand colors used here are the official card-network colors, NOT
 * the project's primary teal/navy token — they are decorative only.
 */
const BRAND_STYLE: Record<string, { label: string; className: string }> = {
  visa: {
    label: "VISA",
    className: "bg-[#1a1f71] text-white",
  },
  mastercard: {
    label: "Mastercard",
    className: "bg-[#eb001b] text-white",
  },
  amex: {
    label: "AMEX",
    className: "bg-[#006fcf] text-white",
  },
  discover: {
    label: "Discover",
    className: "bg-[#ff6000] text-white",
  },
};

export function CardBrandBadge({
  brand,
  className,
}: {
  brand: string;
  className?: string;
}) {
  const key = (brand || "").toLowerCase();
  const meta = BRAND_STYLE[key] ?? {
    label: brand || "Card",
    className: "bg-navy text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-bold uppercase tracking-wide",
        meta.className,
        className
      )}
    >
      <CardBrandIcon brand={key} className="size-3.5" />
      {meta.label}
    </span>
  );
}

/** Minimal inline SVG-ish mark for each card network. */
function CardBrandIcon({ brand, className }: { brand: string; className?: string }) {
  switch (brand) {
    case "visa":
      return (
        <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
          <text
            x="12"
            y="13"
            textAnchor="middle"
            fontSize="13"
            fontWeight="800"
            fontStyle="italic"
            fill="currentColor"
          >
            V
          </text>
        </svg>
      );
    case "mastercard":
      return (
        <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
          <circle cx="9" cy="8" r="6" fill="#f79e1b" opacity="0.95" />
          <circle cx="15" cy="8" r="6" fill="#eb001b" opacity="0.85" />
        </svg>
      );
    case "amex":
      return (
        <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
          <text
            x="12"
            y="12"
            textAnchor="middle"
            fontSize="9"
            fontWeight="800"
            fill="currentColor"
          >
            AMEX
          </text>
        </svg>
      );
    case "discover":
      return (
        <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
          <circle cx="17" cy="8" r="5" fill="#ff6000" opacity="0.9" />
          <text
            x="8"
            y="12"
            textAnchor="middle"
            fontSize="7"
            fontWeight="800"
            fill="currentColor"
          >
            DSC
          </text>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 16" className={className} aria-hidden="true">
          <rect
            x="2"
            y="3"
            width="20"
            height="10"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      );
  }
}
