const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'API da Fazenda de Abacaxis',
    version: '1.0.0',
    description: 'API para login, colheitas, vendas e resumo da Fazenda de Abacaxis.',
  },
  servers: [
    {
      url: 'http://localhost:3001',
      description: 'Servidor local',
    },
  ],
  tags: [
    { name: 'Status' },
    { name: 'Autenticação' },
    { name: 'Colheitas' },
    { name: 'Vendas' },
    { name: 'Resumo' },
  ],
  paths: {
    '/': {
      get: {
        tags: ['Status'],
        summary: 'Verifica se a API está no ar',
        responses: {
          200: {
            description: 'API disponível',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    mensagem: { type: 'string', example: 'API da Fazenda de Abacaxis' },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Autenticação'],
        summary: 'Faz login e retorna um token JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
            },
          },
        },
        responses: {
          200: {
            description: 'Login realizado',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/LoginResponse' },
              },
            },
          },
          401: {
            description: 'Usuário ou senha inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/colheitas': {
      get: {
        tags: ['Colheitas'],
        summary: 'Lista as colheitas',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de colheitas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Colheita' },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Colheitas'],
        summary: 'Cadastra uma colheita',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ColheitaRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'Colheita cadastrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Colheita' },
              },
            },
          },
          400: {
            description: 'Dados inválidos',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/colheitas/{id}': {
      delete: {
        tags: ['Colheitas'],
        summary: 'Exclui uma colheita',
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Colheita excluída' },
          400: {
            description: 'A exclusão deixaria o estoque negativo',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: {
            description: 'Colheita não encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/vendas': {
      get: {
        tags: ['Vendas'],
        summary: 'Lista as vendas',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Lista de vendas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Venda' },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Vendas'],
        summary: 'Cadastra uma venda',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/VendaRequest' },
            },
          },
        },
        responses: {
          201: {
            description: 'Venda cadastrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Venda' },
              },
            },
          },
          400: {
            description: 'Dados inválidos ou estoque insuficiente',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/vendas/{id}': {
      delete: {
        tags: ['Vendas'],
        summary: 'Exclui uma venda',
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Venda excluída' },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: {
            description: 'Venda não encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Error' },
              },
            },
          },
        },
      },
    },
    '/resumo': {
      get: {
        tags: ['Resumo'],
        summary: 'Retorna os totais do painel',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Totais de colheitas, vendas, estoque e faturamento',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Resumo' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    parameters: {
      Id: {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'integer' },
      },
    },
    responses: {
      Unauthorized: {
        description: 'Token ausente ou inválido',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/Error' },
          },
        },
      },
    },
    schemas: {
      LoginRequest: {
        type: 'object',
        required: ['usuario', 'senha'],
        properties: {
          usuario: { type: 'string', example: 'admin' },
          senha: { type: 'string', format: 'password', example: 'minha-senha' },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: { type: 'string' },
          usuario: { type: 'string', example: 'admin' },
        },
      },
      ColheitaRequest: {
        type: 'object',
        required: ['data', 'quantidade'],
        properties: {
          data: { type: 'string', format: 'date', example: '2026-01-15' },
          quantidade: { type: 'integer', minimum: 1, example: 120 },
          observacao: { type: 'string', nullable: true },
        },
      },
      Colheita: {
        allOf: [
          { $ref: '#/components/schemas/ColheitaRequest' },
          { $ref: '#/components/schemas/RecordMetadata' },
        ],
      },
      VendaRequest: {
        type: 'object',
        required: ['data', 'quantidade', 'preco_unitario'],
        properties: {
          data: { type: 'string', format: 'date', example: '2026-01-15' },
          quantidade: { type: 'integer', minimum: 1, example: 20 },
          preco_unitario: { type: 'number', format: 'float', exclusiveMinimum: 0, example: 2.5 },
          cliente: { type: 'string', nullable: true },
        },
      },
      Venda: {
        allOf: [
          { $ref: '#/components/schemas/VendaRequest' },
          { $ref: '#/components/schemas/RecordMetadata' },
        ],
      },
      RecordMetadata: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Resumo: {
        type: 'object',
        properties: {
          colhido: { type: 'integer', example: 120 },
          vendido: { type: 'integer', example: 20 },
          estoque: { type: 'integer', example: 100 },
          faturamento: { type: 'number', example: 50 },
        },
      },
      Error: {
        type: 'object',
        required: ['erro'],
        properties: {
          erro: { type: 'string' },
        },
      },
    },
  },
};

module.exports = openapi;
