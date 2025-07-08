import type { Roles } from '@/modules/auth/core/lib/roles';

export interface User {
  id: string;
  email: string;
  name: string;
  surname: string;
  avatar_url?: string;
}

export type Admin = User & {
  role: typeof Roles.ADMIN;
};

export type Student = User & {
  role: typeof Roles.STUDENT;
};

export type AuthRequired<U extends User = User> = {
  user: U;
};
