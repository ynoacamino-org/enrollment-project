import { INTERNAL_SERVER_ERROR } from '@/modules/core/lib/errors';
import type { ApiResponse } from '@/modules/core/types/api';
import type { EnrollmentSection } from '@/modules/dashboard/instituciones/matriculas/core/types/process';
import { BACKEND_URL } from 'astro:env/client';

class EnrollmentSectionService {
  private enrrolmentApiUrl: string;

  constructor() {
    this.enrrolmentApiUrl = `${BACKEND_URL}`;
  }

  async getEnrollmentCourseById(
    courseId: number,
  ): ApiResponse<EnrollmentSection[]> {
    try {
      const response = await fetch(
        `${this.enrrolmentApiUrl}/courses/${courseId}/sections`,
        {
          method: 'GET',
          credentials: 'include',
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          data: undefined,
          error: {
            status: response.status,
            message: errorData.message || 'Failed to fetch enrollment Section',
          },
        };
      }

      const data = await response.json();
      return { data, error: undefined };
    } catch (error) {
      console.error('[getEnrollmentSectionById] Error:', error);
      return {
        data: undefined,
        error: INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export const enrollmentSectionService = () => new EnrollmentSectionService();
