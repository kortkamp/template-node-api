export const paginatedResultAllSchema = (schema: string) => {
  return {
    type: 'object',
    properties: {
      success: {
        type: 'boolean',
      },
      result: {
        type: 'array',
        items: {
          $ref: schema,
        },
      },
      total_registers: {
        type: 'integer',
        example: 1,
      },
      total_filtered: {
        type: 'integer',
        example: 1,
      },
      page: {
        type: 'integer',
        example: 1,
      },
      per_page: {
        type: 'integer',
        example: 10,
      },
      total_pages: {
        type: 'integer',
        example: 1,
      },
    },
  };
};
