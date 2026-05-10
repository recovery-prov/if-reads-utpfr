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

async function registerAndGetToken(
  name: string,
  email: string,
  password: string,
): Promise<string> {
  const res = await app.inject({
    method: 'POST',
    url: '/auth/register',
    payload: { name, email, password },
  });
  const cookies = res.cookies as Array<{ name: string; value: string }>;
  const tokenCookie = cookies.find((c) => c.name === 'access_token');
  if (!tokenCookie) throw new Error('Cookie access_token não encontrado');
  return tokenCookie.value;
}

const fictionPayload = {
  title: 'Minha Ficção',
  description: 'Uma história incrível',
  genre: 'Fantasia',
  link: 'https://exemplo.com/ficcao',
};

describe('POST /fiction', () => {
  it('201 - deve criar uma ficção autenticado', async () => {
    const token = await registerAndGetToken(
      'Beatriz',
      'beatriz@email.com',
      'senha123',
    );

    const res = await app.inject({
      method: 'POST',
      url: '/fiction',
      headers: { authorization: `Bearer ${token}` },
      payload: fictionPayload,
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body) as {
      success: boolean;
      data: Record<string, unknown>;
    };
    expect(body.data).toMatchObject({ title: 'Minha Ficção' });
  });

  it('401 - deve rejeitar criação sem token', async () => {
    const res = await app.inject({
      method: 'POST',
      url: '/fiction',
      payload: fictionPayload,
    });

    expect(res.statusCode).toBe(401);
  });
});

describe('GET /fiction', () => {
  it('200 - deve listar ficções sem autenticação', async () => {
    const res = await app.inject({
      method: 'GET',
      url: '/fiction',
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body) as {
      success: boolean;
      data: Record<string, unknown>;
    };
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('items');
    expect(body.data).toHaveProperty('total');
  });
});

describe('PATCH /fiction/:id', () => {
  it('403 - deve rejeitar atualização por não-dono', async () => {
    const ownerToken = await registerAndGetToken(
      'Dono',
      'dono@email.com',
      'senha123',
    );
    const otherToken = await registerAndGetToken(
      'Outro',
      'outro@email.com',
      'senha456',
    );

    // Cria ficção como dono
    const createRes = await app.inject({
      method: 'POST',
      url: '/fiction',
      headers: { authorization: `Bearer ${ownerToken}` },
      payload: fictionPayload,
    });
    const fictionId = (JSON.parse(createRes.body) as { data: { id: number } })
      .data.id;

    // Tenta atualizar como outro usuário
    const res = await app.inject({
      method: 'PATCH',
      url: `/fiction/${fictionId}`,
      headers: { authorization: `Bearer ${otherToken}` },
      payload: { title: 'Título Alterado' },
    });

    expect(res.statusCode).toBe(403);
  });
});
