# Instruções do projeto

## Contexto e arquitetura

- Este repositório contém dois projetos independentes: `abacaxi-backend/` (API Node.js e Express) e `abacaxi-frontend/` (React e Vite). Cada um tem seu próprio `package.json`; execute comandos dentro da pasta correspondente.
- O backend organiza a inicialização em `src/server.js`, a conexão e modelos Sequelize em `src/database.js` e `src/models.js`, as regras de estoque em `src/estoque.js` e os endpoints em `src/routes/`. As rotas de colheitas, vendas e resumo usam o middleware de autenticação.
- O backend usa CommonJS (`require`/`module.exports`) e suporta MySQL local e PostgreSQL via `DATABASE_URL`. Preserve a compatibilidade com ambos ao alterar consultas ou modelos.
- O frontend usa módulos ES, componentes React com hooks e páginas em `src/pages/`. Centralize chamadas à API e formatação em `src/api.js`; a URL é configurada por `VITE_API_URL`.
- Para mudanças na interface, siga o [guia visual do frontend](../abacaxi-frontend/STYLE_GUIDE.md) e as instruções específicas em `.github/instructions/frontend.instructions.md`.
- Para convenções de código ao editar arquivos-fonte, siga `.github/instructions/guia-estilo.instructions.md`.
- Consulte [README.md](../README.md), [README do backend](../abacaxi-backend/README.md) e [README do frontend](../abacaxi-frontend/README.md) para instruções completas de desenvolvimento e deploy. Atualize a documentação correspondente quando mudar comandos, configuração ou comportamento descritos nela.

## Convenções de implementação

- Mantenha cada alteração no projeto e na camada apropriados; não misture lógica de interface, endpoints, persistência e regras de negócio.
- Preserve os contratos HTTP existentes: rotas, métodos, formatos JSON e códigos de status. Valide os dados recebidos na API e retorne erros no formato `{ erro: "..." }`, de acordo com os endpoints existentes.
- Reutilize `src/estoque.js` para cálculos de estoque. Ao alterar colheitas ou vendas, preserve as regras que impedem vendas sem estoque e a exclusão de colheitas já vendidas.
- Mantenha a autenticação JWT nas rotas protegidas e use o cliente de `src/api.js` no frontend para enviar chamadas autenticadas e tratar respostas.
- Use indentação de dois espaços e mantenha o padrão de aspas e ponto e vírgula dos arquivos próximos. Prefira nomes claros em português para conceitos de domínio, seguindo exemplos como `calcularEstoque`, `colheitas` e `formatarData`.
- No backend, mantenha rotas Express pequenas e organizadas por recurso; use Sequelize para persistência e respostas JSON consistentes com as rotas existentes.
- No frontend, use componentes funcionais React e hooks. Mantenha páginas em `src/pages/`, reaproveite o cliente e os formatadores de `src/api.js` e use estado local para interações da página.
- Em CSS, preserve os seletores e classes já usados nos componentes. Use regras compactas para seletores simples e blocos multilinha quando houver várias propriedades.
- Prefira mudanças localizadas e consistentes com o arquivo existente. Evite comentários redundantes; comente apenas contratos ou comportamentos que não sejam óbvios.
- Não adicione dependências, abstrações ou ferramentas sem necessidade. Não registre segredos, credenciais, tokens ou arquivos `.env` no repositório; use variáveis de ambiente.

## Desenvolvimento e validação

- Backend: em `abacaxi-backend/`, use `npm install` e `npm run dev`. Para desenvolvimento local, configure o MySQL e as variáveis de ambiente conforme o README do backend; `docker compose up -d` inicia o MySQL incluído no Compose.
- Frontend: em `abacaxi-frontend/`, use `npm install`, configure `VITE_API_URL` e execute `npm run dev`.
- Para validar alterações no frontend, execute `npm run build` na pasta `abacaxi-frontend`. Para alterações no backend, execute a API com a configuração local válida e verifique a rota de saúde e o endpoint afetado.
- Não há scripts de teste ou lint definidos nos `package.json` atuais. Não afirme que foram executados; informe claramente quais verificações foram feitas.
