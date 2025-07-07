import { coursesService } from '@/modules/dashboard/instituciones/matriculas/core/services/courses';
import { defineAction } from 'astro:actions';

export const courses = {
  getSectionsByCourseId: defineAction({
    handler: async (courseId, ctx) => {
      const { data, error } = await coursesService.getSectionsByCourseId(
        courseId,
        ctx.cookies,
      );
      if (error) {
        throw error;
      }
      return data;
    },
  }),
};
