import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { ReviewsService } from './reviews.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

const mockPrisma = {
  fiction: {
    findUnique: vi.fn(),
  },
  review: {
    findUnique: vi.fn(),
    findFirst: vi.fn(),
    findMany: vi.fn(),
    count: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
};

const baseFiction = { id: 1, title: 'Dom Casmurro', authorId: 10 };

const baseReview = {
  id: 7,
  fictionId: 1,
  authorId: 20,
  rating: 5,
  narrative: 5,
  comment: 'Excelente!',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('ReviewsService', () => {
  let service: ReviewsService;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
  });

  describe('create', () => {
    it('deve criar uma avaliação com sucesso', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction);
      mockPrisma.review.findUnique.mockResolvedValue(null);
      mockPrisma.review.create.mockResolvedValue(baseReview);

      const result = await service.create(
        1,
        {
          rating: 5,
          narrative: 5,
          comment: 'Excelente!',
          interactivity: 5,
          originality: 5,
        },
        20,
      );

      expect(result).toEqual(baseReview);
      expect(mockPrisma.review.create).toHaveBeenCalledOnce();
    });

    it('deve lançar NotFoundException se a ficção não existir', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(null);

      await expect(
        service.create(
          999,
          {
            rating: 5,
            narrative: 5,
            interactivity: 5,
            originality: 5,
          },
          20,
        ),
      ).rejects.toThrow(NotFoundException);
    });

    it('deve lançar ConflictException se o usuário já avaliou a ficção', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction);
      mockPrisma.review.findUnique.mockResolvedValue(baseReview);

      await expect(
        service.create(
          1,
          {
            rating: 5,
            narrative: 5,
            interactivity: 5,
            originality: 5,
          },
          20,
        ),
      ).rejects.toThrow(ConflictException);
    });
  });

  // ──────────────────────────────────────────────
  // findAll
  // ──────────────────────────────────────────────
  describe('findAll', () => {
    it('deve retornar lista paginada de avaliações', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction);
      mockPrisma.review.findMany.mockResolvedValue([baseReview]);
      mockPrisma.review.count.mockResolvedValue(1);

      const result = await service.findAll(1, 1, 10);

      expect(result).toMatchObject({
        data: [baseReview],
        total: 1,
        page: 1,
        limit: 10,
      });
    });

    it('deve lançar NotFoundException se a ficção não existir', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(null);

      await expect(service.findAll(999)).rejects.toThrow(NotFoundException);
    });
  });

  // ──────────────────────────────────────────────
  // update
  // ──────────────────────────────────────────────
  describe('update', () => {
    it('deve atualizar a avaliação quando o usuário é o autor', async () => {
      mockPrisma.review.findFirst.mockResolvedValue(baseReview); // authorId: 20
      const updated = { ...baseReview, comment: 'Revisado!' };
      mockPrisma.review.update.mockResolvedValue(updated);

      const result = await service.update(1, 7, { comment: 'Revisado!' }, 20);

      expect(result.comment).toBe('Revisado!');
    });

    it('deve lançar NotFoundException se a avaliação não existir', async () => {
      mockPrisma.review.findFirst.mockResolvedValue(null);

      await expect(service.update(1, 999, {}, 20)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar ForbiddenException se o usuário não for o autor da avaliação', async () => {
      mockPrisma.review.findFirst.mockResolvedValue(baseReview); // authorId: 20

      await expect(service.update(1, 7, {}, 99)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  // ──────────────────────────────────────────────
  // remove
  // ──────────────────────────────────────────────
  describe('remove', () => {
    it('deve excluir a avaliação quando o usuário é o autor', async () => {
      mockPrisma.review.findFirst.mockResolvedValue(baseReview); // authorId: 20
      mockPrisma.review.delete.mockResolvedValue(baseReview);

      const result = await service.remove(1, 7, 20);

      expect(result).toEqual(baseReview);
      expect(mockPrisma.review.delete).toHaveBeenCalledOnce();
    });

    it('deve lançar NotFoundException se a avaliação não existir', async () => {
      mockPrisma.review.findFirst.mockResolvedValue(null);

      await expect(service.remove(1, 999, 20)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar ForbiddenException se o usuário não for o autor da avaliação', async () => {
      mockPrisma.review.findFirst.mockResolvedValue(baseReview); // authorId: 20

      await expect(service.remove(1, 7, 99)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
