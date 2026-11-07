const registroColheita = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    data: { type: 'string', format: 'date', example: '2026-11-06' },
    quantidade: { type: 'integer', example: 120 },
    observacao: { type: 'string', nullable: true, example: 'Talhão norte' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};

const registroVenda = {
  type: 'object',
  properties: {
    id: { type: 'integer', example: 1 },
    data: { type: 'string', format: 'date', example: '2026-11-06' },
    quantidade: { type: 'integer', example: 20 },
    preco_unitario: { type: 'string', example: '12.50', description: 'Valor decimal retornado pelo Sequelize.' },
    cliente: { type: 'string', nullable: true, example: 'Mercado Central' },
    createdAt: { type: 'string', format: 'date-time' },
    updatedAt: { type: 'string', format: 'date-time' },
  },
};

const erro = {
  type: 'object',
  properties: {
    erro: { type: 'string', example: 'Mensagem do erro' },
  },
};

module.exports = {
  openapi: '3.0.3',
  info: {
    title: 'API da Fazenda de Abacaxis',
    description: 'API para autenticação, controle de colheitas, vendas, estoque e faturamento.',
    version: '1.0.0',
    contact: { name: 'Projeto DevOps Abacaxi' },
  },
  servers: [
    { url: '/', description: 'Servidor atual' },
    { url: 'http://localhost:3001', description: 'Desenvolvimento local' },
  ],
  tags: [
    { name: 'Saúde', description: 'Verificação de disponibilidade da API' },
    { name: 'Autenticação', description: 'Login e emissão de token JWT' },
    { name: 'Colheitas', description: 'Registro e consulta de colheitas' },
    { name: 'Vendas', description: 'Registro e consulta de vendas' },
    { name: 'Resumo', description: 'Totais de produção, estoque e faturamento' },
  ],
  paths: {
    '/': {
      get: {
        tags: ['Saúde'],
        summary: 'Verifica se a API está disponível',
        security: [],
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
        security: [],
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
            description: 'Login realizado. O token expira em 8 horas.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: { type: 'string', description: 'Token JWT para usar como Bearer token.' },
                    usuario: { type: 'string', example: 'admin' },
                  },
                },
              },
            },
          },
          401: {
            description: 'Usuário ou senha inválidos',
            content: { 'application/json': { schema: erro } },
          },
        },
      },
    },
    '/colheitas': {
      get: {
        tags: ['Colheitas'],
        summary: 'Lista as colheitas',
        description: 'Ordena por data e identificador, ambos em ordem decrescente.',
        responses: {
          200: {
            description: 'Lista de colheitas',
            content: {
              'application/json': {
                schema: { type: 'array', items: registroColheita },
              },
            },
          },
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: { 'application/json': { schema: erro } },
          },
        },
      },
      post: {
        tags: ['Colheitas'],
        summary: 'Registra uma colheita',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['data', 'quantidade'],
                properties: {
                  data: { type: 'string', format: 'date', example: '2026-11-06' },
                  quantidade: { type: 'integer', minimum: 1, example: 120 },
                  observacao: { type: 'string', nullable: true, example: 'Talhão norte' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Colheita criada',
            content: { 'application/json': { schema: registroColheita } },
          },
          400: {
            description: 'Data ausente ou quantidade menor que 1',
            content: { 'application/json': { schema: erro } },
          },
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: { 'application/json': { schema: erro } },
          },
        },
      },
    },
    '/colheitas/{id}': {
      delete: {
        tags: ['Colheitas'],
        summary: 'Exclui uma colheita',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Identificador da colheita',
            schema: { type: 'integer', minimum: 1 },
          },
        ],
        responses: {
          204: { description: 'Colheita excluída' },
          400: {
            description: 'A exclusão deixaria o estoque negativo',
            content: { 'application/json': { schema: erro } },
          },
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: { 'application/json': { schema: erro } },
          },
          404: {
            description: 'Colheita não encontrada',
            content: { 'application/json': { schema: erro } },
          },
        },
      },
    },
    '/vendas': {
      get: {
        tags: ['Vendas'],
        summary: 'Lista as vendas',
        description: 'Ordena por data e identificador, ambos em ordem decrescente.',
        responses: {
          200: {
            description: 'Lista de vendas',
            content: {
              'application/json': {
                schema: { type: 'array', items: registroVenda },
              },
            },
          },
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: { 'application/json': { schema: erro } },
          },
        },
      },
      post: {
        tags: ['Vendas'],
        summary: 'Registra uma venda',
        description: 'A quantidade vendida não pode exceder o estoque disponível.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['data', 'quantidade', 'preco_unitario'],
                properties: {
                  data: { type: 'string', format: 'date', example: '2026-11-06' },
                  quantidade: { type: 'integer', minimum: 1, example: 20 },
                  preco_unitario: { type: 'number', minimum: 0, exclusiveMinimum: true, example: 12.5 },
                  cliente: { type: 'string', nullable: true, example: 'Mercado Central' },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Venda criada',
            content: { 'application/json': { schema: registroVenda } },
          },
          400: {
            description: 'Dados inválidos ou estoque insuficiente',
            content: { 'application/json': { schema: erro } },
          },
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: { 'application/json': { schema: erro } },
          },
        },
      },
    },
    '/vendas/{id}': {
      delete: {
        tags: ['Vendas'],
        summary: 'Exclui uma venda',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'Identificador da venda',
            schema: { type: 'integer', minimum: 1 },
          },
        ],
        responses: {
          204: { description: 'Venda excluída' },
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: { 'application/json': { schema: erro } },
          },
          404: {
            description: 'Venda não encontrada',
            content: { 'application/json': { schema: erro } },
          },
        },
      },
    },
    '/resumo': {
      get: {
        tags: ['Resumo'],
        summary: 'Retorna os totais de produção, estoque e faturamento',
        responses: {
          200: {
            description: 'Resumo atual',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    colhido: { type: 'integer', example: 120 },
                    vendido: { type: 'integer', example: 20 },
                    estoque: { type: 'integer', example: 100 },
                    faturamento: { type: 'number', format: 'double', example: 250 },
                  },
                },
              },
            },
          },
          401: {
            description: 'Token ausente, inválido ou expirado',
            content: { 'application/json': { schema: erro } },
          },
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
        description: 'Use o token retornado por POST /auth/login. Validade: 8 horas.',
      },
    },
  },
  security: [{ bearerAuth: [] }],
};
