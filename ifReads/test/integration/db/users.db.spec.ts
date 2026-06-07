import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeAll, afterAll, afterEach } from 'vitest';

import { UsersService } from '../../../src/users/users.service.js';
import { PrismaService } from '../../../src/prisma/prisma.service.js';
import { cleanDb } from '../../helpers/clean-db.js';

let service: UsersService;
let prisma: PrismaService;
let moduleRef: TestingModule;

beforeAll(async () => {
  moduleRef = await Test.createTestingModule({
    providers: [PrismaService, UsersService],
  }).compile();

  await moduleRef.init();
  service = moduleRef.get(UsersService);
  prisma = moduleRef.get(PrismaService);
});

afterEach(async () => {
  await cleanDb(prisma);
});

afterAll(() => moduleRef.close());

describe('UsersService.create (DB)', () => {
  it('deve persistir usuário e retornar sem a senha', async () => {
    const result = await service.create({
      name: 'Beatriz',
      email: 'beatriz@email.com',
      password: 'senha123',
    });

    expect(result).not.toHaveProperty('password');
    expect(result.email).toBe('beatriz@email.com');

    const dbUser = await prisma.user.findUnique({
      where: { email: 'beatriz@email.com' },
    });
    expect(dbUser).not.toBeNull();
  });

  it('deve lançar ConflictException em e-mail duplicado', async () => {
    // Insere diretamente via Prisma para garantir que o registro está
    // commitado antes de chamar o service (evita race com bcrypt.hash).
    await prisma.user.create({
      data: { name: 'Beatriz', email: 'beatriz@email.com', password: 'hashed' },
    });

    await expect(
      service.create({
        name: 'Outra',
        email: 'beatriz@email.com',
        password: 'outra',
      }),
    ).rejects.toThrow(ConflictException);
  });
});

describe('UsersService.findMe (DB)', () => {
  it('deve retornar usuário existente pelo id', async () => {
    const created = await service.create({
      name: 'Alice',
      email: 'alice@email.com',
      password: 'senha123',
    });

    const found = await service.findMe(created.id);

    expect(found.id).toBe(created.id);
    expect(found.email).toBe('alice@email.com');
  });

  it('deve lançar NotFoundException para id inexistente', async () => {
    await expect(service.findMe(99999)).rejects.toThrow(NotFoundException);
  });
});

describe('UsersService.updateMe (DB)', () => {
  it('deve atualizar nome e persistir no banco', async () => {
    const created = await service.create({
      name: 'Alice',
      email: 'alice@email.com',
      password: 'senha123',
    });

    const updated = await service.updateMe(created.id, {
      name: 'Alice Atualizada',
    });

    expect(updated.name).toBe('Alice Atualizada');

    const dbUser = await prisma.user.findUnique({
      where: { id: created.id },
    });
    expect(dbUser!.name).toBe('Alice Atualizada');
  });

  it('deve lançar NotFoundException para id inexistente', async () => {
    await expect(service.updateMe(99999, { name: 'Ninguém' })).rejects.toThrow(
      NotFoundException,
    );
  });
});
