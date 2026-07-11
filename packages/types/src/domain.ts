import { z } from 'zod';

// Domain entity types per Part III
export enum UserRole {
  CONSUMER = 'CONSUMER',
  VENDOR_OWNER = 'VENDOR_OWNER',
  VENDOR_MANAGER = 'VENDOR_MANAGER',
  VENDOR_STAFF = 'VENDOR_STAFF',
  MODERATOR = 'MODERATOR',
  ADMIN = 'ADMIN',
}

export enum InventoryCategory {
  LODGING = 'LODGING',
  VACATION_RENTAL = 'VACATION_RENTAL',
  FLIGHT = 'FLIGHT',
  CAR_RENTAL = 'CAR_RENTAL',
  EXPERIENCE = 'EXPERIENCE',
  EVENT_TICKET = 'EVENT_TICKET',
  VENUE_SPACE = 'VENUE_SPACE',
  VENDOR_SERVICE = 'VENDOR_SERVICE',
  DINING_RESERVATION = 'DINING_RESERVATION',
  CRUISE_CABIN = 'CRUISE_CABIN',
  TRANSIT = 'TRANSIT',
}

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
  NO_SHOW = 'NO_SHOW',
}

export enum InventoryStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  PAUSED = 'PAUSED',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
  DELETED = 'DELETED',
}

// Zod schemas for validation
export const UserRoleSchema = z.nativeEnum(UserRole);
export const InventoryCategorySchema = z.nativeEnum(InventoryCategory);
export const ReservationStatusSchema = z.nativeEnum(ReservationStatus);
export const InventoryStatusSchema = z.nativeEnum(InventoryStatus);
