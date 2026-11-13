# Guia de estilo visual do frontend

Este documento define o visual da interface do projeto Fazenda de Abacaxis. O objetivo é manter uma aparência simples, acolhedora e consistente com a identidade do tema agrícola e frutífero do projeto.

## 1. Direção visual

- Visual limpo e funcional, com foco em produtividade
- Tema acolhedor, inspirado em fazenda e produção agrícola
- Paleta calorosa e amigável, sem uso excessivo de elementos escuros
- Uso de emoji como elemento de identidade (`🍍`, `🌾`, `📊`, `💰`)
- Priorizar clareza, legibilidade e contraste para formulários e telas principais

## 2. Tipografia

- Fonte principal: `system-ui, sans-serif`
- Uso de `font-family: system-ui, sans-serif` em corpo e textos gerais
- Títulos e destaques em tamanhos moderados, sem serifas ou fontes decorativas
- Priorizar texto direto, legível e sem excesso de variações tipográficas

Exemplo de padrão:

```css
body {
  font-family: system-ui, sans-serif;
  background: #fdf8e6;
  color: #333;
}
```

## 3. Paleta de cores

### Cores principais

- Fundo geral: `#fdf8e6` (creme suave)
- Texto principal: `#333333`
- Texto secundário: `#666666`
- Fundo de cards: `#ffffff`
- Bordas: `#cccccc`
- Destaque principal: `#de04e1` (rosa/roxo vibrante)
- Destaque secundário: `#f9c80e` (amarelo/laranja quente)
- Verde primário: `#2e7d32`
- Verde escuro para ações de confirmação: `#1b5e20`
- Vermelho para exclusão/erro: `#c62828`

### Uso recomendado

- `#de04e1`: cabeçalho e elementos marcantes
- `#f9c80e`: estado ativo / botão selecionado / destaque
- `#2e7d32`: botões principais e ações positivas
- `#1b5e20`: ações secundárias/confirmar
- `#c62828`: ações de excluir / erros
- `#fdf8e6`: background de páginas e áreas grandes

## 4. Ícones e identificação visual

- Foco em ícones simples e expressivos, com preferência por emoji em contexto de marca
- O símbolo principal do projeto é o abacaxi: `🍍`
- Ícones de contexto podem ser usados em títulos e blocos visuais:
  - `🍍` para marca e cabeçalhos
  - `📊` para painel e resumo
  - `📦` para estoque
  - `💰` para faturamento
  - `🧾` para vendas
  - `📝` para colheitas

Use emoji de forma moderada e funcional, nunca como decoração excessiva.

## 5. Botões

### Padrão geral

- Fundo principal: `#2e7d32`
- Texto: branco
- Bordas: sem borda, com cantos arredondados
- Padding: `8px 14px`
- Border radius: `6px`
- Cursor: `pointer`
- Hover: manter contraste e legibilidade

```css
button {
  background: #2e7d32;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 14px;
  cursor: pointer;
}
```

### Variações

- Botão primário: verde (`#2e7d32`)
- Botão ativo: amarelo (`#f9c80e`) com texto escuro
- Botão de exclusão: vermelho (`#c62828`)
- Botão desabilitado: opacidade reduzida

## 6. Cards, formulários e layouts

### Cards

- Fundo branco
- Bordas leves e sombras suaves
- Border radius: `8px`
- Padding: `16px`
- Sombra sutil para separar do fundo

```css
.card {
  background: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}
```

### Formulários

- Campos com borda cinza clara
- Padding interno de `8px`
- Border radius `6px`
- Espaçamento vertical consistente entre labels e inputs
- Layout em coluna para telas pequenas e em linha para formulários curtos

### Estruturas de navegação

- Header com fundo rosa/violeta
- Menu de navegação alinhado horizontalmente
- Usuário à direita com botão de sair
- Conteúdo principal em largura máxima e centralizado

## 7. Espaçamento e proporções

- Espaçamento base: `8px` e múltiplos
- Gap típico entre elementos: `8px`, `12px`, `16px`
- Padding geral do container principal: `16px` e `24px`
- Margem de seção: `16px` a `24px`
- A estrutura visual deve manter consistência e simplicidade, sem excesso de densidade

## 8. Estado visual e feedback

- Erro: texto vermelho (`#c62828`)
- Dica / informação: cinza médio (`#666`)
- Sucesso: verde principal (`#2e7d32`)
- Estado ativo: amarelo (`#f9c80e`) em contraste com fundo escuro ou claro

## 9. Regras para implementação

- Preserve a identidade visual atual mesmo ao criar novas telas.
- Não introduzir bibliotecas de UI extras sem necessidade.
- Manter CSS simples, direto e compatível com o padrão atual do projeto.
- Evitar estilos muito modernos ou excessivamente “premium” que colidam com a estética didática do projeto.
- Ao criar novos componentes, use os mesmos tokens visuais já definidos.

## 10. Checklist visual

Antes de finalizar uma mudança visual, confirme:

- A paleta principal foi mantida?
- O padrão de botões está consistente?
- O header e cards seguem o mesmo visual base?
- Os textos continuam legíveis com boa contrastação?
- Emojis e ícones não ficaram excessivos?
- O layout continua simples e funcional em telas pequenas?

## 11. Referência de implementação atual

O CSS atual em `src/styles.css` é a base do guia visual e deve ser usado como referência primária para novos ajustes.
