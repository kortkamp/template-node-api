export const roleSchema = {
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
  example: {
    id: 'b197768d-66b4-4e09-bce3-441ff0173abe',
    name: 'user',
    created_at: '2022-03-23T18:19:06.458Z',
    updated_at: '2022-03-23T18:19:06.458Z',
  },
};
