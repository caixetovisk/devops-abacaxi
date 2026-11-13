# 🍍 Fazenda de Abacaxis — Backend (API)

API em **Node.js + Express** do sistema da Fazenda de Abacaxis. Ela faz:

- **Login** com usuário e senha (token JWT)
- Cadastro de **colheitas** (data e quantidade de abacaxis colhidos)
- Cadastro de **vendas** (data, quantidade, preço e cliente), sem permitir vender mais do que há em estoque
- **Resumo** com total colhido, vendido, estoque e faturamento

Este projeto faz parte do repositório **devops-abacaxi**. O frontend fica na pasta [../abacaxi-frontend](../abacaxi-frontend).

## Um código, dois bancos

O acesso ao banco usa o ORM **Sequelize**. O banco usado depende só das variáveis de ambiente:

| Onde roda | Banco | Variáveis usadas |
|---|---|---|
| No seu computador | **MySQL** | `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` |
| No Render | **PostgreSQL** | `DATABASE_URL` |

> Se `DATABASE_URL` existir, a API usa PostgreSQL. Se não existir, usa MySQL.
> Veja o arquivo [src/database.js](src/database.js).

As **tabelas são criadas sozinhas** quando a API inicia (`sequelize.sync()`). O **usuário administrador** também é criado sozinho, com os valores de `ADMIN_USER` e `ADMIN_PASSWORD`. Assim você não precisa rodar nenhum comando SQL, nem no computador nem no Render.

## Estrutura

```
src/
├── server.js          # inicia a API, cria tabelas e o usuário admin
├── database.js        # escolhe MySQL ou PostgreSQL
├── models.js          # tabelas: usuarios, colheitas, vendas
├── estoque.js         # cálculo do estoque
├── middleware/auth.js # protege as rotas com o token
└── routes/            # auth, colheitas, vendas, resumo
```

## Rotas

| Método | Rota | Login? | Descrição |
|---|---|---|---|
| GET | `/` | não | Testa se a API está no ar |
| POST | `/auth/login` | não | `{ usuario, senha }` → retorna `{ token }` |
| GET / POST | `/colheitas` | sim | Lista / cadastra `{ data, quantidade, observacao }` |
| DELETE | `/colheitas/:id` | sim | Exclui uma colheita |
| GET / POST | `/vendas` | sim | Lista / cadastra `{ data, quantidade, preco_unitario, cliente }` |
| DELETE | `/vendas/:id` | sim | Exclui uma venda |
| GET | `/resumo` | sim | Totais para o painel |

As rotas que exigem login precisam do cabeçalho `Authorization: Bearer <token>`.

## Documentação da API (Swagger)

Com o backend em execução, acesse `http://localhost:3001/api-docs` para consultar e testar os endpoints pelo Swagger UI. Em produção, substitua `localhost:3001` pelo endereço da API.

Para testar as rotas protegidas, faça login em `POST /auth/login`, copie o `token` retornado e clique em **Authorize** no Swagger UI. Informe o token JWT; a interface adiciona o cabeçalho `Authorization: Bearer` nas requisições protegidas.

---

## 1. Rodando localmente (com MySQL)

### Pré-requisitos

- [Node.js](https://nodejs.org) 20 ou superior
- MySQL, que pode ser de duas formas:
  - **Opção A — Docker** (recomendado): só precisa do Docker instalado
  - **Opção B — MySQL instalado** na máquina (MySQL, MariaDB, XAMPP, etc.)

### Passo a passo

**1. Entre na pasta e instale as dependências**

```bash
cd abacaxi-backend
npm install
```

**2. Suba o banco MySQL**

- **Opção A (Docker):**
  ```bash
  docker compose up -d
  ```
  Isso cria um MySQL na porta 3306 com o usuário `root`, a senha `root` e o banco `fazenda_abacaxi` já criado.

- **Opção B (MySQL instalado):** crie o banco vazio. As tabelas a API cria sozinha.
  ```sql
  CREATE DATABASE fazenda_abacaxi;
  ```

**3. Crie o arquivo `.env`** a partir do exemplo:

```bash
cp .env.example .env
```

Abra o `.env` e confira se `DB_USER` e `DB_PASSWORD` estão iguais aos do seu MySQL. Deixe a linha `DATABASE_URL` **comentada** (com `#` na frente).

**4. Inicie a API**

```bash
npm run dev     # reinicia sozinha quando você altera o código
# ou
npm start
```

A saída deve ser parecida com esta:

```
Banco: MySQL (localhost:3306)
Usuário "admin" criado
API rodando na porta 3001
```

**5. Teste:** abra http://localhost:3001 no navegador. A resposta deve ser `{"status":"ok", ...}`.

Para fazer login pelo terminal:

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"usuario":"admin","senha":"admin123"}'
```

---

## 2. Deploy no Render (plano gratuito)

Todo o deploy usa apenas o **plano Free** do Render. São duas etapas: criar o banco PostgreSQL e depois criar o Web Service da API.

### Antes de começar

- Crie uma conta em https://render.com (pode entrar com o GitHub).
- Envie o repositório **devops-abacaxi** inteiro (com as pastas `abacaxi-backend` e `abacaxi-frontend`) para o **seu** GitHub (veja o [README da raiz](../README.md)). O arquivo `.env` **não** deve ir para o GitHub, e o `.gitignore` já cuida disso.

### Etapa 1 — Criar o banco PostgreSQL

1. No painel do Render, clique em **New +** → **Postgres**.
2. Preencha:
   - **Name:** `fazenda-abacaxi-db`
   - **Database / User:** pode deixar em branco (o Render gera)
   - **Region:** escolha uma, por exemplo **Ohio (US East)**. ⚠️ **Anote a região: a API precisa ficar na mesma.**
   - **Instance Type:** **Free**
3. Clique em **Create Database** e aguarde o status ficar **Available**.
4. Na página do banco, procure a seção **Connections** e copie a **Internal Database URL**. Ela começa com `postgresql://`.

