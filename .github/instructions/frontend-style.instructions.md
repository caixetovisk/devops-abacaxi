---
applyTo: "abacaxi-frontend/**/*.{js,jsx,css}"
---

# Instruções de estilo do frontend — Fazenda de Abacaxis

## Referência visual obrigatória
Consulte e siga o guia visual em `abacaxi-frontend/STYLE_GUIDE.md` antes de alterar qualquer componente, texto visual, paleta, espaçamento, botão, card, formulário ou comportamento de UI.

## Escopo
Aplique estas regras para qualquer alteração em componentes, páginas, estilos, textos e interações do frontend em `abacaxi-frontend`.

## Base visual
- Use a paleta atual do projeto:
  - header: `#2d2292`
  - fundo principal: `#fdf8e6`
  - verde principal: `#2e7d32`
  - verde escuro: `#1b5e20`
  - amarelo destaque: `#f9c80e`
  - vermelho alerta: `#c62828`
  - texto principal: `#333333`
  - texto secundário: `#666666`
  - branco dos cards: `#ffffff`
- Mantenha a aparência simples, funcional e didática.
- Evite estilos excessivamente modernos, neon, fricção visual ou design pesado.

## Tipografia
- Use `system-ui, sans-serif` como fonte base.
- Preserve hierarquia visual simples e clara.
- Textos em português, incluindo mensagens de erro, labels e títulos.
- Não adicione fontes externas sem necessidade explícita.

## Ícones e marca
- A identidade visual principal é a fruta 🍍.
- Use emojis ou elementos visuais simples para reforçar a marca, mas sem exageros.
- Evite bibliotecas de ícones pesadas.

## Botões
- Botão principal: verde `#2e7d32`, texto branco, borda arredondada em `6px`.
- Botão secundário ou de navegação: bordas claras e fundo transparente.
- Botão ativo do menu: amarelo `#f9c80e` com texto escuro.
- Botão de exclusão: vermelho `#c62828`.
- Mantenha o padrão visual dos botões já usado em `src/styles.css`.
- Estado desabilitado: `opacity: 0.6`.

## Cards, formulários e tabelas
- Cards em fundo branco com borda arredondada e leve sombra.
- Formulários devem manter layout simples e legível.
- Inputs com borda clara e borda arredondada.
- Tabelas com linhas separadoras sutis e leitura direta.
- Preserve o estilo atual de grid, spacing e contraste.

## Layout e UX
- Priorize clareza visual e facilidade de uso.
- O layout deve ser simples, responsivo e amigável ao usuário.
- Não introduzir componentes complexos ou sistemas de UI desnecessários.
- Prefira pequenos ajustes consistentes ao redesign completo.

## Mensagens e feedback
- Erros em vermelho e texto curto.
- Dicas e informativos em cinza claro.
- Mantenha uma linguagem amigável e direta em português.

## Regras de implementação
- Mantenha todo o CSS em `abacaxi-frontend/src/styles.css` ou em estilos locais quando o padrão exigir.
- Preserve os nomes e classes já existentes quando houver continuidade visual.
- Use `React` funcional com `useState` e `useEffect` conforme o padrão atual.
- Não adicionar bibliotecas de UI, framework CSS ou iconografia pesada sem aprovação explícita.
- Quando um ajuste for visual, priorize compatibilidade com o projeto atual em vez de reinventar o design.

## Regra final
O frontend deve continuar com a mesma identidade visual amigável e didática do projeto: simples, fácil de usar, bem lido e consistente com a temática de fazenda e a arquitetura atual do projeto.
