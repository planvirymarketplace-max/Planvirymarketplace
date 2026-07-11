// GET /api/v1/auth/me
// Returns authenticated user's profile, role, and vendor memberships
// PATCH /api/v1/auth/me
// Updates user profile fields

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const updateProfileSchema = z.object({
  display_name: z.string().min(1).max(80).optional(),
  timezone: z.string().optional(),
  locale: z.string().optional(),
  notification_prefs: z.record(z.any()).optional(),
}).partial();

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

  try {
    // TODO: Query user_profiles, vendor_memberships
    // TODO: Return profile with role, email_verified, vendor_memberships, notification_prefs

    return successResponse(
      {
        user_id: auth.userId,
        display_name: 'User', // TODO: from DB
        role: 'CONSUMER', // TODO: from DB
        email_verified: true, // TODO: from DB
        vendor_memberships: [], // TODO: from DB
        notification_prefs: {}, // TODO: from DB
        created_at: new Date().toISOString(),
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Failed to fetch user profile',
      requestId,
      500
    );
  }
}

export async function PATCH(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 30, windowMs: 60 * 60 * 1000, scope: 'user' }, // 30 requests / hour / user
    schema: updateProfileSchema,
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

    // TODO: Validate timezone (IANA), locale (BCP-47)
    // TODO: Update user_profiles
    // TODO: Emit user.profile_updated analytics event

    return successResponse(
      {
        updated: Object.keys(body),
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Failed to update user profile',
      requestId,
      500
    );
  }
}
