"use client";

import * as React from "react";
import { toast } from "sonner";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ROWS: { key: string; label: string; hint?: string }[] = [
  { key: "booking", label: "New Booking" },
  { key: "cancellation", label: "Cancellation" },
  { key: "message", label: "New Message" },
  { key: "pricedrop", label: "Price Drop" },
  { key: "review", label: "Review Reminder" },
  { key: "promotion", label: "Promotions" },
];

const CHANNELS = ["email", "push", "sms"] as const;
type Channel = (typeof CHANNELS)[number];

const DEFAULTS: Record<string, Record<Channel, boolean>> = {
  booking: { email: true, push: true, sms: false },
  cancellation: { email: true, push: true, sms: false },
  message: { email: true, push: true, sms: false },
  pricedrop: { email: true, push: true, sms: false },
  review: { email: true, push: true, sms: false },
  promotion: { email: true, push: true, sms: false },
};

export function NotificationPreferences() {
  const [open, setOpen] = React.useState(false);
  const [prefs, setPrefs] = React.useState(DEFAULTS);
  const [saving, setSaving] = React.useState(false);

  function toggle(row: string, channel: Channel, value: boolean) {
    setPrefs((p) => ({
      ...p,
      [row]: { ...p[row], [channel]: value },
    }));
  }

  async function save() {
    setSaving(true);
    // No backend persistence — simulate latency for UX.
    await new Promise((r) => setTimeout(r, 450));
    setSaving(false);
    setOpen(false);
    toast.success("Preferences saved");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Settings2 className="size-4" />
          Preferences
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Notification Preferences</DialogTitle>
          <DialogDescription>
            Choose how you want to be notified for each event type.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-hidden rounded-lg border border-border">
          {/* Header */}
          <div className="grid grid-cols-[1fr_repeat(3,3.5rem)] gap-2 bg-muted/50 px-3 py-2 text-center text-xs font-semibold text-muted-foreground sm:grid-cols-[1fr_repeat(3,4rem)]">
            <span className="text-left">Event</span>
            <span>Email</span>
            <span>Push</span>
            <span>SMS</span>
          </div>
          {/* Rows */}
          <div className="divide-y divide-border">
            {ROWS.map((row) => (
              <div
                key={row.key}
                className="grid grid-cols-[1fr_repeat(3,3.5rem)] items-center gap-2 px-3 py-3 sm:grid-cols-[1fr_repeat(3,4rem)]"
              >
                <div className="min-w-0">
                  <Label
                    htmlFor={`row-${row.key}`}
                    className="text-sm font-medium text-navy"
                  >
                    {row.label}
                  </Label>
                </div>
                {CHANNELS.map((ch) => {
                  const id = `${row.key}-${ch}`;
                  return (
                    <div
                      key={ch}
                      className="flex items-center justify-center"
                    >
                      <Switch
                        id={id}
                        checked={prefs[row.key][ch]}
                        onCheckedChange={(v) => toggle(row.key, ch, v)}
                        aria-label={`${row.label} ${ch}`}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          SMS notifications may incur carrier charges. You can change these any time.
        </p>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={saving}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            onClick={save}
            disabled={saving}
            className="bg-teal text-white hover:bg-teal/90"
          >
            {saving ? "Saving…" : "Save preferences"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
