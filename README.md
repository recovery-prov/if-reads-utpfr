# 📖 Avaliador de Ficção Interativa

🔗 **Link em Produção:** WIP https://v0.app/chat/ifreads-frontend-design-sjx4DWca2hI
👩‍💻 **Autora:** Beatriz Amante

## 🎯 1. Visão Geral

Sistema Full-Cycle para cadastro e avaliação de obras de ficção interativa, desenvolvido com Engenharia Assistida por IA e fluxo Spec-Driven Development (SDD). O sistema permite que usuários registrem ficções interativas e vinculem avaliações com nota, comentário e critérios. Relações principais:

- 1 Escritor → N Ficções Interativas
- 1 Ficção Interativa → N Escritores
- 1 Ficção Interativa → N Avaliações
- 1 Avaliação → 1 Autor (usuário)

## 📚 2. Documentação Oficial (Docs as Code)

Toda a especificação do sistema está versionada na pasta `/docs`:
- 📄 **[PRD (Product Requirements Document)](./docs/prd.md):** Visão do produto, Histórias de Usuário e Regras de Negócio.
- 📐 **[SDD (Software Design Document)](./docs/sdd.md):** Diagrama de banco de dados (Mermaid), contratos de API, DTOs e Decisões Técnicas.
- ✅ **[Checklist de Avaliação](./docs/checklist.md):** Controle de entrega dos IDs e RAs da disciplina de Tópicos Especiais.

## 🛠 3. Stack Tecnológica

* **Arquitetura:** Monorepo (Backend e Frontend no mesmo repositório).
- **Backend (API):** NestJS, TypeScript, JWT, Vitest.
- **Banco de Dados:** PostgreSQL gerenciado via Prisma ORM.
- **Frontend (planejado):** React (consumo da API NestJS).
- **DevOps:** GitHub Actions (CI), Deploy em nuvem (Render para API e Vercel para Frontend).

## 🚀 4. Quick Start (Como Executar)

**1. Clone o repositório:**

    git clone https://github.com/beatrizamante/interactive-fiction-reviewer
    cd interactive-fiction-reviewer

**2. Instale as dependências:**

    # Terminal 1 - Iniciar a API (Backend)
    cd backend
    npm install
    npm run start:dev

    # Terminal 2 - Iniciar o Frontend (quando disponível)
    cd frontend
    npm install
    npm run dev

**3. Variáveis de Ambiente:**
Não esqueça de copiar o arquivo `.env.example` para `.env` dentro da pasta `interactive-fiction-reviewer` e configurar a `DATABASE_URL` do seu PostgreSQL.

**Requisitos mínimos:**

- Node.js 20+
- npm 10+
- Docker (opcional para banco local)
