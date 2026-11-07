---
description: "Use when creating or editing source code in the DevOps Abacaxi project. Follow its current JavaScript, React, CSS, naming, and file organization conventions."
applyTo: ["abacaxi-backend/src/**/*.js", "abacaxi-frontend/src/**/*.{js,jsx,css}"]
---

# Guia de estilo do código

- Antes de editar, confira os arquivos próximos e siga seu padrão de formatação: indentação de dois espaços, ponto e vírgula e organização simples, sem reformatar código não relacionado.
- Use CommonJS (`require` e `module.exports`) no backend, que não declara `"type": "module"`. No frontend, use módulos ES (`import` e `export`).
- No backend, mantenha responsabilidades nas áreas existentes: inicialização em `server.js`, persistência e modelos Sequelize em seus módulos, cálculo de estoque em `estoque.js` e endpoints em `routes/`, agrupados por recurso.
- No frontend, use componentes funcionais React e hooks; mantenha cada tela em `src/pages/` e compartilhe chamadas HTTP e formatação por `src/api.js`.
- Prefira nomes claros em português para conceitos de domínio e funções correspondentes, de acordo com o código existente (`calcularEstoque`, `colheitas`, `formatarData`).
- Preserve contratos e padrões atuais ao alterar a API: mesmos caminhos, métodos, formatos de resposta e erros JSON `{ erro: "..." }`. Reutilize Sequelize e mantenha compatibilidade com MySQL e PostgreSQL.
- Evite dependências novas, abstrações desnecessárias e comentários que apenas repetem o código. Documente somente decisões ou comportamentos não óbvios.
- Para decisões visuais no frontend, siga o [guia visual](../../abacaxi-frontend/STYLE_GUIDE.md) e as [instruções visuais do frontend](./frontend.instructions.md).
