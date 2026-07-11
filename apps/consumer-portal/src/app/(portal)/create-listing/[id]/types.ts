// Shared types for the Create Listing wizard.
//
// The `Draft` shape mirrors the Prisma `ListingDraft` model (dates already
// serialized to ISO strings by the API `ser()` helper). `DraftInput` is the
// partial payload accepted by `PATCH /api/create-listing/[id]` (autosave).

export type Draft = {
  id: string;
  businessType: string;
  title: string;
  slug: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  description: string | null;
  photos: string | null;
  price: number;
  pricingUnit: string | null;
  availabilityNotes: string | null;
  minNoticeHours: number;
  cancellationPolicy: string | null;
  houseRules: string | null;
  contactEmail: string | null;
  contactPhone: string | null;
  status: string;
  step: number;
  supabaseChannel: string | null;
  publishedListingId: string | null;
  createdAt: string;
  updatedAt: string;
};

export type DraftInput = {
  businessType?: string;
  title?: string;
  slug?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  description?: string;
  photos?: string;
  price?: number;
  pricingUnit?: string;
  availabilityNotes?: string;
  minNoticeHours?: number;
  cancellationPolicy?: string;
  houseRules?: string;
  contactEmail?: string;
  contactPhone?: string;
  status?: string;
  step?: number;
};

// A flat editable form snapshot used by the wizard — every field is a string
// (or number for price/minNoticeHours) so inputs stay controlled even when the
// underlying draft value is null.
export type FormState = {
  businessType: string;
  title: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  description: string;
  photos: string[];
  price: string;
  pricingUnit: string;
  availabilityNotes: string;
  minNoticeHours: string;
  cancellationPolicy: string;
  houseRules: string[];
  contactEmail: string;
  contactPhone: string;
};

export function draftToForm(d: Draft): FormState {
  return {
    businessType: d.businessType ?? "",
    title: d.title ?? "",
    slug: d.slug ?? "",
    address: d.address ?? "",
    city: d.city ?? "",
    state: d.state ?? "",
    zip: d.zip ?? "",
    description: d.description ?? "",
    photos: d.photos ? d.photos.split("|").filter(Boolean) : [],
    price: d.price ? String(d.price) : "",
    pricingUnit: d.pricingUnit ?? "",
    availabilityNotes: d.availabilityNotes ?? "",
    minNoticeHours: String(d.minNoticeHours ?? 24),
    cancellationPolicy: d.cancellationPolicy ?? "",
    houseRules: d.houseRules ? d.houseRules.split("|").filter(Boolean) : [],
    contactEmail: d.contactEmail ?? "",
    contactPhone: d.contactPhone ?? "",
  };
}

export function formToDraftInput(f: FormState): DraftInput {
  const priceNum = parseFloat(f.price);
  const noticeNum = parseInt(f.minNoticeHours, 10);
  return {
    businessType: f.businessType || undefined,
    title: f.title || undefined,
    slug: f.slug || undefined,
    address: f.address || undefined,
    city: f.city || undefined,
    state: f.state || undefined,
    zip: f.zip || undefined,
    description: f.description || undefined,
    photos: f.photos.length ? f.photos.join("|") : undefined,
    price: isNaN(priceNum) ? 0 : priceNum,
    pricingUnit: f.pricingUnit || undefined,
    availabilityNotes: f.availabilityNotes || undefined,
    minNoticeHours: isNaN(noticeNum) ? 24 : noticeNum,
    cancellationPolicy: f.cancellationPolicy || undefined,
    houseRules: f.houseRules.length ? f.houseRules.join("|") : undefined,
    contactEmail: f.contactEmail || undefined,
    contactPhone: f.contactPhone || undefined,
  };
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
