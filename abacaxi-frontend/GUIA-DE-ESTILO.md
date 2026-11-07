# Guia de estilo visual do frontend

Este guia registra a identidade visual já usada na Fazenda de Abacaxis e orienta novas telas. A implementação dos estilos globais fica em [`src/styles.css`](src/styles.css); confira esse arquivo antes de alterar ou acrescentar regras.

## Identidade e cores

O visual é simples e acolhedor, com tons inspirados na marca da fazenda. Preserve a paleta existente:

| Uso | Cor | Aplicação atual |
|---|---|---|
| Fundo da página | `#fdf8e6` | Fundo creme do `body` |
| Cabeçalho | `#c9478e` | Fundo do cabeçalho principal |
| Ação principal | `#2e7d32` | Botões comuns e números do painel |
| Ação de sair | `#1b5e20` | Botão “Sair” |
| Seleção/destaque | `#f9c80e` | Item ativo da navegação |
| Erro/ação destrutiva | `#c62828` | Mensagens de erro e botões “Excluir” |
| Texto principal | `#333` | Texto padrão |
| Texto secundário | `#666` | Métricas auxiliares e dicas |
| Superfície | `#fff` | Cartões e texto sobre fundos coloridos |
| Borda de campo | `#ccc` | Campos de formulário |
| Divisória | `#eee` | Linhas da tabela |

Use vermelho apenas para erro ou exclusão. Evite introduzir novas cores de destaque sem uma necessidade funcional ou de acessibilidade.

## Tipografia

- A família tipográfica atual é `system-ui, sans-serif`, sem fonte externa. Mantenha essa escolha para preservar carregamento rápido e aparência nativa.
- Use a hierarquia existente como referência: título do cabeçalho `5rem`, título do login `1.4rem`, títulos de formulário `1.1rem`, valores do painel `1.8rem`, texto de botão `0.95rem`, rótulos `0.9rem` e dicas `0.85rem`.
- Priorize rótulos claros e textos curtos em português. Não reduza o texto de ações a um ícone sem nome acessível.

## Marca e ícones

- O abacaxi `🍍` é o único ícone visual atualmente usado, junto ao nome “Fazenda de Abacaxis” no cabeçalho e no login. Não há biblioteca de ícones instalada.
- Preserve o emoji como elemento de marca. Os botões atuais usam rótulos textuais (“Entrar”, “Salvar”, “Excluir”, “Sair”); mantenha esse padrão para ações.
- Se uma nova função realmente precisar de um ícone, prefira um SVG local consistente e acessível. Ícones decorativos devem ser ocultos de tecnologias assistivas; ícones que funcionam como controles precisam de nome acessível. Evite adicionar fontes ou bibliotecas de ícones para uso pontual.

## Botões e controles

- Botões comuns usam fundo verde `#2e7d32`, texto branco, borda ausente, cantos de `6px`, espaçamento interno de `8px 14px` e cursor de clique.
- A navegação tem botões transparentes com borda branca; a página ativa recebe fundo amarelo `#f9c80e` e texto escuro.
- O botão “Sair” usa verde escuro `#1b5e20`. Ações de exclusão usam vermelho `#c62828` e tamanho mais compacto (`4px 10px`).
- Controles desabilitados usam opacidade reduzida. Preserve e deixe identificáveis os estados de foco, desabilitado, erro e interação ao implementar novos controles.
- Campos mantêm rótulos visíveis, borda `#ccc`, cantos de `6px` e espaçamento interno de `8px`.

## Layout e componentes

- O conteúdo principal é centralizado e limitado a `960px`, com margem vertical e espaçamento lateral para telas estreitas.
- Cartões `.card` usam fundo branco, cantos de `8px`, preenchimento de `16px` e sombra discreta.
- Formulários `.formulario` podem quebrar linha, mantêm espaçamento entre campos e alinham os controles pela base.
- Tabelas ficam dentro de `.tabela`, que permite rolagem horizontal quando necessário. Mantenha os cabeçalhos e dados alinhados e legíveis.
- Métricas usam `.indicadores`, um grid responsivo com colunas de pelo menos `180px` quando há espaço.
- Reutilize `.erro` para erros e `.dica` para explicações auxiliares. Não comunique estados somente pela cor.

## Responsividade e acessibilidade

- Mantenha o cabeçalho flexível e os formulários capazes de quebrar linha; não introduza largura fixa que provoque rolagem horizontal da página.
- Preserve contraste legível, rótulos associados aos campos, navegação por teclado e foco visível. Controles interativos precisam continuar compreensíveis sem ícones ou cores.
- Confira a tela em larguras menores após mudanças de layout, especialmente navegação, formulários e tabelas.

## Onde implementar

- Estilos globais e regras compartilhadas: `src/styles.css`.
- Estrutura e conteúdo das telas: componentes em `src/` e `src/pages/`.
- Reutilize as classes existentes antes de criar novas. Para estilos específicos, prefira classes semânticas a seletores globais que alterem elementos não relacionados.
- Evite dependências de UI/CSS e reformulações amplas de tema sem necessidade explícita.
