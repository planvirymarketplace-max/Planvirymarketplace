// supabase/functions/sync-listing-to-algolia/index.ts
//
// Edge Function: sync-listing-to-algolia
// Spec Reference: Part 14
//
// Trigger: DB Webhook on listings table UPDATE
// When a vendor claims a listing or updates their profile, this function
// fires and calls algolia.partialUpdateObject to keep the Algolia index
// in sync. This is the ONLY Algolia write path from the app (besides
// the seed script).
//
// Deploy: supabase functions deploy sync-listing-to-algolia
// Secrets: supabase secrets set ALGOLIA_ADMIN_API_KEY=xxx
//

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALGOLIA_APP_ID = Deno.env.get("NEXT_PUBLIC_ALGOLIA_APP_ID") ?? "";
const ALGOLIA_ADMIN_KEY = Deno.env.get("ALGOLIA_ADMIN_API_KEY") ?? Deno.env.get("ALGOLIA_ADMIN_KEY") ?? "";
const ALGOLIA_INDEX_NAME = Deno.env.get("NEXT_PUBLIC_ALGOLIA_LISTINGS_INDEX") ?? "listings";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

interface WebhookPayload {
  type: "INSERT" | "UPDATE" | "DELETE";
  table: string;
  record: Record<string, unknown>;
  old_record: Record<string, unknown> | null;
  schema: string;
}

Deno.serve(async (req: Request) => {
  try {
    const payload: WebhookPayload = await req.json();

    // Only handle listings table updates
    if (payload.table !== "listings") {
      return new Response(JSON.stringify({ message: "Ignoring non-listings table" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Only sync on UPDATE (claim, profile edit, status change)
    if (payload.type !== "UPDATE") {
      return new Response(JSON.stringify({ message: `Ignoring ${payload.type} event` }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const listing = payload.record;
    const listingId = listing.id as string;

    if (!listingId) {
      return new Response(JSON.stringify({ error: "No listing ID in payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Build the partial update object — only fields that exist in Algolia
    const algoliaUpdate: Record<string, unknown> = {
      objectID: listingId,
    };

    // Sync claimable fields (Part 8 — these change when vendor claims/edits)
    if ("is_claimed" in listing) algoliaUpdate.is_claimed = listing.is_claimed;
    if ("is_promoted" in listing) algoliaUpdate.is_promoted = listing.is_promoted;
    if ("instant_book" in listing) algoliaUpdate.instant_book = listing.instant_book;
    if ("price_tier" in listing) algoliaUpdate.price_tier = listing.price_tier;
    if ("avg_rating" in listing) algoliaUpdate.avg_rating = listing.avg_rating;
    if ("review_count" in listing) algoliaUpdate.review_count = listing.review_count;
    if ("profile_image_url" in listing) algoliaUpdate.profile_image_url = listing.profile_image_url;
    if ("status" in listing) algoliaUpdate.status = listing.status;
    if ("slug" in listing) algoliaUpdate.slug = listing.slug;
    if ("tags" in listing) algoliaUpdate.tags = listing.tags;

    // If the vendor has updated contact info, sync those too
    if ("name" in listing) algoliaUpdate.name = listing.name;
    if ("phone" in listing) algoliaUpdate.phone = listing.phone;
    if ("website" in listing) algoliaUpdate.website = listing.website;

    // Fetch vendor data if listing has a vendor_id (for synced fields like business_name)
    const vendorId = listing.vendor_id as string | null;
    if (vendorId) {
      const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
      const { data: vendor } = await supabase
        .from("vendors")
        .select("business_name, hero_image_url, tagline")
        .eq("id", vendorId)
        .single();

      if (vendor) {
        if (vendor.business_name) algoliaUpdate.name = vendor.business_name;
        if (vendor.hero_image_url) algoliaUpdate.profile_image_url = vendor.hero_image_url;
      }
    }

    // Call Algolia partialUpdateObject
    const algoliaUrl = `https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${ALGOLIA_INDEX_NAME}/${encodeURIComponent(listingId)}/partial`;

    const algoliaResponse = await fetch(algoliaUrl, {
      method: "POST",
      headers: {
        "X-Algolia-Application-Id": ALGOLIA_APP_ID,
        "X-Algolia-API-Key": ALGOLIA_ADMIN_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(algoliaUpdate),
    });

    if (!algoliaResponse.ok) {
      const errorText = await algoliaResponse.text();
      console.error("Algolia sync failed:", algoliaResponse.status, errorText);
      return new Response(
        JSON.stringify({ error: "Algolia sync failed", details: errorText }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const result = await algoliaResponse.json();

    console.log(`Synced listing ${listingId} to Algolia:`, Object.keys(algoliaUpdate).filter(k => k !== "objectID"));

    // Trigger ISR revalidation for the vendor profile page
    const revalidateSecret = Deno.env.get("REVALIDATE_SECRET");
    const siteUrl = Deno.env.get("NEXT_PUBLIC_SITE_URL");
    if (revalidateSecret && siteUrl && listing.slug) {
      try {
        await fetch(`${siteUrl}/api/revalidate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: `/v/${listing.slug}`,
            secret: revalidateSecret,
          }),
        });
        console.log(`Revalidated ISR cache for /v/${listing.slug}`);
      } catch (e) {
        console.warn("ISR revalidation failed (non-fatal):", e);
      }
    }

    return new Response(
      JSON.stringify({ success: true, listing_id: listingId, algolia_task: result.taskID }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Edge function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
