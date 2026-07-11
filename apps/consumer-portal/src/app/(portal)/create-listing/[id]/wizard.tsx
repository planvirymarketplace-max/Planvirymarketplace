"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Check,
  CheckCircle2,
  Loader2,
  ExternalLink,
  Rocket,
  Save,
  AlertCircle,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { usePortalCounts } from "@/hooks/use-portal-data";

import {
  Draft,
  DraftInput,
  FormState,
  draftToForm,
  formToDraftInput,
} from "./types";
import {
  STEP_META,
  TOTAL_STEPS,
  BasicsStep,
  LocationStep,
  DescriptionStep,
  MediaStep,
  PricingStep,
  AvailabilityStep,
  PoliciesStep,
  ContactReviewStep,
} from "./steps";
import { StepRail } from "./step-rail";

type SaveState = "idle" | "saving" | "saved" | "error";

export function Wizard({ initialDraft }: { initialDraft: Draft }) {
  const router = useRouter();
  const { refresh } = usePortalCounts();

  const [draft, setDraft] = React.useState<Draft>(initialDraft);
  const [form, setForm] = React.useState<FormState>(() =>
    draftToForm(initialDraft)
  );
  const [step, setStep] = React.useState<number>(() =>
    clampStep(initialDraft.step)
  );
  const [maxReached, setMaxReached] = React.useState<number>(() =>
    clampStep(initialDraft.step)
  );
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [saveState, setSaveState] = React.useState<SaveState>("idle");
  const [publishing, setPublishing] = React.useState(false);

  const isPublished = draft.status === "active";

  // --- Save (PATCH autosave) ---
  const save = React.useCallback(
    async (patch: DraftInput) => {
      setSaveState("saving");
      try {
        const res = await fetch(`/api/create-listing/${draft.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        });
        if (!res.ok) throw new Error("Failed");
        const updated: Draft = await res.json();
        setDraft(updated);
        setSaveState("saved");
        window.setTimeout(
          () => setSaveState((s) => (s === "saved" ? "idle" : s)),
          2200
        );
      } catch {
        setSaveState("error");
        toast.error("Couldn't save — check your connection");
        window.setTimeout(
          () => setSaveState((s) => (s === "error" ? "idle" : s)),
          2400
        );
      }
    },
    [draft.id]
  );

  // --- Debounced autosave on form change (skip initial mount) ---
  const isFirstRef = React.useRef(true);
  const prevFormRef = React.useRef(form);
  React.useEffect(() => {
    if (isFirstRef.current) {
      isFirstRef.current = false;
      prevFormRef.current = form;
      return;
    }
    if (prevFormRef.current === form) return;
    prevFormRef.current = form;
    const t = window.setTimeout(() => {
      void save({ ...formToDraftInput(form), step });
    }, 900);
    return () => window.clearTimeout(t);
  }, [form, step, save]);

  // --- Update form (clears field errors as user edits) ---
  const update = React.useCallback((patch: Partial<FormState>) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const keys = Object.keys(patch);
      if (!keys.some((k) => prev[k])) return prev;
      const next = { ...prev };
      for (const k of keys) delete next[k];
      return next;
    });
  }, []);

  // --- Validation ---
  const validateStep = React.useCallback(
    (s: number): Record<string, string> => {
      const e: Record<string, string> = {};
      if (s === 1) {
        if (!form.businessType) e.businessType = "Choose a listing type.";
        if (!form.title.trim()) e.title = "Title is required.";
        else if (form.title.trim().length < 3)
          e.title = "Title must be at least 3 characters.";
      } else if (s === 2) {
        if (!form.city.trim()) e.city = "City is required.";
      } else if (s === 3) {
        if (form.description.trim().length < 30)
          e.description = "Description must be at least 30 characters.";
      } else if (s === 5) {
        const p = parseFloat(form.price);
        if (isNaN(p) || p <= 0)
          e.price = "Enter a price greater than 0.";
        if (!form.pricingUnit) e.pricingUnit = "Select a pricing unit.";
      } else if (s === 8) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail))
          e.contactEmail = "Enter a valid email address.";
      }
      return e;
    },
    [form]
  );

  // --- Navigation ---
  function gotoStep(next: number) {
    if (next === step) return;
    if (next < 1 || next > TOTAL_STEPS) return;
    setStep(next);
    setMaxReached((m) => Math.max(m, next));
    setErrors({});
    void save({ ...formToDraftInput(form), step: next });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleNext() {
    const e = validateStep(step);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      toast.error("Please complete the required fields before continuing.");
      return;
    }
    if (step < TOTAL_STEPS) gotoStep(step + 1);
  }

  function handleBack() {
    if (step > 1) gotoStep(step - 1);
  }

  // --- Publish readiness ---
  const publishReady = React.useMemo(() => {
    return (
      !!form.businessType &&
      form.title.trim().length >= 3 &&
      !!form.city.trim() &&
      form.description.trim().length >= 30 &&
      form.photos.length >= 1 &&
      !isNaN(parseFloat(form.price)) &&
      parseFloat(form.price) > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contactEmail)
    );
  }, [form]);

  // --- Publish ---
  async function handlePublish() {
    const e = validateStep(8);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      toast.error("Please fix the highlighted fields before publishing.");
      return;
    }
    if (!publishReady) {
      toast.error("Complete the pre-publish checklist first.");
      return;
    }
    setPublishing(true);
    try {
      // Save the latest form first, then publish.
      await save({ ...formToDraftInput(form), step: 8 });
      const res = await fetch(`/api/create-listing/${draft.id}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Publish failed");
      }
      await res.json();
      toast.success("Listing published! It's now live in the marketplace.");
      refresh();
      router.push("/create-listing");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Could not publish. Try again."
      );
      setPublishing(false);
    }
  }

  // --- Save & Exit ---
  async function handleSaveExit() {
    await save({ ...formToDraftInput(form), step });
    router.push("/create-listing");
  }

  const currentMeta = STEP_META[step - 1];
  const isLastStep = step === TOTAL_STEPS;
  const isFirstStep = step === 1;

  const stepProps = { form, update, errors };

  return (
    <div className="flex min-h-[calc(100vh-13rem)] flex-col gap-5">
     <div className="flex-1 space-y-5">
      {/* Top chrome: back + title + save indicator */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1 text-muted-foreground">
            <Link href="/create-listing">
              <ArrowLeft className="size-4" />
              All listings
            </Link>
          </Button>
          <Separator orientation="vertical" className="hidden h-5 sm:block" />
          <div className="hidden min-w-0 sm:block">
            <p className="truncate font-display text-sm font-600 text-navy">
              {form.title || "Untitled Listing"}
            </p>
            <p className="text-xs text-muted-foreground">
              Step {step} of {TOTAL_STEPS} · {currentMeta.label}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveExit}
            className="gap-1.5"
          >
            <Save className="size-3.5" />
            Save &amp; exit
          </Button>
        </div>
      </div>

      {/* Published banner */}
      {isPublished && (
        <div className="flex flex-col gap-3 rounded-xl border border-teal/30 bg-teal/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal/15 text-teal">
              <CheckCircle2 className="size-5" />
            </div>
            <div>
              <p className="font-display text-sm font-600 text-navy">
                This listing is published
              </p>
              <p className="text-xs text-muted-foreground">
                It&apos;s live in the marketplace. Edits you make here are
                auto-saved to your draft.
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Button
              asChild
              size="sm"
              className="bg-teal text-white hover:bg-teal/90"
            >
              <Link href="/book">
                <ExternalLink className="size-3.5" />
                View in marketplace
              </Link>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() =>
                toast.info(
                  "Unpublish is a visual demo — the listing stays live in /book."
                )
              }
            >
              Unpublish
            </Button>
          </div>
        </div>
      )}

      {/* Layout: step rail + content */}
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="lg:sticky lg:top-20 lg:self-start">
          <StepRail
            current={step}
            maxReached={maxReached}
            onJump={gotoStep}
          />
        </div>

        {/* Step content card */}
        <div className="min-w-0">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Card className="py-0">
                <CardContent className="p-5 sm:p-7">
                  {step === 1 && <BasicsStep {...stepProps} />}
                  {step === 2 && <LocationStep {...stepProps} />}
                  {step === 3 && <DescriptionStep {...stepProps} />}
                  {step === 4 && <MediaStep {...stepProps} />}
                  {step === 5 && <PricingStep {...stepProps} />}
                  {step === 6 && <AvailabilityStep {...stepProps} />}
                  {step === 7 && <PoliciesStep {...stepProps} />}
                  {step === 8 && (
                    <ContactReviewStep
                      {...stepProps}
                      draft={{
                        id: draft.id,
                        status: draft.status,
                        updatedAt: draft.updatedAt,
                      }}
                    />
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
     </div>

      {/* Sticky bottom action bar */}
      <div className="sticky bottom-0 z-30 -mx-4 border-t border-border bg-background/95 px-4 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              disabled={isFirstStep}
              className="gap-1"
            >
              <ChevronLeft className="size-4" />
              Back
            </Button>
            <SaveIndicator state={saveState} />
            <span className="hidden text-xs text-muted-foreground sm:inline">
              Step {step} of {TOTAL_STEPS}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {!isLastStep ? (
              <Button
                onClick={handleNext}
                size="sm"
                className="bg-teal text-white hover:bg-teal/90"
              >
                Next
                <ChevronRight className="size-4" />
              </Button>
            ) : isPublished ? (
              <Button
                asChild
                size="sm"
                className="bg-teal text-white hover:bg-teal/90"
              >
                <Link href="/book">
                  <Eye className="size-4" />
                  View in marketplace
                </Link>
              </Button>
            ) : (
              <Button
                onClick={handlePublish}
                disabled={!publishReady || publishing}
                size="sm"
                className="bg-teal text-white hover:bg-teal/90"
                title={
                  !publishReady
                    ? "Complete the pre-publish checklist first"
                    : "Publish to the marketplace"
                }
              >
                {publishing ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Publishing…
                  </>
                ) : (
                  <>
                    <Rocket className="size-4" />
                    Publish Listing
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Save indicator
// ---------------------------------------------------------------------------

function SaveIndicator({ state }: { state: SaveState }) {
  if (state === "saving")
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Loader2 className="size-3 animate-spin" />
        Saving…
      </span>
    );
  if (state === "saved")
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-teal">
        <Check className="size-3" />
        Saved
      </span>
    );
  if (state === "error")
    return (
      <span className="flex items-center gap-1.5 text-xs font-medium text-destructive">
        <AlertCircle className="size-3" />
        Save failed
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Check className="size-3 text-muted-foreground/60" />
      Auto-saved
    </span>
  );
}

function clampStep(n: number): number {
  if (isNaN(n) || n < 1) return 1;
  if (n > TOTAL_STEPS) return TOTAL_STEPS;
  return n;
}
