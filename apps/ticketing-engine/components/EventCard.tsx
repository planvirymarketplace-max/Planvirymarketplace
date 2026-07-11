import Link from "next/link";
import { formatDay, formatMonth, formatPrice, type EventItem } from "@/lib/events-data";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link href={`/events/${event.id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-surface">
        <img
          src={event.image}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
        <div className="absolute top-4 left-4 flex flex-col items-center bg-background/80 backdrop-blur-md rounded-md px-3 py-2 min-w-[52px]">
          <span className="text-[10px] tracking-[0.15em] text-copper font-mono">
            {formatMonth(event.date)}
          </span>
          <span className="font-display text-2xl leading-none mt-0.5">{formatDay(event.date)}</span>
        </div>
        <div className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.15em] text-ivory/70 font-mono">
          {event.source}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-mono mb-2">
            {event.subcategory}
          </p>
          <h3 className="font-display text-2xl leading-tight text-ivory group-hover:text-copper-soft transition-colors">
            {event.title}
          </h3>
          <div className="mt-3 flex items-center justify-between text-sm text-foreground/80">
            <span className="truncate">
              {event.venue} · {event.city}
            </span>
            <span className="font-mono text-copper-soft shrink-0 pl-3">
              from {formatPrice(event.priceFrom)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
