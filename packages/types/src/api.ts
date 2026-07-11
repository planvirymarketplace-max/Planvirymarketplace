import { z } from 'zod';

// API request/response schemas
export const CartItemSchema = z.object({
  type: z.enum(['booking', 'ticket', 'lodging', 'experience', 'restaurant', 'external_event']),
  listing_id: z.string().uuid(),
  vendor_id: z.string().uuid().optional(),
  date: z.string().datetime().optional(),
  start_date: z.string().datetime().optional(),
  end_date: z.string().datetime().optional(),
  package_id: z.string().uuid().optional(),
  amount: z.number().int().min(0),
  deposit_amount: z.number().int().min(0).optional(),
  quantity: z.number().int().min(1).optional(),
  experience_slot_id: z.string().uuid().optional(),
  restaurant_id: z.string().uuid().optional(),
  party_size: z.number().int().min(1).optional(),
  reservation_time: z.string().datetime().optional(),
  external_event_id: z.string().uuid().optional(),
  ticket_url: z.string().url().optional(),
});

export type CartItem = z.infer<typeof CartItemSchema>;
