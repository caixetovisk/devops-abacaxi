# Instruções do projeto

## Estrutura e arquitetura

- Este repositório contém dois projetos independentes: `abacaxi-frontend/` (React 18 com Vite) e `abacaxi-backend/` (Node.js 20+ com Express 5 e Sequelize). Cada um tem seu próprio `package.json`; execute comandos npm dentro da pasta correspondente.
- O frontend consome a API pelo helper `abacaxi-frontend/src/api.js`. Use `VITE_API_URL` para configurar o endereço; as variáveis `VITE_*` são incorporadas durante o build.
- A API concentra as rotas em `abacaxi-backend/src/routes/`, os modelos em `src/models.js` e a conexão de banco em `src/database.js`. Ela usa PostgreSQL com `DATABASE_URL` ou MySQL com variáveis `DB_*`.
- Mantenha regras de negócio e validações no backend; adapte as telas para consumir os contratos da API em vez de duplicar essas regras no frontend.

## Convenções de código

- Preserve os padrões existentes: ES modules e JSX no frontend; CommonJS no backend. Os componentes de página ficam em `abacaxi-frontend/src/pages/` e usam componentes funcionais e hooks do React.
- Reutilize `api()` e os formatadores de `src/api.js` nas páginas. A função já envia o token armazenado e trata respostas sem conteúdo; mantenha os formatos de erro da API (`{ erro }`) compatíveis com o frontend.
- Mantenha rotas autenticadas protegidas pelo middleware existente e atualize a documentação da API quando alterar rotas, variáveis de ambiente ou o fluxo de deploy.
- Não inclua segredos em código ou arquivos versionados. Use os `.env.example` como referência e variáveis de ambiente para configuração.
- Faça mudanças pequenas e coerentes com a interface atual. Não adicione dependências, frameworks ou scripts sem necessidade; não presuma a existência de testes ou lint: os `package.json` atuais não os definem.
- Ao criar commits, use mensagens semânticas no formato `tipo(escopo): descrição` (por exemplo, `feat(frontend): adicionar filtro de vendas`). Escolha um tipo preciso, como `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build` ou `ci`; escreva uma descrição curta, clara e no imperativo. Não crie commits sem relação entre si no mesmo changeset.

## Build e execução

- Frontend: em `abacaxi-frontend/`, `npm run dev` inicia o servidor local e `npm run build` valida e gera o build de produção.
- Backend: em `abacaxi-backend/`, `npm run dev` inicia a API com reinício automático ou `npm start` inicia normalmente. A API precisa das variáveis de ambiente e do banco configurado.
- Antes de concluir alterações, execute a validação mais relevante para o projeto afetado. Para mudanças de integração, considere os dois lados e consulte os READMEs da raiz e de cada projeto para os passos de configuração e deploy.
