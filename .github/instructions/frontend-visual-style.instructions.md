---
description: "Use when creating or editing frontend UI, React components, CSS, HTML, typography, icons, buttons, colors, or responsive layouts. Follow the established Fazenda de Abacaxis visual style."
applyTo:
  - "abacaxi-frontend/src/**/*.{js,jsx,css}"
  - "abacaxi-frontend/index.html"
---

# Instruções visuais do frontend

- Antes de alterar a aparência, consulte o [guia visual do frontend](../../abacaxi-frontend/STYLE_GUIDE.md); ele documenta a paleta, tipografia, ícones e componentes visuais existentes.
- Preserve `system-ui, sans-serif`, o emoji `🍍` como símbolo da aplicação e as cores existentes para cabeçalho, ações principais, navegação ativa e erros.
- Reutilize os padrões e classes de `abacaxi-frontend/src/styles.css` para botões, campos, cartões, formulários, tabelas e indicadores, em vez de criar estilos concorrentes ou dependências visuais sem necessidade.
- Use o catálogo de traduções para todos os textos visíveis e mantenha português, inglês e chinês simplificado sincronizados; ações devem ter rótulos claros e estados de carregamento, desabilitado e erro perceptíveis.
- Preserve a adaptação a telas estreitas já usada por flexbox, `flex-wrap`, grade adaptável e rolagem horizontal de tabelas.
