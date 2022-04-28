export const rolePath = {
  post: {
    tags: ['Roles'],
    summary: 'Route to create roles',
    description: 'This route allows to create new roles',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/roleParams',
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
              $ref: '#/schemas/role',
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
    tags: ['Roles'],
    summary: 'Route to list roles',
    description: 'This route allows to list roles',
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/roleResultAll',
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
