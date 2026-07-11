"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Camera,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Save,
  User as UserIcon,
  CalendarDays,
  Salad,
  Accessibility as AccessibilityIcon,
  Info,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  ACCESSIBILITY_OPTIONS,
  DIETARY_OPTIONS,
} from "@/lib/constants";

export type Guest = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  phoneCountry: string | null;
  avatar: string | null;
  location: string | null;
  dob: string | null;
  dietary: string | null;
  accessibility: string | null;
  twoFactor: boolean;
};

const PHONE_COUNTRIES = [
  { code: "+1", label: "+1 (US/CA)" },
  { code: "+44", label: "+44 (UK)" },
  { code: "+61", label: "+61 (AU)" },
  { code: "+91", label: "+91 (IN)" },
  { code: "+86", label: "+86 (CN)" },
  { code: "+33", label: "+33 (FR)" },
  { code: "+49", label: "+49 (DE)" },
  { code: "+81", label: "+81 (JP)" },
  { code: "+55", label: "+55 (BR)" },
  { code: "+52", label: "+52 (MX)" },
];

const CITY_SUGGESTIONS = [
  "Austin, TX",
  "Chicago, IL",
  "New York, NY",
  "Miami, FL",
  "Los Angeles, CA",
  "San Francisco, CA",
  "Seattle, WA",
  "Boston, MA",
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function splitList(s: string | null): string[] {
  if (!s) return [];
  return s
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function toggleInList(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((x) => x !== value)
    : [...list, value];
}

export function ProfileForm({ guest }: { guest: Guest }) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(guest.name);
  const [phone, setPhone] = useState(guest.phone ?? "");
  const [phoneCountry, setPhoneCountry] = useState(
    guest.phoneCountry ?? "+1"
  );
  const [location, setLocation] = useState(guest.location ?? "");
  const [dob, setDob] = useState(guest.dob ?? "");
  const [dietary, setDietary] = useState<string[]>(splitList(guest.dietary));
  const [accessibility, setAccessibility] = useState<string[]>(
    splitList(guest.accessibility)
  );
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [saving, startSave] = useTransition();

  const avatarSrc = avatarPreview ?? guest.avatar ?? "";

  function onPickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(URL.createObjectURL(file));
    toast.success("Avatar preview updated — save to confirm");
  }

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    startSave(async () => {
      try {
        const res = await fetch("/api/guest", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            phone: phone.trim(),
            phoneCountry,
            location: location.trim(),
            dob,
            dietary: dietary.join(","),
            accessibility: accessibility.join(","),
            // avatar is visual-only; not persisted in this mocked flow
          }),
        });
        if (!res.ok) throw new Error("Failed to save profile");
        toast.success("Profile updated");
        router.refresh();
      } catch {
        toast.error("Could not save profile");
      }
    });
  }

  return (
    <form onSubmit={save} className="space-y-6">
      {/* Avatar + identity card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-600 text-navy">
            <UserIcon className="size-4 text-teal" />
            Avatar &amp; Name
          </CardTitle>
          <CardDescription>
            This is how you&apos;ll appear across the portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <div className="relative">
              <Avatar className="size-24 border border-border shadow-sm">
                {avatarSrc ? (
                  <AvatarImage src={avatarSrc} alt={guest.name} />
                ) : null}
                <AvatarFallback className="bg-teal/10 text-lg font-700 text-teal">
                  {initials(name || guest.name) || "G"}
                </AvatarFallback>
              </Avatar>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border border-border bg-card text-teal shadow-sm transition-colors hover:bg-teal hover:text-white"
                aria-label="Upload a new avatar"
              >
                <Camera className="size-4" />
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onPickAvatar}
                className="sr-only"
                aria-label="Avatar file input"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="display-name">Display name</Label>
              <Input
                id="display-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="max-w-sm"
              />
              <p className="text-xs text-muted-foreground">
                Used for greetings, reservations and messages with vendors.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-600 text-navy">
            <Phone className="size-4 text-teal" />
            Contact Details
          </CardTitle>
          <CardDescription>
            We&apos;ll use these to send booking updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="email"
                value={guest.email}
                readOnly
                aria-readonly
                className="bg-muted/40 pl-9 text-muted-foreground"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Contact support to change your email address.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="phone">Phone number</Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Select
                value={phoneCountry}
                onValueChange={setPhoneCountry}
              >
                <SelectTrigger
                  className="w-full sm:w-40"
                  aria-label="Phone country code"
                >
                  <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                  {PHONE_COUNTRIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="512 555 0142"
                inputMode="tel"
                autoComplete="tel-national"
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="location">Default city</Label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Set your default city"
                list="city-suggestions"
                className="pl-9"
              />
              <datalist id="city-suggestions">
                {CITY_SUGGESTIONS.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
            <p className="text-xs text-muted-foreground">
              We&apos;ll surface local recommendations based on this city.
            </p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="dob">Date of birth</Label>
            <div className="relative max-w-sm">
              <CalendarDays className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-600 text-navy">
            <Salad className="size-4 text-teal" />
            Preferences
          </CardTitle>
          <CardDescription>
            Help us tailor your reservations and recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label className="text-sm font-600 text-navy">
              Dietary preferences
            </Label>
            <p className="text-xs text-muted-foreground">
              We&apos;ll share these with venues and caterers.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {DIETARY_OPTIONS.map((opt) => {
                const active = dietary.includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setDietary((d) => toggleInList(d, opt))}
                    aria-pressed={active}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      active
                        ? "border-teal bg-teal text-white"
                        : "border-border bg-card text-muted-foreground hover:border-teal/40 hover:text-navy"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label className="flex items-center gap-1.5 text-sm font-600 text-navy">
              <AccessibilityIcon className="size-4 text-teal" />
              Accessibility needs
            </Label>
            <p className="text-xs text-muted-foreground">
              Used when arranging transport, seating and lodging.
            </p>
            <div className="grid gap-2 pt-1 sm:grid-cols-2">
              {ACCESSIBILITY_OPTIONS.map((opt) => {
                const active = accessibility.includes(opt);
                const id = `acc-${opt.replace(/\s+/g, "-").toLowerCase()}`;
                return (
                  <label
                    key={opt}
                    htmlFor={id}
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 transition-colors ${
                      active
                        ? "border-teal bg-teal/5"
                        : "border-border bg-card hover:border-teal/40"
                    }`}
                  >
                    <Checkbox
                      id={id}
                      checked={active}
                      onCheckedChange={() =>
                        setAccessibility((a) => toggleInList(a, opt))
                      }
                    />
                    <span className="text-sm text-navy">{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sticky save bar */}
      <div className="sticky bottom-4 z-10 flex items-center justify-between gap-3 rounded-xl border border-border bg-card/95 p-3 shadow-md backdrop-blur">
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Info className="size-3.5 text-teal" />
          Changes are saved to your account instantly.
        </p>
        <Button
          type="submit"
          className="bg-teal text-white hover:bg-teal/90"
          disabled={saving}
        >
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Save changes
        </Button>
      </div>
    </form>
  );
}
