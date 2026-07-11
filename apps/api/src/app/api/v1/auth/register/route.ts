// POST /api/v1/auth/register
// Creates user_profiles record after Supabase Auth signup

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const registerSchema = z.object({
  display_name: z.string().min(1).max(80),
  timezone: z.string().optional(),
  locale: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true, // Supabase anon JWT (new user token from signup)
    rateLimit: { limit: 10, windowMs: 60 * 60 * 1000, scope: 'ip' }, // 10 requests / hour / IP
    schema: registerSchema,
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
    const { display_name, timezone, locale } = body;

    // TODO: Check if user profile already exists
    // TODO: Insert user_profiles row
    // TODO: Queue welcome email (template: email-welcome)
    // TODO: Emit user.registered analytics event

    return successResponse(
      {
        user_id: auth.userId,
        display_name,
        created_at: new Date().toISOString(),
      },
      requestId,
      201
    );
  } catch (error) {
    // TODO: Check for USER_ALREADY_EXISTS error
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Failed to create user profile',
      requestId,
      500
    );
  }
}
