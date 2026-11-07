---
description: "Use when developing the React frontend, including components, pages, CSS, layout, and visual design. Follow the frontend architecture and visual guide."
name: "Frontend Development"
applyTo: "abacaxi-frontend/src/**/*"
---

# Instruções do frontend

- Consulte [`@STYLE_GUIDE.md`](../../abacaxi-frontend/STYLE_GUIDE.md) antes de alterar a apresentação visual; ele registra a paleta, tipografia, ícones e padrões de controles atuais.
- Preserve a organização existente: componentes de página em `src/pages/`, ponto de entrada em `src/main.jsx` e navegação/seleção de telas em `src/App.jsx`.
- Use componentes funcionais e hooks do React já utilizado pelo projeto. Não adicione roteador, biblioteca de UI ou outra dependência sem necessidade.
- Para chamadas à API, reutilize `api()` e mantenha compatibilidade com os formatos de resposta e erro atuais. Use os formatadores localizados fornecidos por `useIdioma()`.
- Português é o idioma padrão; todo texto visível novo ou alterado deve ser mantido nos catálogos de português, inglês e chinês em `src/i18n.jsx`. Preserve a preferência de idioma em `localStorage`.
- Mantenha os estilos em `src/styles.css`, associe classes via `className` no JSX e reutilize classes existentes (`.card`, `.formulario`, `.tabela`, `.indicadores`, `.erro`, `.dica`) antes de criar variantes.
- Preserve a identidade visual existente e o comportamento responsivo: layouts com Flexbox/Grid, formulários que quebram linha e tabelas com rolagem horizontal quando necessário. Confira mudanças visuais em larguras estreitas e largas.
- Use Português do Brasil como padrão e mantenha datas e valores monetários formatados conforme o idioma selecionado.
- Valide alterações com `npm run build` executado na pasta `abacaxi-frontend`.
