---
description: "Use ao criar ou alterar a interface, componentes ou estilos do frontend da Fazenda de Abacaxis."
applyTo: "abacaxi-frontend/src/**"
---

# Instruções para o frontend

Consulte o [GUIA-DE-ESTILO.md](../../abacaxi-frontend/GUIA-DE-ESTILO.md) ao criar telas ou alterar a apresentação. Ele documenta a paleta, tipografia, marca/ícones, botões, componentes e requisitos de acessibilidade; mantenha a implementação consistente com esse guia.

## Regras de implementação

- Preserve a identidade existente e o idioma português. Reutilize paleta, componentes e classes definidos em `src/styles.css`; não duplique estilos ou crie seletores globais sem necessidade.
- Prefira os componentes funcionais e padrões React já usados no projeto. Mantenha chamadas HTTP centralizadas em `src/api.js`.
- Preserve o comportamento funcional ao alterar a apresentação: estados de carregamento, erros, formulários, navegação e ações precisam continuar explícitos.
- Mantenha responsividade, contraste legível, rótulos visíveis, foco perceptível e navegação por teclado. Não comunique estados somente por cor.
- Evite adicionar dependências de interface, fontes ou ícones para mudanças pontuais.
