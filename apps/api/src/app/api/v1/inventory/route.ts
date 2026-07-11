// GET /api/v1/inventory
// Returns paginated list of published InventoryItems matching filters
// POST /api/v1/inventory
// Creates a new InventoryItem in DRAFT state

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';
import { InventoryCategory } from '@planviry/types';

const createInventorySchema = z.object({
  category: z.nativeEnum(InventoryCategory),
  title: z.string().min(3).max(200),
  description: z.string().max(5000).optional(),
  price_cents: z.number().int().min(0),
  is_free: z.boolean().optional(),
  location_id: z.string().uuid(),
  metadata: z.record(z.any()),
  capacity: z.number().int().optional(),
  quantity_available: z.number().int().optional(),
});

export async function GET(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: false, // Optional (anon or authenticated)
    rateLimit: { limit: 300, windowMs: 60 * 1000, scope: 'ip' }, // 300 requests / minute / IP
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId } = middlewareResult.context;
  const { searchParams } = new URL(req.url);

  // Required: location_id OR (lat, lng, radius_km)
  const location_id = searchParams.get('location_id');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius_km = searchParams.get('radius_km');

  if (!location_id && (!lat || !lng || !radius_km)) {
    return errorResponse(
      ERROR_CODES.LOCATION_REQUIRED,
      'location_id or (lat, lng, radius_km) required',
      requestId,
      400
    );
  }

  try {
    const category = searchParams.get('category');
    const price_min_cents = searchParams.get('price_min_cents');
    const price_max_cents = searchParams.get('price_max_cents');
    const date_from = searchParams.get('date_from');
    const date_to = searchParams.get('date_to');
    const attendees = searchParams.get('attendees');
    const page = parseInt(searchParams.get('page') || '1');
    const per_page = Math.min(parseInt(searchParams.get('per_page') || '24'), 48);
    const sort = searchParams.get('sort') || 'relevance';

    // TODO: Query Algolia for search results
    // TODO: Fallback to Postgres pg_trgm if Algolia unavailable
    // TODO: Apply filters and pagination

    return successResponse(
      {
        items: [],
        total: 0,
        page,
        per_page,
        has_next: false,
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Failed to fetch inventory',
      requestId,
      500
    );
  }
}

export async function POST(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 60, windowMs: 60 * 60 * 1000, scope: 'user' }, // 60 creates / hour / vendor
    schema: createInventorySchema,
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId, auth } = middlewareResult.context;

  if (!auth.userId || !auth.vendorId) {
    return errorResponse(
      ERROR_CODES.NOT_A_VENDOR,
      'Vendor membership required',
      requestId,
      403
    );
  }

  try {
    const body = await req.json();

    // TODO: Validate category (BR-I-001)
    // TODO: Validate price (BR-I-006)
    // TODO: Validate metadata shape per category
    // TODO: Insert inventory_items row with status = 'DRAFT'
    // TODO: Emit inventory.draft analytics event

    return successResponse(
      {
        id: crypto.randomUUID(),
        status: 'DRAFT',
        ...body,
      },
      requestId,
      201
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Failed to create inventory item',
      requestId,
      500
    );
  }
}
