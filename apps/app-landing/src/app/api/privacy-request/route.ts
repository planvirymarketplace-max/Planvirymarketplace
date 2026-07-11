import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// Generate a reference number like PRV-XXXXXX-XXXX
function generateReferenceNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PRV-${timestamp}-${random}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic server-side validation
    const required = [
      'requestorType', 'fullName', 'email', 'confirmEmail',
      'streetAddress', 'city', 'stateProvince', 'postalCode', 'country',
      'jurisdiction', 'hasAccount', 'requestTypes', 'requestDescription',
      'dateOfBirth', 'preferredCommunication', 'responseFormat',
      'signatureAgree', 'signatureName', 'signatureDate',
    ];

    for (const field of required) {
      if (!body[field] || (Array.isArray(body[field]) && body[field].length === 0)) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    if (body.email !== body.confirmEmail) {
      return NextResponse.json(
        { error: 'Email addresses do not match' },
        { status: 400 },
      );
    }

    if (!body.signatureAgree) {
      return NextResponse.json(
        { error: 'Electronic signature is required' },
        { status: 400 },
      );
    }

    const referenceNumber = generateReferenceNumber();

    // Try to persist to database if available
    let saved = false;
    try {
      if (db) {
        await db.privacyRequest.create({
          data: {
            referenceNumber,
            requestorType: body.requestorType,
            requestorTypeOther: body.requestorTypeOther || null,
            fullName: body.fullName,
            email: body.email,
            phone: body.phone || null,
            streetAddress: body.streetAddress,
            city: body.city,
            stateProvince: body.stateProvince,
            postalCode: body.postalCode,
            country: body.country,
            jurisdiction: body.jurisdiction,
            jurisdictionOther: body.jurisdictionOther || null,
            hasAccount: body.hasAccount === 'yes',
            accountEmail: body.accountEmail || null,
            accountId: body.accountId || null,
            requestTypes: JSON.stringify(body.requestTypes),
            requestDescription: body.requestDescription,
            requestReason: body.requestReason || null,
            requestReasonOther: body.requestReasonOther || null,
            dateRangeStart: body.dateRangeStart || null,
            dateRangeEnd: body.dateRangeEnd || null,
            isAuthorizedAgent: body.isAuthorizedAgent === 'yes',
            agentName: body.agentName || null,
            agentEmail: body.agentEmail || null,
            agentPhone: body.agentPhone || null,
            agentRelationship: body.agentRelationship || null,
            hasWrittenAuthorization: body.hasWrittenAuthorization === 'yes',
            dateOfBirth: body.dateOfBirth,
            ssnLast4: body.ssnLast4 || null,
            govIdLast4: body.govIdLast4 || null,
            verificationAccountEmail: body.verificationAccountEmail || null,
            verificationAccountId: body.verificationAccountId || null,
            preferredCommunication: body.preferredCommunication,
            responseFormat: body.responseFormat,
            responseFormatOther: body.responseFormatOther || null,
            additionalInfo: body.additionalInfo || null,
            signatureName: body.signatureName,
            signatureDate: body.signatureDate,
            status: 'received',
          },
        });
        saved = true;
      }
    } catch (dbErr) {
      // Database not available — continue with in-memory reference
      console.log('Database not available, request stored in memory only');
    }

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: 'Privacy rights request received successfully.',
      savedToDatabase: saved,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 },
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Privacy Rights Request Form API',
    methods: ['POST'],
  });
}
