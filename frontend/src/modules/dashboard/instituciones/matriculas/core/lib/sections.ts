import type { EnrollmentSection } from '@/modules/dashboard/instituciones/matriculas/core/types/process';

// TODO: Función para verficar cruces de horarios
export function isAvailableSection(section: EnrollmentSection): boolean {
  console.log(
    'isAvailableSection: ',
    section.taken_places < section.total_places,
  );
  return section.taken_places < section.total_places;
}
