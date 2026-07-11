// POST /api/v1/events/:event_id/checkin
// Validates a QR check-in token and records check-in

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const checkinSchema = z.object({
  qr_token: z.string(),
  method: z.enum(['QR_SCAN', 'MANUAL']).optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { event_id: string } }
) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 600, windowMs: 60 * 1000, scope: 'user' }, // High-frequency for scanning
    schema: checkinSchema,
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId, auth } = middlewareResult.context;
  const { event_id } = params;

  if (!auth.userId) {
    return errorResponse(
      ERROR_CODES.NOT_AUTHENTICATED,
      'Valid JWT required',
      requestId,
      401
    );
  }

  try {
    const body = await req.json();
    const { qr_token, method } = body;

    // TODO: Check VENDOR_OWNER, VENDOR_MANAGER, or VENDOR_STAFF of event's VendorAccount
    // TODO: BR-EV-004: duplicate check-in returns error with prior timestamp
    // TODO: BR-EV-005: check-in window enforced
    // TODO: HMAC-SHA256 verify(token, reservation_id + user_id + event_id + platform_secret)
    // TODO: Reject if signature invalid or token expired (TTL: event_end_at + 30 min)

    return successResponse(
      {
        reservation_id: crypto.randomUUID(),
        attendee_name: 'Sample Attendee',
        tier_name: 'General Admission',
        checked_in_at: new Date().toISOString(),
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INVALID_QR_TOKEN,
      'Invalid QR token',
      requestId,
      400
    );
  }
}
