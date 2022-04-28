import { roleSchema } from './roleSchema';

export const roleResultSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'string',
    },
    user: roleSchema,
  },
};

export const roleResultAllSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/role',
  },
};
