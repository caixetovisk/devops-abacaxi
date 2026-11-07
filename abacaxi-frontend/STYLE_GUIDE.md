# Guia visual do frontend

Este documento descreve a identidade visual já implementada na Fazenda de Abacaxis. Ao criar ou alterar telas, preserve estes padrões e atualize o guia se as decisões visuais do projeto mudarem.

## Identidade

A interface deve ser simples, acolhedora e legível, com referências visuais à fazenda e ao abacaxi. A combinação atual usa fundo creme, verdes naturais e amarelo para destacar ações e estados ativos.

## Cores

| Uso | Cor atual | Aplicação |
|---|---|---|
| Fundo da página | `#fdf8e6` | Fundo geral creme |
| Texto principal | `#333333` | Texto sobre fundos claros |
| Cabeçalho | `#387403` | Barra superior e navegação |
| Verde de destaque | `#2e7d32` | Título do login e indicadores |
| Ação no usuário | `#0a5d10` | Botão de sair no cabeçalho |
| Botão padrão | `#99920d` | Ações principais |
| Estado ativo | `#f9c80e` | Item de navegação selecionado |
| Erro e exclusão | `#c62828` | Mensagens de erro e ação destrutiva |
| Superfície | `#ffffff` | Cards e formulários |
| Bordas suaves | `#eeeeee` | Separadores das tabelas |
| Texto secundário | `#666666` | Indicadores e dicas |

As cores refletem os valores atuais em `src/styles.css`. Reutilize-os em vez de introduzir tons concorrentes sem uma necessidade de design.

## Tipografia

- A família tipográfica global é `system-ui, sans-serif`; não há fonte externa ou arquivo de fonte dedicado.
- Mantenha a tipografia nativa do sistema, priorizando legibilidade e carregamento sem dependências.
- Tamanhos existentes são definidos por contexto: texto padrão do navegador, título do cabeçalho em `1.3rem`, título de formulário em `1.1rem`, controles em torno de `1rem` e indicadores em `1.8rem`.
- Use pesos e tamanhos com hierarquia clara, sem aplicar estilos decorativos desnecessários.

## Ícones e marca

- O símbolo da aplicação é o emoji 🍍, usado no título e como favicon SVG inline em `index.html`.
- Não há biblioteca de ícones instalada. Prefira o emoji já adotado quando a marca for pertinente e rótulos textuais claros para ações.
- Não use emoji como substituto de texto em botões ou ações cuja intenção precise ser inequívoca. Não adicione uma biblioteca de ícones sem necessidade e sem atualizar as dependências deliberadamente.

## Botões e controles

- Os botões usam fundo amarelo-oliva (`#99920d`), texto branco, cantos arredondados de `6px`, espaçamento interno de `8px 14px` e cursor de interação.
- O botão da navegação ativa usa amarelo (`#f9c80e`) com texto escuro; botões da navegação inativa são transparentes com contorno branco.
- O botão de sair usa verde escuro (`#0a5d10`). A classe `.excluir` indica ações destrutivas e usa vermelho (`#c62828`) com dimensões mais compactas.
- Controles desabilitados devem permanecer visualmente identificáveis; o estilo atual reduz sua opacidade.
- Inputs têm fundo claro, borda cinza, cantos de `6px` e padding de `8px`. Preserve rótulos visíveis associados aos campos.
- Use elementos semânticos e tipos de botão corretos nos formulários (`submit` para envio e `button` para outras ações).

## Componentes e layout

- `.card` é a superfície padrão: fundo branco, raio de `8px`, padding de `16px` e sombra discreta.
- `.formulario` usa Flexbox com quebra de linha e alinhamento inferior; mantenha os campos adaptáveis à largura disponível.
- `.tabela` contém tabelas com rolagem horizontal em telas estreitas. Preserve essa capacidade quando novas colunas forem adicionadas.
- `.indicadores` usa Grid responsivo com colunas de largura mínima de `180px`.
- O conteúdo principal é centralizado, com largura máxima de `960px` e espaçamento lateral.
- Reutilize as classes existentes em `src/styles.css`; adicione novas classes específicas quando os padrões atuais não forem suficientes.

## Responsividade e acessibilidade

- O cabeçalho pode quebrar linha; formulários e indicadores devem continuar utilizáveis em telas estreitas.
- Não remova rótulos, foco de teclado, estados desabilitados ou feedback de erro ao ajustar o visual.
- Preserve contraste suficiente entre texto, fundo e estados de ação. Não comunique sucesso, erro ou seleção apenas por cor.
