import { authService } from '@/modules/auth/core/services/auth';
import { INTERNAL_SERVER_ERROR } from '@/modules/core/lib/errors';
import { ApiService } from '@/modules/core/services/api';
import type { ApiResponse } from '@/modules/core/types/api';

import type { AstroCookies } from 'astro';
import type { EnrollmentProcess } from '../types/process';

class ProcessService extends ApiService {
  constructor() {
    super('processes');
  }

  async getProcessById(
    proccessId: string,
    cookies: AstroCookies,
  ): ApiResponse<EnrollmentProcess> {
    const { data: sessionToken, error } =
      await authService.validateSessionToken(cookies);

    if (error) {
      return {
        data: undefined,
        error: error,
      };
    }

    try {
      return this.request<EnrollmentProcess>({
        mapping: `${proccessId}`,
        options: {
          method: 'GET',
          headers: {
            Cookie: `session_token=${sessionToken}`,
          },
        },
      });
    } catch (error) {
      console.log('[getProcessById] Error:', error);
      return {
        data: undefined,
        error: INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export const processService = new ProcessService();
