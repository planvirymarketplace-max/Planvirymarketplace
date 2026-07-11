// POST /api/v1/itineraries
// Creates a new ItinerarySession

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const createItinerarySchema = z.object({
  title: z.string().max(200).optional(),
  occasion_type: z.string().optional(),
  reservation_ids: z.array(z.string().uuid()).optional(),
});

export async function POST(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 60, windowMs: 60 * 60 * 1000, scope: 'user' },
    schema: createItinerarySchema,
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId, auth } = middlewareResult.context;

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
    const { title, occasion_type, reservation_ids } = body;

    // TODO: BR-IT-001: session must have at least one Reservation before sharing (enforced at share-time)
    // TODO: Reservations in reservation_ids must belong to calling user
    // TODO: Create ItinerarySession
    // TODO: Emit itinerary.created analytics event

    return successResponse(
      {
        id: crypto.randomUUID(),
        title,
        status: 'ACTIVE',
        reservations: [],
        created_at: new Date().toISOString(),
      },
      requestId,
      201
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Failed to create itinerary',
      requestId,
      500
    );
  }
}
