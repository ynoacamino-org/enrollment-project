import { authService } from '@/modules/auth/core/services/auth';
import { INTERNAL_SERVER_ERROR } from '@/modules/core/lib/errors';
import { ApiService } from '@/modules/core/services/api';
import type { ApiResponse } from '@/modules/core/types/api';
import type { EnrollmentSection } from '@/modules/dashboard/instituciones/matriculas/core/types/process';
import type { AstroCookies } from 'astro';

class CoursesService extends ApiService {
  constructor() {
    super('courses');
  }

  async getSectionsByCourseId(
    courseId: string,
    cookies: AstroCookies,
  ): ApiResponse<EnrollmentSection[]> {
    const { data: sessionToken, error } =
      await authService.validateSessionToken(cookies);

    if (error) {
      return {
        data: undefined,
        error: error,
      };
    }
    try {
      return this.request<EnrollmentSection[]>({
        mapping: `${courseId}/sections`,
        options: {
          method: 'GET',
          headers: {
            Cookie: `session_token=${sessionToken}`,
          },
        },
      });
    } catch (error) {
      console.error('[getCoursesByProcessId] Error:', error);
      return {
        data: undefined,
        error: INTERNAL_SERVER_ERROR,
      };
    }
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
        mapping: 'enrollmented',
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

export const coursesService = new CoursesService();
