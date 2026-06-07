import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { AuthService } from './auth.service.js';

vi.mock('bcryptjs', () => ({
  hash: vi.fn(),
  compare: vi.fn(),
}));

const mockPrisma = {
  user: {
    findUnique: vi.fn(),
    create: vi.fn(),
  },
};

const mockJwtService = {
  signAsync: vi.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('register', () => {
    it('deve registrar um novo usuário e retornar access_token', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      vi.mocked(bcrypt.hash).mockResolvedValue('hashed_password' as never);
      mockPrisma.user.create.mockResolvedValue({
        id: 1,
        name: 'Beatriz',
        email: 'beatriz@email.com',
      });
      mockJwtService.signAsync.mockResolvedValue('token_jwt');

      const result = await service.register({
        name: 'Beatriz',
        email: 'beatriz@email.com',
        password: 'senha123',
      });

      expect(result.access_token).toBe('token_jwt');
      expect(result.user).toMatchObject({
        id: 1,
        name: 'Beatriz',
        email: 'beatriz@email.com',
      });
      expect(mockPrisma.user.create).toHaveBeenCalledOnce();
    });

    it('deve lançar ConflictException se o e-mail já estiver cadastrado', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'beatriz@email.com',
      });

      await expect(
        service.register({
          name: 'Beatriz',
          email: 'beatriz@email.com',
          password: 'senha123',
        }),
      ).rejects.toThrow(ConflictException);

      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('deve fazer login e retornar access_token', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'beatriz@email.com',
        password: 'hashed_password',
      });
      vi.mocked(bcrypt.compare).mockResolvedValue(true as never);
      mockJwtService.signAsync.mockResolvedValue('token_jwt');

      const result = await service.login({
        email: 'beatriz@email.com',
        password: 'senha123',
      });

      expect(result.access_token).toBe('token_jwt');
    });

    it('deve lançar UnauthorizedException se o usuário não existir', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(
        service.login({ email: 'naoexiste@email.com', password: 'senha123' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('deve lançar UnauthorizedException se a senha estiver errada', async () => {
      mockPrisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'beatriz@email.com',
        password: 'hashed_password',
      });
      vi.mocked(bcrypt.compare).mockResolvedValue(false as never);

      await expect(
        service.login({ email: 'beatriz@email.com', password: 'senha_errada' }),
      ).rejects.toThrow(UnauthorizedException);
    });
  });
});
