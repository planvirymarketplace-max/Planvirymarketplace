import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function StarRating({
  value = 0,
  max = 5,
  size = "md",
  className,
  onChange,
}: {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
  onChange?: (v: number) => void;
}) {
  const sz = size === "sm" ? "size-3.5" : size === "lg" ? "size-7" : "size-5";
  const interactive = !!onChange;
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < Math.round(value);
        const Comp = interactive ? "button" : "span";
        return (
          <Comp
            key={i}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onChange?.(i + 1) : undefined}
            className={cn(
              "text-amber-400 transition-colors",
              interactive && "cursor-pointer hover:scale-110",
              !filled && "text-border"
            )}
            aria-label={`${i + 1} star`}
          >
            <Star className={cn(sz, filled && "fill-current")} />
          </Comp>
        );
      })}
    </div>
  );
}
