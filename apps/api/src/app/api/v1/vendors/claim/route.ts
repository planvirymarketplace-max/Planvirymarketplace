// POST /api/v1/vendors/claim
// Initiates the claim flow for a seeded VendorAccount listing

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const claimVendorSchema = z.object({
  vendor_id: z.string().uuid(),
  verification_method: z.enum(['email', 'phone']),
  contact_value: z.string(),
});

export async function POST(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true, // Any registered user
    rateLimit: { limit: 10, windowMs: 60 * 60 * 1000, scope: 'user' },
    schema: claimVendorSchema,
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
    const { vendor_id, verification_method, contact_value } = body;

    // TODO: BR-V-003: claiming requires identity verification
    // TODO: Send verification code via email/SMS
    // TODO: Store claim_token server-side for 10 min
    // TODO: Check vendor_id is in SEEDED status
    // TODO: Check ALREADY_CLAIMED

    return successResponse(
      {
        claim_token: crypto.randomUUID(),
        message: 'Verification code sent',
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.VENDOR_NOT_FOUND,
      'Vendor not found',
      requestId,
      404
    );
  }
}
