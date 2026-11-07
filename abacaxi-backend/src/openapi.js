const openapi = {
  openapi: '3.0.3',
  info: {
    title: 'API Fazenda de Abacaxis',
    version: '1.0.0',
    description:
      'API para autenticação e gerenciamento de colheitas, vendas, estoque e faturamento da Fazenda de Abacaxis.',
  },
  servers: [{ url: '/', description: 'Servidor atual' }],
  tags: [
    { name: 'Status', description: 'Disponibilidade da API' },
    { name: 'Autenticação', description: 'Login e obtenção de token JWT' },
    { name: 'Colheitas', description: 'Registro e consulta de colheitas' },
    { name: 'Vendas', description: 'Registro e consulta de vendas' },
    { name: 'Resumo', description: 'Indicadores de estoque e faturamento' },
  ],
  paths: {
    '/': {
      get: {
        tags: ['Status'],
        summary: 'Verificar se a API está no ar',
        responses: {
          200: {
            description: 'API disponível',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    mensagem: { type: 'string', example: 'API da Fazenda de Abacaxis 🍍' },
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
        summary: 'Autenticar usuário',
        description: 'Retorna um token JWT válido por 8 horas.',
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
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },
    '/colheitas': {
      get: {
        tags: ['Colheitas'],
        summary: 'Listar colheitas',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Colheitas ordenadas da mais recente para a mais antiga',
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
        summary: 'Registrar colheita',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NovaColheita' },
            },
          },
        },
        responses: {
          201: {
            description: 'Colheita registrada',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Colheita' } },
            },
          },
          400: {
            description: 'Data ausente ou quantidade menor ou igual a zero',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/colheitas/{id}': {
      delete: {
        tags: ['Colheitas'],
        summary: 'Excluir colheita',
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Colheita excluída' },
          400: {
            description: 'A exclusão deixaria o estoque negativo',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: {
            description: 'Colheita não encontrada',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },
    '/vendas': {
      get: {
        tags: ['Vendas'],
        summary: 'Listar vendas',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Vendas ordenadas da mais recente para a mais antiga',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Venda' } },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Vendas'],
        summary: 'Registrar venda',
        description: 'A quantidade vendida não pode exceder o estoque disponível.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/NovaVenda' },
            },
          },
        },
        responses: {
          201: {
            description: 'Venda registrada',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Venda' } } },
          },
          400: {
            description: 'Dados inválidos ou estoque insuficiente',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/vendas/{id}': {
      delete: {
        tags: ['Vendas'],
        summary: 'Excluir venda',
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Venda excluída' },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: {
            description: 'Venda não encontrada',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },
    '/resumo': {
      get: {
        tags: ['Resumo'],
        summary: 'Consultar totais de colheita, vendas, estoque e faturamento',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Indicadores da fazenda',
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
        description: 'Token recebido em POST /auth/login. Validade: 8 horas.',
      },
    },
    parameters: {
      Id: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Identificador do registro',
        schema: { type: 'integer', minimum: 1 },
      },
    },
    responses: {
      Unauthorized: {
        description: 'Token ausente, inválido ou expirado',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
      },
    },
    schemas: {
      LoginRequest: {
        type: 'object',
        required: ['usuario', 'senha'],
        properties: {
          usuario: { type: 'string', example: 'admin' },
          senha: { type: 'string', format: 'password', example: 'admin123' },
        },
      },
      LoginResponse: {
        type: 'object',
        properties: {
          token: { type: 'string', description: 'JWT válido por 8 horas' },
          usuario: { type: 'string', example: 'admin' },
        },
      },
      NovaColheita: {
        type: 'object',
        required: ['data', 'quantidade'],
        properties: {
          data: { type: 'string', format: 'date', example: '2026-11-06' },
          quantidade: { type: 'integer', minimum: 1, example: 120 },
          observacao: { type: 'string', nullable: true, example: 'Lote da manhã' },
        },
      },
      Colheita: {
        allOf: [
          { $ref: '#/components/schemas/NovaColheita' },
          {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        ],
      },
      NovaVenda: {
        type: 'object',
        required: ['data', 'quantidade', 'preco_unitario'],
        properties: {
          data: { type: 'string', format: 'date', example: '2026-11-06' },
          quantidade: { type: 'integer', minimum: 1, example: 10 },
          preco_unitario: { type: 'number', format: 'double', minimum: 0, exclusiveMinimum: true, example: 4.5 },
          cliente: { type: 'string', nullable: true, example: 'Mercado Central' },
        },
      },
      Venda: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          data: { type: 'string', format: 'date', example: '2026-11-06' },
          quantidade: { type: 'integer', minimum: 1, example: 10 },
          preco_unitario: {
            type: 'string',
            description: 'Valor decimal retornado pelo Sequelize',
            example: '4.50',
          },
          cliente: { type: 'string', nullable: true, example: 'Mercado Central' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      Resumo: {
        type: 'object',
        properties: {
          colhido: { type: 'integer', example: 120 },
          vendido: { type: 'integer', example: 10 },
          estoque: { type: 'integer', example: 110 },
          faturamento: { type: 'number', format: 'double', example: 45 },
        },
      },
      Error: {
        type: 'object',
        properties: {
          erro: { type: 'string', example: 'Token não informado' },
        },
      },
    },
  },
};

module.exports = openapi;
