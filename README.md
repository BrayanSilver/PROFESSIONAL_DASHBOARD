<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:06B6D4,100:0F172A&height=180&section=header&text=TechDash&fontSize=36&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Brayan%20R.%20Silveira&descAlignY=55&descSize=16" width="100%"/>

### Executive BI Dashboard · Next.js + NestJS

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-8884d8?style=for-the-badge&logo=recharts&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

<br/>

[![Portfolio](https://img.shields.io/badge/Portfolio-10b981?style=for-the-badge&logo=googlechrome&logoColor=white)](https://brayansilver.github.io)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/BrayanSilver)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/brayan-r-silveira-b80636150/)
[![Email](https://img.shields.io/badge/Email-000000?style=for-the-badge&logo=gmail&logoColor=white)](mailto:brayansilver.teen@gmail.com)
![Last Commit](https://img.shields.io/github/last-commit/BrayanSilver/PROFESSIONAL_DASHBOARD?style=for-the-badge&color=06B6D4&labelColor=000000)
![Stars](https://img.shields.io/github/stars/BrayanSilver/PROFESSIONAL_DASHBOARD?style=for-the-badge&color=06B6D4&labelColor=000000)
![Top Language](https://img.shields.io/github/languages/top/BrayanSilver/PROFESSIONAL_DASHBOARD?style=for-the-badge&labelColor=000000)

</div>

---

## 📌 Sobre

Painel executivo full-stack para consolidar **vendas, analytics, finanças, monitoramento de APIs** e dados públicos em tempo real. Projeto de portfólio com Next.js 15 + NestJS + TypeScript.

## 📊 Status cards

<div align="center">
  <img src="https://github-readme-stats.vercel.app/api/pin/?username=BrayanSilver&repo=PROFESSIONAL_DASHBOARD&theme=tokyonight&hide_border=true" height="140" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=BrayanSilver&layout=compact&theme=tokyonight&hide_border=true&repos=PROFESSIONAL_DASHBOARD" height="140" />
</div>

## 🎬 Demo animada

<div align="center">

![Demo TechDash](fotosProjeto/demo.gif)

</div>

> Slideshow gerado a partir das capturas em `fotosProjeto/`. Para um GIF de tela real (5–8s), grave com ScreenToGif / Gifski e substitua este arquivo.


## 🔄 Arquitetura / fluxo

```mermaid
flowchart LR
  User([Usuário]) --> FE[Next.js Frontend :3000]
  FE --> API[NestJS API :3002]
  API --> M1[Vendas]
  API --> M2[Analytics]
  API --> M3[Financeiro]
  API --> M4[Monitoramento]
  API --> M5[Dados Públicos]
  M5 --> EXT[(APIs públicas)]
  API --> JSON[(JSON mock)]
```

## ✨ Módulos

| Módulo | Rota | Descrição |
|--------|------|-----------|
| Visão Geral | `/` | KPIs consolidados |
| Vendas | `/vendas` | Receita, produtos, regiões |
| Analytics | `/analytics` | Tráfego e funil |
| Monitoramento | `/monitoramento` | Saúde de APIs e alertas |
| Financeiro | `/financeiro` | Fluxo de caixa |
| Dados Públicos | `/dados-publicos` | Câmbio, crypto, população |


## ▶️ Como rodar

### Backend (porta **3002**)
```bash
cd backend
npm install
npm run start:dev
```
API: `http://localhost:3002/api`

### Frontend (porta **3000**)
```bash
cd frontend
npm install
npm run dev
```
Abra http://localhost:3000

```env
NEXT_PUBLIC_API_URL=http://localhost:3002/api
```


## 🖼️ Galeria

### Visão Geral
![Visão Geral](fotosProjeto/1.png)

### Vendas
![Vendas](fotosProjeto/2.png)

### Analytics
![Analytics](fotosProjeto/3.png)

### Monitoramento
![Monitoramento](fotosProjeto/4.png)

### Financeiro
![Financeiro](fotosProjeto/5.png)

### Dados Públicos
![Dados Públicos](fotosProjeto/6.png)


---

<div align="center">

**Brayan R. Silveira** · Full Stack Developer

[Portfolio](https://brayansilver.github.io) · [GitHub](https://github.com/BrayanSilver) · [LinkedIn](https://www.linkedin.com/in/brayan-r-silveira-b80636150/)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0F172A,100:06B6D4&height=100&section=footer" width="100%"/>

</div>