> **Internal x External URL**
> - **Internal Database URL:** usada pela API rodando *dentro* do Render (na mesma região). Não precisa de SSL. ✅ É a que vamos usar.
> - **External Database URL:** usada para acessar o banco *de fora* do Render, como do seu computador ou do DBeaver. Exige SSL, então nesse caso coloque também `DB_SSL=true`.

### Etapa 2 — Criar o Web Service (API)

1. Clique em **New +** → **Web Service**.
2. Conecte sua conta do GitHub e selecione o repositório **devops-abacaxi**.
3. Preencha:

   | Campo | Valor |
   |---|---|
   | **Name** | `fazenda-abacaxi-api` |
   | **Region** | **a mesma do banco** |
   | **Branch** | `main` |
   | **Root Directory** | `abacaxi-backend` ⚠️ **(não esqueça!)** |
   | **Language / Runtime** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Instance Type** | **Free** |

4. Em **Environment Variables**, adicione:

   | Key | Value |
   |---|---|
   | `DATABASE_URL` | a *Internal Database URL* copiada na etapa 1 |
   | `JWT_SECRET` | um texto longo e aleatório (clique em **Generate**) |
   | `ADMIN_USER` | `admin` |
   | `ADMIN_PASSWORD` | uma senha sua |
   | `FRONTEND_URL` | por enquanto `*`; depois troque pela URL do frontend |

   > Não crie a variável `PORT`. O Render define a porta sozinho, e a API já lê `process.env.PORT`.

5. Clique em **Deploy Web Service**.
6. Acompanhe a aba **Logs**. O deploy deu certo quando aparecer:
   ```
   Banco: PostgreSQL (DATABASE_URL)
   Usuário "admin" criado
   API rodando na porta 10000
   ```
7. Copie a URL da API, que aparece no topo da página (por exemplo `https://fazenda-abacaxi-api.onrender.com`), e abra no navegador. A resposta deve ser `{"status":"ok", ...}`.

### Etapa 3 — Liberar o frontend no CORS

Depois de publicar o frontend (veja o README do **abacaxi-frontend**):

1. Volte ao Web Service da API → **Environment**.
2. Troque `FRONTEND_URL` pela URL do frontend, por exemplo `https://fazenda-abacaxi.onrender.com`. Escreva **sem barra `/` no final**.
3. Salve. O Render faz um novo deploy automaticamente.

### Atualizando a API

A cada `git push` na branch `main` que altere arquivos da pasta `abacaxi-backend`, o Render faz um novo deploy sozinho (**Auto-Deploy**).

---

## ⚠️ Limites do plano gratuito do Render

| Recurso | Limite |
|---|---|
| **Web Service Free** | "Dorme" depois de **15 min sem acessos**. O primeiro acesso depois disso demora **cerca de 1 minuto**. Isso é normal. |
| **Postgres Free** | Até **1 GB**. O banco **expira 30 dias após a criação**: depois disso você tem um prazo para fazer upgrade e, se não fizer, ele é apagado. Para a próxima turma, basta criar um banco novo e atualizar a `DATABASE_URL`. |
| **Postgres Free** | Apenas **1 banco gratuito por conta** (workspace). |
| **Web Service Free** | Sem acesso a Shell e sem Pre-Deploy Command. Por isso a API cria as tabelas e o admin sozinha ao iniciar. |
| **Horas** | 750 horas/mês de Web Service gratuito por conta, o suficiente para 1 serviço ligado o mês todo. |

> Os limites podem mudar. Confira em https://render.com/docs/free

## Problemas comuns

| Erro | Causa provável |
|---|---|
| `Falha ao iniciar a API: connect ECONNREFUSED` (local) | O MySQL não está rodando, ou a porta/senha no `.env` está errada |
| `Unknown database 'fazenda_abacaxi'` (local) | O banco não foi criado (veja a opção B) |
| `getaddrinfo ENOTFOUND dpg-...` (Render) | A API e o banco estão em **regiões diferentes**. Use a mesma região, ou use a External URL com `DB_SSL=true` |
| `SSL/TLS required` | Você usou a **External** URL: adicione `DB_SSL=true` |
| O navegador mostra erro de **CORS** | `FRONTEND_URL` está diferente da URL do frontend (confira `https` e tire a barra do final) |
| `Could not read package.json` / `ENOENT` no build | O campo **Root Directory** não foi preenchido com `abacaxi-backend` |
