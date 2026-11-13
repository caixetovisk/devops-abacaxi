# Guia visual do frontend

Este guia registra a identidade visual já usada pela Fazenda de Abacaxis. Ao criar ou atualizar telas, mantenha a interface coerente com os estilos existentes em `src/styles.css`.

## Identidade e tipografia

- A interface usa uma aparência simples, acolhedora e ligada à fazenda, com tons de abacaxi, verde e fundos claros.
- Use a fonte nativa `system-ui, sans-serif`, sem carregar fontes externas.
- Mantenha títulos e textos com a hierarquia atual: título principal do cabeçalho em `1.5rem`, título do login em `1.4rem`, títulos de formulários em `1.1rem` e rótulos em `0.9rem`.

## Paleta atual

| Uso | Cor |
|---|---|
| Fundo geral | `#fdf8e6` |
| Superfície dos cards | `#fff` |
| Cabeçalho | `#802a03` |
| Verde principal, botões e destaques | `#2e7d32` |
| Verde escuro, ação de sair | `#1b5e20` |
| Amarelo, navegação ativa | `#f9c80e` |
| Vermelho, ações destrutivas e erros | `#c62828` |
| Texto principal | `#333` |
| Texto secundário | `#666` |
| Bordas de campos | `#ccc` |
| Divisórias de tabela | `#eee` |

Ao adicionar estilos, reutilize essas cores e os seletores existentes em `src/styles.css`; evite introduzir tons concorrentes sem necessidade.

## Ícones

- O frontend não possui biblioteca de ícones. Não adicione uma dependência apenas para introduzir ícones.
- O abacaxi `🍍` é o elemento de marca já usado nos títulos da aplicação e do login. Preserve-o quando esses títulos forem apresentados.
- A troca de idioma usa bandeiras do Brasil, Estados Unidos e China no topo da tela; mantenha botões acessíveis com nomes de idioma e indicação do idioma selecionado.
- Prefira rótulos de texto claros para ações e navegação. Se um símbolo for necessário, use-o de forma consistente e não como único identificador de uma ação.

## Idiomas

- A interface oferece português (`pt-BR`), inglês (`en-US`) e chinês simplificado (`zh-CN`). O português é o idioma padrão.
- A preferência escolhida é persistida em `localStorage`; não a remova ao sair da conta.
- Centralize rótulos e mensagens traduzíveis em `src/i18n.js`, incluindo erros conhecidos da API. Formate datas e valores monetários com a localidade ativa; os valores continuam em reais (BRL).

## Botões e ações

- Botões padrão: fundo verde `#2e7d32`, texto branco, sem borda, cantos de `6px`, espaçamento interno `8px 14px` e texto de `0.95rem`.
- Navegação no cabeçalho: fundo transparente, contorno branco; a página ativa usa fundo e contorno amarelos, com texto escuro.
- Ação de sair: verde escuro `#1b5e20`.
- Ações destrutivas, como excluir: vermelho `#c62828`, com espaçamento compacto.
- Botões desabilitados mantêm o estilo e usam opacidade `0.6`. Preserve o estado visual e funcional indicado por `disabled`.

## Componentes e layout

- Use cards brancos com cantos de `8px`, espaçamento interno de `16px` e sombra leve para formulários, tabelas e conteúdo agrupado.
- Mantenha o conteúdo principal centralizado, com largura máxima de `960px` e espaçamento lateral para telas menores.
- Cabeçalho e formulários podem quebrar linha. Indicadores usam grade responsiva; tabelas ficam dentro de uma área com rolagem horizontal quando necessário.
- Campos de formulário usam rótulos acima dos controles, borda cinza, cantos de `6px` e espaçamento interno de `8px`.
- Erros usam vermelho e mensagens auxiliares usam cinza secundário. Mantenha mensagens próximas ao conteúdo a que se referem.

## Acessibilidade e consistência

- Use elementos HTML semânticos e mantenha rótulos associados aos campos.
- Ações devem continuar identificáveis por texto; não dependa apenas de cor ou ícone para comunicar estado ou propósito.
- Ao adicionar novos estados ou componentes, mantenha comportamento legível em telas estreitas e siga os padrões de espaçamento e bordas acima.
