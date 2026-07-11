// POST /api/v1/events/:event_id/ticket-tiers
// Adds a ticket tier to an existing Event

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const addTicketTierSchema = z.object({
  name: z.string(),
  type: z.enum(['GENERAL', 'VIP', 'EARLY_BIRD', 'COMP']),
  price_cents: z.number().int().min(0),
  is_free: z.boolean().optional(),
  capacity: z.number().int(),
  sales_start_at: z.string().datetime().optional(),
  sales_end_at: z.string().datetime().optional(),
  min_per_order: z.number().int().optional(),
  max_per_order: z.number().int().optional(),
  is_hidden: z.boolean().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { event_id: string } }
) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 60, windowMs: 60 * 60 * 1000, scope: 'user' },
    schema: addTicketTierSchema,
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId, auth } = middlewareResult.context;
  const { event_id } = params;

  if (!auth.userId || !auth.vendorId) {
    return errorResponse(
      ERROR_CODES.NOT_AUTHENTICATED,
      'Valid JWT required',
      requestId,
      401
    );
  }

  try {
    const body = await req.json();

    // TODO: Check VENDOR_OWNER or VENDOR_MANAGER of event's VendorAccount
    // TODO: Validate BR-EV-007, BR-EV-008
    // TODO: Validate sales_end_at <= event starts_at
    // TODO: Check EVENT_SOLD_OUT (capacity already exceeded)

    return successResponse(
      {
        tier_id: crypto.randomUUID(),
        ...body,
      },
      requestId,
      201
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INVALID_TIER_TYPE,
      'Invalid ticket tier type',
      requestId,
      400
    );
  }
}
