import useSWR from 'swr';
import { enrollmentSectionService } from './section';

export const useSeccions = (
  { courseId }: { courseId: number },
  options?: { enabled?: boolean },
) => {
  const enabled = options?.enabled ?? true;

  const { data, error, isLoading } = useSWR(
    enabled ? ['getSectionsByCourseId', courseId] : null,
    () => enrollmentSectionService().getEnrollmentCourseById(courseId),
  );

  return {
    sections: data?.data,
    isLoading,
    error: error || data?.error,
  };
};
