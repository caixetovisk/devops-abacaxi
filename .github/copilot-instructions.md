# Instruções do projeto

## Contexto e arquitetura

- Este repositório contém dois projetos independentes: `abacaxi-backend/` (API Node.js, Express e Sequelize) e `abacaxi-frontend/` (React e Vite). Cada um tem seu próprio `package.json` e é implantado separadamente; execute comandos dentro da pasta correspondente.
- O backend usa CommonJS. A conexão seleciona MySQL pelas variáveis `DB_*` localmente ou PostgreSQL por `DATABASE_URL`; preserve essa compatibilidade ao alterar o banco ou os modelos.
- As rotas da API ficam em `abacaxi-backend/src/routes/`; rotas protegidas usam o middleware de autenticação. Mantenha regras de negócio e acesso a dados no backend, não no frontend.
- O frontend usa módulos ES, componentes React em `src/pages/` e centraliza chamadas HTTP e formatação em `abacaxi-frontend/src/api.js`. Reutilize essa camada para chamadas à API.

## Convenções de alteração

- Siga os padrões e a linguagem já usados no arquivo e na área que estiver modificando. O português é o idioma padrão da interface; a documentação do projeto é em português.
- Configure URLs, credenciais e demais valores por ambiente: use `.env.example` como referência, não inclua segredos em código ou commits e não dependa de valores locais em produção.
- Preserve os contratos das rotas e o fluxo entre frontend e API; ao alterá-los, atualize os consumidores e a documentação pertinente.
- Consulte os READMEs da raiz, backend ou frontend para instruções completas de desenvolvimento e deploy; evite duplicar neles o conteúdo detalhado.

## Commits

- Use mensagens de commit semânticas no formato `tipo(escopo opcional): resumo`, por exemplo `feat(frontend): add harvest form` ou `docs: document visual style`.
- Escolha um tipo que descreva a mudança: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci` ou `chore`.
- Escreva um resumo curto, específico e em minúsculas; omita o escopo quando não acrescentar clareza.

## Build e validação

- Backend: em `abacaxi-backend/`, use `npm run dev` para desenvolvimento ou `npm start` para iniciar normalmente.
- Frontend: em `abacaxi-frontend/`, use `npm run dev` para desenvolvimento e `npm run build` para validar o build de produção.
- Não há scripts de teste ou lint configurados nos `package.json` atuais. Não afirme que foram executados; valide as mudanças com os comandos disponíveis e verificações direcionadas.
