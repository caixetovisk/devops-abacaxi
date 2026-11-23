# Guia visual do frontend

Este documento registra a identidade visual atualmente usada pela Fazenda de Abacaxis. Use-o como referência ao criar ou alterar telas, sem introduzir uma nova paleta, fonte ou biblioteca de ícones sem uma decisão explícita de design.

## Identidade e tipografia

- **Fonte:** `system-ui, sans-serif`, definida no `body`. O projeto não carrega fontes externas; prefira a fonte do sistema.
- **Tom:** interface simples e acolhedora, com referências visuais à fazenda e ao abacaxi. Português é o idioma padrão; textos localizados também aparecem em inglês e chinês simplificado.
- **Títulos:** o cabeçalho principal usa `1.3rem`; o título do formulário usa `1.1rem`; o título da tela de login usa `1.4rem`.
- **Números de destaque:** indicadores do painel usam `1.8rem` e verde.
- **Texto padrão:** cor `#333`. Textos auxiliares usam `#666`.

## Paleta atual

| Cor | Uso atual |
|---|---|
| `#fdf8e6` | Fundo geral da página |
| `#e95fee` | Fundo do cabeçalho |
| `#2e7d32` | Botões principais, título de login e indicadores |
| `#1b5e20` | Botão de saída no cabeçalho |
| `#f9c80e` | Fundo e borda da navegação ativa |
| `#c62828` | Botões de exclusão e mensagens de erro |
| `#ffffff` / `#fff` | Cartões e texto do cabeçalho |
| `#333` | Texto padrão e texto da navegação ativa |
| `#666` | Texto secundário e dicas |
| `#ccc` | Borda dos campos |
| `#eee` | Divisórias das tabelas |

Preserve o papel visual das cores nos componentes existentes. Não use a cor de erro como decoração nem a cor de ação destrutiva para ações comuns.

## Ícones e marca

- O abacaxi é representado pelo emoji `🍍`, usado no favicon e nos títulos da aplicação.
- No cabeçalho, o emoji recebe a classe `.abacaxi-large`; mantenha a identidade do símbolo e evite substituí-lo por uma imagem ou pacote de ícones sem necessidade.
- O seletor de idioma usa as bandeiras emoji `🇧🇷`, `🇺🇸` e `🇨🇳`, disponíveis no topo da página de login e do cabeçalho autenticado.
- O projeto não tem biblioteca de ícones. Prefira os símbolos existentes e rótulos textuais; não adicione dependências de ícones para ações que possam ser identificadas por texto.

## Botões e controles

- **Ação principal:** fundo `#2e7d32`, texto branco, sem borda, raio de `6px`, padding `8px 14px` e fonte `0.95rem`.
- **Ação destrutiva:** use a classe `.excluir`, com fundo `#c62828` e padding `4px 10px`.
- **Navegação:** botões do menu são transparentes, com borda branca; a página ativa usa fundo e borda `#f9c80e` e texto `#333`.
- **Saída:** o botão dentro de `.usuario` usa `#1b5e20`.
- **Desabilitado:** botões desabilitados usam opacidade `0.6`; preserve o atributo `disabled` quando a ação não puder ser executada.
- **Campos:** labels empilham o nome e o campo com `4px` de espaço. Inputs têm padding `8px`, borda sólida `#ccc`, raio de `6px` e fonte `1rem`.
- Mantenha rótulos claros nas ações e campos; preserve estados de carregamento e mensagens de erro existentes.

## Superfícies, espaçamento e layout

- Os cartões `.card` usam fundo branco, raio de `8px`, padding de `16px`, sombra leve e margem inferior de `16px`.
- O conteúdo principal tem largura máxima de `960px`, centralizado, com margem vertical de `24px` e padding horizontal de `16px`.
- O cabeçalho usa layout flexível com quebra de linha, alinhamento central, gap de `16px` e padding `12px 24px`.
- Formulários usam flexbox com quebra de linha e gap de `12px`; mantenha campos utilizáveis em larguras menores.
- Tabelas ocupam a largura disponível; envolva-as em `.tabela` para permitir rolagem horizontal. Células usam alinhamento à esquerda, padding de `8px` e divisórias inferiores.
- Os indicadores usam uma grade adaptável com colunas de no mínimo `180px` e gap de `16px`.

## Referência de implementação

Os estilos globais e componentes estão em [`src/styles.css`](src/styles.css). Consulte também as telas em [`src/pages/`](src/pages/) para ver o uso dos cartões, formulários, indicadores, tabelas e estados.
