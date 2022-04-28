import { paginatedResultAllSchema } from './paginatedResultAllSchema';
import { userSchema } from './userSchema';

export const userResultSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'string',
    },
    user: userSchema,
  },
};

export const userResultAllSchema = paginatedResultAllSchema('#/schemas/user');
