# SDD - Avaliador de Ficcao Interativa

## 1. Visao Arquitetural

### 1.1 Estilo Arquitetural

A aplicacao segue uma **arquitetura em camadas (Layered Architecture)** com separacao clara entre frontend e backend, comunicando-se via API REST.

```
┌──────────────────────────────────┐
│         Frontend (React)         │
│       Deploy: Vercel             │
└──────────────┬───────────────────┘
               │ HTTP/REST + JWT
┌──────────────▼───────────────────┐
│        Backend (NestJS)          │
│       Deploy: Render             │
│  ┌─────────────────────────────┐ │
│  │  Controllers (Routes)       │ │
│  ├─────────────────────────────┤ │
│  │  Services (Business Logic)  │ │
│  ├─────────────────────────────┤ │
│  │  Prisma ORM (Data Access)   │ │
│  └─────────────┬───────────────┘ │
└────────────────┼─────────────────┘
                 │
┌────────────────▼─────────────────┐
│      PostgreSQL Database         │
└──────────────────────────────────┘
```

### 1.2 Camadas do Backend

| Camada | Responsabilidade | Tecnologia |
|--------|-----------------|------------|
| Controllers | Receber requisicoes HTTP, validar entrada, retornar respostas | NestJS Controllers + class-validator |
| Services | Logica de negocio, orquestracao de operacoes | NestJS Services |
| Data Access | Acesso ao banco de dados, queries | Prisma ORM |
| Auth | Autenticacao e autorizacao | JWT + Passport |

---

## 2. Diagrama Entidade-Relacionamento (ER)

```mermaid
erDiagram
    USER {
        int id PK
        string name
        string email UK
        string password
        datetime createdAt
        datetime updatedAt
        fictions Fiction[]
        reviews  Review[]
    }

    FICTION {
        int id PK
        string title
        string description
        string genre
        int publicatedAt
        int authorId FK
        author  User
        authors Author[]
        reviews  Review[]
        datetime createdAt
        datetime updatedAt
    }

    AUTHOR {
        int id PK
        string name
        string role
        int fictionId FK
        datetime createdAt
    }

    REVIEW {
        int id PK
        int rating
        string comment
        int narrative
        int interactivity
        int originality
        int fictionId FK
        int userId FK
        datetime createdAt
        datetime updatedAt
    }

    USER ||--o{ FICTION : "cadastra"
    USER ||--o{ REVIEW : "cria"
    FICTION ||--o{ AUTHOR : "tem"
    FICTION ||--o{ REVIEW : "recebe"
```

---

## 3. Schema do Banco de Dados (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           Int                @id @default(autoincrement())
  name         String
  email        String             @unique
  password     String
  createdAt    DateTime           @default(now())
  updatedAt    DateTime           @updatedAt
  fictions     Fiction[]
  reviews      Review[]

  @@map("users")
}

model Fiction {
  id             Int         @id @default(autoincrement())
  title          String
  description    String?
  genre          String?
  publicationYear   Int?
  authorId        Int
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt
  author          User        @relation(fields: [authorId], references: [id])
  authors         Author[]
  reviews         Review[]

  @@map("ficcoes_interativas")
}

model Author {
  id        Int              @id @default(autoincrement())
  name      String
  role      String           @default("main_author")
  fictionId  Int
  createdAt  DateTime         @default(now())
  fiction    Fiction @relation(fields: [fictionId], references: [id], onDelete: Cascade)

  @@map("authors")
}

