// GET /api/v1/reservations
// Returns the authenticated user's reservations, or vendor's incoming reservations

import { NextRequest } from 'next/server';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

export async function GET(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 120, windowMs: 60 * 1000, scope: 'user' }, // 120 requests / minute / user
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

  const { searchParams } = new URL(req.url);
  const status = searchParams.getAll('status');
  const from = searchParams.get('from');
  const to = searchParams.get('to');
  const page = parseInt(searchParams.get('page') || '1');
  const per_page = Math.min(parseInt(searchParams.get('per_page') || '50'), 50);

  try {
    // TODO: Query reservations scoped by role via RLS
    // TODO: Consumer: own reservations
    // TODO: Vendor: reservations on vendor's inventory_items

    return successResponse(
      {
        reservations: [],
        total: 0,
        page,
        per_page,
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Failed to fetch reservations',
      requestId,
      500
    );
  }
}
