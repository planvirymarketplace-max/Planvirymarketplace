// GET /api/v1/itineraries/:id
// Returns full itinerary with all Reservations, members, and conflict warnings

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
    // TODO: Check owner or member permission (ItineraryMember.permission)
    // TODO: Compute conflicts array (TIME_OVERLAP, LOCATION_GAP)
    // TODO: Return full itinerary

    return successResponse(
      {
        id,
        title: 'Sample Itinerary',
        status: 'ACTIVE',
        owner: { user_id: auth.userId, display_name: 'User' },
        members: [],
        reservations: [],
        conflicts: [],
        total_cost_cents: 0,
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.NOT_FOUND,
      'Itinerary not found',
      requestId,
      404
    );
  }
}
