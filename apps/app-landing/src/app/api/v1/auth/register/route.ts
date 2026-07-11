/**
 * POST /api/v1/auth/register
 *
 * Spec (Part XI §11.3.1):
 *   - Auth: "Supabase anon JWT (new user token from signup)" — the user has
 *     ALREADY signed up via Supabase Auth. This endpoint creates the matching
 *     `user_profiles` row for the just-authenticated user.
 *   - Input: `{ display_name: string (1–80 chars), timezone?: string (IANA),
 *               locale?: string (BCP-47) }`
 *   - Returns 201 with `{ data: { user_id, display_name, created_at } }` on
 *     create, 409 `USER_ALREADY_EXISTS` if a profile already exists for this
 *     auth.uid, 401 if no valid JWT is presented.
 *
 * Notes:
 *   - We never accept email/password here — the Supabase Auth signup flow
 *     owns that. Removing the legacy `createUser` call also means this route
 *     can never 500 on a duplicate-email Supabase error.
 *   - The `user_profiles` table currently has no `timezone` column; we accept
 *     the field for forward-compat and stash it in the auth user's
 *     `user_metadata` (best-effort) so the row insert itself never fails on
 *     a missing column.
 */

import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { created, tooMany } from "@/lib/api/envelope"
import { handleError, BadRequestError, ConflictError, AuthError } from "@/lib/api/errors"
import { registerSchema } from "@/lib/api/schemas"
import {
  buildRateLimitKey,
  checkRateLimit,
  getClientIp,
  RATE_LIMITS,
} from "@/lib/api/rate-limit"

export async function POST(request: NextRequest) {
  try {
    // ─── 1. Resolve the authenticated user from the Supabase JWT ────────────
    // The caller MUST present a valid anon JWT (i.e. they already signed up
    // via Supabase Auth). No JWT → 401.
    const supabase = await createClient()
    const {
      data: { user },
      error: userErr,
    } = await supabase.auth.getUser()

    if (userErr || !user) {
      // Spec: "Return 401 if no authenticated user (no valid JWT)."
      // AuthError maps to the standard 401 envelope via handleError.
      throw new AuthError("A valid Supabase anon JWT is required to register a profile")
    }
    const userId = user.id

    // ─── 2. Rate-limit by IP (still cheap protection against spam) ──────────
    const rlKey = buildRateLimitKey(userId, getClientIp(request), "register")
    const rl = checkRateLimit(rlKey, RATE_LIMITS.authRegister)
    if (!rl.allowed) {
      return tooMany("Too many registration attempts. Please try again shortly.")
    }

    // ─── 3. Validate the body against the new schema ────────────────────────
    const body = await request.json().catch(() => null)
    if (!body) throw new BadRequestError("Request body must be JSON")
    const parsed = registerSchema.parse(body)

    // ─── 4. Insert into user_profiles (id = auth.uid) ───────────────────────
    // We use the admin client to bypass RLS — the just-signed-up user's anon
    // JWT doesn't grant write access to user_profiles yet.
    const admin = createAdminClient()

    // Pre-check for an existing profile so we can return the spec's exact
    // 409 USER_ALREADY_EXISTS code (rather than relying on a unique-PK
    // constraint violation, which would surface as a generic CONFLICT).
    const { data: existing } = await admin
      .from("user_profiles")
      .select("id, created_at")
      .eq("id", userId)
      .maybeSingle()
    if (existing) {
      throw new ConflictError(
        "USER_ALREADY_EXISTS",
        "A profile already exists for this user",
      )
    }

    // Insert the profile row. Timezone is intentionally NOT passed to the
    // table (no column exists today); we stash it on the auth user's metadata
    // so the value is preserved for a future schema migration.
    const { data: profile, error: profileErr } = await admin
      .from("user_profiles")
      .insert({
        id: userId,
        email: user.email ?? null,
        display_name: parsed.display_name,
        locale: parsed.locale ?? "en",
        notification_prefs: { email: true, push: true, sms: false },
      })
      .select("id, display_name, created_at")
      .single()

    if (profileErr) {
      // Race-condition guard: another request created the profile between our
      // pre-check and the insert. Surface as the spec's 409 rather than 500.
      if (/duplicate key|already exists|23505/i.test(profileErr.message)) {
        throw new ConflictError(
          "USER_ALREADY_EXISTS",
          "A profile already exists for this user",
        )
      }
      throw new BadRequestError("PROFILE_CREATE_FAILED", profileErr.message)
    }
    if (!profile) {
      throw new BadRequestError("PROFILE_CREATE_FAILED", "Supabase returned no profile row")
    }

    // ─── 5. Best-effort: stash timezone + locale on the auth user metadata ─
    // The user_profiles table has no timezone column today; we keep the value
    // on `auth.users.raw_user_meta_data` so it survives the next migration.
    if (parsed.timezone || parsed.locale) {
      await admin.auth.admin
        .updateUserById(userId, {
          user_metadata: {
            ...(user.user_metadata ?? {}),
            display_name: parsed.display_name,
            timezone: parsed.timezone ?? null,
            locale: parsed.locale ?? null,
          },
        })
        .then(() => undefined, () => undefined)
    }

    // ─── 6. Emit domain event ───────────────────────────────────────────────
    await admin
      .from("domain_events")
      .insert({
        event_type: "user.registered",
        entity_type: "user",
        entity_id: userId,
        payload: {
          email: user.email ?? null,
          display_name: parsed.display_name,
          locale: parsed.locale ?? null,
          timezone: parsed.timezone ?? null,
        },
      })
      .then(() => undefined, () => undefined)

    // ─── 7. Return 201 with the spec envelope ──────────────────────────────
    return created(
      {
        user_id: profile.id,
        display_name: profile.display_name,
        created_at: profile.created_at,
      },
      { rate_limit: { remaining: rl.remaining, reset_at: rl.resetAt } },
    )
  } catch (err) {
    return handleError(err)
  }
}
