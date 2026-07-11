import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const PRIORITY_STYLES: Record<string, string> = {
  Urgent: "border-transparent bg-rose-100 text-rose-700",
  High: "border-transparent bg-amber-100 text-amber-700",
  Normal: "border-transparent bg-teal/15 text-teal",
  Low: "border-transparent bg-muted text-muted-foreground",
};

export function PriorityBadge({
  priority,
  className,
}: {
  priority: string;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-full px-2 py-0.5 text-[11px] font-semibold capitalize",
        PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.Normal,
        className
      )}
    >
      {priority}
    </Badge>
  );
}
