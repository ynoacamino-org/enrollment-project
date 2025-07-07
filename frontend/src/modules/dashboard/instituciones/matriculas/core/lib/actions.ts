import { coursesService } from '@/modules/dashboard/instituciones/matriculas/core/services/courses';
import { enrollmentService } from '@/modules/dashboard/instituciones/matriculas/core/services/enrollments';
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

export const enrollments = {
  enroll: defineAction({
    handler: async (sectionIds, ctx) => {
      const { data, error } = await enrollmentService.enroll(
        sectionIds,
        ctx.cookies,
      );
      if (error) {
        throw error;
      }
      return data;
    },
  }),
};
