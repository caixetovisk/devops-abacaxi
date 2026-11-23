---
description: "Use when creating or editing JavaScript, JSX, CSS, or HTML in this project. Describes the existing formatting and implementation style."
applyTo:
  - "abacaxi-backend/**/*.js"
  - "abacaxi-frontend/src/**/*.{js,jsx,css}"
  - "abacaxi-frontend/index.html"
---

# Guia de estilo do projeto

## Formatação e linguagem

- Mantenha a indentação de dois espaços, use ponto e vírgula e prefira aspas simples em JavaScript. Em JSX, use aspas duplas nos atributos.
- Preserve a organização e o estilo já adotados no arquivo; evite reformatar trechos não relacionados à alteração.
- O português é o idioma padrão da interface. Adicione e mantenha textos visíveis no catálogo de traduções para todos os idiomas suportados.

## Backend

- Use CommonJS (`require` e `module.exports`) e mantenha as rotas Express em `abacaxi-backend/src/routes/`.
- Implemente handlers assíncronos com `async`/`await`. Use os modelos Sequelize existentes para acessar dados e `abacaxi-backend/src/estoque.js` para cálculos de estoque.
- Valide os dados recebidos pela API e responda com códigos HTTP apropriados e mensagens de erro no formato `{ erro: '...' }`.
- Mantenha rotas protegidas sob o middleware de autenticação existente; não exponha credenciais ou segredos.

## Frontend

- Use módulos ES e componentes React funcionais. Mantenha componentes de tela em `abacaxi-frontend/src/pages/` e use os hooks React já adotados.
- Centralize chamadas HTTP e funções utilitárias em `abacaxi-frontend/src/api.js`; trate falhas de requisição e apresente mensagens de erro à pessoa usuária conforme o padrão das telas existentes.
- Use `className` para classes CSS em JSX e preserve as classes existentes quando alterar a interface.
- Mantenha os estilos em CSS simples em `abacaxi-frontend/src/styles.css`, seguindo os seletores, propriedades e unidades já usados no projeto.
- Para alterações visuais, siga também a instrução [frontend-visual-style.instructions.md](frontend-visual-style.instructions.md).
