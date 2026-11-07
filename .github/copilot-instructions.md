# Instruções de desenvolvimento para o projeto DevOps Abacaxi

Este repositório é um projeto didático de uma fazenda de abacaxis com duas partes independentes que vivem na mesma pasta raiz:

- `abacaxi-backend/`: API em Node.js + Express + Sequelize
- `abacaxi-frontend/`: interface em React + Vite

A regra principal é: cada pasta é um projeto separado, com seu próprio `package.json` e suas próprias variáveis de ambiente. O deploy em produção no Render usa `Root Directory` diferente em cada serviço.

## 1. Visão geral da arquitetura

- O frontend roda no navegador e chama a API via `VITE_API_URL`.
- A API autentica usuários com JWT e protege as rotas de colheitas, vendas e resumo.
- O banco segue o padrão:
  - local: MySQL
  - produção no Render: PostgreSQL via `DATABASE_URL`
- O backend cria automaticamente as tabelas com `sequelize.sync()` e também cria o usuário administrador ao iniciar.

Fluxo funcional:

- Login com usuário e senha
- Registro de colheitas
- Registro de vendas
- Cálculo de estoque com base em total colhido menos total vendido
- Resumo do painel com quantidade colhida, vendida, estoque e faturamento

## 2. Estrutura do repositório

```text
devops-abacaxi/
├── README.md
├── copilot-instructions.md
├── abacaxi-backend/
│   ├── README.md
│   ├── docker-compose.yml
│   ├── package.json
│   ├── src/
│   │   ├── database.js
│   │   ├── estoque.js
│   │   ├── models.js
│   │   ├── server.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── routes/
│   │       ├── auth.js
│   │       ├── colheitas.js
│   │       ├── resumo.js
│   │       └── vendas.js
└── abacaxi-frontend/
    ├── README.md
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── App.jsx
        ├── api.js
        ├── main.jsx
        ├── styles.css
        └── pages/
            ├── Colheitas.jsx
            ├── Login.jsx
            ├── Painel.jsx
            └── Vendas.jsx
```

## 3. Backend (abacaxi-backend)

### Stack

- Node.js 20+
- Express
- Sequelize
- MySQL local ou PostgreSQL em produção
- JWT para autenticação
- bcryptjs para hash de senha

### Arquitetura e regras

- O ponto de entrada é `src/server.js`.
- `src/database.js` escolhe o banco conforme a presença de `DATABASE_URL`:
  - com `DATABASE_URL`: usa PostgreSQL
  - sem `DATABASE_URL`: usa MySQL com `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`
- `src/models.js` define os modelos:
  - `Usuario`
  - `Colheita`
  - `Venda`
- `src/estoque.js` calcula o estoque em função de colheitas e vendas.
- `src/middleware/auth.js` protege rotas privadas com token JWT.

### Rotas principais

- `GET /`: health check da API
- `POST /auth/login`: autenticação do usuário
- `GET /colheitas` e `POST /colheitas`
- `DELETE /colheitas/:id`
- `GET /vendas` e `POST /vendas`
- `DELETE /vendas/:id`
- `GET /resumo`

### Regras de negócio importantes

- Usuário admin é criado automaticamente usando `ADMIN_USER` e `ADMIN_PASSWORD`.
- O backend usa `sequelize.sync()` para criar tabelas automaticamente.
- Não é necessário rodar migrations para o projeto funcionar localmente.
- A venda só pode ser criada se a quantidade não exceder o estoque disponível.
- A exclusão de colheita só é permitida quando os abacaxis daquela colheita ainda não foram vendidos.
- Respostas de erro devem seguir o padrão `res.status(...).json({ erro: '...' })`.
- Sempre mantenha o contrato de resposta JSON simples e compatível com o frontend.

### Variáveis de ambiente para o backend

Arquivo `.env` dentro de `abacaxi-backend/`:

- `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` para MySQL local
- `DATABASE_URL` para PostgreSQL em Render
- `JWT_SECRET`
- `ADMIN_USER`
- `ADMIN_PASSWORD`
- `FRONTEND_URL` para permitir CORS no Render
- `PORT` opcional; o Render define sozinho

### Comandos locais

```bash
cd abacaxi-backend
npm install
npm run dev
```

Ou:

```bash
npm start
```

## 4. Frontend (abacaxi-frontend)

### Stack

- React 18
- Vite
- JavaScript (não TypeScript)

### Arquitetura e regras

- O ponto de entrada é `src/main.jsx`.
- `src/App.jsx` gerencia a navegação entre páginas e o estado do usuário.
- `src/api.js` centraliza as chamadas para a API e injeta o token JWT no header `Authorization`.
- As páginas principais são:
  - `Login.jsx`
  - `Painel.jsx`
  - `Colheitas.jsx`
  - `Vendas.jsx`
- O frontend usa `localStorage` para guardar `token` e `usuario`.

### Variáveis de ambiente para o frontend

O projeto usa Vite, então a variável deve começar com `VITE_`:

```env
VITE_API_URL=http://localhost:3001
```

Importante:

- No Vite, `VITE_*` é resolvida no momento do build. Se o valor mudar, é necessário rebuildar e redeployar.
- Em produção no Render, `VITE_API_URL` deve apontar para a URL da API (sem barra final).

