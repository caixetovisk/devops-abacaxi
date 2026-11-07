# Guia visual do frontend — Fazenda de Abacaxis

Este documento define o estilo visual atual do frontend e deve ser usado como referência para novas telas, ajustes de layout e manutenção visual.

## 1) Objetivo visual
O projeto usa uma estética simples, amigável e didática, com forte identidade agrícola e temática de fazenda. O foco é ser legível, claro e funcional, sem exageros.

## 2) Tipografia
- Fonte principal: `system-ui, sans-serif`
- Sem bibliotecas externas de fontes.
- Hierarquia simples:
  - títulos principais: tamanho médio/grande, peso forte
  - textos de navegação: sem destaque excessivo
  - números e indicadores: maior contraste, legibilidade em cartões

Exemplo de base visual atual:

```css
font-family: system-ui, sans-serif;
```

## 3) Paleta de cores
A identidade atual é baseada em verde, amarelo, azul escuro e neutros suaves.

### Palette
- Azul escuro principal: `#2d2292`
- Verde primário: `#2e7d32`
- Verde escuro de ação secundária: `#1b5e20`
- Amarelo de destaque: `#f9c80e`
- Fundo suave: `#fdf8e6`
- Branco de cards: `#ffffff`
- Texto principal: `#333333`
- Texto secundário: `#666666`
- Vermelho de alerta/exclusão: `#c62828`
- Borda neutra: `#cccccc`
- Separadores: `#eeeeee`

### Uso recomendado
- Header e navegação: azul escuro
- Botões principais: verde
- Botão de navegação ativo: amarelo com texto escuro
- Botão de exclusão: vermelho
- Fundo do app: creme claro
- Cards: branco com leve sombra
- Mensagens de erro: vermelho

## 4) Ícones e marca
- O projeto usa a marca `🍍` como símbolo principal da fazenda.
- Ícones são simples e funcionam como elementos de destaque, sem depender de bibliotecas pesadas.
- Use emojis ou símbolos curtos apenas quando reforçarem a identidade da marca ou a ação percebida.
- Evite ícones muito elaborados ou excesso de ornamentação visual.

## 5) Botões
A interface usa botões discretos, com bordas arredondadas e bom contraste.

### Padrões
- `button` base:
  - fundo verde `#2e7d32`
  - texto branco
  - borda: nenhuma
  - borda arredondada: `6px`
  - padding: `8px 14px`
  - cursor: pointer

- Botão de navegação:
  - fundo transparente
  - borda branca no header
  - quando ativo: fundo amarelo `#f9c80e` com texto escuro

- Botão de exclusão:
  - fundo vermelho `#c62828`
  - padding menor para compactar layout

- Estado desabilitado:
  - `opacity: 0.6`

## 6) Cards e layouts
- Containers principais usam `background: #fff` e `border-radius: 8px`
- Leve sombra sutil: `box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1)`
- Espaçamento consistente entre blocos
- Layout com cards bem definidos para facilitar leitura e manutenção

## 7) Formulários
- Inputs com borda cinza clara e borda arredondada
- Labels em coluna, com gap visual claro
- Campos em linha ou em grade responsiva conforme necessidade
- Botões na mesma linha de ação quando fizer sentido

## 8) Tabelas e painéis
- Tabelas com linhas suaves e separadores discretos
- Painéis de indicadores com grid responsivo
- Valores monetários e métricas devem ter foco visual, mantendo contraste e legibilidade

## 9) Estado visual
- Mensagens de erro: vermelho, simples e direta
- Dicas de ajuda: cinza claro
- Página de login: centralizada verticalmente, com form compacto e agradável

## 10) Regras de manutenção
- Preserve a paleta e o visual atual mesmo em pequenas correções.
- Evite introduzir temas muito distintos do atual.
- Mantenha o design simples e didático, em sintonia com o projeto de ensino.
- Quando mexer em CSS, priorize consistência com os componentes já existentes em `src/styles.css`.
- Não adicione frameworks de UI, bibliotecas de ícones pesadas ou design system complexo sem necessidade explícita.

## 11) Referência de estilo atual
Este frontend já está alinhado com a seguinte base visual:

```css
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  background: #fdf8e6;
  color: #333;
}

header {
  background: #2d2292;
  color: #fff;
}

button {
  background: #2e7d32;
  color: #fff;
  border-radius: 6px;
}

button.excluir {
  background: #c62828;
}
```

Use essa base como referência para qualquer ajuste visual.
