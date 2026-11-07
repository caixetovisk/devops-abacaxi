# Instruções do Copilot

## Contexto e arquitetura

- Este repositório contém dois projetos independentes: `abacaxi-backend/` (Node.js 20+, Express e Sequelize) e `abacaxi-frontend/` (React 18 e Vite). Cada um tem seu próprio `package.json`; execute comandos dentro da pasta correspondente.
- O frontend consome a API HTTP do backend. A API atende login, colheitas, vendas e resumo; consulte os READMEs da raiz e dos projetos para arquitetura, configuração local e deploy no Render.
- No backend, `src/server.js` registra as rotas, `src/models.js` define os modelos, `src/database.js` configura o Sequelize, `src/middleware/auth.js` protege rotas e `src/estoque.js` calcula o estoque.
- No frontend, `src/App.jsx` controla login e navegação, `src/api.js` centraliza chamadas à API e `src/pages/` contém as telas.

## Convenções de implementação

- Preserve os padrões de formatação e nomenclatura estabelecidos no código próximo; mantenha textos da interface e mensagens em português.
- Para telas e estilos, siga a identidade visual documentada em `abacaxi-frontend/GUIA-DE-ESTILO.md` e as instruções em `.github/instructions/frontend-visual-style.instructions.md`: rosa predominante, fonte `Arial Black` e título “Fazenda Abacaxi”.
- Preserve a separação entre backend e frontend e evite adicionar dependências sem necessidade.
- Mantenha a lógica de negócio no backend. Colheitas, vendas e resumo devem usar os modelos e utilitários existentes, sem duplicar o cálculo de estoque.
- Vendas não podem exceder o estoque disponível; exclusão de colheita não pode deixar o estoque negativo. Preserve essas invariantes ao alterar as rotas.
- Rotas protegidas usam o middleware de autenticação JWT. Não remova proteção nem exponha senhas, hashes, tokens ou valores de ambiente.
- A API usa respostas JSON e o formato `{ erro: "..." }` para erros esperados. Preserve os códigos HTTP e os formatos consumidos pelo frontend.
- O frontend deve chamar a API por `src/api.js`, que usa `VITE_API_URL`; não fixe URLs de produção em componentes. Variáveis `VITE_*` são incorporadas no build.
- Configure segredos e endereços por variáveis de ambiente. O backend usa `DATABASE_URL` para PostgreSQL ou `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASSWORD` para MySQL; consulte os READMEs para a configuração completa.

## Comandos e validação

- Backend: em `abacaxi-backend/`, use `npm run dev` para desenvolvimento e `npm start` para iniciar normalmente. A API depende de banco de dados e das variáveis de ambiente apropriadas.
- Frontend: em `abacaxi-frontend/`, use `npm run dev` para desenvolvimento e `npm run build` para validar o build de produção.
- Não há scripts de teste declarados nos `package.json` atuais. Se adicionar ou alterar comportamento, execute a validação aplicável e informe claramente qualquer teste que não pôde ser executado.
- Ao alterar configuração, variáveis de ambiente, endpoints ou payloads, atualize a documentação do projeto relacionada e mantenha frontend e backend compatíveis.
