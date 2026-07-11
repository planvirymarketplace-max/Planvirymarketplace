import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase-marketplace/admin'

/**
 * DELETE /api/reviews/[id] — Delete a review by ID (admin-only)
 *
 * Maps from Prisma `db.vendorReview.findUnique` + `db.vendorReview.delete`.
 * The Supabase table is `reviews`.
 *
 * Auth: Supabase Auth (spec Part XLII §42.4 CONFLICT-003 — Supabase Auth
 * wins over Clerk/NextAuth). Admin role is determined via the user_profiles
 * row (role = 'admin') or a vendor_staff row with role 'ADMIN'.
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check admin auth via Supabase Auth session cookie
    const supabase = await createClient()
    const { data: { user }, error: userErr } = await supabase.auth.getUser()
    if (userErr || !user) {
      return NextResponse.json(
        { error: 'Unauthorized - authentication required' },
        { status: 401 }
      )
    }

    // Look up the user's role from user_profiles (Supabase Auth resolves identity;
    // user_profiles holds the authorization role per Part XLII §42.4).
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    // Accept either an 'admin' role on user_profiles, or an ADMIN vendor_staff
    // membership (covers ticketing admins who don't have a user_profiles.role).
    let isAdmin = profile?.role === 'admin'
    if (!isAdmin) {
      const { data: staff } = await supabase
        .from('vendor_staff')
        .select('role')
        .eq('user_id', user.id)
        .eq('status', 'ACTIVE')
        .maybeSingle()
      isAdmin = staff?.role === 'ADMIN'
    }

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Unauthorized - admin access required' },
        { status: 403 }
      )
    }

    const { id } = await params
    const adminSupabase = createAdminClient()

    const { data: review, error: findError } = await adminSupabase
      .from('reviews')
      .select('id')
      .eq('id', id)
      .maybeSingle()

    if (findError) {
      console.error('Error finding review:', findError.message)
      return NextResponse.json(
        { error: 'Failed to delete review' },
        { status: 500 }
      )
    }
    if (!review) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    const { error: deleteError } = await adminSupabase
      .from('reviews')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Error deleting review:', deleteError.message)
      return NextResponse.json(
        { error: 'Failed to delete review' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting review:', error)
    return NextResponse.json(
      { error: 'Failed to delete review' },
      { status: 500 }
    )
  }
}
