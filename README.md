# 🍍 DevOps Abacaxi — Fazenda de Abacaxis

Projeto didático para aprender **deploy de uma aplicação web no [Render](https://render.com)** usando **apenas o plano gratuito**.

O sistema controla uma fazenda de abacaxis: tem **login**, registro de **colheitas** (data e quantidade) e registro de **vendas**, com controle de estoque e faturamento.

## O que tem neste repositório

```
devops-abacaxi/
├── abacaxi-backend/    → API em Node.js + Express (MySQL local / PostgreSQL no Render)
└── abacaxi-frontend/   → Site em React + Vite
```

O frontend e o backend estão **separados**: cada um é um projeto independente, com o próprio `package.json`, e é publicado como um **serviço diferente** no Render. Eles só ficam no mesmo repositório para facilitar.

| Pasta | O que é | Serviço no Render (Free) |
|---|---|---|
| [abacaxi-backend](abacaxi-backend) | API (regras, login, banco de dados) | **Web Service** + **Postgres** |
| [abacaxi-frontend](abacaxi-frontend) | Telas que rodam no navegador | **Static Site** |

## Arquitetura

```
 Navegador
    │
    ▼
┌──────────────────────┐   HTTPS (fetch)  ┌──────────────────────┐        ┌────────────────────┐
│  Static Site (Free)  │ ───────────────► │  Web Service (Free)  │ ─────► │  PostgreSQL (Free) │
│  abacaxi-frontend    │   VITE_API_URL   │  abacaxi-backend     │ DATA-  │  Render            │
│  React (dist/)       │ ◄─────────────── │  Node + Express      │ BASE_  │                    │
└──────────────────────┘   CORS:          └──────────────────────┘ URL    └────────────────────┘
                           FRONTEND_URL
```

No seu computador é igual, mas com **MySQL** no lugar do PostgreSQL.

---

## Passo 0 — Ter o projeto no seu GitHub

O Render faz o deploy a partir de um repositório **seu** no GitHub.

- **Se o professor passou o link do repositório:** clique em **Fork** no GitHub para criar uma cópia na sua conta.
- **Se você recebeu a pasta:** crie um repositório vazio chamado `devops-abacaxi` no GitHub e envie os arquivos:
  ```bash
  cd devops-abacaxi
  git init
  git add .
  git commit -m "Projeto inicial"
  git branch -M main
  git remote add origin https://github.com/SEU-USUARIO/devops-abacaxi.git
  git push -u origin main
  ```

Depois, clone na sua máquina, se ainda não tiver o projeto nela:

```bash
git clone https://github.com/SEU-USUARIO/devops-abacaxi.git
cd devops-abacaxi
```

## Rodando localmente

O repositório raiz **não possui `package.json`**. O backend e o frontend são projetos independentes; execute os comandos dentro da pasta de cada projeto. No Windows, abra **dois terminais PowerShell** a partir da raiz do repositório:

**Terminal 1 — banco MySQL e API**

```powershell
Set-Location .\abacaxi-backend
npm install
docker compose up -d
npm run dev
```

**Terminal 2 — site React**

```powershell
Set-Location .\abacaxi-frontend
npm install
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
npm run dev
```

Abra o site em http://localhost:5173. A API fica em http://localhost:3001; a documentação interativa Swagger fica em http://localhost:3001/api-docs. O frontend local já aponta para a API nesse endereço por meio de `VITE_API_URL` em `abacaxi-frontend/.env`.

Para parar os processos, use `Ctrl+C` no terminal correspondente. Para parar o banco, execute `docker compose down` dentro de `abacaxi-backend`.

> Não execute `npm run dev` ou `npm start` na raiz: sem `package.json` nessa pasta, o npm retorna `ENOENT`. Use `npm run dev` dentro de `abacaxi-backend` e de `abacaxi-frontend`, cada um em seu próprio terminal.

Para detalhes de configuração e solução de problemas, consulte o [README do backend](abacaxi-backend/README.md#1-rodando-localmente-com-mysql) e o [README do frontend](abacaxi-frontend/README.md#1-rodando-localmente).

Login padrão: usuário **`admin`**, senha **`admin123`**.

## Deploy no Render: ordem dos passos

Siga **nesta ordem**, porque cada passo usa uma informação do anterior:

| # | O que fazer | Onde está explicado | Você vai anotar |
|---|---|---|---|
| 1 | Criar o banco **Postgres (Free)** | [backend → Etapa 1](abacaxi-backend/README.md#etapa-1--criar-o-banco-postgresql) | *Internal Database URL* |
| 2 | Criar o **Web Service** da API (Root Directory: `abacaxi-backend`) | [backend → Etapa 2](abacaxi-backend/README.md#etapa-2--criar-o-web-service-api) | URL da API |
| 3 | Criar o **Static Site** (Root Directory: `abacaxi-frontend`) | [frontend → Deploy](abacaxi-frontend/README.md#2-deploy-no-render-plano-gratuito) | URL do site |
| 4 | Colocar a URL do site em `FRONTEND_URL` na API (CORS) | [backend → Etapa 3](abacaxi-backend/README.md#etapa-3--liberar-o-frontend-no-cors) | — |

> ⚠️ Os dois serviços usam o **mesmo repositório** (`devops-abacaxi`). O que muda é o campo **Root Directory**, que diz ao Render em qual pasta está cada projeto. Se esquecer de preencher, o build falha dizendo que não encontrou o `package.json`.

## Plano gratuito: o que esperar

- A API **"dorme" após 15 min sem uso**. O primeiro acesso depois disso leva **cerca de 1 minuto**.
- O banco Postgres gratuito **expira 30 dias após a criação**, e cada conta só pode ter **1 banco gratuito**.
- O Static Site (frontend) é gratuito e não dorme.

Mais detalhes no [README do backend](abacaxi-backend/README.md).
