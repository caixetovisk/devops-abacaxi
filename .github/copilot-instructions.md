# Instruções do projeto

## Estrutura

- Este repositório contém dois projetos independentes; não há `package.json` na raiz. Execute comandos npm dentro de `abacaxi-backend` ou `abacaxi-frontend`, conforme a alteração.
- `abacaxi-backend`: API Node.js 20+ com Express e Sequelize. A inicialização está em `src/server.js`, os modelos em `src/models.js`, o acesso ao banco em `src/database.js` e as rotas em `src/routes/`.
- `abacaxi-frontend`: interface React com Vite. A entrada é `src/main.jsx`, a navegação está em `src/App.jsx`, as páginas em `src/pages/`, as chamadas à API em `src/api.js` e os estilos globais em `src/styles.css`. Para mudanças visuais, siga o [guia de estilo do frontend](../abacaxi-frontend/GUIA-DE-ESTILO.md).
- Consulte o [README da raiz](../README.md) e os READMEs do [backend](../abacaxi-backend/README.md) e [frontend](../abacaxi-frontend/README.md) para configuração local e deploy.

## Convenções

- Mantenha em português os textos da interface e a documentação voltada às pessoas usuárias; siga o estilo e os padrões já usados nos arquivos próximos.
- Use mensagens de commit semânticas no formato `tipo(escopo): descrição breve`, com tipo em minúsculas e descrição no imperativo. Exemplos: `feat(frontend): adicionar filtro de vendas`, `fix(backend): validar quantidade da colheita`, `docs: atualizar guia de estilo`. Use o escopo quando ajudar a identificar a área; escolha tipos como `feat`, `fix`, `docs`, `style`, `refactor`, `test` ou `chore` conforme a natureza da mudança.
- No backend, use CommonJS e mantenha responsabilidades nas áreas existentes: rotas HTTP em `src/routes/`, persistência/modelos com Sequelize e autenticação compartilhada pelo middleware existente.
- As rotas de colheitas, vendas e resumo são protegidas por autenticação. Preserve o formato de respostas e os cálculos de estoque/faturamento ao alterar esses fluxos; considere também as telas que consomem as rotas.
- No frontend, use componentes funcionais React e mantenha requisições centralizadas no helper de `src/api.js`, que usa `VITE_API_URL` e envia o token de autenticação.
- O backend usa MySQL localmente (`DB_*`) e PostgreSQL quando `DATABASE_URL` está definida. Não codifique credenciais: use variáveis de ambiente e mantenha valores de exemplo sem segredos em `.env.example`.
- `VITE_*` é incorporado ao bundle durante o build; não coloque segredos nessas variáveis.

## Validação

- Frontend: dentro de `abacaxi-frontend`, execute `npm run build`.
- Backend: dentro de `abacaxi-backend`, execute `npm start` com banco e variáveis de ambiente configurados; `npm run dev` inicia em modo de desenvolvimento com reinicialização automática.
- Os `package.json` atuais não definem scripts de teste ou lint. Não presuma que esses comandos existem; se uma alteração exigir validação adicional, descreva e execute uma verificação apropriada.
