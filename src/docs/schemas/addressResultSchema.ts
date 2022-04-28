export const addressResultSchema = {
  type: 'object',
  properties: {
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
    },
    numero: {
      type: 'integer',
    },
    usuario: {
      type: 'object',
      items: {
        $ref: '#/schemas/user',
      },
    },
    empresa: {
      type: 'object',
      items: {
        $ref: '#/schemas/company',
      },
    },
    criado_em: {
      type: 'string',
    },
    atualizado_em: {
      type: 'string',
    },
  },
  example: {
    id: '6ed9298e-9c99-48cc-a1a4-78169391abc5',
    cep: '77889-999',
    cidade: 'rio de janeiro',
    estado: 'rio de janeiro',
    complemento: 'merc dois irmaos',
    numero: 42,
    bairro: 'cidade de deus',
    usuario_id: '2e3f56d9-fc7f-4dc6-a391-c2cf1992d5e6',
    empresa_id: 'a5964674-b995-4921-a42b-4eeacf5d0eb6',
    criado_em: '2021-06-18T17:24:56.931Z',
    atualizado_em: '2021-06-18T17:24:56.931Z',
    usuario: {
      id: '2e3f56d9-fc7f-4dc6-a391-c2cf1992d5e6',
      nome: 'Jhon Doe',
      cpf: '12345678911',
      email: 'yo@email.com',
      celular: '9919-9919',
      telefone: '444111',
      senha: '$2b$10$Urcaxb0.QdtZf/bQ.lkzhuAXWCneT5Oo6IxZbVNhICKaOcWzrXJ2m',
      status: true,
      criado_em: '2021-06-17T18:43:43.635Z',
      atualizado_em: '2021-06-17T18:52:11.721Z',
    },
    empresa: {
      id: 'a5964674-b995-4921-a42b-4eeacf5d0eb6',
      cnpj: '09618962000183',
      nome_fantasia: 'willi wonka industry.',
      razao_social: 'AnyName',
      usuario_id: 'bd2ae593-6fba-4a8e-861c-35a35419cae2',
      telefone: '1234567819',
      celular: '1234567819',
      logo: '1624036264963-gi.gif',
      criado_em: '2021-06-18T17:11:05.097Z',
      atualizado_em: '2021-06-18T17:13:50.184Z',
    },
  },
};

export const addressResultAllSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/addressResult',
  },
};
