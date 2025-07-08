import { INTERNAL_SERVER_ERROR } from '@/modules/core/lib/errors';
import type { ApiResponse } from '@/modules/core/types/api';
import { BACKEND_URL } from 'astro:env/client';

abstract class ApiService {
  private endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  protected async request<T>({
    mapping,
    options,
  }: {
    mapping?: string;
    options?: RequestInit;
  }): ApiResponse<T> {
    const url = `${BACKEND_URL}/${this.endpoint}${mapping ? `/${mapping}` : ''}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json();
        return {
          data: undefined,
          error: {
            status: response.status,
            message: errorData.message || 'Request failed',
          },
        };
      }
      const data = (await response.json()) as T;
      return {
        data,
        error: undefined,
      };
    } catch (error) {
      console.error('API request error:', error);
      return {
        data: undefined,
        error: INTERNAL_SERVER_ERROR,
      };
    }
  }
}

export { ApiService };
