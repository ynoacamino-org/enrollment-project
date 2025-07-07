import type { EnrollmentProcessStates } from '@/modules/dashboard/instituciones/matriculas/core/lib/enrollment';
import type { EnrollmentCourse } from '@/modules/dashboard/instituciones/matriculas/core/types/courses';

export type EnrollmentProcessStatus =
  (typeof EnrollmentProcessStates)[keyof typeof EnrollmentProcessStates];

type BaseEnrollmentProcess = {
  id: string;
  institutionId: string;
};

// export type EnrollmentProcess = BaseEnrollmentProcess & {
//   name: string;
//   startAt: string;
//   endAt: string;
// };

export type EnrollmentProcessWithCourses = BaseEnrollmentProcess & {
  startAt: string;
  endAt: string;
  status: EnrollmentProcessStatus;
  courses: EnrollmentCourse[];
};

export type EnrollmentEvent = {
  id: number;
  start_date: string;
  end_date: string;
  section_id: string;
  installation_id: number;
  installation_name: string;
  modality_id: number;
  modality_name: string;
};

export type EnrollmentSection = {
  id: string;
  section_name: string;
  taken_places: number;
  total_places: number;
  events: EnrollmentEvent[];
};

export type EnrollmentProcess = {
  id: string;
  name: string;
  startDay: number;
  endDay: number;
  institutionId: string;
  courses: EnrollmentCourse[];
};
