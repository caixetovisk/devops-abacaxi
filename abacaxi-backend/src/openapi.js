const openapiSpecification = {
  openapi: '3.0.3',
  info: {
    title: 'API da Fazenda de Abacaxis',
    description:
      'API para autenticação, registro de colheitas e vendas, consulta de estoque e faturamento.',
    version: '1.0.0',
    contact: {
      name: 'Documentação do projeto',
    },
  },
  servers: [
    {
      url: '/',
      description: 'Servidor atual',
    },
  ],
  tags: [
    { name: 'Status', description: 'Disponibilidade da API' },
    { name: 'Autenticação', description: 'Login e obtenção de token JWT' },
    { name: 'Colheitas', description: 'Registro e consulta de colheitas' },
    { name: 'Vendas', description: 'Registro e consulta de vendas' },
    { name: 'Resumo', description: 'Totais de estoque e faturamento' },
  ],
  paths: {
    '/': {
      get: {
        tags: ['Status'],
        summary: 'Verificar se a API está disponível',
        responses: {
          200: {
            description: 'API disponível',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/HealthStatus' },
                example: { status: 'ok', mensagem: 'API da Fazenda de Abacaxis' },
              },
            },
          },
          default: { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Autenticação'],
        summary: 'Entrar e obter um token JWT',
        description: 'O token retornado expira em 8 horas.',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/LoginRequest' },
              example: { usuario: 'admin', senha: 'sua-senha' },
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
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                example: { erro: 'Usuário ou senha inválidos' },
              },
            },
          },
          default: { $ref: '#/components/responses/InternalServerError' },
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
          default: { $ref: '#/components/responses/InternalServerError' },
        },
      },
      post: {
        tags: ['Colheitas'],
        summary: 'Registrar uma colheita',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ColheitaInput' },
              example: { data: '2026-11-06', quantidade: 100, observacao: 'Lote da manhã' },
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
          400: {
            description: 'Data ausente ou quantidade menor ou igual a zero',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          default: { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    '/colheitas/{id}': {
      delete: {
        tags: ['Colheitas'],
        summary: 'Excluir uma colheita',
        description: 'A exclusão é recusada se reduzir o estoque abaixo de zero.',
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Colheita excluída' },
          400: {
            description: 'A colheita já foi vendida',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: {
            description: 'Colheita não encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          default: { $ref: '#/components/responses/InternalServerError' },
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
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Venda' },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          default: { $ref: '#/components/responses/InternalServerError' },
        },
      },
      post: {
        tags: ['Vendas'],
        summary: 'Registrar uma venda',
        description: 'Não é possível vender uma quantidade superior ao estoque atual.',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/VendaInput' },
              example: {
                data: '2026-11-06',
                quantidade: 10,
                preco_unitario: 12.5,
                cliente: 'Mercado Central',
              },
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
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
                examples: {
                  invalidInput: {
                    value: { erro: 'Informe data, quantidade e preço maiores que zero' },
                  },
                  insufficientStock: {
                    value: { erro: 'Estoque insuficiente. Disponível: 5' },
                  },
                },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          default: { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    '/vendas/{id}': {
      delete: {
        tags: ['Vendas'],
        summary: 'Excluir uma venda',
        security: [{ bearerAuth: [] }],
        parameters: [{ $ref: '#/components/parameters/Id' }],
        responses: {
          204: { description: 'Venda excluída' },
          401: { $ref: '#/components/responses/Unauthorized' },
          404: {
            description: 'Venda não encontrada',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/ErrorResponse' },
              },
            },
          },
          default: { $ref: '#/components/responses/InternalServerError' },
        },
      },
    },
    '/resumo': {
      get: {
        tags: ['Resumo'],
        summary: 'Consultar totais de colheitas, vendas e faturamento',
        security: [{ bearerAuth: [] }],
        responses: {
          200: {
            description: 'Totais atuais',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Resumo' },
                example: { colhido: 100, vendido: 25, estoque: 75, faturamento: 312.5 },
              },
            },
          },
          401: { $ref: '#/components/responses/Unauthorized' },
          default: { $ref: '#/components/responses/InternalServerError' },
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
        description: 'Identificador numérico do registro',
        schema: { type: 'integer', minimum: 1 },
      },
    },
    responses: {
      Unauthorized: {
        description: 'Token ausente, inválido ou expirado',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            examples: {
              missingToken: { value: { erro: 'Token não informado' } },
              invalidToken: { value: { erro: 'Token inválido ou expirado' } },
            },
          },
        },
      },
      InternalServerError: {
        description: 'Erro interno ao processar a requisição',
        content: {
          'application/json': {
            schema: { $ref: '#/components/schemas/ErrorResponse' },
            example: { erro: 'Erro interno no servidor' },
          },
        },
      },
    },
    schemas: {
      HealthStatus: {
        type: 'object',
        required: ['status', 'mensagem'],
        properties: {
          status: { type: 'string', example: 'ok' },
          mensagem: { type: 'string', example: 'API da Fazenda de Abacaxis' },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['usuario', 'senha'],
        properties: {
          usuario: { type: 'string', maxLength: 50, example: 'admin' },
          senha: { type: 'string', format: 'password', example: 'sua-senha' },
        },
      },
      LoginResponse: {
        type: 'object',
        required: ['token', 'usuario'],
        properties: {
          token: { type: 'string', description: 'JWT válido por 8 horas' },
          usuario: { type: 'string', example: 'admin' },
        },
      },
      ColheitaInput: {
        type: 'object',
        required: ['data', 'quantidade'],
        properties: {
          data: { type: 'string', format: 'date', example: '2026-11-06' },
          quantidade: { type: 'integer', minimum: 1, example: 100 },
          observacao: { type: 'string', nullable: true, example: 'Lote da manhã' },
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
          },
        ],
      },
      VendaInput: {
        type: 'object',
        required: ['data', 'quantidade', 'preco_unitario'],
        properties: {
          data: { type: 'string', format: 'date', example: '2026-11-06' },
          quantidade: { type: 'integer', minimum: 1, example: 10 },
          preco_unitario: {
            type: 'number',
            format: 'float',
            minimum: 0,
            exclusiveMinimum: true,
            example: 12.5,
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
          },
        ],
      },
      Resumo: {
        type: 'object',
        required: ['colhido', 'vendido', 'estoque', 'faturamento'],
        properties: {
          colhido: { type: 'integer', example: 100 },
          vendido: { type: 'integer', example: 25 },
          estoque: { type: 'integer', example: 75 },
          faturamento: { type: 'number', format: 'float', example: 312.5 },
        },
      },
      ErrorResponse: {
        type: 'object',
        required: ['erro'],
        properties: {
          erro: { type: 'string', example: 'Token inválido ou expirado' },
        },
      },
    },
  },
};

module.exports = openapiSpecification;
