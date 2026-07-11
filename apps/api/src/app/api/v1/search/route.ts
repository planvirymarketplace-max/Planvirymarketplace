// GET /api/v1/search
// Primary full-text + faceted search across all published InventoryItems

import { NextRequest } from 'next/server';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

export async function GET(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: false, // Optional
    rateLimit: { limit: 300, windowMs: 60 * 1000, scope: 'ip' }, // 300 / minute / IP
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId } = middlewareResult.context;
  const { searchParams } = new URL(req.url);

  const q = searchParams.get('q');
  const location_id = searchParams.get('location_id');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const radius_km = searchParams.get('radius_km');

  if (!q || q.length < 1) {
    return errorResponse(
      ERROR_CODES.QUERY_TOO_SHORT,
      'Query too short',
      requestId,
      400
    );
  }

  if (!location_id && (!lat || !lng || !radius_km)) {
    return errorResponse(
      ERROR_CODES.LOCATION_REQUIRED,
      'location_id or (lat, lng, radius_km) required',
      requestId,
      400
    );
  }

  try {
    const category = searchParams.getAll('category');
    const price_min_cents = searchParams.get('price_min_cents');
    const price_max_cents = searchParams.get('price_max_cents');
    const date_from = searchParams.get('date_from');
    const date_to = searchParams.get('date_to');
    const attendees = searchParams.get('attendees');
    const sort = searchParams.get('sort') || 'relevance';
    const page = parseInt(searchParams.get('page') || '1');
    const per_page = Math.min(parseInt(searchParams.get('per_page') || '24'), 48);

    // TODO: Query Algolia for search results
    // TODO: CONFLICT-007: federated search ranking resolution needed
    // TODO: Fallback to Postgres pg_trgm if Algolia unavailable
    // TODO: Return meta.degraded_mode: true if fallback used

    return successResponse(
      {
        hits: [],
        facets: {
          category: {},
          price_range: {},
        },
        total_hits: 0,
        page,
        per_page,
        query_id: crypto.randomUUID(),
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Search failed',
      requestId,
      500
    );
  }
}
