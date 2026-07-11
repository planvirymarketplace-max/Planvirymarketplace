/**
 * GET  /api/v1/inventory   — paginated PUBLISHED inventory list
 * POST /api/v1/inventory   — create a DRAFT inventory_item (vendor only)
 *
 * BR-GLOBAL-001: location_id is required for every inventory item. The list
 * endpoint enforces this via a `location_id` query param — public shoppers
 * must always be browsing within a location gate.
 *
 * Part XI §11.3.2 — the gate accepts EITHER `location_id` OR a
 * `(lat, lng, radius_km)` triple. When the geo triple is supplied we resolve
 * the set of `locations` whose lat/lng falls inside a bounding box around
 * the requested point (slightly over-scoped vs. true haversine — sufficient
 * for a smoke-test gate; production swaps in PostGIS ST_DWithin when ready)
 * and filter inventory_items by those location_ids.
 */

import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { ok, created, tooMany } from "@/lib/api/envelope"
import { handleError, BadRequestError, ForbiddenError, ValidationError } from "@/lib/api/errors"
import { requireAuthContext, requireVendorContext } from "@/lib/api/auth"
import { createInventorySchema, inventoryListQuerySchema } from "@/lib/api/schemas"
import {
  buildRateLimitKey,
  checkRateLimit,
  getClientIp,
  RATE_LIMITS,
} from "@/lib/api/rate-limit"

// ─── Geo helpers (bounding-box approximation of a radius search) ────────────

const EARTH_RADIUS_KM = 6371

/**
 * Compute the lat/lng deltas for a square bounding box that fully encloses a
 * circle of `radiusKm` centred on `(lat, lng)`. The box is intentionally a
 * slight over-approximation — anything inside the circle is also inside the
 * box, so no real hits are dropped. We trim the over-reach afterwards with a
 * proper haversine filter (see `haversineKm`).
 */
function bboxFor(lat: number, lng: number, radiusKm: number) {
  const latDelta = radiusKm / 111.0 // 1° latitude ≈ 111 km everywhere
  const lngDelta = radiusKm / (111.0 * Math.cos((lat * Math.PI) / 180))
  return {
    minLat: lat - latDelta,
    maxLat: lat + latDelta,
    minLng: lng - lngDelta,
    maxLng: lng + lngDelta,
  }
}

/** Great-circle distance in km between two lat/lng points (haversine). */
function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a))
}

// ─── GET ─────────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const parsed = inventoryListQuerySchema.parse(
      Object.fromEntries(searchParams.entries()),
    )

    // BR-GLOBAL-001: location gate. The schema refine() already enforces that
    // either `location_id` OR `(lat, lng, radius_km)` is present, so the only
    // remaining failure mode is `vendor_id` only — which we allow for vendor
    // preview of their own items.
    const hasGeo =
      parsed.lat !== undefined &&
      parsed.lng !== undefined &&
      parsed.radius_km !== undefined
    if (!parsed.location_id && !hasGeo && !parsed.vendor_id) {
      throw new ValidationError(
        "LOCATION_REQUIRED",
        "Either location_id OR (lat, lng, radius_km) is required (BR-GLOBAL-001).",
      )
    }

    const supabase = await createClient()
    const ctx = await requireAuthContext(supabase).catch(() => null)

    const rlKey = buildRateLimitKey(ctx?.userId, getClientIp(request), "inventoryList")
    const rl = checkRateLimit(rlKey, RATE_LIMITS.inventoryList)
    if (!rl.allowed) return tooMany()

    const admin = createAdminClient()

    // ─── Resolve location_ids for the geo-radius case ──────────────────────
    // We do a bounding-box query on `locations` (cheap, index-friendly), then
    // trim to the true circle via haversine in JS. PostGIS ST_DWithin will
    // replace this once the Part VI geo migration lands.
    let geoLocationIds: string[] | null = null
    if (hasGeo) {
      const bbox = bboxFor(parsed.lat!, parsed.lng!, parsed.radius_km!)
      const { data: locs, error: locErr } = await admin
        .from("locations")
        .select("id, latitude, longitude")
        .gte("latitude", bbox.minLat)
        .lte("latitude", bbox.maxLat)
        .gte("longitude", bbox.minLng)
        .lte("longitude", bbox.maxLng)
      if (locErr) {
        throw new ValidationError("LOCATION_QUERY_FAILED", locErr.message)
      }
      geoLocationIds = (locs ?? [])
        .filter((l) => {
          if (l.latitude == null || l.longitude == null) return false
          return (
            haversineKm(parsed.lat!, parsed.lng!, l.latitude, l.longitude) <=
            parsed.radius_km!
          )
        })
        .map((l) => l.id)
    }

    let query = admin
      .from("inventory_items")
      .select(
        "id, vendor_id, location_id, title, slug, description, category, status, base_price_cents, currency, max_quantity_per_booking, cancellation_policy, quality_score, published_at, created_at",
        { count: "exact" },
      )
      .eq("status", "PUBLISHED")

    if (parsed.location_id) {
      query = query.eq("location_id", parsed.location_id)
    } else if (geoLocationIds !== null) {
      if (geoLocationIds.length === 0) {
        // No locations match the radius — return an empty page rather than
        // running a query that would fall back to "all inventory".
        return ok(
          { items: [] },
          {
            limit: parsed.limit,
            offset: parsed.offset,
            total: 0,
            rate_limit: { remaining: rl.remaining, reset_at: rl.resetAt },
          },
        )
      }
      query = query.in("location_id", geoLocationIds)
    }
    if (parsed.vendor_id) {
      // Vendor preview path: allow non-published items too if the caller is
      // staff of that vendor.
      if (ctx && ctx.vendorMemberships.some((m) => m.vendor_id === parsed.vendor_id)) {
        query = query.in("status", ["PUBLISHED", "PAUSED", "DRAFT"])
      } else {
        query = query.eq("status", "PUBLISHED")
      }
      query = query.eq("vendor_id", parsed.vendor_id)
    }
    if (parsed.category) query = query.eq("category", parsed.category)
    if (parsed.q) {
      query = query.or(`title.ilike.%${parsed.q}%,description.ilike.%${parsed.q}%`)
    }
    if (parsed.min_price_cents !== undefined)
      (query as unknown as { gte: (c: string, v: number) => unknown }).gte(
        "base_price_cents",
        parsed.min_price_cents,
      )
    if (parsed.max_price_cents !== undefined)
      (query as unknown as { lte: (c: string, v: number) => unknown }).lte(
        "base_price_cents",
        parsed.max_price_cents,
      )

    switch (parsed.sort) {
      case "newest":
        query = query.order("published_at", { ascending: false, nullsFirst: false })
        break
      case "price_asc":
        query = query.order("base_price_cents", { ascending: true, nullsFirst: true })
        break
      case "price_desc":
        query = query.order("base_price_cents", { ascending: false, nullsFirst: true })
        break
      case "quality":
        query = query.order("quality_score", { ascending: false, nullsFirst: true })
        break
    }

    query = query.range(parsed.offset, parsed.offset + parsed.limit - 1)

    const { data, count } = await query

    return ok(
      { items: data ?? [] },
      {
        limit: parsed.limit,
        offset: parsed.offset,
        total: count ?? 0,
        rate_limit: { remaining: rl.remaining, reset_at: rl.resetAt },
      },
    )
  } catch (err) {
    return handleError(err)
  }
}

