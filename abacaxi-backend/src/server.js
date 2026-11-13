require('dotenv').config();

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const bcrypt = require('bcryptjs');
const { sequelize, Usuario } = require('./models');
const auth = require('./middleware/auth');
const openapi = require('./openapi');

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Rota pública para testar se a API está no ar (usada também pelo Render)
app.get('/', (req, res) => {
  res.json({ status: 'ok', mensagem: 'API da Fazenda de Abacaxis 🍍' });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapi));

app.use('/auth', require('./routes/auth'));

// Rotas protegidas: exigem login
app.use('/colheitas', auth, require('./routes/colheitas'));
app.use('/vendas', auth, require('./routes/vendas'));
app.use('/resumo', auth, require('./routes/resumo'));

// Tratamento de erros inesperados
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ erro: 'Erro interno no servidor' });
});

// Cria o usuário administrador se ele ainda não existir
async function criarAdmin() {
  const usuario = process.env.ADMIN_USER || 'admin';
  const existe = await Usuario.findOne({ where: { usuario } });
  if (!existe) {
    const senha_hash = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);
    await Usuario.create({ usuario, senha_hash });
    console.log(`Usuário "${usuario}" criado`);
  }
}

async function iniciar() {
  await sequelize.authenticate();
  await sequelize.sync(); // cria as tabelas que ainda não existem
  await criarAdmin();

  const port = process.env.PORT || 3001;
  app.listen(port, () => console.log(`API rodando na porta ${port}`));
}

iniciar().catch((err) => {
  console.error('Falha ao iniciar a API:', err.message);
  process.exit(1);
});
