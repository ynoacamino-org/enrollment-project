import useSWR from 'swr';
import { actions } from 'astro:actions';

export const useSections = (
  { courseId }: { courseId: number },
  options?: { enabled?: boolean },
) => {
  const enabled = options?.enabled ?? true;

  const { data, error, isLoading } = useSWR(
    enabled ? ['getSectionsByCourseId', courseId] : null,
    () => actions.courses.getSectionsByCourseId(courseId),
  );

  return {
    sections: data?.data,
    isLoading,
    error: error || data?.error,
  };
};
