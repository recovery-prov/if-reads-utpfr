import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  vi,
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
} from 'vitest';
import * as bcrypt from 'bcryptjs';

import { AuthService } from '../../../src/auth/auth.service.js';
import { PrismaService } from '../../../src/prisma/prisma.service.js';
import { cleanDb } from '../../helpers/clean-db.js';

const mockJwtService = {
  signAsync: vi.fn().mockResolvedValue('test-access-token'),
};

let service: AuthService;
let prisma: PrismaService;
let moduleRef: TestingModule;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    providers: [
      PrismaService,
      AuthService,
      { provide: JwtService, useValue: mockJwtService },
    ],
  }).compile();

  await moduleRef.init();
  service = moduleRef.get(AuthService);
  prisma = moduleRef.get(PrismaService);
});

afterEach(async () => {
  await cleanDb(prisma);
  vi.clearAllMocks();
});

afterAll(() => moduleRef.close());

describe('AuthService.register (DB)', () => {
  it('deve persistir o usuário no banco com senha hasheada', async () => {
    await service.register({
      name: 'Beatriz',
      email: 'beatriz@email.com',
      password: 'senha123',
    });

    const user = await prisma.user.findUnique({
      where: { email: 'beatriz@email.com' },
    });

    expect(user).not.toBeNull();
    expect(user!.name).toBe('Beatriz');
    expect(user!.password).not.toBe('senha123');
    expect(await bcrypt.compare('senha123', user!.password)).toBe(true);
  });

  it('deve retornar access_token ao registrar', async () => {
    const result = await service.register({
      name: 'Alice',
      email: 'alice@email.com',
      password: 'senha123',
    });

    expect(result.access_token).toBe('test-access-token');
    expect(result.user).toMatchObject({
      name: 'Alice',
      email: 'alice@email.com',
    });
  });

  it('deve lançar ConflictException para e-mail duplicado', async () => {
    await prisma.user.create({
      data: { name: 'Beatriz', email: 'dup@email.com', password: 'hashed' },
    });

    await expect(
      service.register({
        name: 'Outro',
        email: 'dup@email.com',
        password: 'outrasenha',
      }),
    ).rejects.toThrow(ConflictException);

    // Deve haver exatamente 1 registro com esse e-mail
    const count = await prisma.user.count({
      where: { email: 'dup@email.com' },
    });
    expect(count).toBe(1);
  });
});

// ──────────────────────────────────────────────
// login
// ──────────────────────────────────────────────
describe('AuthService.login (DB)', () => {
  it('deve autenticar com credenciais corretas', async () => {
    await service.register({
      name: 'Beatriz',
      email: 'beatriz@email.com',
      password: 'senha123',
    });

    mockJwtService.signAsync.mockResolvedValue('login-token');

    const result = await service.login({
      email: 'beatriz@email.com',
      password: 'senha123',
    });

    expect(result.access_token).toBe('login-token');
  });

  it('deve lançar UnauthorizedException para senha incorreta', async () => {
    await service.register({
      name: 'Beatriz',
      email: 'beatriz@email.com',
      password: 'senha123',
    });

    await expect(
      service.login({ email: 'beatriz@email.com', password: 'errada' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve lançar UnauthorizedException para e-mail inexistente', async () => {
    await expect(
      service.login({
        email: 'naoexiste@email.com',
        password: 'qualquer',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
