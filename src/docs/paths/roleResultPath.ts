export const roleResultPath = {
  get: {
    security: [
      {
        bearerAuth: [],
      },
    ],
    tags: ['Roles'],
    summary: 'Route to show a role data',
    description: 'This route allows to show data for a specific role',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'role ID',
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
              $ref: '#/schemas/roleResult',
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
    tags: ['Roles'],
    summary: 'Route to update role data',
    description: 'This route allows to update a role data',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'role ID',
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
              $ref: '#/schemas/roleResult',
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
    tags: ['Roles'],
    summary: 'Route to delete role',
    description: 'This route allows to delete a role',
    parameters: [
      {
        in: 'path',
        name: 'id',
        description: 'role ID',
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
