// GET /api/v1/reservations/:id
// Returns full detail of a single Reservation

import { NextRequest } from 'next/server';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 120, windowMs: 60 * 1000, scope: 'user' },
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
    // TODO: Query reservation by id
    // TODO: RLS: consumer sees own, vendor sees bookings on own inventory
    // TODO: Include payment status, cancellation policy snapshot, itinerary context

    return successResponse(
      {
        id,
        status: 'CONFIRMED',
        inventory_item: {
          id: 'item-1',
          title: 'Sample Item',
          category: 'LODGING',
          vendor: { id: 'vendor-1', name: 'Sample Vendor' },
        },
        payment: {
          status: 'PAID',
          stripe_payment_intent_id: 'pi_123',
        },
        itinerary_session_id: null,
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.NOT_FOUND,
      'Reservation not found',
      requestId,
      404
    );
  }
}
