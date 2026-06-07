import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { FictionsService } from './fictions.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

const mockPrisma = {
  fiction: {
    create: vi.fn(),
    findMany: vi.fn(),
    count: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  review: {
    groupBy: vi.fn().mockResolvedValue([]),
    aggregate: vi.fn().mockResolvedValue({ _avg: { rating: null } }),
  },
};

const baseFiction = {
  id: 1,
  title: 'Dom Casmurro',
  description: 'Um clássico',
  genre: 'Romance',
  publishedAt: 1899,
  status: 'published',
  authorId: 10,
  averageRating: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('FictionsService', () => {
  let service: FictionsService;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FictionsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<FictionsService>(FictionsService);
  });

  describe('create', () => {
    it('deve criar uma ficção e retorná-la', async () => {
      mockPrisma.fiction.create.mockResolvedValue(baseFiction);

      const result = await service.create(
        { title: 'Dom Casmurro', link: 'https://example.com' },
        10,
      );

      expect(result).toEqual(baseFiction);
      expect(mockPrisma.fiction.create).toHaveBeenCalledOnce();
    });
  });

  describe('findAll', () => {
    it('deve retornar lista paginada de ficções', async () => {
      mockPrisma.fiction.findMany.mockResolvedValue([baseFiction]);
      mockPrisma.fiction.count.mockResolvedValue(1);

      const result = await service.findAll(1, 10);

      expect(result).toMatchObject({
        data: [baseFiction],
        total: 1,
        page: 1,
        limit: 10,
      });
    });

    it('deve calcular o skip corretamente para página 2', async () => {
      mockPrisma.fiction.findMany.mockResolvedValue([]);
      mockPrisma.fiction.count.mockResolvedValue(0);

      await service.findAll(2, 5);

      expect(mockPrisma.fiction.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ skip: 5, take: 5 }),
      );
    });
  });

  describe('findOne', () => {
    it('deve retornar uma ficção pelo id', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction);

      const result = await service.findOne(1);

      expect(result).toEqual(baseFiction);
    });

    it('deve lançar NotFoundException se a ficção não existir', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve atualizar a ficção quando o usuário é o autor', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction);
      const updated = {
        ...baseFiction,
        title: 'Dom Casmurro – Edição Revisada',
      };
      mockPrisma.fiction.update.mockResolvedValue(updated);

      const result = await service.update(
        1,
        { title: 'Dom Casmurro – Edição Revisada' },
        10,
      );

      expect(result.title).toBe('Dom Casmurro – Edição Revisada');
    });

    it('deve lançar NotFoundException se a ficção não existir', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(null);

      await expect(service.update(999, {}, 10)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar ForbiddenException se o usuário não for o autor', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction); // authorId: 10

      await expect(service.update(1, {}, 99)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('remove', () => {
    it('deve excluir a ficção quando o usuário é o autor', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction);
      mockPrisma.fiction.delete.mockResolvedValue(baseFiction);

      const result = await service.remove(1, 10);

      expect(result).toEqual(baseFiction);
      expect(mockPrisma.fiction.delete).toHaveBeenCalledOnce();
    });

    it('deve lançar NotFoundException se a ficção não existir', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(null);

      await expect(service.remove(999, 10)).rejects.toThrow(NotFoundException);
    });

    it('deve lançar ForbiddenException se o usuário não for o autor', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction); // authorId: 10

      await expect(service.remove(1, 99)).rejects.toThrow(ForbiddenException);
    });
  });
});
