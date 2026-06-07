import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as bcrypt from 'bcryptjs';

import { UsersService } from './users.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

vi.mock('bcryptjs', () => ({
  hash: vi.fn(),
  compare: vi.fn(),
}));

const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('deve criar um usuário e retornar os dados sem a senha', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      vi.mocked(bcrypt.hash).mockResolvedValue('hashed_password' as never);

      const createdUser = {
        id: 1,
        name: 'Beatriz',
        email: 'beatriz@email.com',
        createdAt: new Date(),
      };
      mockPrisma.user.create.mockResolvedValue(createdUser);

      const result = await service.create({
        name: 'Beatriz',
        email: 'beatriz@email.com',
        password: 'senha123',
      });

      expect(result).toEqual(createdUser);
      expect(mockPrisma.user.create).toHaveBeenCalledOnce();
    });

    it('deve lançar ConflictException se o e-mail já estiver cadastrado', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });

      await expect(
        service.create({
          name: 'Beatriz',
          email: 'beatriz@email.com',
          password: 'senha123',
        }),
      ).rejects.toThrow(ConflictException);

      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });
  });

  describe('findMe', () => {
    it('deve retornar os dados do usuário autenticado', async () => {
      const user = {
        id: 1,
        name: 'Beatriz',
        email: 'beatriz@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrisma.user.findUnique.mockResolvedValue(user);

      const result = await service.findMe(1);

      expect(result).toEqual(user);
    });

    it('deve lançar NotFoundException se o usuário não existir', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.findMe(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateMe', () => {
    it('deve atualizar e retornar os dados do usuário', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1 });

      const updatedUser = {
        id: 1,
        name: 'Beatriz Atualizada',
        email: 'beatriz@email.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrisma.user.update.mockResolvedValue(updatedUser);

      const result = await service.updateMe(1, { name: 'Beatriz Atualizada' });

      expect(result).toEqual(updatedUser);
      expect(mockPrisma.user.update).toHaveBeenCalledOnce();
    });

    it('deve lançar NotFoundException se o usuário não existir', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.updateMe(999, { name: 'Qualquer' })).rejects.toThrow(
        NotFoundException,
      );

      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });
  });
});
