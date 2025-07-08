import type { EnrollmentProcess } from '@/modules/dashboard/instituciones/matriculas/core/types/process';

export type Institution = {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
};

export type InstitutionWithProcesses = Institution & {
  processes: EnrollmentProcess[];
};
