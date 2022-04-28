export const userResultPath = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Users'],
    summary: 'Route to show a user data',
    description: 'This route allows to show data for a specific user',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'User ID',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/userResult',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  put: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Users'],
    summary: 'Route to update user data',
    description: 'This route allows to update a user data',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'User ID',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
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
              $ref: '#/schemas/userResult',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      401: {
        $ref: '#/components/unauthorized',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
  delete: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Users'],
    summary: 'Route to delete user',
    description: 'This route allows to delete a user',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'User ID',
        required: true,
        schema: {
          type: 'string',
        },
      },
    ],
    responses: {
      204: {
        description: 'no content',
      },
      400: {
        $ref: '#/components/badRequest',
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
