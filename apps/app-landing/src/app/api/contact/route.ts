import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.email || !body.department || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    // In production, this would send an email or create a ticket
    return NextResponse.json({ success: true, message: 'Contact form submitted' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to process' }, { status: 500 });
  }
}
