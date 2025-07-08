import type { ErrorResponse } from '@/modules/core/types/error';

export const INTERNAL_SERVER_ERROR: ErrorResponse = {
  message: 'Un error ha ocurrido en el servidor.',
  status: 500,
};

export const NOT_FOUND_ERROR: ErrorResponse = {
  message: 'El recurso solicitado no fue encontrado.',
  status: 404,
};

export const UNAUTHORIZED_ERROR: ErrorResponse = {
  message: 'No tienes permiso para acceder a este recurso.',
  status: 401,
};
