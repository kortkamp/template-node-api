export const addressSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
    },
    cep: {
      type: 'string',
    },
    bairro: {
      type: 'string',
    },
    cidade: {
      type: 'string',
    },
    estado: {
      type: 'string',
    },
    complemento: {
      type: 'string',
    },
    usuario_id: {
      type: 'string',
    },
    empresa_id: {
      type: 'string',
      format: 'uuid',
    },
    numero: {
      type: 'integer',
    },
    criado_em: {
      type: 'string',
    },
    atualizado_em: {
      type: 'string',
    },
  },
  example: {
    cep: '77889-999',
    cidade: 'rio de janeiro',
    estado: 'rio de janeiro',
    complemento: 'merc dois irmaos',
    numero: 42,
    bairro: 'cidade de deus',
    usuario_id: 'c037cf05-9d0e-4ec3-b7ec-d10c122d5bbf',
    empresa_id: '6634013c-27ca-411e-9791-d9a74c06d473',
    id: '8b234d97-8c94-4f97-bf00-9e2c877e0d78',
    criado_em: '2021-06-09T14:02:06.487Z',
    atualizado_em: '2021-06-09T14:02:06.487Z',
  },
  required: [
    'cep',
    'cidade',
    'estado',
    'complemento',
    'numero',
    'bairro',
    'usuario_id',
    'empresa_id',
  ],
};
