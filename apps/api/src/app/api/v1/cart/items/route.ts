// POST /api/v1/cart/items
// Adds an InventoryItem to the cart

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const addToCartSchema = z.object({
  inventory_item_id: z.string().uuid(),
  quantity: z.number().int().min(1),
  params: z.object({
    starts_at: z.string().datetime().optional(),
    ends_at: z.string().datetime().optional(),
    attendees: z.number().int().optional(),
  }).optional(),
});

export async function POST(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: false, // Optional (anon or authenticated)
    rateLimit: { limit: 60, windowMs: 60 * 1000, scope: 'user' },
    schema: addToCartSchema,
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId } = middlewareResult.context;

  try {
    const body = await req.json();
    const { inventory_item_id, quantity, params } = body;

    // TODO: Check BR-I-005: PAUSED items cannot be added
    // TODO: Check item availability at add time (soft check)
    // TODO: BR-C-001: cross-category/cross-vendor items allowed
    // TODO: Add to cart
    // TODO: Emit cart.item_added analytics event

    return successResponse(
      {
        cart_line_id: crypto.randomUUID(),
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
      ERROR_CODES.ITEM_NOT_FOUND,
      'Inventory item not found',
      requestId,
      404
    );
  }
}
