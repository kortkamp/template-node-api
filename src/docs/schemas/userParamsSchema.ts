export const userParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
    password_confirmation: {
      type: 'string',
    },
    role_id: {
      type: 'string',
      format: 'uuid',
    },
  },
  example: {
    name: 'User',
    email: 'user@template.com',
    password: '123456',
    password_confirmation: '123456',
    role_id: 'b197768d-66b4-4e09-bce3-441ff0173abe',
  },
};
