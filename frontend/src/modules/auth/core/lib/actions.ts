import { authService } from '@/modules/auth/core/services/auth';
import { defineAction } from 'astro:actions';

export const user = {
  getUser: defineAction({
    handler: async (_, context) => {
      const { data, error } = await authService.getUser(context.cookies);
      if (error) {
        throw error;
      }
      return data;
    },
  }),
  logout: defineAction({
    handler: async (_, context) => {
      const { data, error } = await authService.logout(context.cookies);
      if (error) {
        throw error;
      }
      return data;
    },
  }),
};
