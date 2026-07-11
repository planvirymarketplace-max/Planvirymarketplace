// POST /api/v1/itineraries/:id/share
// Generates a shareable link or invites specific users by email

import { NextRequest } from 'next/server';
import { z } from 'zod';
import { runMiddlewareChain } from '@/lib/middleware';
import { successResponse, errorResponse } from '@/lib/api-response';
import { ERROR_CODES } from '@/lib/error-codes';

const shareItinerarySchema = z.object({
  type: z.enum(['link', 'email']),
  permission: z.enum(['VIEW', 'EDIT']),
  emails: z.array(z.string().email()).optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const middlewareResult = await runMiddlewareChain(req, {
    requireAuth: true,
    rateLimit: { limit: 60, windowMs: 60 * 60 * 1000, scope: 'user' },
    schema: shareItinerarySchema,
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
    const { type, permission, emails } = body;

    // TODO: Check itinerary owner or EDIT member permission
    // TODO: BR-IT-001: itinerary must have >= 1 Reservation
    // TODO: BR-IT-002: invited users get specified permission; link recipients get VIEW by default
    // TODO: Send invitation emails (template: email-itinerary-invite)
    // TODO: Emit itinerary.shared analytics event

    return successResponse(
      {
        share_url: type === 'link' ? `https://planviry.com/itineraries/${id}` : undefined,
        invited_emails: type === 'email' ? emails : undefined,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
      requestId
    );
  } catch (error) {
    return errorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      'Failed to share itinerary',
      requestId,
      500
    );
  }
}
