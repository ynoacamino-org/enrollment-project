import type { ApiResponse } from '@/modules/core/types/api';
import {
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED_ERROR,
} from '@/modules/core/lib/errors';
import type { AstroCookies } from 'astro';
import type { User } from '@/modules/auth/core/types/user';
import { ApiService } from '@/modules/core/services/api';

class AuthService extends ApiService {
  constructor() {
    super('auth');
  }

  async validateSessionToken(cookies: AstroCookies): ApiResponse<string> {
    const sessionToken = cookies.get('session_token')?.value;

    if (!sessionToken) {
      return {
        data: undefined,
        error: UNAUTHORIZED_ERROR,
      };
    }
    return { data: sessionToken, error: undefined };
  }

  async getUser(cookies: AstroCookies): ApiResponse<User> {
    const { data: sessionToken, error } =
      await this.validateSessionToken(cookies);

    if (error) {
      return {
        data: undefined,
        error: error,
      };
    }

    try {
      return this.request<User>({
        mapping: 'me',
        options: {
          method: 'GET',
          headers: {
            Cookie: `session_token=${sessionToken}`,
          },
        },
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      return {
        data: undefined,
        error: INTERNAL_SERVER_ERROR,
      };
    }
  }

  async logout(cookies: AstroCookies): ApiResponse<void> {
    const { data: sessionToken, error } =
      await this.validateSessionToken(cookies);

    if (error) {
      return {
        data: undefined,
        error: error,
      };
    }

    try {
      const { error } = await this.request<void>({
        mapping: 'logout',
        options: {
          method: 'POST',
          headers: {
            Cookie: `session_token=${sessionToken}`,
          },
        },
      });

      if (error) return { data: undefined, error };

      cookies.delete('session_token', {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      });
      return { data: undefined, error: undefined };
    } catch (error) {
      console.error('Error logging out:', error);
      return {
        data: undefined,
        error: INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export const authService = new AuthService();