### Comandos locais

```bash
cd abacaxi-frontend
npm install
npm run dev
```

Para testar build de produção:

```bash
npm run build
npm run preview
```

## 5. Guia de estilo atual do projeto

Siga estas convenções para manter o código alinhado com o padrão já adotado pelo repositório:

### 5.1 Estilo geral de código

- Use JavaScript puro, sem TypeScript, sem framework extra e sem bibliotecas de UI adicionais.
- Preserve o padrão atual do backend em CommonJS (`require`, `module.exports`) e do frontend em ESM do Vite (`import`, `export`).
- Prefira funções pequenas, bem nomeadas e com responsabilidade única.
- Use `const` para valores imutáveis e `async function`/`await` para operações assíncronas.
- Siga o estilo com ponto e vírgula no final das instruções, como no código atual.
- Evite abstrações complexas, hooks customizados desnecessários e arquitetura extra.

### 5.2 Nomenclatura e linguagem

- Use nomes em português para domínio funcional: `usuario`, `senha`, `colheita`, `venda`, `painel`, `resumo`.
- Mantenha textos visíveis ao usuário em português, em tom simples e objetivo.
- Para componentes React, use nomes descritivos em PascalCase (`Login`, `Painel`, `Vendas`), e para funções internas/useState use camelCase.
- Para classes CSS, use nomes em minúsculas e descritivos (`login`, `card`, `tabela`, `indicadores`).

### 5.3 Frontend (React + Vite)

- Mantenha componentes funcionais, com `useState` e `useEffect` apenas quando necessário.
- Use `localStorage` para persistência simples de `token` e `usuario`.
- Centralize chamadas à API em `src/api.js` e evite duplicar lógica de fetch por página.
- Use `className` em JSX, preservando a estrutura visual atual de cards, formulários, tabelas e botões.
- Mantenha layouts responsivos com `display: flex`, `grid` e `gap`, sem depender de frameworks CSS.
- Preserve o visual existente: fundo claro, botões verdes, destaque em amarelo/rosa para elementos principais.

### 5.4 Backend (Express + Sequelize)

- Organize rotas em arquivos separados dentro de `src/routes/`.
- Continue retornando erros em JSON com a estrutura `res.status(...).json({ erro: '...' })`.
- Valide entradas de forma explícita e mantenha mensagens de erro legíveis.
- Preserve a lógica de negócio atual: estoque calculado por colheitas menos vendas e bloqueio de venda com estoque insuficiente.
- Mantenha as rotas protegidas com `auth` e JWT.

### 5.5 Estrutura e manutenção

- Não adicione dependências novas sem necessidade clara.
- Não reestruture o projeto em TypeScript, em arquitetura MVC diferente ou em outra stack sem necessidade explícita.
- Mantenha a separação entre frontend e backend; cada projeto continua funcionando de forma independente.
- Os arquivos e pastas existentes devem continuar seguindo a organização didática do repositório.
- Prefira correções pequenas e específicas em vez de refatorações grandes.

## 6. Padrões de desenvolvimento para o Copilot

- Preserve a estrutura já existente: backend em CommonJS e frontend em módulos ESM do Vite.
- Mantenha a separação entre API e interface; mudanças no frontend não devem depender de lógica de banco e vice-versa.
- Prefira correções pequenas e específicas em vez de refatorações grandes.
- Preserve os nomes em português usados no projeto, especialmente em textos visíveis para o usuário.
- Ao alterar regras de negócio, mantenha consistência com `estoque.js` e as rotas de `colheitas`/`vendas`.
- Ao alterar a API, confira se o frontend continua consumindo o mesmo contrato JSON.
- Ao alterar o frontend, valide se a URL da API continua apontando por `VITE_API_URL`.
- Não adicione dependências sem necessidade.
- Não mova arquivos para outra pasta sem necessidade; o projeto foi organizado para fins didáticos e de deploy.

## 7. Regras de deploy importantes

- O Render usa o mesmo repositório, mas cada serviço aponta para uma pasta diferente:
  - API: `Root Directory = abacaxi-backend`
  - Frontend: `Root Directory = abacaxi-frontend`
- Em produção, `FRONTEND_URL` na API deve refletir exatamente a URL do site frontend, sem barra final.
- O backend usa `DATABASE_URL` no Render e a variável `DB_SSL=true` pode ser necessária para acesso externo, conforme a documentação do banco.

## 8. Checklist antes de concluir uma alteração

- Backend:
  - `npm install` já foi feito no diretório correto?
  - A API continua iniciando sem erros?
  - O contrato da rota desejada continua consistente?
  - O login e autenticação continuam funcionando?

- Frontend:
  - `VITE_API_URL` está correto?
  - O build local `npm run build` continua funcionando?
  - A tela ou fluxo alterado continua integrado à API?

## 9. Referências do projeto

- README raiz: `README.md`
- README do backend: `abacaxi-backend/README.md`
- README do frontend: `abacaxi-frontend/README.md`

Use esses arquivos como fonte de verdade para fluxo local e deploy.

# Regras
Em caso de dúvidas pergunte ao invés de supor.