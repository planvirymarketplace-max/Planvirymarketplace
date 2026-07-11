// DELETE /api/v1/cart/items/:cart_line_id
// Removes a line item from the cart

import { NextRequest } from 'next/server';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { cart_line_id: string } }
) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: false, // Same session as cart
    rateLimit: { limit: 60, windowMs: 60 * 1000, scope: 'user' },
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId } = middlewareResult.context;
  const { cart_line_id } = params;

  try {
    // TODO: Remove from cart
    // TODO: Emit cart.item_removed analytics event

    return successResponse(
      {
        cart: {
          cart_id: crypto.randomUUID(),
          items: [],
          subtotal_cents: 0,
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
        },
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Failed to remove cart item',
      requestId,
      500
    );
  }
}
