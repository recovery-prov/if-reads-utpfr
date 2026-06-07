# ifReads — API

Backend da aplicação **ifReads**, uma plataforma de resenhas de ficções interativas.

Stack: NestJS + Fastify · Prisma 7 (driver adapter `@prisma/adapter-pg`) · PostgreSQL (Neon) · JWT via HTTP-only cookie.

---

## Pré-requisitos

- Node.js 20+
- npm 10+
- Uma instância PostgreSQL acessível (recomendado: [Neon](https://neon.tech))

---

## Setup

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz de `ifReads/` com base no `.env.example`:

```bash
cp .env.example .env
```

Preencha os valores:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>/<db>?sslmode=require
JWT_SECRET=sua_chave_secreta_aqui
FRONTEND_URL=http://localhost:3001
PORT=3000
```

### 3. Gerar o Prisma Client

> **Obrigatório após clonar o repositório.** O cliente gerado não é versionado no Git.

```bash
npx prisma generate
```

### 4. Executar as migrations

```bash
npx prisma migrate deploy
```

### 5. (Opcional) Popular o banco com dados iniciais

```bash
npx prisma db seed
```

---

## Rodando o projeto

```bash
# desenvolvimento (watch mode)
npm run start:dev

# produção
npm run start:prod
```

A API estará disponível em `http://localhost:3000`.
Swagger UI: `http://localhost:3000/api`.

---

## Frontend

O frontend (Next.js) está em `src/interface/web/`. Para rodá-lo:

```bash
cd src/interface/web
pnpm install
# crie src/interface/web/.env.local com:
# NEXT_PUBLIC_BASE_URL=http://localhost:3000
pnpm dev
```

Disponível em `http://localhost:3001`.

---

## Testes

```bash
# unitários
npm run test

# integração (banco real)
npm run test:integration

# e2e
npm run test:e2e

# cobertura
npm run test:cov
```

---

## Por que `src/generated/prisma/` não está no Git?

O Prisma Client é gerado localmente a partir do `prisma/schema.prisma`. Arquivos gerados não devem ser versionados — execute `npx prisma generate` sempre que clonar o repositório ou alterar o schema.

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
