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
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
    },
    roles: {
      type: 'array',
      items: {
        $ref: '#/schemas/role',
      },
    },
  },
};
