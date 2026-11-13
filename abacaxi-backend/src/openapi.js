module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'API da Fazenda de Abacaxis',
    description: 'Documentação dos endpoints da API da Fazenda de Abacaxis.',
    version: '1.0.0',
  },
  servers: [{ url: '/' }],
  tags: [
    { name: 'Status', description: 'Verificação de disponibilidade da API' },
    { name: 'Autenticação', description: 'Login e geração de token' },
    { name: 'Colheitas', description: 'Gerenciamento de colheitas' },
    { name: 'Vendas', description: 'Gerenciamento de vendas' },
    { name: 'Resumo', description: 'Totais da fazenda' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      Erro: {
        type: 'object',
        properties: {
          erro: { type: 'string', example: 'Mensagem de erro' },
        },
      },
      Login: {
        type: 'object',
        required: ['usuario', 'senha'],
        properties: {
          usuario: { type: 'string', example: 'admin' },
          senha: { type: 'string', format: 'password', example: 'admin123' },
        },
      },
      Token: {
        type: 'object',
        properties: {
          token: { type: 'string', description: 'JWT válido por 8 horas' },
          usuario: { type: 'string', example: 'admin' },
        },
      },
      ColheitaEntrada: {
        type: 'object',
        required: ['data', 'quantidade'],
        properties: {
          data: { type: 'string', format: 'date', example: '2025-03-08' },
          quantidade: { type: 'integer', minimum: 1, example: 100 },
          observacao: { type: 'string', nullable: true, example: 'Lote da manhã' },
        },
      },
      Colheita: {
        allOf: [
          { $ref: '#/components/schemas/ColheitaEntrada' },
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
      VendaEntrada: {
        type: 'object',
        required: ['data', 'quantidade', 'preco_unitario'],
        properties: {
          data: { type: 'string', format: 'date', example: '2025-03-08' },
          quantidade: { type: 'integer', minimum: 1, example: 10 },
          preco_unitario: { type: 'number', format: 'float', minimum: 0.01, example: 4.5 },
          cliente: { type: 'string', nullable: true, example: 'Mercado Central' },
        },
      },
      Venda: {
        allOf: [
          { $ref: '#/components/schemas/VendaEntrada' },
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
      Resumo: {
        type: 'object',
        properties: {
          colhido: { type: 'integer', example: 100 },
          vendido: { type: 'integer', example: 25 },
          estoque: { type: 'integer', example: 75 },
          faturamento: { type: 'number', example: 112.5 },
        },
      },
    },
  },
  paths: {
    '/': {
      get: {
        tags: ['Status'],
        summary: 'Verifica se a API está disponível',
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
        summary: 'Autentica um usuário e retorna um token JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/Login' } },
          },
        },
        responses: {
          200: {
            description: 'Login realizado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Token' } },
            },
          },
          401: {
            description: 'Usuário ou senha inválidos',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
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
            description: 'Colheitas listadas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Colheita' },
                },
              },
            },
          },
          401: { description: 'Token ausente, inválido ou expirado' },
        },
      },
      post: {
        tags: ['Colheitas'],
        summary: 'Cadastra uma colheita',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ColheitaEntrada' } },
          },
        },
        responses: {
          201: {
            description: 'Colheita cadastrada',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Colheita' } },
            },
          },
          400: {
            description: 'Data ou quantidade inválida',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
          401: { description: 'Token ausente, inválido ou expirado' },
        },
      },
    },
    '/colheitas/{id}': {
      delete: {
        tags: ['Colheitas'],
        summary: 'Exclui uma colheita',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'Identificador da colheita',
          },
        ],
        responses: {
          204: { description: 'Colheita excluída' },
          400: {
            description: 'A colheita já foi parcialmente ou totalmente vendida',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
          401: { description: 'Token ausente, inválido ou expirado' },
          404: {
            description: 'Colheita não encontrada',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
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
            description: 'Vendas listadas',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Venda' },
                },
              },
            },
          },
          401: { description: 'Token ausente, inválido ou expirado' },
        },
      },
      post: {
        tags: ['Vendas'],
        summary: 'Cadastra uma venda se houver estoque',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/VendaEntrada' } },
          },
        },
        responses: {
          201: {
            description: 'Venda cadastrada',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Venda' } },
            },
          },
          400: {
            description: 'Dados inválidos ou estoque insuficiente',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
          401: { description: 'Token ausente, inválido ou expirado' },
        },
      },
    },
    '/vendas/{id}': {
      delete: {
        tags: ['Vendas'],
        summary: 'Exclui uma venda',
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
            description: 'Identificador da venda',
          },
        ],
        responses: {
          204: { description: 'Venda excluída' },
          401: { description: 'Token ausente, inválido ou expirado' },
          404: {
            description: 'Venda não encontrada',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
        },
      },
    },
    '/resumo': {
      get: {
        tags: ['Resumo'],
        summary: 'Retorna os totais de colheita, vendas, estoque e faturamento',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Resumo da fazenda',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Resumo' } },
            },
          },
          401: { description: 'Token ausente, inválido ou expirado' },
        },
      },
    },
  },
};
