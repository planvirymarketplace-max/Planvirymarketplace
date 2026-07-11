import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

/**
 * POST /api/ticketing/admin/refunds — Issue a Stripe refund for a booking.
 *
 * Auth: Supabase Auth (spec Part XLII §42.4 CONFLICT-003 — Supabase Auth
 * wins over Clerk/NextAuth). Only users with an ADMIN/STAFF vendor_staff
 * membership may issue refunds.
 */
export async function POST(request: NextRequest) {
  try {
    // Verify Supabase Auth session + admin/staff role.
    const authSupabase = await createClient()
    const { data: { user }, error: userErr } = await authSupabase.auth.getUser()
    if (userErr || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { data: staff } = await authSupabase
      .from('vendor_staff')
      .select('role, user_id')
      .eq('user_id', user.id)
      .eq('status', 'ACTIVE')
      .maybeSingle()

    if (!staff || (staff.role !== 'ADMIN' && staff.role !== 'STAFF')) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const issuedByUserId = user.id

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ success: false, error: 'Stripe is not configured' }, { status: 500 })
    }

    const { bookingId, amount } = await request.json() as { bookingId: string; amount?: number }
    if (!bookingId) {
      return NextResponse.json({ success: false, error: 'bookingId is required' }, { status: 400 })
    }

    const supabase = createAdminClient()

    // Load booking
    const { data: booking, error: bookingError } = await supabase
      .from('bookings')
      .select('id, bookingNumber, totalAmount, bookingFee, status, stripePaymentIntentId')
      .eq('id', bookingId)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ success: false, error: 'Booking not found' }, { status: 404 })
    }

    if (!booking.stripePaymentIntentId) {
      return NextResponse.json({ success: false, error: 'No Stripe payment associated with this booking' }, { status: 400 })
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

    // Compute full amount in minor units
    const currency = 'GBP'
    const total = Number(booking.totalAmount || 0) + Number(booking.bookingFee || 0)
    const fullAmountMinor = Math.round(total * 100)

    const refund = await stripe.refunds.create({
      payment_intent: booking.stripePaymentIntentId,
      amount: typeof amount === 'number' ? Math.round(amount * 100) : undefined,
      metadata: {
        bookingId: booking.id,
        bookingNumber: booking.bookingNumber,
        issuedByUserId,
      }
    })

    // Update booking status if full refund
    const isFullRefund = refund.amount === fullAmountMinor
    if (isFullRefund) {
      await supabase
        .from('bookings')
        .update({ status: 'REFUNDED', updatedAt: new Date().toISOString() })
        .eq('id', booking.id)
    }

    return NextResponse.json({
      success: true,
      data: {
        refundId: refund.id,
        status: refund.status,
        amount: refund.amount / 100,
        currency,
        fullRefund: isFullRefund,
      }
    })
  } catch (error: any) {
    console.error('Refund error:', error)
    return NextResponse.json({ success: false, error: error.message || 'Refund failed' }, { status: 500 })
  }
}
