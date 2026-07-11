// POST /api/v1/vendors/claim/verify
// Completes claim flow by verifying the code

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const verifyClaimSchema = z.object({
  claim_token: z.string(),
  verification_code: z.string(),
});

export async function POST(req: NextRequest) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 10, windowMs: 60 * 60 * 1000, scope: 'user' },
    schema: verifyClaimSchema,
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
    const { claim_token, verification_code } = body;

    // TODO: Verify code
    // TODO: Check CLAIM_TOKEN_EXPIRED
    // TODO: Check ALREADY_CLAIMED
    // TODO: FSM: SEEDED → CLAIMED
    // TODO: Create VendorStaff row (user → OWNER)
    // TODO: Emit vendor.claimed event
    // TODO: Send onboarding email

    return successResponse(
      {
        vendor_id: crypto.randomUUID(),
        status: 'CLAIMED',
        vendor_portal_url: 'https://vendors.planviry.com',
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INVALID_CODE,
      'Invalid verification code',
      requestId,
      400
    );
  }
}
