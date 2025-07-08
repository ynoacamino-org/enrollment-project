import { getRouteFromPath } from '@/modules/core/lib/routes';

// Only for faster matching
export const DASHBOARD_ENROLLMENT_ROUTE = getRouteFromPath(
  '/dashboard/instituciones/:institucion_id/matriculas/:matricula_id',
);

export const DASHBOARD_ENROLLMENTS_ROUTE = getRouteFromPath(
  '/dashboard/instituciones/:institucion_id/matriculas',
);

export const getEnrollmentProcessesPath = ({
  institucion_id,
}: {
  institucion_id: string;
}) => {
  return DASHBOARD_ENROLLMENTS_ROUTE.fullPath.replace(
    ':institucion_id',
    institucion_id,
  );
};

export const getEnrollmentProcessPath = ({
  institucion_id,
  matricula_id,
}: {
  institucion_id: string;
  matricula_id: string;
}) => {
  return DASHBOARD_ENROLLMENT_ROUTE.fullPath
    .replace(':institucion_id', institucion_id)
    .replace(':matricula_id', matricula_id);
};
