# Guia de estilo visual do frontend

Este documento registra a direção visual desejada para o frontend da Fazenda de Abacaxis. Use-o como referência ao criar ou alterar telas. A implementação atual pode ainda não refletir todas estas preferências.

## Direção visual

A identidade deve ter o rosa como cor predominante, com uma aparência acolhedora e coerente com a marca da fazenda. Use os tons de rosa já presentes no projeto como referência e mantenha contraste suficiente para leitura, formulários e ações.

## Tipografia

- A fonte preferencial do site é `Arial Black`, com `Arial, sans-serif` como fallback.
- Garanta que textos de formulários, tabelas e controles continuem fáceis de ler.

## Paleta de referência

| Uso | Cor | Aplicação |
|---|---|---|
| Rosa principal | `#A52B64` | Fundo principal atual; referência para a cor predominante |
| Rosa escuro | `#831F4D` | Cabeçalho atual e contraste sobre o rosa |
| Texto no fundo e no cabeçalho | `#FFFFFF` | Texto branco sobre superfícies escuras |
| Destaque de navegação | `#F9C80E` | Botão da página ativa; texto `#333333` |
| Ação principal | `#2E7D32` | Botões e indicadores do painel |
| Ação de sair | `#1B5E20` | Botão de saída |
| Ação destrutiva e erro | `#C62828` | Exclusão e mensagens de erro |
| Cartões e campos | `#FFFFFF` | Superfícies de cartões e formulários |
| Texto secundário | `#666666` | Rótulos secundários e dicas |
| Bordas de campos | `#CCCCCC` | Contornos dos campos de entrada |
| Separadores de tabela | `#EEEEEE` | Bordas inferiores das células |
| Texto escuro | `#333333` | Texto sobre o destaque amarelo |

Use o rosa como cor predominante sem sacrificar o contraste. Reutilize as cores funcionais existentes para ações, erros e estados destrutivos; não use rosa como único sinal de estado. Ao escrever CSS, prefira valores hexadecimais em minúsculas.

## Ícones e marca

- O título desejado é **“Fazenda Abacaxi”**. Use essa grafia no cabeçalho e na tela de login.
- A marca pode ser acompanhada pelo emoji de abacaxi `🍍`.
- O projeto não usa biblioteca de ícones dedicada. Não adicione uma dependência de ícones para necessidades pontuais; prefira os elementos e símbolos já usados pela interface.
- Se um ícone novo for necessário, mantenha-o simples, coerente com o texto ao redor e não dependa apenas da cor para comunicar seu significado.

## Componentes e composição

- **Cabeçalho:** usar tons de rosa, título “Fazenda Abacaxi”, disposição flexível que permite quebra de linha e navegação em botões.
- **Navegação:** os botões principais são Início, Nossa Fazenda, Cultivo, Receitas e Contato. Os botões atuais de Painel, Colheitas e Vendas permanecem disponíveis na área de gestão. A página ativa recebe fundo amarelo e texto escuro.
- **Idioma:** o seletor com ícone 🌐 fica no cabeçalho, inclusive na tela de login, e deve continuar acessível em telas estreitas.
- **Conteúdo:** centralizado com largura máxima de `960px`, margens e espaçamento lateral.
- **Cartões:** fundo branco, raio de `8px`, espaçamento interno de `16px` e sombra discreta.
- **Botões:** manter distinção clara entre ações normais, saída e exclusão, com texto legível.
- **Formulários:** campos agrupados com flex-wrap, rótulos acima dos controles e espaçamento consistente.
- **Tabelas:** ocupam a largura disponível, têm separadores horizontais e podem rolar horizontalmente dentro do contêiner `.tabela`.
- **Painel:** indicadores organizados em grade adaptável, com valores em destaque verde.

## Referência de implementação

Os estilos globais e os padrões de componentes estão em [`src/styles.css`](src/styles.css). As telas que compõem a interface estão em [`src/pages/`](src/pages/), e o cabeçalho e a navegação ficam em [`src/App.jsx`](src/App.jsx).