// ─── POST ────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const ctx = await requireAuthContext(supabase)
    if (!ctx.isVendor) throw new ForbiddenError("Only vendor staff may create inventory items")

    const rlKey = buildRateLimitKey(ctx.userId, getClientIp(request), "inventoryCreate")
    const rl = checkRateLimit(rlKey, RATE_LIMITS.inventoryCreate)
    if (!rl.allowed) return tooMany()

    const body = await request.json().catch(() => null)
    if (!body) throw new BadRequestError("Request body must be JSON")
    const parsed = createInventorySchema.parse(body)

    // Vendor context — verify the user is staff of the supplied vendor_id.
    const vendorCtx = await requireVendorContext(supabase, parsed.vendor_id)

    const admin = createAdminClient()

    // ─── Verify location exists ───────────────────────────────────────────────
    const { data: loc } = await admin
      .from("locations")
      .select("id")
      .eq("id", parsed.location_id)
      .maybeSingle()
    if (!loc) throw new BadRequestError("INVALID_LOCATION", "location_id does not exist")

    // ─── Generate slug if not supplied ────────────────────────────────────────
    const slug = parsed.slug ?? slugify(parsed.title)

    // ─── Insert inventory_items row (DRAFT) ───────────────────────────────────
    const { data: item, error: itemErr } = await admin
      .from("inventory_items")
      .insert({
        vendor_id: vendorCtx.vendorId,
        location_id: parsed.location_id,
        title: parsed.title,
        slug,
        description: parsed.description ?? null,
        category: parsed.category ?? null,
        status: "DRAFT",
        base_price_cents: parsed.base_price_cents ?? 0,
        currency: parsed.currency ?? "USD",
        max_quantity_per_booking: parsed.max_quantity_per_booking ?? 1,
        cancellation_policy: parsed.cancellation_policy ?? "FLEXIBLE",
        quality_score: 0,
        metadata: parsed.metadata ?? {},
      })
      .select("*")
      .single()

    if (itemErr || !item) {
      throw new BadRequestError("INVENTORY_CREATE_FAILED", itemErr?.message ?? "Unknown error")
    }

    // ─── Optional inline media ────────────────────────────────────────────────
    if (parsed.media && parsed.media.length > 0) {
      const mediaRows = parsed.media.map((m, i) => ({
        item_id: item.id,
        url: m.url,
        alt_text: m.alt_text ?? null,
        media_type: m.media_type ?? "IMAGE",
        is_primary: m.is_primary ?? i === 0,
        sort_order: m.sort_order ?? i,
      }))
      await admin.from("media_assets").insert(mediaRows)
    }

    // ─── Optional inline ticket tiers ────────────────────────────────────────
    if (parsed.ticket_tiers && parsed.ticket_tiers.length > 0) {
      const tierRows = parsed.ticket_tiers.map((t, i) => ({
        item_id: item.id,
        name: t.name,
        description: t.description ?? null,
        price_cents: t.price_cents,
        quantity_total: t.quantity_total,
        quantity_reserved: 0,
        sort_order: t.sort_order ?? i,
      }))
      await admin.from("ticket_tiers").insert(tierRows)
    }

    // ─── Domain event ────────────────────────────────────────────────────────
    await admin.from("domain_events").insert({
      event_type: "inventory.created",
      entity_type: "inventory_item",
      entity_id: item.id,
      payload: { vendor_id: vendorCtx.vendorId, title: item.title, status: "DRAFT" },
    })

    return created(item, { rate_limit: { remaining: rl.remaining, reset_at: rl.resetAt } })
  } catch (err) {
    return handleError(err)
  }
}

// ─── helpers ─────────────────────────────────────────────────────────────────

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}
