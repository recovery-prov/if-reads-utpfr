import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { PrismaService } from '../../src/prisma/prisma.service.js';
import { createE2eApp } from '../helpers/create-e2e-app.js';
import { cleanDb } from '../helpers/clean-db.js';

let app: NestFastifyApplication;
let prisma: PrismaService;

beforeAll(async () => {
  app = await createE2eApp();
  prisma = app.get(PrismaService);
});

afterEach(async () => {
  await cleanDb(prisma);
});

afterAll(() => app.close());

describe('POST /auth/register', () => {
  it('201 - deve registrar usuário, definir cookie e retornar mensagem', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        name: 'Beatriz',
        email: 'beatriz@email.com',
        password: 'senha123',
      },
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body) as {
      message: string;
      user: { name: string; email: string };
    };
    expect(body).toMatchObject({
      message: 'Registro realizado com sucesso',
      user: { name: 'Beatriz', email: 'beatriz@email.com' },
    });
    const cookies = res.cookies as Array<{ name: string; value: string }>;
    expect(cookies.find((c) => c.name === 'access_token')).toBeDefined();

    const dbUser = await prisma.user.findUnique({
      where: { email: 'beatriz@email.com' },
    });
    expect(dbUser).not.toBeNull();
  });

  it('409 - deve retornar conflito para e-mail duplicado', async () => {
    await prisma.user.create({
      data: { name: 'Beatriz', email: 'beatriz@email.com', password: 'hashed' },
    });

    const res = await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        name: 'Outra',
        email: 'beatriz@email.com',
        password: 'senha123',
      },
    });

    expect(res.statusCode).toBe(409);
  });
});

describe('POST /auth/login', () => {
  it('200 - deve autenticar e retornar access_token', async () => {
    await app.inject({
      method: 'POST',
      url: '/auth/register',
      payload: {
        name: 'Beatriz',
        email: 'beatriz@email.com',
        password: 'senha123',
      },
    });

    const res = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: { email: 'beatriz@email.com', password: 'senha123' },
    });

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body) as Record<string, unknown>).toMatchObject({
      message: 'Login realizado com sucesso',
    });
    const cookies = res.cookies as Array<{ name: string; value: string }>;
    expect(cookies.find((c) => c.name === 'access_token')).toBeDefined();
  });

  it('401 - deve rejeitar credenciais inválidas', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/auth/login',
      payload: { email: 'naoexiste@email.com', password: 'qualquer' },
    });

    expect(res.statusCode).toBe(401);
  });
});
