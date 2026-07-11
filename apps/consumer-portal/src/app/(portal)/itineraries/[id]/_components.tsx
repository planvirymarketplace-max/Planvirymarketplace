"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  AlertTriangle,
  Copy,
  Check,
  Share2,
  Plus,
  Trash2,
  Loader2,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { StatusBadge } from "@/components/portal/status-badge";
import { VerticalBadge, VerticalBar } from "@/components/portal/vertical";
import { VERTICALS, type Vertical } from "@/lib/constants";

/* ------------------------------------------------------------------ */
/* Share dialog                                                        */
/* ------------------------------------------------------------------ */

export function ShareDialog({
  itineraryId,
  initialAllowEdit,
}: {
  itineraryId: string;
  initialAllowEdit: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [allowEdit, setAllowEdit] = useState(initialAllowEdit);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://concierge.app/itineraries/${itineraryId}`;

  async function toggleAllowEdit(next: boolean) {
    setAllowEdit(next);
    setSaving(true);
    try {
      const res = await fetch(`/api/itineraries/${itineraryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allowEdit: next }),
      });
      if (!res.ok) throw new Error("Failed to update sharing");
      toast.success(next ? "Collaborators can edit" : "View-only access");
      router.refresh();
    } catch {
      toast.error("Could not update sharing");
      setAllowEdit(!next);
    } finally {
      setSaving(false);
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy link");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="size-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-navy">
            Share this itinerary
          </DialogTitle>
          <DialogDescription>
            Anyone with this link can {allowEdit ? "edit" : "view"} the trip.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="share-link">Shareable link</Label>
            <div className="flex gap-2">
              <Input
                id="share-link"
                readOnly
                value={shareUrl}
                className="font-mono text-xs"
                onFocus={(e) => e.target.select()}
              />
              <Button
                type="button"
                size="icon"
                onClick={copyLink}
                className="bg-teal text-white hover:bg-teal/90"
                aria-label="Copy link"
              >
                {copied ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-border bg-muted/40 p-3">
            <div className="pr-3">
              <p className="text-sm font-semibold text-navy">Allow editing</p>
              <p className="text-xs text-muted-foreground">
                {allowEdit
                  ? "Collaborators can add and edit items."
                  : "View-only — collaborators cannot make changes."}
              </p>
            </div>
            <Switch
              checked={allowEdit}
              disabled={saving}
              onCheckedChange={toggleAllowEdit}
              aria-label="Toggle editing access"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Export dropdown                                                     */
/* ------------------------------------------------------------------ */

export function ExportMenu() {
  function handleExport(type: string) {
    toast.success(`Export started: ${type}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => handleExport("PDF")}>
          PDF document
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("iCal")}>
          iCal calendar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("Google Calendar")}>
          Google Calendar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

/* ------------------------------------------------------------------ */
/* Invite collaborator dialog                                          */
/* ------------------------------------------------------------------ */

export function InviteDialog({ itineraryId }: { itineraryId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"Editor" | "Viewer">("Viewer");
  const [saving, setSaving] = useState(false);

  function reset() {
    setName("");
    setEmail("");
    setRole("Viewer");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/itineraries/${itineraryId}/collaborators`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });
      if (!res.ok) throw new Error("Failed to invite");
      toast.success(`${name} added as ${role}`);
      reset();
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Could not invite collaborator");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <UserPlus className="size-4" />
          Invite
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-navy">
            Invite a collaborator
          </DialogTitle>
          <DialogDescription>
            They&apos;ll get an email with a link to this itinerary.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="inv-name">Full name</Label>
            <Input
              id="inv-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Priya Shah"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="inv-email">Email</Label>
            <Input
              id="inv-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="inv-role">Permission</Label>
            <Select
              value={role}
              onValueChange={(v) => setRole(v as "Editor" | "Viewer")}
            >
              <SelectTrigger id="inv-role" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Viewer">Viewer — view only</SelectItem>
                <SelectItem value="Editor">Editor — can edit items</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-teal text-white hover:bg-teal/90"
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Send invite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Add item dialog                                                     */
/* ------------------------------------------------------------------ */

export function AddItemDialog({
  itineraryId,
  day,
  date,
  triggerVariant = "outline",
}: {
  itineraryId: string;
  day: number;
  date: string;
  triggerVariant?: "outline" | "ghost" | "teal";
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [vertical, setVertical] = useState<Vertical>("services");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [location, setLocation] = useState("");
  const [saving, setSaving] = useState(false);

  function reset() {
    setTitle("");
    setVertical("services");
    setStartTime("09:00");
    setEndTime("10:00");
    setLocation("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`/api/itineraries/${itineraryId}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day,
          date,
          startTime,
          endTime: endTime || null,
          title,
          vertical,
          location: location || null,
          status: "Planning",
        }),
      });
      if (!res.ok) throw new Error("Failed to add item");
      toast.success("Item added to timeline");
      reset();
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Could not add item");
    } finally {
      setSaving(false);
    }
  }

  const triggerClass =
    triggerVariant === "teal"
      ? "bg-teal text-white hover:bg-teal/90"
      : triggerVariant === "ghost"
        ? ""
        : "";

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant === "ghost" ? "ghost" : "outline"}
          size="sm"
          className={triggerClass}
        >
          <Plus className="size-4" />
          Add item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-navy">
            Add to Day {day}
          </DialogTitle>
          <DialogDescription>
            {new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="item-title">Title</Label>
            <Input
              id="item-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Dinner reservation"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="item-vertical">Vertical</Label>
            <Select
              value={vertical}
              onValueChange={(v) => setVertical(v as Vertical)}
            >
              <SelectTrigger id="item-vertical" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VERTICALS.map((v) => (
                  <SelectItem key={v} value={v}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="item-start">Start time</Label>
              <Input
                id="item-start"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="item-end">End time</Label>
              <Input
                id="item-end"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="item-loc">Location (optional)</Label>
            <Input
              id="item-loc"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Hotel → Venue"
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-teal text-white hover:bg-teal/90"
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Add to timeline
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline block (with delete)                                        */
/* ------------------------------------------------------------------ */

export type TimelineItem = {
  id: string;
  startTime: string;
  endTime: string | null;
  title: string;
  vertical: Vertical;
  location: string | null;
  status: string;
};

export function TimelineBlock({
  itineraryId,
  item,
  hasConflict,
}: {
  itineraryId: string;
  item: TimelineItem;
  hasConflict: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function remove() {
    startTransition(async () => {
      try {
        const res = await fetch(
          `/api/itineraries/${itineraryId}/items?itemId=${item.id}`,
          { method: "DELETE" },
        );
        if (!res.ok) throw new Error("Failed to delete");
        toast.success("Item removed");
        router.refresh();
      } catch {
        toast.error("Could not remove item");
      }
    });
  }

  return (
    <div className="group relative flex gap-3 rounded-xl border border-border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
      {/* Left: vertical bar + time */}
      <div className="flex gap-3">
        <VerticalBar vertical={item.vertical} />
        <div className="w-16 shrink-0">
          <p className="text-sm font-700 text-navy">{item.startTime}</p>
          <p className="text-[11px] text-muted-foreground">
            {item.endTime ? `→ ${item.endTime}` : "Open"}
          </p>
        </div>
      </div>

      {/* Middle */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-display text-sm font-600 leading-snug text-navy">
            {item.title}
          </h4>
          {hasConflict && (
            <Badge
              variant="outline"
              className="border-destructive/40 bg-destructive/10 text-destructive"
            >
              <AlertTriangle className="size-3" />
              Time conflict
            </Badge>
          )}
        </div>
        {item.location && (
          <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
            <span className="text-teal">●</span>
            {item.location}
          </p>
        )}
        <div className="mt-1.5">
          <StatusBadge status={item.status} />
        </div>
      </div>

      {/* Right: vertical badge + delete */}
      <div className="flex flex-col items-end justify-between gap-2">
        <VerticalBadge vertical={item.vertical} withIcon />
        <Button
          size="icon"
          variant="ghost"
          className="size-7 text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100"
          onClick={remove}
          disabled={pending}
          aria-label="Remove item"
        >
          {pending ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <Trash2 className="size-3.5" />
          )}
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Collaborators row                                                   */
/* ------------------------------------------------------------------ */

export type Collaborator = {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string | null;
};

export function CollaboratorsRow({
  collaborators,
  itineraryId,
}: {
  collaborators: Collaborator[];
  itineraryId: string;
}) {
  const initials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Collaborators
      </span>
      <div className="flex -space-x-2">
        {collaborators.map((c) => (
          <div key={c.id} className="ring-2 ring-background rounded-full">
            <Avatar className="size-8">
              {c.avatar && (
                <AvatarImage src={c.avatar} alt={c.name} />
              )}
              <AvatarFallback className="bg-navy text-[10px] font-semibold text-white">
                {initials(c.name)}
              </AvatarFallback>
            </Avatar>
          </div>
        ))}
        {collaborators.length === 0 && (
          <span className="text-xs text-muted-foreground">No collaborators yet</span>
        )}
      </div>
      <InviteDialog itineraryId={itineraryId} />
    </div>
  );
}
