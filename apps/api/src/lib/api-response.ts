// API Response Envelope Utilities per Part XI 11.2.1

import { NextResponse } from 'next/server';

export interface ApiSuccessMeta {
  request_id: string;
}

export interface ApiErrorMeta {
  request_id: string;
}

export interface ApiError {
  code: string;
  message: string;
  field?: string | null;
}

export interface ApiSuccessEnvelope<T> {
  data: T;
  meta: ApiSuccessMeta;
}

export interface ApiErrorEnvelope {
  error: ApiError;
  meta: ApiErrorMeta;
}

export function successResponse<T>(
  data: T,
  requestId: string,
  status: number = 200
): NextResponse<ApiSuccessEnvelope<T>> {
  return NextResponse.json(
    {
      data,
      meta: { request_id: requestId },
    },
    { status }
  );
}

export function errorResponse(
  code: string,
  message: string,
  requestId: string,
  status: number = 500,
  field?: string | null
): NextResponse<ApiErrorEnvelope> {
  return NextResponse.json(
    {
      error: {
        code,
        message,
        field: field ?? null,
      },
      meta: { request_id: requestId },
    },
    { status }
  );
}

export function generateRequestId(): string {
  return crypto.randomUUID();
}
