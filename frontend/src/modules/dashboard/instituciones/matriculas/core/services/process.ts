import { INTERNAL_SERVER_ERROR } from '@/modules/core/lib/errors';
import type { ApiResponse } from '@/modules/core/types/api';
import type { EnrollmentProcess } from '@/modules/dashboard/instituciones/matriculas/core/types/process';
import { BACKEND_URL } from 'astro:env/client';

class EnrollmentProcessService {
  private enrrolmentApiUrl: string;

  constructor() {
    this.enrrolmentApiUrl = `${BACKEND_URL}`;
  }

  // async getAllEnrollmentProcesses(
  //   institutionId: string,
  // ): ApiResponse<EnrollmentProcess[]> {
  //   try {
  //     const response = await fetch(
  //       `${this.enrrolmentApiUrl}/processes/${institutionId}`,
  //       {
  //         method: 'GET',
  //       },
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       return {
  //         data: undefined,
  //         error: {
  //           status: response.status,
  //           message:
  //             errorData.message || 'Failed to fetch enrollment processes',
  //         },
  //       };
  //     }

  //     const data = await response.json();
  //     return { data, error: undefined };
  //   } catch (error) {
  //     console.error('[getAllEnrollmentProcesses] Error:', error);
  //     return {
  //       data: undefined,
  //       error: INTERNAL_SERVER_ERROR,
  //     };
  //   }
  // }

  async getEnrollmentProcessById(
    processId: string,
  ): ApiResponse<EnrollmentProcess> {
    try {
      const response = await fetch(
        `${this.enrrolmentApiUrl}/processes/${processId}/courses`,
        {
          method: 'GET',
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        return {
          data: undefined,
          error: {
            status: response.status,
            message: errorData.message || 'Failed to fetch enrollment process',
          },
        };
      }

      const data = await response.json();
      return { data, error: undefined };
    } catch (error) {
      console.error('[getEnrollmentProcessById] Error:', error);
      return {
        data: undefined,
        error: INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export const enrollmentProcessService = () => new EnrollmentProcessService();
