import { NOT_FOUND_ERROR } from '@/modules/core/lib/errors';
import type { ApiResponse } from '@/modules/core/types/api';
import { INSTITUTION_MOCK } from '@/modules/dashboard/instituciones/core/lib/mock';
import type { Institution } from '@/modules/dashboard/instituciones/core/types/institution';

class InstitutionService {
  async getInstitutions(userId: string): ApiResponse<Institution[]> {
    console.log('[getInstitutionsGroupedByRoleMock]: userId --> ', userId);
    return {
      data: INSTITUTION_MOCK,
      error: undefined,
    };
  }

  async getInstitutionById(institutionId: string): ApiResponse<Institution> {
    const i = INSTITUTION_MOCK.find((ins) => ins.id);
    console.log('[getInstitutionById] institutionId --> ', institutionId);
    if (!i) {
      return {
        data: undefined,
        error: NOT_FOUND_ERROR,
      };
    }
    return {
      data: i,
      error: undefined,
    };
  }
}

export const institutionService = () => new InstitutionService();
