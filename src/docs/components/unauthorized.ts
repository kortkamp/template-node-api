export const unauthorized = {
  description: 'Unauthenticated user',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
