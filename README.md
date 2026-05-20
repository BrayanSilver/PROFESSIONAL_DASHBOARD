# TechDash — Dashboard Business Intelligence

Painel executivo full-stack para consolidar vendas, analytics, finanças, monitoramento de APIs e dados públicos em tempo real. Projeto de portfólio com **Next.js + NestJS + TypeScript**.

![Visão Geral — KPIs e gráficos consolidados](fotosProjeto/1.png)

## Sobre o projeto

O **TechDash** simula um ambiente de BI corporativo: KPIs, gráficos interativos (Recharts), alertas de infraestrutura e integração com APIs públicas (câmbio, criptomoedas, população), com fallback offline quando a rede falha.

## Módulos

| Módulo | Rota | Descrição |
|--------|------|-----------|
| Visão Geral | `/` | KPIs consolidados de todo o painel |
| Vendas | `/vendas` | Receita, produtos, regiões e pedidos |
| Analytics | `/analytics` | Tráfego web, fontes e funil de conversão |
| Monitoramento | `/monitoramento` | Saúde de APIs, latência e alertas |
| Financeiro | `/financeiro` | Fluxo de caixa, despesas e KPIs |
| Dados Públicos | `/dados-publicos` | Câmbio, crypto e população (APIs reais) |

## Stack

| Camada | Tecnologias |
|--------|-------------|
| Frontend | Next.js 15, React 19, TypeScript, Tailwind CSS, Recharts, Lucide |
| Backend | NestJS 10, Express, TypeScript |
| Dados | JSON mock em `backend/src/data/` + APIs públicas |

## Como rodar

### 1. Backend (porta **3002**)

```bash
cd backend
npm install
npm run start:dev
```

API: `http://localhost:3002/api`

### 2. Frontend (porta **3000**)

```bash
cd frontend
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

### Variáveis de ambiente (opcional)

Crie `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
```

> **Dica:** o frontend do **Projeto com IA** também usa a porta 3002 — rode apenas um deles por vez ou altere a porta em um dos projetos.

## API (prefixo `/api`)

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/sales`, `/sales/summary` | Dados e resumo de vendas |
| GET | `/analytics`, `/analytics/summary` | Analytics e tráfego |
| GET | `/finance`, `/finance/summary` | Dados financeiros |
| GET | `/monitoring`, `/monitoring/alerts` | Monitoramento e alertas |
| GET | `/public-data` | Câmbio, crypto e população |

## Estrutura

```
Dashboard/
├── fotosProjeto/     # Capturas de tela
├── backend/          # NestJS API
│   └── src/
│       ├── data/     # JSON mock
│       └── modules/  # sales, analytics, finance, monitoring, public-data
└── frontend/         # Next.js App Router
    └── src/
        ├── app/      # Páginas por módulo
        ├── components/
        └── lib/      # Cliente API e formatters
```

## Galeria

### Visão Geral
![Painel executivo com KPIs e gráficos de receita e tráfego](fotosProjeto/1.png)

### Vendas
![Módulo de vendas — receita, produtos e pedidos](fotosProjeto/2.png)

### Analytics
![Analytics — tráfego, fontes e funil](fotosProjeto/3.png)

### Monitoramento
![Monitoramento de APIs — uptime, latência e alertas](fotosProjeto/4.png)

### Financeiro
![Financeiro — fluxo de caixa e KPIs](fotosProjeto/5.png)

### Dados Públicos
![Dados públicos — câmbio, crypto e população](fotosProjeto/6.png)
