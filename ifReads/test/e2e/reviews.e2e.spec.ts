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

async function createFiction(token: string): Promise<number> {
  const res = await app.inject({
    method: 'POST',
    url: '/fiction',
    headers: { authorization: `Bearer ${token}` },
    payload: {
      title: 'Ficção Teste',
      link: 'https://exemplo.com/ficcao',
    },
  });
  return (JSON.parse(res.body) as { data: { id: number } }).data.id;
}

const reviewPayload = {
  rating: 4,
  comment: 'Muito boa!',
  narrative: 5,
  interactivity: 4,
  originality: 3,
};

describe('POST /fictions/:fictionId/reviews', () => {
  it('201 - deve criar review autenticado', async () => {
    const token = await registerAndGetToken(
      'Beatriz',
      'beatriz@email.com',
      'senha123',
    );
    const fictionId = await createFiction(token);

    const res = await app.inject({
      method: 'POST',
      url: `/fictions/${fictionId}/reviews`,
      headers: { authorization: `Bearer ${token}` },
      payload: reviewPayload,
    });

    expect(res.statusCode).toBe(201);
    const body = JSON.parse(res.body) as {
      success: boolean;
      data: Record<string, unknown>;
    };
    expect(body.data).toMatchObject({ rating: 4, narrative: 5 });
  });

  it('409 - deve rejeitar review duplicado do mesmo usuário', async () => {
    const token = await registerAndGetToken(
      'Beatriz',
      'beatriz@email.com',
      'senha123',
    );
    const fictionId = await createFiction(token);

    // Primeira review
    await app.inject({
      method: 'POST',
      url: `/fictions/${fictionId}/reviews`,
      headers: { authorization: `Bearer ${token}` },
      payload: reviewPayload,
    });

    // Segunda review do mesmo usuário para a mesma ficção
    const res = await app.inject({
      method: 'POST',
      url: `/fictions/${fictionId}/reviews`,
      headers: { authorization: `Bearer ${token}` },
      payload: reviewPayload,
    });

    expect(res.statusCode).toBe(409);
  });
});

describe('GET /fictions/:fictionId/reviews', () => {
  it('200 - deve listar reviews sem autenticação', async () => {
    const token = await registerAndGetToken(
      'Beatriz',
      'beatriz@email.com',
      'senha123',
    );
    const fictionId = await createFiction(token);

    const res = await app.inject({
      method: 'GET',
      url: `/fictions/${fictionId}/reviews`,
    });

    expect(res.statusCode).toBe(200);
    const body = JSON.parse(res.body) as {
      success: boolean;
      data: Record<string, unknown>;
    };
    expect(body).toHaveProperty('data');
    expect(body.data).toHaveProperty('data');
    expect(body.data).toHaveProperty('total');
  });
});
