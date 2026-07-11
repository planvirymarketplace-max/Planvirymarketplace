/**
 * Planviry — Stripe Webhook Handler (DEV FALLBACK).
 *
 * ⚠️ This is the LOCAL-DEV handler. In production, Stripe calls the Supabase
 * Edge Function at `functions/stripe-webhook/index.ts` directly (spec
 * Part XII §12.2 — ONE webhook endpoint). This Next.js route exists ONLY so
 * the Stripe CLI (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`)
 * can replay events into a developer's local checkout flow.
 *
 * Both handlers MUST contain identical business logic. If you change one,
 * change the other. Spec Part XII §12.2 is the canonical edge function;
 * this route mirrors it.
 *
 * Adapted from TicketiHub (signature verification) + movinin (booking
 * confirmation). Calls rpc_confirm_reservation to transition
 * PENDING → CONFIRMED (Part V FSM).
 *
 * CONFLICT-006 (Part XLII §42.4): Multi-vendor split payouts from one cart.
 * One Stripe Checkout Session creates one PaymentIntent for the full cart
 * total. After `payment_intent.succeeded` confirms all reservations, the
 * `processVendorPayouts` helper fans out separate Stripe Transfers to each
 * vendor's Connect account, less the platform fee. See the helper doc below.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import Stripe from 'stripe'
import { randomUUID } from 'crypto'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20' as Stripe.LatestApiVersion,
})

// ─── CONFLICT-006: Multi-vendor split payouts from one cart ──────────────────
// One Stripe Checkout Session → one PaymentIntent for the full cart total.
// After the PaymentIntent succeeds and all reservations are confirmed, we fan
// out a Stripe Transfer to each distinct vendor's Connect account for their
// share of the cart, less the platform fee (10% — constant for now; TODO:
// per-vendor `platform_fee_percent` column on vendor_accounts).
//
// Idempotency: per (vendor_id, order_id), if a vendor_payouts row already
// exists with a non-null stripe_transfer_id, the transfer is skipped. This
// makes the function safe to call from both `checkout.session.completed` and
// `payment_intent.succeeded` webhooks (which can both fire for the same
// payment) without double-paying vendors.
//
// Failure isolation: a transfer failure for one vendor is logged to the
// dead_letter_queue and does NOT fail the webhook — the reservation is already
// confirmed and the customer's checkout is complete. Operations will retry
// from the DLQ.
//
// Reference: Implementation Specification Part XLII §42.4 (CONFLICT-006).
const PLATFORM_FEE_PERCENT = 0.10

type SupabaseAdminClient = ReturnType<typeof createAdminClient>

async function logToDeadLetterQueue(
  supabase: SupabaseAdminClient,
  jobName: string,
  errorMessage: string,
  payload: Record<string, unknown>,
): Promise<void> {
  try {
    await supabase.from('dead_letter_queue').insert({
      job_name: jobName,
      error_message: errorMessage,
      payload,
      retry_count: 0,
    })
  } catch (err) {
    // If even the DLQ insert fails, just log — we can't do anything more.
    console.error('[stripe-webhook] FATAL: DLQ insert failed:', err)
  }
}

async function processVendorPayouts(args: {
  supabase: SupabaseAdminClient
  stripe: Stripe
  reservationIds: string[]
  paymentIntentId: string
}): Promise<void> {
  const { supabase, stripe, reservationIds, paymentIntentId } = args
  if (reservationIds.length === 0) return

  // 1. Resolve the order_id from the first reservation (all reservations in
  //    one cart share one order_id).
  const { data: firstRes, error: firstErr } = await supabase
    .from('reservations')
    .select('id, order_id')
    .eq('id', reservationIds[0])
    .maybeSingle()
  if (firstErr || !firstRes?.order_id) {
    console.warn(
      `[stripe-webhook] processVendorPayouts: no order_id for reservation ${reservationIds[0]} — skipping payouts`,
      firstErr?.message,
    )
    return
  }
  const orderId = firstRes.order_id as string

  // 2. Find the payments row for this PaymentIntent (to populate payment_id
  //    on each vendor_payouts row).
  const { data: payment } = await supabase
    .from('payments')
    .select('id, currency')
    .eq('stripe_payment_intent_id', paymentIntentId)
    .maybeSingle()

  // 3. Aggregate line items per vendor for this order. Per CONFLICT-006 spec:
  //    join reservation_line_items with inventory_items (for vendor_id) and
  //    vendor_accounts (for the Stripe Connect destination account).
  //    reservation_line_items also has a denormalized vendor_id; the join is
  //    authoritative and guards against stale denormalization.
  const { data: vendorRows, error: aggErr } = await supabase
    .from('reservation_line_items')
    .select(
      'vendor_id, total_price_cents, currency, inventory_items!inner(vendor_id), vendor_accounts!inner(stripe_connect_account_id)',
    )
    .eq('order_id', orderId)

  if (aggErr) {
    console.error('[stripe-webhook] processVendorPayouts: line_items query failed:', aggErr.message)
    await logToDeadLetterQueue(supabase, 'process_vendor_payouts', `LINE_ITEMS_QUERY_FAILED: ${aggErr.message}`, {
      order_id: orderId,
      payment_intent_id: paymentIntentId,
    })
    return
  }
  if (!vendorRows || vendorRows.length === 0) {
    console.log(`[stripe-webhook] processVendorPayouts: no line_items for order ${orderId}; skipping`)
    return
  }

  // 4. Group by vendor_id, sum gross, pick the stripe_connect_account_id.
  type VendorRow = {
    vendor_id: string | null
    total_price_cents: number | null
    currency: string | null
    inventory_items: { vendor_id: string | null } | Array<{ vendor_id: string | null }>
    vendor_accounts: { stripe_connect_account_id: string | null } | Array<{ stripe_connect_account_id: string | null }>
  }
  const vendorMap = new Map<string, { gross_cents: number; stripe_account_id: string | null; currency: string }>()
  for (const row of vendorRows as unknown as VendorRow[]) {
    const inventoryItem = Array.isArray(row.inventory_items) ? row.inventory_items[0] : row.inventory_items
    const vendorAccount = Array.isArray(row.vendor_accounts) ? row.vendor_accounts[0] : row.vendor_accounts
    const vendorId = row.vendor_id ?? inventoryItem?.vendor_id ?? null
    const stripeAccountId = vendorAccount?.stripe_connect_account_id ?? null
    const gross = row.total_price_cents ?? 0
    const currency = (row.currency ?? 'usd').toLowerCase()
    if (!vendorId) continue
    const existing = vendorMap.get(vendorId)
    if (existing) {
      existing.gross_cents += gross
    } else {
      vendorMap.set(vendorId, { gross_cents: gross, stripe_account_id: stripeAccountId, currency })
    }
  }

  console.log(
    `[stripe-webhook] processVendorPayouts: ${vendorMap.size} vendor(s) for order ${orderId}, payment ${paymentIntentId}`,
  )

  // 5. For each vendor: idempotency check → Stripe Transfer → vendor_payouts row.
  for (const [vendorId, agg] of vendorMap.entries()) {
    try {
      // Idempotency: skip if a transfer was already recorded for this vendor+order.
      const { data: existingPayout } = await supabase
        .from('vendor_payouts')
        .select('id, stripe_transfer_id')
        .eq('vendor_id', vendorId)
        .eq('order_id', orderId)
        .not('stripe_transfer_id', 'is', null)
        .maybeSingle()
      if (existingPayout) {
        console.log(
          `[stripe-webhook] processVendorPayouts: vendor ${vendorId} already paid out (transfer ${existingPayout.stripe_transfer_id}); skipping`,
        )
        continue
      }

      // Cannot transfer without a Connect account — log to DLQ for ops follow-up.
      if (!agg.stripe_account_id) {
        console.warn(
          `[stripe-webhook] processVendorPayouts: vendor ${vendorId} has no stripe_connect_account_id; logging to DLQ`,
        )
        await logToDeadLetterQueue(supabase, 'process_vendor_payouts', 'VENDOR_MISSING_STRIPE_ACCOUNT', {
          vendor_id: vendorId,
          order_id: orderId,
          gross_cents: agg.gross_cents,
        })
        continue
      }

      const platformFeeCents = Math.round(agg.gross_cents * PLATFORM_FEE_PERCENT)
      const payoutCents = agg.gross_cents - platformFeeCents
      if (payoutCents <= 0) {
        console.warn(
          `[stripe-webhook] processVendorPayouts: vendor ${vendorId} payout_cents=${payoutCents} (gross=${agg.gross_cents}); skipping`,
        )
        continue
      }

      // Create the Stripe Transfer to the vendor's Connect account.
      // transfer_group = order_id ties all transfers for this cart together.
      const transfer = await stripe.transfers.create({
        amount: payoutCents,
        currency: agg.currency,
        destination: agg.stripe_account_id,
        transfer_group: orderId,
        metadata: {
          vendor_id: vendorId,
          order_id: orderId,
          payment_intent_id: paymentIntentId,
          gross_cents: String(agg.gross_cents),
          platform_fee_cents: String(platformFeeCents),
          conflict: 'CONFLICT-006',
        },
      })

      // Insert the vendor_payouts row (status PENDING — Stripe will mark PAID
      // when the transfer lands in the vendor's bank account via the
      // payout.paid webhook, which is a separate concern).
      const { error: insertErr } = await supabase.from('vendor_payouts').insert({
        vendor_id: vendorId,
        payment_id: payment?.id ?? null,
        order_id: orderId,
        gross_cents: agg.gross_cents,
        platform_fee_cents: platformFeeCents,
        payout_cents: payoutCents,
        currency: agg.currency.toUpperCase(),
        stripe_transfer_id: transfer.id,
        status: 'PENDING',
      })
      if (insertErr) {
        // The Transfer succeeded but we couldn't record it — this is a
        // serious data-integrity issue; log to DLQ for manual reconciliation.
        console.error(
          `[stripe-webhook] processVendorPayouts: transfer ${transfer.id} succeeded but DB insert failed:`,
          insertErr.message,
        )
        await logToDeadLetterQueue(
          supabase,
          'process_vendor_payouts',
          `PAYOUT_DB_INSERT_FAILED: ${insertErr.message}`,
          {
            vendor_id: vendorId,
            order_id: orderId,
            stripe_transfer_id: transfer.id,
            gross_cents: agg.gross_cents,
            platform_fee_cents: platformFeeCents,
            payout_cents: payoutCents,
          },
        )
      } else {
        console.log(
          `[stripe-webhook] processVendorPayouts: transfer ${transfer.id} → vendor ${vendorId} (${payoutCents}c of ${agg.gross_cents}c gross, ${platformFeeCents}c fee)`,
        )
      }
    } catch (err) {
      // Per CONFLICT-006: a transfer failure must NOT fail the webhook.
      // Log to DLQ and continue with the next vendor.
      const msg = err instanceof Error ? err.message : String(err)
      console.error(
        `[stripe-webhook] processVendorPayouts: transfer failed for vendor ${vendorId}, order ${orderId}:`,
        msg,
      )
      await logToDeadLetterQueue(supabase, 'process_vendor_payouts', `TRANSFER_FAILED: ${msg}`, {
        vendor_id: vendorId,
        order_id: orderId,
        gross_cents: agg.gross_cents,
        stripe_account_id: agg.stripe_account_id,
      })
    }
  }
}
// ─── END CONFLICT-006 helper ─────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  // Verify Stripe signature (TicketiHub pattern)
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('[stripe-webhook] signature verification failed:', err)
    return NextResponse.json({ error: `Invalid signature: ${err}` }, { status: 400 })
  }

  const supabase = createAdminClient()
  const eventType = event.type
  const eventData = event.data.object as Record<string, unknown>

  try {
    switch (eventType) {
      // ─── checkout.session.completed → confirm all reservations ───────────
      case 'checkout.session.completed': {
        const metadata = (eventData.metadata ?? {}) as Record<string, string>
        const reservationIdsJson = metadata.reservation_ids
        const stripePaymentIntentId = (eventData.payment_intent as string) ?? null

        if (!reservationIdsJson) {
          console.error('[stripe-webhook] no reservation_ids in session metadata')
          break
        }

        const reservationIds: string[] = JSON.parse(reservationIdsJson)

        // ─── Expire-on-late-payment (Hi.Events critical pattern) ───────────
        // If a payment arrives AFTER the reservation TTL expired, we must REFUND
        // and mark EXPIRED. This prevents overselling when two users race for the
        // last ticket and the first one's TTL expires before payment confirms.
        for (const reservationId of reservationIds) {
          const { data: reservation } = await supabase
            .from('reservations')
            .select('id, status, ttl_expires_at, item_id, quantity')
            .eq('id', reservationId)
            .maybeSingle()

          if (reservation && reservation.status === 'PENDING' && reservation.ttl_expires_at) {
            const ttlExpired = new Date(reservation.ttl_expires_at) < new Date()

            if (ttlExpired) {
              // The TTL has expired — this payment is too late.
              // Refund the payment immediately and expire the reservation.
              console.warn(`[stripe-webhook] LATE PAYMENT for ${reservationId} — TTL expired at ${reservation.ttl_expires_at}. Refunding.`)

              // Refund via Stripe
              const paymentIntentId = (eventData.payment_intent as string) ?? null
              if (paymentIntentId) {
                try {
                  await stripe.refunds.create({
                    payment_intent: paymentIntentId,
                    reason: 'requested_by_customer',
                  })
                } catch (refundErr) {
                  console.error(`[stripe-webhook] refund failed for ${paymentIntentId}:`, refundErr)
                }
              }

              // Expire the reservation + release capacity
              const { error: expireErr } = await supabase.rpc('rpc_expire_reservation', {
                p_reservation_id: reservationId,
              })
              if (expireErr) {
                // Fallback: direct update
                await supabase
                  .from('reservations')
                  .update({ status: 'EXPIRED', expired_at: new Date().toISOString() })
                  .eq('id', reservationId)
                  .eq('status', 'PENDING')

                // Release ticket_tiers capacity if this is an EVENT_TICKET
                const { data: item } = await supabase
                  .from('inventory_items')
                  .select('category')
                  .eq('id', reservation.item_id)
                  .maybeSingle()

                if (item?.category === 'EVENT_TICKET') {
                  const { data: tier } = await supabase
                    .from('ticket_tiers')
                    .select('id, quantity_reserved')
                    .eq('item_id', reservation.item_id)
                    .maybeSingle()

                  if (tier) {
                    await supabase
                      .from('ticket_tiers')
                      .update({ quantity_reserved: Math.max(0, tier.quantity_reserved - reservation.quantity) })
                      .eq('id', tier.id)
                  }
                }
              }

              // Emit domain event
              await supabase.from('domain_events').insert({
                event_type: 'reservation.expired_late_payment',
                entity_type: 'reservation',
                entity_id: reservationId,
                payload: { reason: 'payment_arrived_after_ttl', stripe_payment_intent_id: paymentIntentId },
              })

              continue // skip confirmation — this reservation is expired
            }
          }

          // ─── Normal path: confirm the reservation ───────────────────────
          const { data: confirmed, error: rpcErr } = await supabase.rpc('rpc_confirm_reservation', {
            p_reservation_id: reservationId,
            p_stripe_payment_intent_id: stripePaymentIntentId ?? '',
          })

          if (rpcErr) {
            console.error(`[stripe-webhook] confirm failed for ${reservationId}:`, rpcErr.message)
            // Fallback: direct update
            await supabase
              .from('reservations')
              .update({
                status: 'CONFIRMED',
                confirmed_at: new Date().toISOString(),
                stripe_payment_intent_id: stripePaymentIntentId,
              })
              .eq('id', reservationId)
              .eq('status', 'PENDING')
          } else {
            console.log(`[stripe-webhook] confirmed reservation ${reservationId}`)

          // ─── Fan-out notifications (Peppermint pattern) ─────────────────────
          // Notify the user (reservation confirmed) + vendor staff (new booking)
          const { data: resForNotif } = await supabase
            .from('reservations')
            .select('user_id, vendor_id, inventory_items!inner(title)')
            .eq('id', reservationId)
            .maybeSingle()

          if (resForNotif) {
            const eventTitle = Array.isArray(resForNotif.inventory_items) ? resForNotif.inventory_items[0]?.title : resForNotif.inventory_items?.title

            // Notify user
            await supabase.from('notifications').insert({
              user_id: resForNotif.user_id,
              notification_type: 'reservation.confirmed',
              channel: 'EMAIL',
              priority: 'HIGH',
              subject: `Booking confirmed: ${eventTitle ?? 'Your event'}`,
              body: `Your reservation has been confirmed. Reservation ID: ${reservationId}. Event: ${eventTitle ?? 'N/A'}.`,
              data_payload: { reservation_id: reservationId, event_title: eventTitle },
              status: 'QUEUED',
              rate_limit_category: 'NON_CRITICAL',
            })

            // Notify vendor staff
            const { data: staff } = await supabase
              .from('vendor_staff')
              .select('user_id')
              .eq('vendor_id', resForNotif.vendor_id)
              .eq('status', 'ACTIVE')

            if (staff && staff.length > 0) {
              await supabase.from('notifications').insert(
                staff.map((s: { user_id: string }) => ({
                  user_id: s.user_id,
                  notification_type: 'vendor.new_booking',
                  channel: 'IN_APP',
                  priority: 'HIGH',
                  subject: `New booking: ${eventTitle ?? 'New reservation'}`,
                  body: `A new booking has been confirmed. Reservation ID: ${reservationId}.`,
                  data_payload: { reservation_id: reservationId, event_title: eventTitle },
                  status: 'QUEUED',
                  rate_limit_category: 'NON_CRITICAL',
                })),
              )
            }
          }
          }

          // ─── Create per-attendee ticket_instances (Hi.Events pattern) ──────
          // One row per ticket in the reservation. Each gets its own QR secret.
          const { data: reservation } = await supabase
            .from('reservations')
            .select('id, user_id, item_id, quantity, user_profiles!inner(display_name, email)')
            .eq('id', reservationId)
            .maybeSingle()

          if (reservation) {
            const profile = Array.isArray(reservation.user_profiles) ? reservation.user_profiles[0] : reservation.user_profiles

            // Find the ticket_tier for this item
            const { data: tier } = await supabase
              .from('ticket_tiers')
              .select('id')
              .eq('item_id', reservation.item_id)
              .order('sort_order', { ascending: true })
              .limit(1)
              .maybeSingle()

            const instances = []
            for (let i = 0; i < (reservation.quantity as number); i++) {
              instances.push({
                reservation_id: reservationId,
                item_id: reservation.item_id,
                ticket_tier_id: tier?.id ?? '00000000-0000-0000-0000-000000000000',
                attendee_name: profile?.display_name ?? 'Attendee',
                attendee_email: profile?.email ?? '',
                qr_code_secret: randomUUID(), // unique per ticket instance
                status: 'ISSUED',
              })
            }
            if (instances.length > 0) {
              const { error: insErr } = await supabase.from('ticket_instances').insert(instances)
              if (insErr) {
                console.error(`[stripe-webhook] ticket_instances insert failed for ${reservationId}:`, insErr.message)
              } else {
                console.log(`[stripe-webhook] created ${instances.length} ticket_instances for ${reservationId}`)
              }
            }
          }
        }

        // Create payment record
        const amountCents = (eventData.amount_total as number) ?? 0
        const { data: payment } = await supabase.from('payments').insert({
          stripe_payment_intent_id: stripePaymentIntentId,
          amount_cents: amountCents,
          currency: ((eventData.currency as string) ?? 'usd').toUpperCase(),
          status: 'SUCCEEDED',
        }).select('id').single()

        // Create vendor_payouts records (Stripe Connect split — platform fee + vendor payout)
        const platformFeeCents = Math.round(amountCents * 0.10) // 10% platform fee
        const vendorPayoutCents = amountCents - platformFeeCents
        for (const reservationId of reservationIds) {
          const { data: res } = await supabase
            .from('reservations')
            .select('vendor_id, total_price_cents')
            .eq('id', reservationId)
            .maybeSingle()
          if (res?.vendor_id) {
            const proportionalPayout = Math.round(vendorPayoutCents * ((res.total_price_cents as number) / amountCents))
            await supabase.from('vendor_payouts').insert({
              vendor_id: res.vendor_id,
              payment_id: payment?.id,
              gross_cents: res.total_price_cents,
              platform_fee_cents: Math.round((res.total_price_cents as number) * 0.10),
              payout_cents: proportionalPayout,
              status: 'PENDING',
            })
          }
        }

        console.log(`[stripe-webhook] checkout.session.completed: ${reservationIds.length} reservations confirmed + ticket_instances + vendor_payouts created`)
        break
      }

      // ─── payment_intent.succeeded → confirm if checkout.session.completed missed ─
      case 'payment_intent.succeeded': {
        const metadata = (eventData.metadata ?? {}) as Record<string, string>
        const reservationIdsJson = metadata.reservation_ids
        const paymentIntentId = eventData.id as string

        if (!reservationIdsJson) {
          // Try to find reservations by payment_intent_id
          const { data: existing } = await supabase
            .from('reservations')
            .select('id, status')
            .eq('stripe_payment_intent_id', paymentIntentId)
          if (existing && existing.length > 0) {
            for (const r of existing as Array<{ id: string; status: string }>) {
              if (r.status === 'PENDING') {
                const { error: rpcErr } = await supabase.rpc('rpc_confirm_reservation', {
                  p_reservation_id: r.id,
                  p_stripe_payment_intent_id: paymentIntentId,
                })
                if (rpcErr) {
                  await supabase.from('reservations')
                    .update({ status: 'CONFIRMED', confirmed_at: new Date().toISOString(), stripe_payment_intent_id: paymentIntentId })
                    .eq('id', r.id).eq('status', 'PENDING')
                }
              }
            }

            // CONFLICT-006: Multi-vendor split payouts — fan out Stripe
            // Transfers to each vendor's Connect account for this cart.
            // Idempotent: skips vendors already paid out for this order.
            const fallbackReservationIds = (existing as Array<{ id: string }>).map((r) => r.id)
            await processVendorPayouts({ supabase, stripe, reservationIds: fallbackReservationIds, paymentIntentId })
          }
          break
        }

        const reservationIds: string[] = JSON.parse(reservationIdsJson)
        for (const reservationId of reservationIds) {
          // Check if already confirmed (checkout.session.completed may have handled it)
          const { data: res } = await supabase
            .from('reservations')
            .select('status')
            .eq('id', reservationId)
            .maybeSingle()

          if (res?.status === 'PENDING') {
            const { error: rpcErr } = await supabase.rpc('rpc_confirm_reservation', {
              p_reservation_id: reservationId,
              p_stripe_payment_intent_id: paymentIntentId,
            })
            if (rpcErr) {
              await supabase.from('reservations')
                .update({ status: 'CONFIRMED', confirmed_at: new Date().toISOString(), stripe_payment_intent_id: paymentIntentId })
                .eq('id', reservationId).eq('status', 'PENDING')
            }
            console.log(`[stripe-webhook] payment_intent.succeeded confirmed ${reservationId}`)
          }
        }

        // CONFLICT-006: Multi-vendor split payouts — fan out Stripe Transfers
        // to each vendor's Connect account for this cart, less the 10%
        // platform fee. Idempotent: safe to call even if checkout.session.completed
        // already inserted PENDING vendor_payouts rows (it doesn't create
        // Transfers; we do that here). Failures are isolated to the DLQ and
        // do NOT fail the webhook — the reservation is already confirmed.
        await processVendorPayouts({ supabase, stripe, reservationIds, paymentIntentId })
        break
      }

      // ─── payment_intent.payment_failed → cancel reservations ─────────────
      case 'payment_intent.payment_failed': {
        const metadata = (eventData.metadata ?? {}) as Record<string, string>
        const reservationIdsJson = metadata.reservation_ids
        if (!reservationIdsJson) break

        const reservationIds: string[] = JSON.parse(reservationIdsJson)
        for (const reservationId of reservationIds) {
          const { error: rpcErr } = await supabase.rpc('rpc_cancel_reservation', {
            p_reservation_id: reservationId,
            p_reason: 'Payment failed',
            p_refund_amount_cents: 0,
          })

          if (rpcErr) {
            // Fallback: direct update
            await supabase
              .from('reservations')
              .update({ status: 'CANCELLED', cancelled_at: new Date().toISOString(), cancelled_reason: 'Payment failed' })
              .eq('id', reservationId)
              .eq('status', 'PENDING')
          }
        }
        break
      }

      // ─── charge.refunded → mark reservation refunded ─────────────────────
      case 'charge.refunded': {
        const paymentIntentId = eventData.payment_intent as string
        if (!paymentIntentId) break

        const { data: reservations } = await supabase
          .from('reservations')
          .select('id')
          .eq('stripe_payment_intent_id', paymentIntentId)

        for (const r of reservations ?? []) {
          await supabase
            .from('reservations')
            .update({ status: 'CANCELLED', cancelled_at: new Date().toISOString(), cancelled_reason: 'Refunded', refund_amount_cents: (eventData.amount_refunded as number) ?? 0 })
            .eq('id', (r as { id: string }).id)
        }
        break
      }

      // ─── account.updated → Stripe Connect KYC sync ───────────────────────
      case 'account.updated': {
        const accountId = eventData.id as string
        const chargesEnabled = eventData.charges_enabled as boolean
        const payoutsEnabled = eventData.payouts_enabled as boolean

        if (accountId) {
          await supabase
            .from('vendor_accounts')
            .update({ stripe_connect_account_id: accountId })
            .eq('stripe_connect_account_id', accountId)
        }
        break
      }

      default:
        console.log(`[stripe-webhook] unhandled event: ${eventType}`)
    }

    return NextResponse.json({ received: true, type: eventType })
  } catch (error) {
    console.error('[stripe-webhook] handler error:', error)
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 })
  }
}
