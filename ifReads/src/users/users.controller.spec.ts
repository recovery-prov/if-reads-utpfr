import { Test, TestingModule } from '@nestjs/testing';
import {
  NestFastifyApplication,
  FastifyAdapter,
} from '@nestjs/platform-fastify';
import {
  ValidationPipe,
  UnauthorizedException,
  ExecutionContext,
} from '@nestjs/common';
import {
  vi,
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from 'vitest';

import { UsersController } from './users.controller.js';
import { UsersService } from './users.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { JwtPayload } from '../auth/jwt-payload.interface.js';

const mockUsersService = {
  create: vi.fn(),
  findMe: vi.fn(),
  updateMe: vi.fn(),
};

const MOCK_USER = { sub: 1, email: 'beatriz@email.com' };

const passGuard = {
  canActivate: (ctx: ExecutionContext) => {
    ctx.switchToHttp().getRequest<{ user: JwtPayload }>().user = MOCK_USER;
    return true;
  },
};

const denyGuard = {
  canActivate: () => {
    throw new UnauthorizedException();
  },
};

describe('UsersController (integration)', () => {
  let app: NestFastifyApplication;
  let noAuthApp: NestFastifyApplication;

  async function buildApp(guard: object) {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(guard)
      .compile();

    const instance = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    instance.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );
    await instance.init();
    await instance.getHttpAdapter().getInstance().ready();
    return instance;
  }

  beforeAll(async () => {
    app = await buildApp(passGuard);
    noAuthApp = await buildApp(denyGuard);
  });

  afterAll(() => Promise.all([app.close(), noAuthApp.close()]));
  beforeEach(() => vi.clearAllMocks());

  describe('POST /users', () => {
    it('201 - deve criar usuário', async () => {
      mockUsersService.create.mockResolvedValue({
        id: 1,
        name: 'Beatriz',
        email: 'beatriz@email.com',
        createdAt: new Date(),
      });

      const response = await app.inject({
        method: 'POST',
        url: '/users',
        payload: {
          name: 'Beatriz',
          email: 'beatriz@email.com',
          password: 'senha123',
        },
      });

      expect(response.statusCode).toBe(201);
      expect(mockUsersService.create).toHaveBeenCalledOnce();
    });

    it('400 - deve rejeitar e-mail inválido', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/users',
        payload: { name: 'B', email: 'invalido', password: 'senha123' },
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('GET /users/me', () => {
    it('200 - deve retornar dados do usuário autenticado', async () => {
      mockUsersService.findMe.mockResolvedValue({
        id: 1,
        name: 'Beatriz',
        email: 'beatriz@email.com',
      });

      const response = await app.inject({ method: 'GET', url: '/users/me' });

      expect(response.statusCode).toBe(200);
      expect(mockUsersService.findMe).toHaveBeenCalledWith(MOCK_USER.sub);
    });

    it('401 - deve rejeitar sem token', async () => {
      const response = await noAuthApp.inject({
        method: 'GET',
        url: '/users/me',
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('PATCH /users/me', () => {
    it('200 - deve atualizar dados do usuário', async () => {
      mockUsersService.updateMe.mockResolvedValue({
        id: 1,
        name: 'Novo Nome',
        email: 'beatriz@email.com',
      });

      const response = await app.inject({
        method: 'PATCH',
        url: '/users/me',
        payload: { name: 'Novo Nome' },
      });

      expect(response.statusCode).toBe(200);
      expect(mockUsersService.updateMe).toHaveBeenCalledWith(
        MOCK_USER.sub,
        expect.objectContaining({ name: 'Novo Nome' }),
      );
    });

    it('401 - deve rejeitar sem token', async () => {
      const response = await noAuthApp.inject({
        method: 'PATCH',
        url: '/users/me',
        payload: { name: 'Tentativa' },
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
