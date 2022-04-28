export const userSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    name: {
      type: 'string',
    },
    role_id: {
      type: 'string',
      format: 'uuid',
    },
    active: {
      type: 'boolean',
    },
    created_at: {
      type: 'string',
    },
    updated_at: {
      type: 'string',
    },
    role: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        created_at: {
          type: 'string',
        },
        updated_at: {
          type: 'string',
        },
      },
    },
  },
  example: {
    id: 'c9d65c40-8efe-4b88-9cfc-ae7ece8d368a',
    email: 'user@template.com',
    name: 'User',
    role_id: 'b197768d-66b4-4e09-bce3-441ff0173abe',
    active: false,
    created_at: '2022-04-19T16:36:09.878Z',
    updated_at: '2022-04-19T16:36:09.878Z',
    role: {
      id: 'b197768d-66b4-4e09-bce3-441ff0173abe',
      name: 'user',
      created_at: '2022-03-23T18:19:06.458Z',
      updated_at: '2022-03-23T18:19:06.458Z',
    },
  },
};
