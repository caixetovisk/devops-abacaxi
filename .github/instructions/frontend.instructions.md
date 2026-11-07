---
applyTo: "abacaxi-frontend/**/*.{js,jsx,css,html}"
---

# Instruções específicas do frontend

Este conjunto de regras vale apenas para a pasta `abacaxi-frontend`.

Consulte também o guia visual em [../../abacaxi-frontend/STYLE_GUIDE.md](../../abacaxi-frontend/STYLE_GUIDE.md) como referência principal do design atual do projeto.

## Objetivo

Manter a interface visual consistente com o design atual do projeto Fazenda de Abacaxis, priorizando simplicidade, legibilidade e manter a identidade visual da aplicação.

## Diretrizes visuais

- Preserve a paleta atual do projeto:
  - fundo principal: `#fdf8e6`
  - destaque principal: `#de04e1`
  - destaque ativo: `#f9c80e`
  - botão principal: `#2e7d32`
  - botão de exclusão/erro: `#c62828`
  - texto principal: `#333`
- Use `system-ui, sans-serif` como fonte principal.
- Continue usando emoji como elemento de marca e contexto visual, principalmente `🍍`.
- Mantenha cards com fundo branco, bordas leves e sombras sutis.
- Preserve o layout funcional com header, navegação, área principal centralizada e formulários claros.

## Padrões de UI

- Use botões verdes para ações primárias.
- Use amarelo para estados ativos ou seleção.
- Use vermelho apenas para ações de exclusão ou feedback de erro.
- Não use bibliotecas de UI extras, temas pesados ou estilos que quebrem a identidade do projeto.
- Mantenha o código CSS direto, sem frameworks CSS desnecessários.

## Componentes e código

- Prefira componentes React funcionais e simples.
- Mantenha nomes de componentes em PascalCase: `Login`, `Painel`, `Vendas`.
- Use `className` com nomes descritivos em minúsculas, como `card`, `login`, `tabela`, `indicadores`.
- Centralize chamadas à API em `src/api.js` e evite duplicação de fetch.
- Use `localStorage` para token e usuário conforme padrão já existente.

## Estilo de implementação

- Preserve o padrão atual de código em JavaScript sem TypeScript.
- Siga o CSS já estabelecido em `src/styles.css` como referência visual.
- Evite refatorações grandes sem necessidade.
- Ao criar telas novas, mantenha o mesmo nível de simplicidade e consistência visual.

## Regras de qualidade

- Textos visíveis ao usuário devem estar em português.
- O resultado deve continuar legível em telas pequenas.
- O contraste deve permanecer bom para usuários e formularios.
- Não introduza elementos visuais excessivamente modernos ou incompatíveis com o tema da fazenda.

## Checklist final

Antes de concluir uma alteração no frontend, confirme:

- a paleta visual foi preservada;
- os botões seguem o padrão de cor e estilo;
- os cards e formulários estão consistentes;
- os textos continuam em português;
- o layout e a legibilidade foram mantidos.
