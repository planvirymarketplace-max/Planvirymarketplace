import { cn } from "@/lib/utils";

export function Logo({
  className,
  showText = true,
  variant = "default",
}: {
  className?: string;
  showText?: boolean;
  /** "default" = navy text on light; "light" = white text for dark backgrounds */
  variant?: "default" | "light";
}) {
  const textColor = variant === "light" ? "text-white" : "text-navy";
  const subColor =
    variant === "light" ? "text-white/60" : "text-muted-foreground";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 text-white shadow-sm">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-5"
        >
          {/* Stylized "P" compass mark for Planviry */}
          <path d="M12 2a10 10 0 1 0 10 10" />
          <path d="M12 7v10M12 7h4a3 3 0 0 1 0 6h-4" />
          <circle cx="12" cy="12" r="1.5" className="fill-current" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-display text-lg font-700 tracking-tight", textColor)}>
            Planviry
          </span>
          <span className={cn("text-[10px] font-medium uppercase tracking-[0.12em]", subColor)}>
            Guest Portal
          </span>
        </div>
      )}
    </div>
  );
}
