export const errorSchema = {
  type: 'object',
  properties: {
    success: {
      type: 'boolean',
      example: 'false',
    },
    message: {
      type: 'string',
    },
  },
  required: ['success', 'message'],
};
