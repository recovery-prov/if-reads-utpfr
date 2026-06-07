import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { ReviewsService } from '../../../src/reviews/reviews.service.js';
import { PrismaService } from '../../../src/prisma/prisma.service.js';
import { cleanDb } from '../../helpers/clean-db.js';

let service: ReviewsService;
let prisma: PrismaService;
let moduleRef: TestingModule;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    providers: [PrismaService, ReviewsService],
  }).compile();

  await moduleRef.init();
  service = moduleRef.get(ReviewsService);
  prisma = moduleRef.get(PrismaService);
});

afterEach(async () => {
  await cleanDb(prisma);
});

afterAll(() => moduleRef.close());

async function createUser(email = 'user@email.com') {
  return prisma.user.create({
    data: { name: 'Usuário', email, password: 'hashed' },
  });
}

async function createFiction(authorId: number) {
  return prisma.fiction.create({
    data: { title: 'Ficção Teste', authorId },
  });
}

const validReview = {
  rating: 5,
  narrative: 4,
  interactivity: 3,
  originality: 5,
  comment: 'Excelente!',
};

describe('ReviewsService.create (DB)', () => {
  it('deve persistir avaliação no banco', async () => {
    const author = await createUser('autor@email.com');
    const reader = await createUser('leitor@email.com');
    const fiction = await createFiction(author.id);

    const review = await service.create(fiction.id, validReview, reader.id);

    expect(review.id).toBeDefined();
    expect(review.fictionId).toBe(fiction.id);
    expect(review.authorId).toBe(reader.id);

    const dbReview = await prisma.review.findUnique({
      where: { id: review.id },
    });
    expect(dbReview).not.toBeNull();
    expect(dbReview!.rating).toBe(5);
  });

  it('deve lançar ConflictException ao avaliar a mesma ficção duas vezes', async () => {
    const author = await createUser('autor@email.com');
    const reader = await createUser('leitor@email.com');
    const fiction = await createFiction(author.id);

    await service.create(fiction.id, validReview, reader.id);

    await expect(
      service.create(fiction.id, { ...validReview, rating: 3 }, reader.id),
    ).rejects.toThrow(ConflictException);

    // Deve haver apenas 1 review no banco
    const count = await prisma.review.count({
      where: { fictionId: fiction.id, authorId: reader.id },
    });
    expect(count).toBe(1);
  });

  it('deve lançar NotFoundException para ficção inexistente', async () => {
    const reader = await createUser();

    await expect(service.create(99999, validReview, reader.id)).rejects.toThrow(
      NotFoundException,
    );
  });
});

describe('ReviewsService.findAll (DB)', () => {
  it('deve retornar avaliações paginadas com total correto', async () => {
    const author = await createUser('autor@email.com');
    const fiction = await createFiction(author.id);

    // Create 3 different readers and their reviews
    for (let i = 0; i < 3; i++) {
      const reader = await createUser(`leitor${i}@email.com`);
      await prisma.review.create({
        data: { ...validReview, fictionId: fiction.id, authorId: reader.id },
      });
    }

    const result = await service.findAll(fiction.id, 1, 2);

    expect(result.total).toBe(3);
    expect(result.data).toHaveLength(2);
    expect(result.page).toBe(1);
  });
});

describe('ReviewsService.update (DB)', () => {
  it('deve atualizar avaliação no banco', async () => {
    const author = await createUser('autor@email.com');
    const reader = await createUser('leitor@email.com');
    const fiction = await createFiction(author.id);

    const review = await prisma.review.create({
      data: { ...validReview, fictionId: fiction.id, authorId: reader.id },
    });

    const updated = await service.update(
      fiction.id,
      review.id,
      { comment: 'Revisado!' },
      reader.id,
    );

    expect(updated.comment).toBe('Revisado!');

    const dbReview = await prisma.review.findUnique({
      where: { id: review.id },
    });
    expect(dbReview!.comment).toBe('Revisado!');
  });

  it('deve lançar ForbiddenException para usuário não-autor da review', async () => {
    const author = await createUser('autor@email.com');
    const reader = await createUser('leitor@email.com');
    const intruder = await createUser('intruso@email.com');
    const fiction = await createFiction(author.id);

    const review = await prisma.review.create({
      data: { ...validReview, fictionId: fiction.id, authorId: reader.id },
    });

    await expect(
      service.update(
        fiction.id,
        review.id,
        { comment: 'Alterado' },
        intruder.id,
      ),
    ).rejects.toThrow(ForbiddenException);
  });
});

describe('ReviewsService.remove (DB)', () => {
  it('deve remover avaliação do banco', async () => {
    const author = await createUser('autor@email.com');
    const reader = await createUser('leitor@email.com');
    const fiction = await createFiction(author.id);

    const review = await prisma.review.create({
      data: { ...validReview, fictionId: fiction.id, authorId: reader.id },
    });

    await service.remove(fiction.id, review.id, reader.id);

    const dbReview = await prisma.review.findUnique({
      where: { id: review.id },
    });
    expect(dbReview).toBeNull();
  });

  it('deve lançar ForbiddenException para usuário não-autor', async () => {
    const author = await createUser('autor@email.com');
    const reader = await createUser('leitor@email.com');
    const intruder = await createUser('intruso@email.com');
    const fiction = await createFiction(author.id);

    const review = await prisma.review.create({
      data: { ...validReview, fictionId: fiction.id, authorId: reader.id },
    });

    await expect(
      service.remove(fiction.id, review.id, intruder.id),
    ).rejects.toThrow(ForbiddenException);
  });
});
