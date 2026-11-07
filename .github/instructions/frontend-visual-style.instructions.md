---
name: "Estilo visual do frontend"
description: "Use ao criar ou modificar telas, componentes React, CSS, cores, tipografia ou ícones do frontend da Fazenda de Abacaxis."
applyTo: "abacaxi-frontend/src/**/*.{js,jsx,css}"
---

# Instruções visuais do frontend

- Consulte [`abacaxi-frontend/GUIA-DE-ESTILO.md`](../../abacaxi-frontend/GUIA-DE-ESTILO.md) para a paleta, tipografia, marca e padrões visuais existentes.
- Trate o documento como a direção visual desejada, ainda que o CSS atual não esteja totalmente atualizado.
- Para novas telas ou alterações de design, use rosa como cor predominante e a fonte `Arial Black`, com `Arial, sans-serif` como fallback, conforme o guia.
- Use o título exato “Fazenda Abacaxi” no cabeçalho e na tela de login.
- Preserve contraste e cores funcionais para erros e ações destrutivas; não comunique estados somente pela cor.
- Reutilize os padrões de composição existentes: cabeçalho flexível, conteúdo centralizado, cartões brancos, formulários agrupados, tabelas responsivas e indicadores em grade.
- A marca usa o emoji `🍍`; não há biblioteca de ícones no projeto. Evite adicionar dependências de ícones para elementos pontuais.
- Mantenha ações de erro e exclusão visualmente distintas das ações normais. Não comunique estados somente pela cor; mantenha rótulos ou texto compreensível.
- Preserve contraste, legibilidade, estados de foco e funcionamento em telas estreitas ao alterar estilos ou componentes.
