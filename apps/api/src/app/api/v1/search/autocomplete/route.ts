// GET /api/v1/search/autocomplete
// Returns autocomplete suggestions for the search bar

import { NextRequest } from 'next/server';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

export async function GET(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: false, // Optional
    rateLimit: { limit: 600, windowMs: 60 * 1000, scope: 'ip' }, // 600 / minute / IP
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId } = middlewareResult.context;
  const { searchParams } = new URL(req.url);

  const q = searchParams.get('q');
  const category = searchParams.get('category');
  const location_id = searchParams.get('location_id');

  if (!q || q.length < 2) {
    return errorResponse(
      ERROR_CODES.QUERY_TOO_SHORT,
      'Query too short (min 2 chars)',
      requestId,
      400
    );
  }

  try {
    // TODO: Query Algolia autocomplete
    // TODO: Cache results for q >= 4 chars at Edge for 300s

    return successResponse(
      {
        suggestions: [],
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Autocomplete failed',
      requestId,
      500
    );
  }
}
