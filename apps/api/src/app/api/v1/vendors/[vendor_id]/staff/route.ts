// POST /api/v1/vendors/:vendor_id/staff
// Invites a user to join a VendorAccount as staff

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const inviteStaffSchema = z.object({
  email: z.string().email(),
  role: z.enum(['VENDOR_MANAGER', 'VENDOR_STAFF']),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { vendor_id: string } }
) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 30, windowMs: 60 * 60 * 1000, scope: 'user' },
    schema: inviteStaffSchema,
  });

  if (middlewareResult.error) {
    return middlewareResult.error;
  }

  const { requestId, auth } = middlewareResult.context;
  const { vendor_id } = params;

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
    const { email, role } = body;

    // TODO: Check VENDOR_OWNER of specified vendor_id
    // TODO: BR-V-002: user may hold at most one role per VendorAccount
    // TODO: Invited user must have existing platform account
    // TODO: Send staff invitation email
    // TODO: Emit vendor.staff_invited analytics event

    return successResponse(
      {
        invitation_id: crypto.randomUUID(),
        email,
        role,
        status: 'PENDING',
      },
      requestId,
      201
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.NOT_VENDOR_OWNER,
      'Not vendor owner',
      requestId,
      403
    );
  }
}
