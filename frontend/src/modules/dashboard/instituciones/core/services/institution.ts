import { authService } from '@/modules/auth/core/services/auth';
import { INTERNAL_SERVER_ERROR } from '@/modules/core/lib/errors';
import { ApiService } from '@/modules/core/services/api';
import type { ApiResponse } from '@/modules/core/types/api';
import type {
  Institution,
  InstitutionWithProcesses,
} from '@/modules/dashboard/instituciones/core/types/institution';
import type { AstroCookies } from 'astro';

class InstitutionService extends ApiService {
  constructor() {
    super('institutions');
  }

  async getInstitutions(cookies: AstroCookies): ApiResponse<Institution[]> {
    const { data: sessionToken, error } =
      await authService.validateSessionToken(cookies);

    if (error) {
      return {
        data: undefined,
        error: error,
      };
    }

    try {
      return this.request<Institution[]>({
        options: {
          method: 'GET',
          headers: {
            Cookie: `session_token=${sessionToken}`,
          },
        },
      });
    } catch (error) {
      console.log('[getInstitutions] Error:', error);
      return {
        data: undefined,
        error: INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getInstitutionByIdWithProcesses(
    institutionId: string,
    cookies: AstroCookies,
  ): ApiResponse<InstitutionWithProcesses> {
    const { data: sessionToken, error } =
      await authService.validateSessionToken(cookies);

    if (error) {
      return {
        data: undefined,
        error: error,
      };
    }
    try {
      return this.request<InstitutionWithProcesses>({
        mapping: institutionId,
        options: {
          method: 'GET',
          headers: {
            Cookie: `session_token=${sessionToken}`,
          },
        },
      });
    } catch (error) {
      console.log('[getInstitutionById] Error:', error);
      return {
        data: undefined,
        error: INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export const institutionService = new InstitutionService();
