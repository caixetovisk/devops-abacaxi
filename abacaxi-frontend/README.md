# 🍍 Fazenda de Abacaxis — Frontend

Interface web em **React + Vite** do sistema da Fazenda de Abacaxis. Tem as telas:

- **Login** (usuário e senha)
- **Painel** com total colhido, vendido, estoque e faturamento
- **Colheitas**: registrar data e quantidade de abacaxis colhidos
- **Vendas**: registrar vendas (data, quantidade, preço, cliente)
- Interface em **português** (padrão), **inglês** e **chinês simplificado**, com seletor de bandeiras e preferência salva no navegador

Este projeto só exibe as telas. Os dados vêm da API, que fica na pasta [../abacaxi-backend](../abacaxi-backend) do mesmo repositório (**devops-abacaxi**).

## Como o frontend encontra a API?

Pela variável de ambiente **`VITE_API_URL`**. Veja [src/api.js](src/api.js).

| Onde roda | Valor de `VITE_API_URL` |
|---|---|
| No seu computador | `http://localhost:3001` |
| No Render | `https://<sua-api>.onrender.com` |

> ⚠️ **Importante:** no Vite, as variáveis `VITE_*` são gravadas no código **no momento do build** (`npm run build`). Se você mudar o valor dela, precisa fazer **um novo build/deploy** para a mudança valer.

## Estrutura

```
src/
├── main.jsx          # ponto de entrada
├── App.jsx           # menu e troca de páginas
├── api.js            # função que chama a API (usa VITE_API_URL)
├── styles.css
└── pages/
    ├── Login.jsx
    ├── Painel.jsx
    ├── Colheitas.jsx
    └── Vendas.jsx
```

---

## 1. Rodando localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) 20 ou superior
- A **API (abacaxi-backend) rodando** em http://localhost:3001 (siga o README dela)

### Passo a passo

**1. Entre na pasta e instale as dependências**

```bash
cd abacaxi-frontend
npm install
```

**2. Crie o arquivo `.env`** a partir do exemplo:

```bash
cp .env.example .env
```

O conteúdo deve ser:

```
VITE_API_URL=http://localhost:3001
```

**3. Inicie o frontend**

```bash
npm run dev
```

**4.** Abra http://localhost:5173 e entre com o usuário `admin` e a senha `admin123`, ou os valores que estiverem em `ADMIN_USER`/`ADMIN_PASSWORD` no `.env` da API.

### Testando o build de produção localmente (opcional)

É exatamente isto que o Render vai fazer:

```bash
npm run build     # gera a pasta dist/
npm run preview   # serve a pasta dist/ em http://localhost:4173
```

> Se for usar o `preview`, lembre que a API só aceita o endereço que estiver em `FRONTEND_URL`. Coloque `FRONTEND_URL=http://localhost:4173` no `.env` da API, ou `*`, e reinicie a API.

---

## 2. Deploy no Render (plano gratuito)

O frontend é publicado como **Static Site**, que é **gratuito** no Render. O Render roda `npm run build` e publica a pasta `dist/`.

### Antes de começar

- A **API já precisa estar publicada** no Render (siga o README do **abacaxi-backend**). Copie a URL dela, por exemplo `https://fazenda-abacaxi-api.onrender.com`.
- O repositório **devops-abacaxi** já deve estar no **seu** GitHub (veja o [README da raiz](../README.md)).

### Passo a passo

1. No painel do Render, clique em **New +** → **Static Site**.
2. Selecione o repositório **devops-abacaxi** (o mesmo da API).
3. Preencha:

   | Campo | Valor |
   |---|---|
   | **Name** | `fazenda-abacaxi` |
   | **Branch** | `main` |
   | **Root Directory** | `abacaxi-frontend` ⚠️ **(não esqueça!)** |
   | **Build Command** | `npm install && npm run build` |
   | **Publish Directory** | `dist` |

4. Em **Environment Variables**, adicione:

   | Key | Value |
   |---|---|
   | `VITE_API_URL` | a URL da sua API, **sem barra `/` no final**, por exemplo `https://fazenda-abacaxi-api.onrender.com` |

5. Clique em **Deploy Static Site** e aguarde o status **Live**.
6. Copie a URL do site, por exemplo `https://fazenda-abacaxi.onrender.com`.

### Último passo: liberar o site na API (CORS)

Por segurança, a API só aceita requisições do endereço que estiver na variável `FRONTEND_URL`.

1. Abra o **Web Service da API** no Render → **Environment**.
2. Coloque em `FRONTEND_URL` a URL do site, por exemplo `https://fazenda-abacaxi.onrender.com`, **sem barra no final**.
3. Salve e aguarde o novo deploy da API.
4. Acesse o site e faça login. 🎉

### Atualizando o site

A cada `git push` na branch `main` que altere arquivos da pasta `abacaxi-frontend`, o Render gera um novo build sozinho.
Se você mudou **só** a variável `VITE_API_URL` no painel, faça um novo deploy manual: **Manual Deploy** → **Deploy latest commit**.

---

## ⚠️ Plano gratuito: o login demora?

A API no plano Free **"dorme" após 15 minutos sem uso**. O primeiro acesso depois disso pode levar **cerca de 1 minuto** enquanto ela "acorda". A tela de login mostra um aviso nesse caso. Isso é normal no plano gratuito.

O Static Site (este frontend) não dorme: ele carrega sempre na hora.

## Arquitetura do deploy

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

## Problemas comuns

| Sintoma | Causa provável |
|---|---|
| "Não foi possível conectar à API" | A API está fora do ar ou "acordando" (espere 1 min), ou `VITE_API_URL` está errada |
| Erro de **CORS** no console do navegador (F12) | `FRONTEND_URL` na API está diferente da URL do site |
| Mudei `VITE_API_URL` e nada mudou | As variáveis do Vite valem a partir do build: faça um novo deploy |
| A requisição vai para `localhost:3001` mesmo no Render | `VITE_API_URL` não foi configurada no Render antes do build |
| `Could not read package.json` / `ENOENT` no build | O campo **Root Directory** não foi preenchido com `abacaxi-frontend` |
