"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Pencil, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Inline-editable itinerary title. Click (or press the pencil) to switch
 * into an input; Enter / blur / check commits via PATCH, Escape cancels.
 */
export function InlineEditTitle({
  itineraryId,
  initialTitle,
  className,
}: {
  itineraryId: string;
  initialTitle: string;
  className?: string;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(initialTitle);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep local value in sync if the server renders a new title.
  useEffect(() => {
    if (!editing) setValue(initialTitle);
  }, [initialTitle, editing]);

  useEffect(() => {
    if (editing) {
      // Focus + select-all on entering edit mode.
      const t = setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
      return () => clearTimeout(t);
    }
  }, [editing]);

  async function commit() {
    const next = value.trim();
    if (!next || next === initialTitle) {
      setValue(initialTitle);
      setEditing(false);
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/itineraries/${itineraryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: next }),
      });
      if (!res.ok) throw new Error("Failed to update title");
      toast.success("Itinerary renamed");
      router.refresh();
      setEditing(false);
    } catch {
      toast.error("Could not save title");
      setValue(initialTitle);
    } finally {
      setSaving(false);
    }
  }

  function cancel() {
    setValue(initialTitle);
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1.5">
        <Input
          ref={inputRef}
          value={value}
          disabled={saving}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
            } else if (e.key === "Escape") {
              e.preventDefault();
              cancel();
            }
          }}
          onBlur={commit}
          className={cn("h-8", className)}
        />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="size-8 text-teal"
          disabled={saving}
          onClick={commit}
          aria-label="Save title"
        >
          <Check className="size-4" />
        </Button>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          className="size-8 text-muted-foreground"
          disabled={saving}
          onClick={cancel}
          aria-label="Cancel edit"
        >
          <X className="size-4" />
        </Button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className={cn(
        "group/title flex w-full items-center gap-1.5 text-left font-display text-lg font-600 leading-tight text-navy hover:text-teal",
        className
      )}
      title="Click to rename"
    >
      <span className="line-clamp-2">{initialTitle}</span>
      <Pencil className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover/title:opacity-100" />
    </button>
  );
}
