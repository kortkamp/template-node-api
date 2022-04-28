export const loginParamsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  example: {
    email: 'user@template.com',
    password: '123456',
  },
  required: ['email', 'password'],
};
