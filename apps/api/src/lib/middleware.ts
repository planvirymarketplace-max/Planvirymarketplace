// API Middleware Chain per Part XI 11.2.3

import { NextRequest, NextResponse } from 'next/server';
import { errorResponse, generateRequestId } from './api-response';
import { ERROR_CODES, getHttpStatusForErrorCode } from './error-codes';

export interface AuthContext {
  userId?: string;
  role?: string;
  vendorId?: string;
  isAuthenticated: boolean;
}

export interface MiddlewareContext {
  requestId: string;
  auth: AuthContext;
}

// Rate limiting check (placeholder - needs Redis or similar for production)
export async function rateLimitCheck(
  req: NextRequest,
  limit: number,
  windowMs: number,
  scope: 'ip' | 'user'
): Promise<{ allowed: boolean; error?: NextResponse }> {
  // TODO: Implement actual rate limiting with Redis
  // For now, always allow
  return { allowed: true };
}

// JWT validation (placeholder - needs Supabase Auth integration)
export async function validateJwt(
  req: NextRequest
): Promise<AuthContext> {
  const authHeader = req.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { isAuthenticated: false };
  }
  
  const token = authHeader.substring(7);
  
  // TODO: Validate with Supabase Auth
  // For now, return unauthenticated
  return { isAuthenticated: false };
}

// Zod schema validation
export function validateSchema<T>(
  schema: { safeParse: (data: unknown) => { success: boolean; error?: any } },
  data: unknown
): { valid: boolean; errors?: Array<{ field: string; message: string }> } {
  const result = schema.safeParse(data);
  
  if (!result.success && result.error) {
    const errors = result.error.errors?.map((err: any) => ({
      field: err.path?.join('.') || 'unknown',
      message: err.message,
    })) || [];
    return { valid: false, errors };
  }
  
  return { valid: true };
}

// Business rule pre-checks (placeholder - to be implemented per endpoint)
export async function businessRuleChecks(
  context: MiddlewareContext,
  rules: string[]
): Promise<{ passed: boolean; error?: NextResponse }> {
  // TODO: Implement business rule assertions
  return { passed: true };
}

// Main middleware chain
export async function runMiddlewareChain(
  req: NextRequest,
  options: {
    requireAuth?: boolean;
    rateLimit?: { limit: number; windowMs: number; scope: 'ip' | 'user' };
    schema?: { safeParse: (data: unknown) => unknown };
    businessRules?: string[];
  }
): Promise<{ context: MiddlewareContext; error?: NextResponse }> {
  const requestId = generateRequestId();
  
  // 1. Rate limit check
  if (options.rateLimit) {
    const rateLimitResult = await rateLimitCheck(
      req,
      options.rateLimit.limit,
      options.rateLimit.windowMs,
      options.rateLimit.scope
    );
    if (!rateLimitResult.allowed) {
      return {
        context: { requestId, auth: { isAuthenticated: false } },
        error: errorResponse(
          ERROR_CODES.RATE_LIMIT_EXCEEDED,
          'Rate limit exceeded',
          requestId,
          429
        ),
      };
    }
  }
  
  // 2. JWT validation
  const auth = await validateJwt(req);
  if (options.requireAuth && !auth.isAuthenticated) {
    return {
      context: { requestId, auth },
      error: errorResponse(
        ERROR_CODES.NOT_AUTHENTICATED,
        'Authentication required',
        requestId,
        401
      ),
    };
  }
  
  const context: MiddlewareContext = { requestId, auth };
  
  // 3. Zod schema validation (if body provided)
  if (options.schema && req.method !== 'GET') {
    try {
      const body = await req.json();
      const validation = validateSchema(options.schema, body);
      if (!validation.valid) {
        return {
          context,
          error: errorResponse(
            ERROR_CODES.VALIDATION_ERROR,
            'Validation failed',
            requestId,
            400,
            validation.errors?.[0]?.field
          ),
        };
      }
    } catch {
      // Invalid JSON
      return {
        context,
        error: errorResponse(
          ERROR_CODES.VALIDATION_ERROR,
          'Invalid JSON body',
          requestId,
          400
        ),
      };
    }
  }
  
  // 4. Business rule pre-checks
  if (options.businessRules) {
    const ruleResult = await businessRuleChecks(context, options.businessRules);
    if (!ruleResult.passed && ruleResult.error) {
      return { context, error: ruleResult.error };
    }
  }
  
  return { context };
}
