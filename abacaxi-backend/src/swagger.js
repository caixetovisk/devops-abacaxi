const swaggerDocument = {
  openapi: '3.0.3',
  info: {
    title: 'API Fazenda de Abacaxis',
    description: 'API para autenticação, registro de colheitas e vendas e consulta do resumo do estoque.',
    version: '1.0.0',
  },
  servers: [
    { url: '/', description: 'Servidor atual' },
    { url: 'http://localhost:3001', description: 'Desenvolvimento local' },
  ],
  tags: [
    { name: 'Status', description: 'Verificação de disponibilidade da API' },
    { name: 'Autenticação', description: 'Login e obtenção de token JWT' },
    { name: 'Colheitas', description: 'Registro e consulta de colheitas' },
    { name: 'Vendas', description: 'Registro e consulta de vendas' },
    { name: 'Resumo', description: 'Totais de produção, estoque e faturamento' },
  ],
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
        summary: 'Autentica um usuário e retorna um token JWT',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['usuario', 'senha'],
                properties: {
                  usuario: { type: 'string', example: 'admin' },
                  senha: { type: 'string', format: 'password', example: 'admin123' },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Login realizado',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['token', 'usuario'],
                  properties: {
                    token: { type: 'string', description: 'Token JWT válido por 8 horas' },
                    usuario: { type: 'string', example: 'admin' },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/colheitas': {
      get: {
        tags: ['Colheitas'],
        summary: 'Lista colheitas, da mais recente para a mais antiga',
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
        summary: 'Registra uma colheita',
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
            description: 'Colheita criada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Colheita' },
              },
            },
          },
          400: { $ref: '#/components/responses/ErroRequisicao' },
          401: { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/colheitas/{id}': {
      delete: {
        tags: ['Colheitas'],
        summary: 'Exclui uma colheita que ainda não foi vendida',
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Colheita excluída' },
          400: {
            description: 'A colheita não pode ser excluída porque os abacaxis já foram vendidos',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: { $ref: '#/components/responses/ErroRequisicao' },
        },
      },
    },
    '/vendas': {
      get: {
        tags: ['Vendas'],
        summary: 'Lista vendas, da mais recente para a mais antiga',
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
        summary: 'Registra uma venda se houver estoque suficiente',
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
            description: 'Venda criada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Venda' },
              },
            },
          },
          400: {
            description: 'Dados inválidos ou estoque insuficiente',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
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
          404: { $ref: '#/components/responses/ErroRequisicao' },
        },
      },
    },
    '/resumo': {
      get: {
        tags: ['Resumo'],
        summary: 'Consulta os totais de colheita, vendas, estoque e faturamento',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Resumo atual',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['colhido', 'vendido', 'estoque', 'faturamento'],
                  properties: {
                    colhido: { type: 'integer', example: 120 },
                    vendido: { type: 'integer', example: 35 },
                    estoque: { type: 'integer', example: 85 },
                    faturamento: { type: 'number', format: 'double', example: 175.5 },
                  },
                },
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
        description: 'Use o token retornado por POST /auth/login.',
      },
    },
    parameters: {
      Id: {
        name: 'id',
        in: 'path',
        required: true,
        description: 'Identificador do registro',
        schema: { type: 'integer', minimum: 1 },
        example: 1,
      },
    },
    schemas: {
      NovaColheita: {
        type: 'object',
        required: ['data', 'quantidade'],
        properties: {
          data: { type: 'string', format: 'date', example: '2025-03-15' },
          quantidade: { type: 'integer', minimum: 1, example: 40 },
          observacao: { type: 'string', nullable: true, example: 'Talhão norte' },
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
          data: { type: 'string', format: 'date', example: '2025-03-16' },
          quantidade: { type: 'integer', minimum: 1, example: 12 },
          preco_unitario: { type: 'number', format: 'double', minimum: 0.01, example: 5.5 },
          cliente: { type: 'string', nullable: true, example: 'Mercado Central' },
        },
      },
      Venda: {
        allOf: [
          { $ref: '#/components/schemas/NovaVenda' },
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
      Erro: {
        type: 'object',
        required: ['erro'],
        properties: {
          erro: { type: 'string', example: 'Erro na requisição' },
        },
      },
    },
    responses: {
      Unauthorized: {
        description: 'Token não informado, inválido ou expirado; ou credenciais inválidas',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
      },
      ErroRequisicao: {
        description: 'Requisição inválida ou registro não encontrado',
        content: { 'application/json': { schema: { $ref: '#/components/schemas/Erro' } } },
      },
    },
  },
};

module.exports = swaggerDocument;
