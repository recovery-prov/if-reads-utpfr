# Checklist de Entregas - Avaliador de Ficcao Interativa

## RA1 - Arquitetura, Requisitos com IA e Gestao Agil

### ID1 - Especificacao do Produto (PRD)

- [x] PRD criado na pasta `docs/prd.md`
- [x] Visao geral do produto definida
- [x] Personas documentadas
- [x] Historias de usuario com criterios de aceite
- [x] Regras de negocio mapeadas
- [x] Requisitos nao-funcionais definidos
- [x] Escopo fora (out of scope) declarado

### ID2 - Especificacao Tecnica (SDD)

- [x] SDD criado na pasta `docs/sdd.md`
- [x] Diagrama ER (Mermaid) com todas as entidades e relacionamentos
- [x] Schema Prisma completo
- [x] Contratos da API (endpoints, request/response)
- [x] Decisoes tecnicas documentadas (auth, validacao, testes)
- [x] Estrutura de modulos NestJS definida
- [x] Variaveis de ambiente documentadas

### ID3 - Assistencia de IA na Especificacao

- [x] IA utilizada para gerar/revisar PRD e SDD
- [X] Evidencias de uso de IA documentadas (prints ou historico)

### ID4 - Gestao Agil com Kanban

- [X] Kanban criado no GitHub Projects
- [X] Historias de usuario mapeadas como Issues
- [X] Colunas configuradas (To Do, In Progress, Done)
- [X] Labels criados (feature, bug, docs, etc.)

---

## RA2 - Backend Assistido por IA

### ID5 - Projeto NestJS Inicializado

- [X] Projeto NestJS criado em root
- [X] `package.json` com dependencias (NestJS, Prisma, JWT, etc.)
- [X] `tsconfig.json` configurado
- [X] Estrutura de modulos seguindo o SDD

### ID6 - Prisma ORM Configurado

- [X] `schema.prisma` implementado conforme SDD
- [X] Migrations geradas e aplicadas
- [X] `PrismaService` criado como modulo global
- [X] Seed script para dados iniciais

### ID7 - CRUD Completo

- [X] CRUD de Usuarios (registro, perfil)
- [X] CRUD de Ficcoes Interativas (criar, listar, detalhar, editar, excluir)
- [X] CRUD de Escritores (vincular, listar, remover)
- [X] CRUD de Avaliacoes (criar, listar, editar, excluir)
- [X] Paginacao nas listagens

### ID8 - Autenticacao JWT

- [X] Registro de usuario com hash bcrypt
- [X] Login retornando token JWT
- [X] Guard JWT protegendo rotas
- [X] Estrategia Passport-JWT implementada
- [X] Validacao de autoria nos endpoints protegidos

### ID9 - Validacao e Tratamento de Erros

- [X] DTOs com `class-validator` para cada endpoint
- [X] `ValidationPipe` global configurado
- [X] Tratamento de erros com codigos HTTP adequados (400, 401, 403, 404, 409)
- [X] Mensagens de erro claras e padronizadas

---

## RA3 - Qualidade e TDD

### ID10 - Testes Unitarios

- [X] Testes unitarios nos Services (ficcoes, avaliacoes, escritores, auth)
- [X] Prisma Client mockado nos testes
- [X] Cenarios de sucesso e erro cobertos
- [X] Cobertura minima de 70%

### ID11 - Testes E2E

- [X] Testes e2e nos Controllers principais
- [X] Fluxo completo testado (registro -> login -> CRUD)
- [X] Banco de teste isolado
- [X] Comandos de teste documentados no README

---

## RA4 - Frontend e Integracao

### ID12 - Frontend React

- [ ] Projeto React criado em `frontend/`
- [ ] Paginas: Login, Registro, Lista de Ficcoes, Detalhes, Criar Ficcao, Avaliar
- [ ] Componentes reutilizaveis (Header, Card, Form, etc.)
- [ ] Roteamento configurado

### ID13 - Consumo da API

- [ ] Servico HTTP (axios/fetch) configurado com base URL
- [ ] Token JWT armazenado e enviado nos headers
- [ ] Tratamento de erros da API no frontend
- [ ] Loading states nas requisicoes

### ID14 - Integracao Frontend-Backend

- [ ] CORS configurado no backend
- [ ] Frontend consumindo todos os endpoints da API
- [ ] Fluxo completo funcionando (registro, login, CRUD de ficcoes e avaliacoes)

---

## RA5 - CI/CD e Deploy

### ID15 - Pipeline CI (GitHub Actions)

- [ ] Workflow `.github/workflows/ci.yml` criado
- [ ] Testes rodando automaticamente em push/PR
- [ ] Prisma generate no pipeline
- [ ] Build verificado no pipeline

### ID16 - Deploy Backend

- [ ] Backend deployado no Render
- [ ] PostgreSQL provisionado no Render
- [ ] Variaveis de ambiente configuradas
- [ ] Swagger acessivel em producao

### ID17 - Deploy Frontend

- [ ] Frontend deployado na Vercel
- [ ] Variavel `VITE_API_URL` apontando para producao
- [ ] Build automatico via push no main
- [ ] Aplicacao funcional em producao

---

## Videos de Entrega

### Video 1 - Documentacao e Backlog

- [ ] Explicacao das regras de negocio
- [ ] Apresentacao do diagrama ER
- [ ] Demonstracao do Kanban no GitHub Projects

### Video 2 - Backend e TDD

- [ ] Execucao dos testes (unitarios e e2e)
- [ ] Demonstracao dos endpoints via Swagger
- [ ] Explicacao tecnica da arquitetura

### Video 3 - Sistema em Producao

- [ ] Frontend funcionando e consumindo API
- [ ] Sistema acessivel na nuvem
- [ ] Pipeline CI/CD executando
- [ ] Explicacao do fluxo completo

---

## Resumo de Progresso

| RA | Descricao | Status |
|----|-----------|--------|
| RA1 | Arquitetura e Especificacao | Em andamento |
| RA2 | Backend | Nao iniciado |
| RA3 | Qualidade e TDD | Nao iniciado |
| RA4 | Frontend e Integracao | Em andamento (v0) |
| RA5 | CI/CD e Deploy | Nao iniciado |
