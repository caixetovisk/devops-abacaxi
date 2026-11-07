# Instruções do projeto: DevOps Abacaxi

Este repositório é um monorepo com dois projetos independentes, ambos trabalhando juntos em um fluxo de deploy no Render:

- `abacaxi-backend`: API em Node.js + Express + Sequelize
- `abacaxi-frontend`: interface em React + Vite

## 1) Estrutura e responsabilidades

### Backend (`abacaxi-backend`)
- Ponto de entrada: `src/server.js`
- Banco: Sequelize com suporte a MySQL local e PostgreSQL no Render
- Models principais: `Usuario`, `Colheita`, `Venda`
- Rotas públicas: `/`, `/auth/login`
- Rotas protegidas: `/colheitas`, `/vendas`, `/resumo`
- Autenticação: JWT via middleware em `src/middleware/auth.js`
- Lógica de estoque: `src/estoque.js` calcula `colhido - vendido`

### Frontend (`abacaxi-frontend`)
- Ponto de entrada: `src/main.jsx`
- Navegação principal: `src/App.jsx`
- Comunicação com a API: `src/api.js`
- Páginas: `src/pages/Login.jsx`, `Painel.jsx`, `Colheitas.jsx`, `Vendas.jsx`
- Estilo: CSS manual em `src/styles.css`

## 2) Como executar o projeto

- Não instale dependências na raiz do repositório; cada app tem seu próprio `package.json`.
- Para rodar localmente, use dois terminais separados:

```bash
cd abacaxi-backend
npm install
npm run dev
```

```bash
cd abacaxi-frontend
npm install
npm run dev
```

## 3) Variáveis de ambiente

### Backend (`abacaxi-backend/.env`)
Use MySQL local:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=fazenda_abacaxi
DB_USER=root
DB_PASSWORD=root
JWT_SECRET=sua_chave_secreta
ADMIN_USER=admin
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
```

Observações:
- Se `DATABASE_URL` estiver presente, o backend usa PostgreSQL.
- O Render define a porta automaticamente via `PORT`; não configure `PORT` manualmente.
- `FRONTEND_URL` deve ser o domínio do frontend sem barra final.

### Frontend (`abacaxi-frontend/.env`)
```env
VITE_API_URL=http://localhost:3001
```

## 4) Convenções de código e arquitetura

### Backend
- Mantenha a API em JavaScript CommonJS (`require`/`module.exports`).
- Use `sequelize.sync()` para criar tabelas automaticamente; não adicione migrações manuais ao projeto.
- Valide entradas com respostas consistentes, por exemplo:
  - `400` para dados inválidos
  - `401` para login/credenciais inválidas
  - `404` para recurso inexistente
- Respostas de erro costumam seguir o padrão:

```js
return res.status(400).json({ erro: 'Mensagem amigável' });
```

- O usuário administrador é criado automaticamente em `src/server.js` a partir de `ADMIN_USER` e `ADMIN_PASSWORD`.
- Mantenha rotas em `src/routes/` e autenticação separada no `middleware`.
- Preserve o comportamento de estoque: vendas só podem ocorrer se houver quantidade suficiente no total.
- Use `await` em operações assíncronas e trate falhas de forma explícita.

### Frontend
- Mantenha a comunicação com a API centralizada em `src/api.js`.
- Use o helper `api()` para todas as requisições, incluindo token JWT em `Authorization`.
- O login salva `token` e `usuario` no `localStorage`.
- Prefira o padrão atual de componentes funcionais com `useState` e `useEffect`.
- Mantenha páginas em `src/pages/` e mantenha a navegação simples em `src/App.jsx`.
- Use utilitários já existentes: `formatarData`, `formatarReais`, `hoje`.
- Não introduzir bibliotecas novas sem necessidade; o projeto usa React + Vite de forma simples.

## 5) Regras de implementação para alterações

- Mantenha consistência com o idioma do projeto (português, nomes sem ambiguidade e texto de UI em português).
- Quando alterar a API, garanta que o frontend continua funcionando com os mesmos endpoints e payloads.
- Quando alterar o frontend, preserve o padrão de localStorage, autenticação e mensagens de erro.
- Não remova funcionalidades existentes sem atualizar a API e o frontend de forma compatível.
- Respeite a separação entre backend e frontend; o frontend não deve acessar o banco diretamente.
- Mantenha o deploy gratuito do Render em mente: cada projeto é publicado separadamente com seu `Root Directory` correto.

## 6) Deploy e ambiente de produção

- Backend no Render: Web Service com `Root Directory: abacaxi-backend`
- Frontend no Render: Static Site com `Root Directory: abacaxi-frontend`
- O backend usa `DATABASE_URL` em produção e o frontend usa `VITE_API_URL` no build.
- O CORS do backend deve permitir o domínio do frontend em `FRONTEND_URL`.
- Para deploys no Render, lembre-se de que as variáveis `VITE_*` são incorporadas no build; mudanças exigem rebuild.

## 7) Validação recomendada

- Para mudanças no backend: validar a API localmente (`npm run dev` ou `npm start`).
- Para mudanças no frontend: validar build com `npm run build`.
- Se a mudança afetar fluxo de autenticação ou cadastro de dados, teste login, listagem e persistência local.
- Sempre que possível, verifique que a aplicação continua funcionando em conjunto (`frontend` + `backend`).

## 8) Diretrizes finais

- Favorizar soluções simples e explícitas em vez de abstrações excessivas.
- Manter o projeto didático e legível; priorizar clareza sobre complexidade.
- Não introduzir TypeScript, ORM diferente, framework novo ou arquitetura mais pesada sem pedido explícito.
- A entrega deve ser compatível com o setup atual do repositório e com o deploy no Render.

## 9) Commits semânticos

- Escreva mensagens de commit seguindo o formato Conventional Commits:
  `<tipo>(<escopo opcional>): <descrição curta>`.
- Use um tipo que represente a mudança:
  - `feat`: nova funcionalidade
  - `fix`: correção de bug
  - `docs`: documentação
  - `style`: formatação ou estilo sem mudança de comportamento
  - `refactor`: refatoração sem mudança de comportamento
  - `test`: testes
  - `build`: build ou dependências
  - `ci`: configuração de integração contínua
  - `chore`: manutenção geral
- Use escopos curtos quando ajudarem a identificar a área, por exemplo `frontend`, `backend` ou `deploy`.
- Escreva a descrição de forma concisa, em minúsculas e no imperativo; não termine com ponto.
- Para mudanças incompatíveis, inclua `!` após o tipo/escopo e explique a quebra no corpo do commit.
- Exemplo: `docs(frontend): document visual style`.

# Regras
Em caso de dúvidas pergunte ao invês de supor.