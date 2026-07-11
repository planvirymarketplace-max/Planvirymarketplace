// POST /api/v1/inventory/:id/pause
// Transitions PUBLISHED → PAUSED

import { NextRequest } from 'next/server';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 60, windowMs: 60 * 60 * 1000, scope: 'user' },
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
    // TODO: Check VENDOR_OWNER or VENDOR_MANAGER; or MODERATOR/ADMIN for moderation pause
    // TODO: FSM transition
    // TODO: Algolia document deleted
    // TODO: Cart items containing this item flagged with ITEM_UNAVAILABLE
    // TODO: Users with pending Cart items notified

    return successResponse(
      {
        id,
        status: 'PAUSED',
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.HAS_ACTIVE_CHECKOUT,
      'Item in active checkout session - wait for TTL',
      requestId,
      409
    );
  }
}
