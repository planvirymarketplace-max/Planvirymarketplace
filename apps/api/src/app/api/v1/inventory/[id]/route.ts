// GET /api/v1/inventory/:id
// Returns full detail for a single InventoryItem
// PATCH /api/v1/inventory/:id
// Updates fields on a DRAFT or PAUSED InventoryItem
// DELETE /api/v1/inventory/:id
// Archives (soft-deletes) an InventoryItem

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const updateInventorySchema = z.object({
  title: z.string().min(3).max(200).optional(),
  description: z.string().max(5000).optional(),
  price_cents: z.number().int().min(0).optional(),
  metadata: z.record(z.any()).optional(),
  capacity: z.number().int().optional(),
  quantity_available: z.number().int().optional(),
  location_id: z.string().uuid().optional(),
}).partial();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: false, // Optional
    rateLimit: { limit: 600, windowMs: 60 * 1000, scope: 'ip' }, // 600 requests / minute / IP
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId } = middlewareResult.context;
  const { id } = params;

  try {
    // TODO: Query inventory_items by id
    // TODO: RLS: only PUBLISHED items visible to anon/consumer
    // TODO: Include vendor, media, pricing_rules, availability

    return successResponse(
      {
        id,
        title: 'Sample Item',
        category: 'LODGING',
        vendor: { id: 'vendor-1', name: 'Sample Vendor', slug: 'sample-vendor', stripe_charges_enabled: true },
        media: [],
        pricing_rules: [],
        availability: [],
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.NOT_FOUND,
      'Inventory item not found',
      requestId,
      404
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 120, windowMs: 60 * 60 * 1000, scope: 'user' }, // 120 / hour / vendor
    schema: updateInventorySchema,
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

    // TODO: Check BR-I-004: only owning vendor may update
    // TODO: Validate against CONFIRMED Reservations
    // TODO: Update inventory_items
    // TODO: If PUBLISHED: re-queue Algolia index update
    // TODO: Emit inventory.updated analytics event

    return successResponse(
      {
        id,
        ...body,
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.NOT_AUTHORIZED,
      'Not authorized to update this item',
      requestId,
      403
    );
  }
}

export async function DELETE(
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
    // TODO: Check BR-I-003: item with active Reservations cannot be archived
    // TODO: Set status = 'ARCHIVED', archived_at = NOW()
    // TODO: Remove Algolia document

    return new Response(null, { status: 204 });
  } catch (error) {
    return errorResponse(
      ERROR_CODES.HAS_ACTIVE_RESERVATIONS,
      'Cannot archive item with active reservations',
      requestId,
      409
    );
  }
}
