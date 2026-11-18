import type { Role } from '@/types';

export const ROLES = ['admin', 'waiter', 'kitchen'] as const;

export const HOME_BY_ROLE: Record<Role, string> = {
  admin: '/dashboard',
  waiter: '/floor',
  kitchen: '/kitchen',
};
