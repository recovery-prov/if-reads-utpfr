import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { AuthorsService } from '../../../src/authors/authors.service.js';
import { PrismaService } from '../../../src/prisma/prisma.service.js';
import { cleanDb } from '../../helpers/clean-db.js';

let service: AuthorsService;
let prisma: PrismaService;
let moduleRef: TestingModule;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    providers: [PrismaService, AuthorsService],
  }).compile();

  await moduleRef.init();
  service = moduleRef.get(AuthorsService);
  prisma = moduleRef.get(PrismaService);
});

afterEach(async () => {
  await cleanDb(prisma);
});

afterAll(() => moduleRef.close());

async function createUser(email = 'dono@email.com') {
  return prisma.user.create({
    data: { name: 'Dono', email, password: 'hashed' },
  });
}

async function createFiction(authorId: number) {
  return prisma.fiction.create({
    data: { title: 'Ficção Teste', authorId },
  });
}

describe('AuthorsService.create (DB)', () => {
  it('deve vincular escritor à ficção no banco', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    const author = await service.create(
      fiction.id,
      { name: 'Machado de Assis', role: 'main_author' },
      user.id,
    );

    expect(author.id).toBeDefined();
    expect(author.fictionId).toBe(fiction.id);

    const dbAuthor = await prisma.author.findUnique({
      where: { id: author.id },
    });
    expect(dbAuthor).not.toBeNull();
  });

  it('deve lançar ForbiddenException se o usuário não for dono da ficção', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    const other = await prisma.user.create({
      data: { name: 'Outro', email: 'outro@email.com', password: 'hashed' },
    });

    await expect(
      service.create(
        fiction.id,
        { name: 'Alguém', role: 'coauthor' },
        other.id,
      ),
    ).rejects.toThrow(ForbiddenException);
  });

  it('deve lançar NotFoundException para ficção inexistente', async () => {
    await expect(
      service.create(99999, { name: 'Alguém', role: 'coauthor' }, 1),
    ).rejects.toThrow(NotFoundException);
  });
});

describe('AuthorsService.findAll (DB)', () => {
  it('deve retornar escritores de uma ficção', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    await prisma.author.createMany({
      data: [
        { name: 'Escritor A', role: 'main_author', fictionId: fiction.id },
        { name: 'Escritor B', role: 'coauthor', fictionId: fiction.id },
      ],
    });

    const authors = await service.findAll(fiction.id);

    expect(authors).toHaveLength(2);
    expect(authors.map((a) => a.name)).toContain('Escritor A');
  });

  it('deve retornar lista vazia quando não há escritores', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    const authors = await service.findAll(fiction.id);

    expect(authors).toHaveLength(0);
  });
});

describe('AuthorsService.remove (DB)', () => {
  it('deve remover escritor do banco', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    const author = await prisma.author.create({
      data: { name: 'Escritor', role: 'coauthor', fictionId: fiction.id },
    });

    await service.remove(fiction.id, author.id, user.id);

    const dbAuthor = await prisma.author.findUnique({
      where: { id: author.id },
    });
    expect(dbAuthor).toBeNull();
  });

  it('deve lançar NotFoundException se o escritor não pertence à ficção', async () => {
    const user = await createUser();
    const fiction = await createFiction(user.id);

    await expect(service.remove(fiction.id, 99999, user.id)).rejects.toThrow(
      NotFoundException,
    );
  });
});
