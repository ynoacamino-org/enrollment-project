import type { Roles } from '@/modules/auth/core/lib/roles';

export type Role = (typeof Roles)[keyof typeof Roles];
