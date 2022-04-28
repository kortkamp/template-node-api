export const forbidden = {
  description: 'User not authorized to access that resource',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