model Review {
  id               Int              @id @default(autoincrement())
  rating           Int
  comment          String?
  narrative        Int
  interactivity    Int
  originality      Int
  fictionId        Int
  userId           Int
  createdAt        DateTime         @default(now())
  updatedAt        DateTime         @updatedAt
  fiction          Fiction @relation(fields: [fictionId], references: [id], onDelete: Cascade)
  user             User    @relation(fields: [userId], references: [id])

  @@unique([fictionId, userId])
  @@map("reviews")
}
```

---

## 4. Contratos da API (Endpoints REST)

### 4.1 Autenticacao

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| POST | `/auth/register` | Cadastro de usuario | Nao |
| POST | `/auth/login` | Login e obtencao de token JWT | Nao |

**POST /auth/register**

Request:
```json
{
  "name": "string",
  "email": "string",
  "password": "string (min 6)"
}
```

Response (201):
```json
{
  "access_token": "string (JWT)",
  {
    "id": "number",
    "name": "string",
    "email": "string"
  }
}
```

**POST /auth/login**

Request:
```json
{
  "email": "string",
  "password": "string"
}
```

Response (200):
```json
{
  "access_token": "string (JWT)"
}
```

### 4.2 Usuarios

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| GET | `/users/me` | Perfil do usuario logado | Sim |
| PATCH | `/users/me` | Atualizar perfil | Sim |

### 4.3 Ficcoes Interativas

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| POST | `/fiction` | Criar ficcao | Sim |
| GET | `/fiction` | Listar ficcoes (paginado) | Nao |
| GET | `/fiction/:id` | Detalhes de uma ficcao | Nao |
| PATCH | `/fiction/:id` | Atualizar ficcao | Sim (autor) |
| DELETE | `/fiction/:id` | Excluir ficcao | Sim (autor) |

**POST /fictions**

Request:
```json
{
  "title": "string (obrigatorio)",
  "description": "string (opcional)",
  "genre": "string (opcional)",
  "publicationYear": "number (opcional)"
}
```

Response (201):
```json
{
  "id": "number",
  "title": "string",
  "description": "string | null",
  "genre": "string | null",
  "publicationYear": "number | null",
  "authorId": "number",
  "createdAt": "datetime",
  "atualizadoEm": "datetime"
}
```

**GET /fictions?page=1&limit=10**

Response (200):
```json
{
  "data": [
    {
      "id": "number",
      "titulo": "string",
      "genero": "string | null",
      "anoPublicacao": "number | null",
      "autor": {
        "id": "number",
        "nome": "string"
      },
      "mediaNotas": "number | null"
    }
  ],
  "total": "number",
  "page": "number",
  "limit": "number"
}
```

**GET /ficcoes/:id**

Response (200):
```json
{
  "id": "number",
  "titulo": "string",
  "descricao": "string | null",
  "genero": "string | null",
  "anoPublicacao": "number | null",
  "autor": {
    "id": "number",
    "nome": "string"
  },
  "escritores": [
    {
      "id": "number",
      "nome": "string",
      "papel": "string"
    }
  ],
  "mediaNotas": "number | null",
  "mediaCriterios": {
    "narrativa": "number | null",
    "interatividade": "number | null",
    "originalidade": "number | null"
  },
  "criadoEm": "datetime",
  "atualizadoEm": "datetime"
}
```

### 4.4 Escritores

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| POST | `/fictions/:fictionId/authors` | Vincular escritor | Sim (autor da ficcao) |
| GET | `/fictions/:fictionId/authors` | Listar escritores | Nao |
| DELETE | `/fictions/:fictionId/authors/:id` | Remover escritor | Sim (autor da ficcao) |

**POST /fictions/:fictionId/authors**

Request:
```json
{
  "name": "string (obrigatorio)",
  "role": "string (autor_principal | coautor | colaborador)"
}
```

Response (201):
```json
{
  "id": "number",
  "name": "string",
  "role": "string",
  "fictionId": "number",
  "createdAt": "datetime"
}
```

### 4.5 Avaliacoes

| Metodo | Rota | Descricao | Auth |
|--------|------|-----------|------|
| POST | `/fictions/:fictionId/reviews` | Criar avaliacao | Sim |
| GET | `/fictions/:fictionId/reviews` | Listar avaliacoes (paginado) | Nao |
| PATCH | `/fictions/:fictionId/reviews/:id` | Editar avaliacao | Sim (autor) |
| DELETE | `/fictions/:fictionId/reviews/:id` | Excluir avaliacao | Sim (autor) |

**POST /fictions/:fictionId/reviews**

Request:
```json
{
  "rating": "number (1-5, obrigatorio)",
  "comment": "string (opcional)",
  "narrative": "number (1-5, obrigatorio)",
  "interactivity": "number (1-5, obrigatorio)",
  "originality": "number (1-5, obrigatorio)"
}
```

Response (201):
```json
{
  "id": "number",
  "rating": "number",
  "comment": "string | null",
  "narrative": "number",
  "interactivity": "number",
  "originality": "number",
  "fictionId": "number",
  "userId": "number",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

## 5. Codigos de Erro Padrao

| Codigo | Significado | Exemplo |
|--------|------------|---------|
| 400 | Bad Request | Validacao de dados falhou |
| 401 | Unauthorized | Token JWT ausente ou invalido |
| 403 | Forbidden | Usuario nao e o autor do recurso |
| 404 | Not Found | Ficcao ou avaliacao nao encontrada |
| 409 | Conflict | Email ja cadastrado / Avaliacao duplicada |
| 500 | Internal Server Error | Erro inesperado no servidor |

---

## 6. Decisoes Tecnicas

### 6.1 Autenticacao

- **Estrategia:** JWT (JSON Web Tokens) via `@nestjs/passport` e `passport-jwt`.
- **Expiracao:** Token com validade de 24 horas.
- **Hash de senha:** bcrypt com salt rounds = 10.
- **Guard:** `JwtAuthGuard` aplicado nas rotas protegidas.

### 6.2 Validacao de Dados

- **Biblioteca:** `class-validator` + `class-transformer` integrados ao NestJS.
- **DTOs:** Cada endpoint possui um DTO especifico com decorators de validacao.
- **Pipe global:** `ValidationPipe` configurado globalmente com `whitelist: true` e `transform: true`.

### 6.3 Banco de Dados

- **ORM:** Prisma Client para type-safety e migrations.
- **Migrations:** Gerenciadas via `prisma migrate dev` (desenvolvimento) e `prisma migrate deploy` (producao).
- **Seeding:** Script de seed para dados iniciais de teste.

### 6.4 Estrutura de Modulos NestJS

```
backend/src/
├── main.ts
├── app.module.ts
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   ├── jwt-auth.guard.ts
│   └── dto/
│       ├── register.dto.ts
│       └── login.dto.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   └── users.service.ts
├── fictions/
│   ├── fictions.module.ts
│   ├── fictions.controller.ts
│   ├── fictions.service.ts
│   └── dto/
│       ├── create-fiction.dto.ts
│       └── update-fiction.dto.ts
├── authors/
│   ├── authors.module.ts
│   ├── authors.controller.ts
│   ├── authors.service.ts
│   └── dto/
│       └── create-author.dto.ts
├── reviews/
│   ├── reviews.module.ts
│   ├── reviews.controller.ts
│   ├── reviews.service.ts
│   └── dto/
│       ├── create-review.dto.ts
│       └── update-review.dto.ts
└── prisma/
    ├── prisma.module.ts
    └── prisma.service.ts
```

### 6.5 Testes

- **Framework:** Jest (integrado ao NestJS).
- **Tipos:** Testes unitarios nos Services e testes e2e nos Controllers.
- **Mocking:** Prisma Client mockado nos testes unitarios.
- **Meta:** Cobertura minima de 70%.

### 6.6 Swagger/OpenAPI

- **Biblioteca:** `@nestjs/swagger`.
- **Configuracao:** Decorators nos Controllers e DTOs para geracao automatica.
- **Endpoint:** Disponivel em `/api/docs` em desenvolvimento e producao.

---

## 7. Variaveis de Ambiente

```env
# Banco de Dados
DATABASE_URL=postgresql://user:password@localhost:5432/ficcao_interativa

# JWT
JWT_SECRET=sua-chave-secreta-aqui
JWT_EXPIRATION=24h

# Aplicacao
PORT=3000
NODE_ENV=development
```

---

## 8. Deploy e Infraestrutura

### 8.1 Backend (Render)

- **Tipo:** Web Service.
- **Build command:** `npm install && npx prisma migrate deploy && npm run build`
- **Start command:** `npm run start:prod`
- **Banco:** PostgreSQL provisionado no Render.

### 8.2 Frontend (Vercel)

- **Framework:** React (Vite ou Next.js).
- **Build command:** `npm run build`
- **Variavel de ambiente:** `VITE_API_URL` apontando para o backend no Render.

### 8.3 CI/CD (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: cd backend && npm ci
      - run: cd backend && npx prisma generate
      - run: cd backend && npm test
```

---

## 9. Glossario

| Termo | Definicao |
|-------|----------|
| Ficcao Interativa | Obra narrativa onde o leitor faz escolhas que afetam o desenrolar da historia. |
| Escritor | Pessoa creditada na criacao de uma ficcao interativa (autor, coautor ou colaborador). |
| Avaliacao | Registro de opiniao de um usuario sobre uma ficcao, com nota geral e criterios especificos. |
| Criterios | Aspectos avaliados: narrativa, interatividade e originalidade. |
| JWT | JSON Web Token, padrao para autenticacao stateless em APIs REST. |
| Prisma | ORM para Node.js/TypeScript com type-safety e sistema de migrations. |
