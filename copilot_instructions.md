# Instruções para Copilot - devops-abacaxi

## Visão geral

Este repositório é uma aplicação didática de fazenda de abacaxis com duas partes independentes, mas que convivem no mesmo projeto:

- `abacaxi-backend/`: API em Node.js + Express + Sequelize
- `abacaxi-frontend/`: interface em React + Vite

O objetivo do projeto é ensinar deploy em serviços separados com Render, mantendo uma estrutura simples e portátil para desenvolvimento local.

## Arquitetura do repositório

- O repositório não é um monorepo com tooling central; cada pasta é um projeto separado com seu próprio `package.json`.
- O backend expõe a API REST e o frontend consome essa API via `fetch`.
- O backend usa autenticação JWT e protege rotas de colheitas, vendas e resumo.
- O frontend não deve acessar banco nem lógica de negócio; ele apenas exibe dados e envia chamadas à API.
- O deploy em Render usa `Root Directory` diferente para cada serviço (`abacaxi-backend` e `abacaxi-frontend`).

## Stack e convenções

### Backend (`abacaxi-backend`)

- Node.js 20+
- Express
- Sequelize
- MySQL local e PostgreSQL no Render
- Variáveis de ambiente importantes:
  - `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` para MySQL local
  - `DATABASE_URL` para PostgreSQL no Render
  - `JWT_SECRET`, `ADMIN_USER`, `ADMIN_PASSWORD`, `FRONTEND_URL`
- Mantém a lógica de negócio no backend, incluindo validações de estoque, login e permissões.
- A API cria automaticamente as tabelas com `sequelize.sync()` e o usuário admin ao iniciar.
- Preferir CommonJS (`require`, `module.exports`) conforme o código atual.

### Frontend (`abacaxi-frontend`)

- React + Vite
- Variável de ambiente obrigatória: `VITE_API_URL`
- O valor de `VITE_API_URL` é “gravado” no build, então qualquer alteração exige rebuild/deploy do projeto.
- Use `src/api.js` para centralizar chamadas à API.
- Não hardcode a URL da API em componentes ou páginas; use a variável de ambiente.
- Mantenha a interface em português e consistente com a linguagem do projeto.

## Fluxo de desenvolvimento local

### Backend

```bash
cd abacaxi-backend
npm install
cp .env.example .env
npm run dev
```

Requisitos locais:
- MySQL rodando em localhost:3306 (ou container Docker conforme documentação)
- `.env` com as credenciais locais do banco

### Frontend

```bash
cd abacaxi-frontend
npm install
cp .env.example .env
npm run dev
```

O frontend normalmente roda em `http://localhost:5173` e a API em `http://localhost:3001`.

## Guia de estilo do projeto

- Escreva código, textos e mensagens em português, com linguagem simples e direta.
- Mantenha a mesma convenção de nomenclatura já usada no projeto:
  - variáveis e funções em `camelCase`
  - componentes React em `PascalCase`
  - constantes globais em `UPPER_CASE` quando fizer sentido
- Use `require`/`module.exports` no backend e módulos ES do frontend conforme já adotado.
- Prefira código explícito e fácil de seguir; evite abstrações desnecessárias e soluções “genéricas” para um problema simples.
- Siga a convenção de `;` e aspas simples do código atual (`'...'` em JavaScript), a menos que o arquivo já use padrão diferente.
- Mantenha estruturas de arquivos e pastas consistentes com a organização atual do projeto.
- Em componentes React, use nomes claros e funcões simples; mantenha a lógica de renderização e a lógica de API separadas.
- Em mensagens de erro, respostas de API e labels da interface, priorize texto em português e clareza para o usuário final.
- Evite comentários excessivos; só adicione comentários quando houver lógica não óbvia ou regra específica de negócio.
- Referencie o arquivo [abacaxi-frontend/src/styles.css](abacaxi-frontend/src/styles.css) como o guia visual principal do frontend. Mantenha o mesmo visual geral: fundo lilás claro, header rosa, botão principal rosa/laranja, botões de ação em destaque e cards com aparência leve.
- Não introduza estilos visuais, nomes de rotas ou padrões de banco que contradigam a arquitetura didática do projeto.

## Regras para mudanças no código

- Preserve a separação entre frontend e backend.
- Quando alterar rotas da API, verifique se os componentes do frontend que consomem essas rotas também foram ajustados.
- Não introduzir dependências extras sem necessidade.
- Não criar `package.json` na raiz do repositório.
- Não remover o padrão de uso de `.env` e variáveis de ambiente do projeto.
- Não quebrar o comportamento do CORS relacionado a `FRONTEND_URL`.
- Não alterar a lógica de autenticação sem ajustar também os fluxos de login e acesso protegidos.
- Preserve nomes e mensagens em português quando fizer alterações na interface ou na API.

## Regras de segurança e deploy

- Nunca commitar arquivos `.env` ou `node_modules`.
- Manter `FRONTEND_URL` consistente com a URL real do frontend no deploy.
- Respeitar o uso de `DATABASE_URL` no Render e `DB_*` em ambiente local.
- Evitar mudanças que assumam infraestrutura diferente da do plano gratuito do Render.
- O projeto é didático e simples; priorize clareza sobre complexidade.

## Estrutura esperada

```text
devops-abacaxi/
├── README.md
├── .gitignore
├── copilot_instructions.md
├── .github/
│   └── copilot-instructions.md
├── abacaxi-backend/
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── README.md
└── abacaxi-frontend/
    ├── src/
    ├── package.json
    ├── .env.example
    └── README.md
```

## Diretrizes finais para Copilot

- Prefira soluções pequenas e compatíveis com a arquitetura atual.
- Siga a linguagem e os padrões já usados no projeto.
- Ao alterar o backend, pense em como a API e o frontend interagem.
- Ao alterar o frontend, pense em como a URL da API e o build do Vite impactam o deploy.
- Documente mudanças relevantes no README quando o comportamento do projeto mudar.
