export const userPath = {
  post: {
    tags: ['Users'],
    summary: 'Route to create users',
    description: 'This route allows to create new users',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/userParams',
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/user',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Users'],
    summary: 'Route to list users',
    description: 'This route allows to list users',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/userResultAll',
            },
          },
        },
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
