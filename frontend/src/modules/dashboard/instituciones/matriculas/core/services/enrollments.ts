import { authService } from '@/modules/auth/core/services/auth';
import { INTERNAL_SERVER_ERROR } from '@/modules/core/lib/errors';
import { ApiService } from '@/modules/core/services/api';
import type { AstroCookies } from 'astro';

class EnrollmentService extends ApiService {
  constructor() {
    super('enrollments');
  }
  async enroll(sectionIds: string[], cookies: AstroCookies) {
    const { data: sessionToken, error } =
      await authService.validateSessionToken(cookies);

    if (error) {
      return {
        data: undefined,
        error: error,
      };
    }

    try {
      console.log(JSON.stringify(sectionIds));
      return this.request({
        mapping: 'enroll',
        options: {
          method: 'POST',
          headers: {
            Cookie: `session_token=${sessionToken}`,
          },
          body: JSON.stringify(sectionIds),
        },
      });
    } catch (error) {
      console.log('[enroll] Error:', error);
      return {
        data: undefined,
        error: INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export const enrollmentService = new EnrollmentService();
