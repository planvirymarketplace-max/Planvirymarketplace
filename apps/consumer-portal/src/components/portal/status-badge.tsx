import { cn } from "@/lib/utils";
import { STATUS_LABEL } from "@/lib/constants";

const STATUS_CLASS: Record<string, string> = {
  planning: "status-planning",
  confirmed: "status-confirmed",
  active: "status-active",
  completed: "status-completed",
  complete: "status-complete",
  cancelled: "status-cancelled",
  pending: "status-pending",
  draft: "status-draft",
  paid: "status-paid",
  refunded: "status-refunded",
  failed: "status-failed",
  open: "status-open",
  inprogress: "status-inprogress",
  resolved: "status-resolved",
  closed: "status-closed",
};

export function StatusBadge({
  status,
  className,
}: {
  status: string;
  className?: string;
}) {
  const key = (status || "").toLowerCase().replace(/\s+/g, "");
  const cls = STATUS_CLASS[key] ?? "status-draft";
  const label = STATUS_LABEL[status] ?? status;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
        cls,
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {label}
    </span>
  );
}
