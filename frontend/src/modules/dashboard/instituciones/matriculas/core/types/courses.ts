import type { EnrollmentSection } from '@/modules/dashboard/instituciones/matriculas/core/types/process';

export type EnrollmentCourse = {
  id: number;
  name: string;
  credits: number;
  cicle_number: number;
};

export type SelectedCourse = EnrollmentCourse & {
  section: EnrollmentSection;
};
