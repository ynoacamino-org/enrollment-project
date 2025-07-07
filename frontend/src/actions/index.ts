import { user } from '@/modules/auth/core/lib/actions';
import {
  courses,
  enrollments,
} from '@/modules/dashboard/instituciones/matriculas/core/lib/actions';

export const server = {
  user,
  courses,
  enrollments,
};
