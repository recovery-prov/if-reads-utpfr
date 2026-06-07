import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { FictionsService } from '../../../src/fictions/fictions.service.js';
import { PrismaService } from '../../../src/prisma/prisma.service.js';
import { cleanDb } from '../../helpers/clean-db.js';

let service: FictionsService;
let prisma: PrismaService;
let moduleRef: TestingModule;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let seedUserId: number;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    providers: [PrismaService, FictionsService],
  }).compile();

  await moduleRef.init();
  service = moduleRef.get(FictionsService);
  prisma = moduleRef.get(PrismaService);
});

afterEach(async () => {
  await cleanDb(prisma);
});

afterAll(() => moduleRef.close());

async function createUser(email = 'autor@email.com') {
  const user = await prisma.user.create({
    data: { name: 'Autor', email, password: 'hashed' },
  });
  seedUserId = user.id;
  return user;
}

/** Helper: create a fiction directly in the DB. */
async function createFiction(authorId: number) {
  return prisma.fiction.create({
    data: {
      title: 'Dom Casmurro',
      authorId,
    },
  });
}

describe('FictionsService.create (DB)', () => {
  it('deve persistir ficção no banco com authorId correto', async () => {
    const user = await createUser();

    const fiction = await service.create(
      { title: 'Dom Casmurro' } as any,
      user.id,
    );

    expect(fiction.id).toBeDefined();
    expect(fiction.title).toBe('Dom Casmurro');
    expect(fiction.authorId).toBe(user.id);

    const dbFiction = await prisma.fiction.findUnique({
      where: { id: fiction.id },
    });
    expect(dbFiction).not.toBeNull();
  });
});

describe('FictionsService.findAll (DB)', () => {
  it('deve retornar lista paginada com total correto', async () => {
    const user = await createUser();

    await prisma.fiction.createMany({
      data: [
        { title: 'Ficção A', authorId: user.id },
        { title: 'Ficção B', authorId: user.id },
        { title: 'Ficção C', authorId: user.id },
      ],
    });

    const page1 = await service.findAll(1, 2);

    expect(page1.total).toBe(3);
    expect(page1.data).toHaveLength(2);
    expect(page1.page).toBe(1);
    expect(page1.limit).toBe(2);
  });

  it('deve respeitar o offset da segunda página', async () => {
    const user = await createUser();

    await prisma.fiction.createMany({
      data: [
        { title: 'Ficção A', authorId: user.id },
        { title: 'Ficção B', authorId: user.id },
        { title: 'Ficção C', authorId: user.id },
      ],
    });

    const page2 = await service.findAll(2, 2);

    expect(page2.data).toHaveLength(1);
    expect(page2.page).toBe(2);
  });
});

// ──────────────────────────────────────────────
// findOne
// ──────────────────────────────────────────────
describe('FictionsService.findOne (DB)', () => {
  it('deve retornar ficção com relações incluídas', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    const found = await service.findOne(fiction.id);

    expect(found.id).toBe(fiction.id);
    expect(found).toHaveProperty('author');
    expect(found).toHaveProperty('authors');
    expect(found).toHaveProperty('reviews');
  });

  it('deve lançar NotFoundException para id inexistente', async () => {
    await expect(service.findOne(99999)).rejects.toThrow(NotFoundException);
  });
});

describe('FictionsService.update (DB)', () => {
  it('deve atualizar título no banco', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    const updated = await service.update(
      fiction.id,
      { title: 'Título Novo' },
      user.id,
    );

    expect(updated.title).toBe('Título Novo');

    const dbFiction = await prisma.fiction.findUnique({
      where: { id: fiction.id },
    });
    expect(dbFiction!.title).toBe('Título Novo');
  });

  it('deve lançar ForbiddenException para usuário não-autor', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    const otherUser = await prisma.user.create({
      data: { name: 'Outro', email: 'outro@email.com', password: 'hashed' },
    });

    await expect(
      service.update(fiction.id, { title: 'Hackeado' }, otherUser.id),
    ).rejects.toThrow(ForbiddenException);
  });
});

describe('FictionsService.remove (DB)', () => {
  it('deve remover ficção do banco', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    await service.remove(fiction.id, user.id);

    const dbFiction = await prisma.fiction.findUnique({
      where: { id: fiction.id },
    });
    expect(dbFiction).toBeNull();
  });

  it('deve remover em cascata autores e reviews associados', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    await prisma.author.create({
      data: { name: 'Coautor', role: 'coauthor', fictionId: fiction.id },
    });

    await service.remove(fiction.id, user.id);

    const authors = await prisma.author.findMany({
      where: { fictionId: fiction.id },
    });
    expect(authors).toHaveLength(0);
  });
});
