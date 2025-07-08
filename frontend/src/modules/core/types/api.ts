import type { ErrorResponse } from '@/modules/core/types/error';

export type ApiResponse<T> = Promise<
  | {
      data: T;
      error: undefined;
    }
  | {
      data: undefined;
      error: ErrorResponse;
    }
>;
