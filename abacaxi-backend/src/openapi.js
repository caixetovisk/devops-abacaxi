module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'API da Fazenda de Abacaxis',
    version: '1.0.0',
    description:
      'API para autenticação, registro de colheitas e vendas, controle de estoque e consulta do resumo da fazenda.',
  },
  servers: [{ url: '/', description: 'Servidor atual' }],
  tags: [
    { name: 'Status', description: 'Verificação de disponibilidade da API' },
    { name: 'Autenticação', description: 'Login e emissão de token JWT' },
    { name: 'Colheitas', description: 'Registro e consulta de colheitas' },
    { name: 'Vendas', description: 'Registro e consulta de vendas' },
    { name: 'Resumo', description: 'Indicadores da fazenda' },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Informe o token recebido em POST /auth/login.',
      },
    },
    schemas: {
      Erro: {
        type: 'object',
        properties: {
          erro: { type: 'string', example: 'Mensagem de erro' },
        },
        required: ['erro'],
      },
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
          token: { type: 'string', description: 'Token JWT válido por 8 horas' },
          usuario: { type: 'string', example: 'admin' },
        },
        required: ['token', 'usuario'],
      },
      ColheitaInput: {
        type: 'object',
        description: 'Data e quantidade são obrigatórias. Observação é opcional.',
        required: ['data', 'quantidade'],
        properties: {
          data: {
            type: 'string',
            format: 'date',
            description: 'Obrigatória. Data da colheita no formato AAAA-MM-DD.',
            example: '2026-11-06',
          },
          quantidade: {
            type: 'integer',
            minimum: 1,
            description: 'Obrigatória. Deve ser maior que zero.',
            example: 120,
          },
          observacao: {
            type: 'string',
            nullable: true,
            description: 'Opcional.',
            example: 'Talhão norte',
          },
        },
      },
      Colheita: {
        allOf: [
          { $ref: '#/components/schemas/ColheitaInput' },
          {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id'],
          },
        ],
      },
      VendaInput: {
        type: 'object',
        required: ['data', 'quantidade', 'preco_unitario'],
        properties: {
          data: { type: 'string', format: 'date', example: '2026-11-06' },
          quantidade: { type: 'integer', minimum: 1, example: 25 },
          preco_unitario: {
            type: 'number',
            minimum: 0,
            exclusiveMinimum: true,
            example: 7.5,
          },
          cliente: { type: 'string', nullable: true, example: 'Mercado Central' },
        },
      },
      Venda: {
        allOf: [
          { $ref: '#/components/schemas/VendaInput' },
          {
            type: 'object',
            properties: {
              id: { type: 'integer', example: 1 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
            required: ['id'],
          },
        ],
      },
      Resumo: {
        type: 'object',
        properties: {
          colhido: { type: 'integer', example: 120 },
          vendido: { type: 'integer', example: 25 },
          estoque: { type: 'integer', example: 95 },
          faturamento: { type: 'number', example: 187.5 },
        },
        required: ['colhido', 'vendido', 'estoque', 'faturamento'],
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
        summary: 'Autentica o usuário e retorna um JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } },
          },
        },
        responses: {
          200: {
            description: 'Login realizado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } },
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
        summary: 'Lista colheitas da mais recente para a mais antiga',
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
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
        },
      },
      post: {
        tags: ['Colheitas'],
        summary: 'Registra uma colheita (data e quantidade obrigatórias)',
        description: 'O campo `observacao` é opcional.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/ColheitaInput' } },
          },
        },
        responses: {
          201: {
            description: 'Colheita criada',
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
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
        },
      },
    },
    '/colheitas/{id}': {
      delete: {
        tags: ['Colheitas'],
        summary: 'Exclui uma colheita que ainda não foi vendida',
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
            description: 'A quantidade da colheita já foi vendida',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
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
        summary: 'Lista vendas da mais recente para a mais antiga',
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
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
        },
      },
      post: {
        tags: ['Vendas'],
        summary: 'Registra uma venda se houver estoque suficiente',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': { schema: { $ref: '#/components/schemas/VendaInput' } },
          },
        },
        responses: {
          201: {
            description: 'Venda criada',
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
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
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
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
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
        summary: 'Retorna totais de colheita, vendas, estoque e faturamento',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Resumo atual da fazenda',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Resumo' } },
            },
          },
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: {
              'application/json': { schema: { $ref: '#/components/schemas/Erro' } },
            },
          },
        },
      },
    },
  },
};
