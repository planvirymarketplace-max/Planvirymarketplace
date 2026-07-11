"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  KeyRound,
  Loader2,
  Lock,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function SecurityCard({ twoFactor }: { twoFactor: boolean }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-600 text-navy">
          <ShieldCheck className="size-4 text-teal" />
          Security
        </CardTitle>
        <CardDescription>
          Keep your account safe with a strong password and 2FA.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <PasswordRow />
        <TwoFactorRow initial={twoFactor} />
      </CardContent>
    </Card>
  );
}

function PasswordRow() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
          <KeyRound className="size-4" />
        </div>
        <div>
          <p className="text-sm font-600 text-navy">Password</p>
          <p className="text-xs text-muted-foreground">
            Last updated 3 months ago
          </p>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Change
          </Button>
        </DialogTrigger>
        <ChangePasswordDialog
          onDone={() => setOpen(false)}
        />
      </Dialog>
    </div>
  );
}

function ChangePasswordDialog({ onDone }: { onDone: () => void }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, startSubmit] = useTransition();

  const match = next.length > 0 && next === confirm;
  const mismatch = confirm.length > 0 && next !== confirm;
  const valid =
    current.length >= 4 && next.length >= 8 && match;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid || submitting) return;
    startSubmit(() => {
      // No real auth — mocked client-side
      setTimeout(() => {
        toast.success("Password updated");
        setCurrent("");
        setNext("");
        setConfirm("");
        onDone();
      }, 500);
    });
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 font-display text-navy">
          <Lock className="size-4 text-teal" />
          Change password
        </DialogTitle>
        <DialogDescription>
          Choose a strong password of at least 8 characters.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={submit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="current-pw">Current password</Label>
          <Input
            id="current-pw"
            type="password"
            autoComplete="current-password"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="new-pw">New password</Label>
          <Input
            id="new-pw"
            type="password"
            autoComplete="new-password"
            value={next}
            onChange={(e) => setNext(e.target.value)}
            required
            aria-describedby="new-pw-hint"
          />
          <p id="new-pw-hint" className="text-xs text-muted-foreground">
            At least 8 characters with a mix of letters and numbers.
          </p>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="confirm-pw">Confirm new password</Label>
          <Input
            id="confirm-pw"
            type="password"
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            aria-invalid={mismatch}
            aria-describedby="confirm-pw-err"
          />
          {mismatch && (
            <p id="confirm-pw-err" className="text-xs text-rose-600">
              Passwords don&apos;t match.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-teal text-white hover:bg-teal/90"
            disabled={!valid || submitting}
          >
            {submitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Lock className="size-4" />
            )}
            Update password
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

function TwoFactorRow({ initial }: { initial: boolean }) {
  const router = useRouter();
  const [on, setOn] = useState(initial);
  const [pending, startToggle] = useTransition();

  function toggle(next: boolean) {
    if (next === on || pending) return;
    startToggle(async () => {
      // Optimistic update
      setOn(next);
      try {
        const res = await fetch("/api/guest", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ twoFactor: next }),
        });
        if (!res.ok) throw new Error("Failed to update 2FA");
        toast.success(
          next ? "Two-factor authentication enabled" : "Two-factor authentication disabled"
        );
        router.refresh();
      } catch {
        // Revert
        setOn(!next);
        toast.error("Could not update 2FA setting");
      }
    });
  }

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/60 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
          <Smartphone className="size-4" />
        </div>
        <div>
          <p className="text-sm font-600 text-navy">
            Two-factor authentication
          </p>
          <p className="text-xs text-muted-foreground">
            {on
              ? "Enabled — a verification code is sent to your phone on sign-in."
              : "Add an extra layer of security on every sign-in."}
          </p>
          {on && (
            <p className="mt-1 inline-flex items-center gap-1 rounded-md bg-teal/10 px-2 py-0.5 text-[11px] font-medium text-teal">
              <Smartphone className="size-3" />
              Phone number required for 2FA
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        {pending && <Loader2 className="size-3.5 animate-spin text-muted-foreground" />}
        <Switch
          checked={on}
          onCheckedChange={toggle}
          aria-label="Toggle two-factor authentication"
        />
      </div>
    </div>
  );
}
