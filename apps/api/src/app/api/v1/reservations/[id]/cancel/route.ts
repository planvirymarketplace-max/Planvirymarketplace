// POST /api/v1/reservations/:id/cancel
// Initiates the cancellation FSM for a CONFIRMED or PENDING Reservation

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const cancelSchema = z.object({
  reason: z.string().max(500).optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 20, windowMs: 60 * 60 * 1000, scope: 'user' },
    schema: cancelSchema,
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId, auth } = middlewareResult.context;
  const { id } = params;

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
    const { reason } = body;

    // TODO: Check BR-R-006: cancellation policy terms
    // TODO: Calculate refund amount
    // TODO: Two-phase for CONFIRMED: preview refund → confirm cancel
    // TODO: First call: return preview with confirm_token
    // TODO: Second call with confirm_token: execute cancel

    return successResponse(
      {
        reservation_id: id,
        status: 'CANCELLED',
        refund_amount_cents: 0,
        stripe_refund_id: 're_123',
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INVALID_STATE,
      'Reservation not cancellable',
      requestId,
      409
    );
  }
}
