---
description: "Use when configuring, troubleshooting, or changing deployment of the backend API or React frontend on Render. Covers service settings, environment variables, database, CORS, and deployment checks."
---

# Deploy no Render

- Consulte os [passos completos de deploy](../../README.md), o [README do backend](../../abacaxi-backend/README.md) e o [README do frontend](../../abacaxi-frontend/README.md) antes de alterar a configuração. Mantenha-os alinhados com qualquer mudança no processo.
- O backend e o frontend são projetos independentes no mesmo repositório, publicados como serviços Render distintos. Configure o **Root Directory** de cada serviço: `abacaxi-backend` para a API e `abacaxi-frontend` para o site.
- Siga a ordem: criar PostgreSQL, publicar a API, publicar o frontend e então atualizar o CORS da API com o endereço definitivo do site.

## API e banco

- Configure o backend como **Web Service**, com `npm install` como build e `npm start` como comando de início. Não defina `PORT` no Render; o serviço fornece essa variável.
- Crie o PostgreSQL na mesma região da API e use sua **Internal Database URL** em `DATABASE_URL`. A API seleciona PostgreSQL quando essa variável existe; sem ela, usa MySQL e as variáveis `DB_*`.
- Gere `JWT_SECRET` como um valor longo e aleatório. Configure `ADMIN_USER`, `ADMIN_PASSWORD` e `FRONTEND_URL` como variáveis de ambiente do serviço; não publique segredos nem os inclua em arquivos versionados.
- Use `DB_SSL=true` somente ao conectar pela **External Database URL**. Prefira a URL interna quando API e banco estiverem na mesma região.

## Frontend e integração

- Configure o frontend como **Static Site**, com `npm install && npm run build` como build e `dist` como diretório publicado.
- Defina `VITE_API_URL` como a URL HTTPS pública da API, sem barra final. Essa variável é incorporada durante o build: qualquer alteração exige um novo deploy do frontend.
- Depois de obter a URL pública definitiva do site, defina `FRONTEND_URL` na API com essa origem, sem barra final, para que o CORS permita as chamadas do navegador.
- Configure URLs e credenciais no painel do Render, não em `.env` versionados. Use os arquivos `.env.example` somente como referência para desenvolvimento local.

## Verificação após deploy

- Confirme que o deploy da API inicia sem erros e que sua rota `/` responde com status `ok`.
- Confirme que o site carrega, que `VITE_API_URL` aponta para a API publicada e que o login e as chamadas autenticadas funcionam sem erros de CORS.
- Ao diagnosticar `ENOENT` ou ausência de `package.json`, confira o **Root Directory**. Ao diagnosticar conexão com o banco, confira a região e se a URL escolhida é interna ou externa.
- Considere as limitações do plano escolhido, incluindo serviços que podem suspender após inatividade e prazos de expiração do banco; consulte os READMEs para as informações atuais.
