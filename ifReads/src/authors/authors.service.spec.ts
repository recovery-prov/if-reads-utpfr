import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { AuthorsService } from './authors.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

const mockPrisma = {
  fiction: {
    findUnique: vi.fn(),
  },
  author: {
    create: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    delete: vi.fn(),
  },
};

const baseFiction = {
  id: 1,
  title: 'Dom Casmurro',
  authorId: 10,
};

const baseAuthor = {
  id: 5,
  name: 'Machado de Assis',
  role: 'main_author',
  fictionId: 1,
};

describe('AuthorsService', () => {
  let service: AuthorsService;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthorsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<AuthorsService>(AuthorsService);
  });

  describe('create', () => {
    it('deve vincular um escritor à ficção', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction);
      mockPrisma.author.create.mockResolvedValue(baseAuthor);

      const result = await service.create(
        1,
        { name: 'Machado de Assis', role: 'main_author' },
        10,
      );

      expect(result).toEqual(baseAuthor);
      expect(mockPrisma.author.create).toHaveBeenCalledOnce();
    });

    it('deve lançar NotFoundException se a ficção não existir', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(null);

      await expect(
        service.create(999, { name: 'Alguém', role: 'coauthor' }, 10),
      ).rejects.toThrow(NotFoundException);
    });

    it('deve lançar ForbiddenException se o usuário não for dono da ficção', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction); // authorId: 10

      await expect(
        service.create(1, { name: 'Alguém', role: 'coauthor' }, 99),
      ).rejects.toThrow(ForbiddenException);
    });
  });

  describe('findAll', () => {
    it('deve retornar os escritores de uma ficção', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction);
      mockPrisma.author.findMany.mockResolvedValue([baseAuthor]);

      const result = await service.findAll(1);

      expect(result).toEqual([baseAuthor]);
    });

    it('deve lançar NotFoundException se a ficção não existir', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(null);

      await expect(service.findAll(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deve remover o escritor quando o usuário é dono da ficção', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction);
      mockPrisma.author.findFirst.mockResolvedValue(baseAuthor);
      mockPrisma.author.delete.mockResolvedValue(baseAuthor);

      const result = await service.remove(1, 5, 10);

      expect(result).toEqual(baseAuthor);
      expect(mockPrisma.author.delete).toHaveBeenCalledOnce();
    });

    it('deve lançar NotFoundException se a ficção não existir', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(null);

      await expect(service.remove(999, 5, 10)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('deve lançar ForbiddenException se o usuário não for dono da ficção', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction); // authorId: 10

      await expect(service.remove(1, 5, 99)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('deve lançar NotFoundException se o escritor não existir na ficção', async () => {
      mockPrisma.fiction.findUnique.mockResolvedValue(baseFiction);
      mockPrisma.author.findFirst.mockResolvedValue(null);

      await expect(service.remove(1, 999, 10)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
