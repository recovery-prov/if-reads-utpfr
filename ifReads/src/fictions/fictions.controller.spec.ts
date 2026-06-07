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

import { FictionsController } from './fictions.controller.js';
import { FictionsService } from './fictions.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { JwtPayload } from '../auth/jwt-payload.interface.js';

const mockFictionsService = {
  create: vi.fn(),
  findAll: vi.fn(),
  findOne: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
};

const MOCK_USER = { sub: 10, email: 'beatriz@email.com' };

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

const baseFiction = {
  id: 1,
  title: 'Dom Casmurro',
  link: 'https://link.com',
  authorId: 10,
};

describe('FictionsController (integration)', () => {
  let app: NestFastifyApplication;
  let noAuthApp: NestFastifyApplication;

  async function buildApp(guard: object) {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FictionsController],
      providers: [{ provide: FictionsService, useValue: mockFictionsService }],
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

  describe('GET /fiction', () => {
    it('200 - deve retornar lista paginada', async () => {
      mockFictionsService.findAll.mockResolvedValue({
        data: [baseFiction],
        total: 1,
        page: 1,
        limit: 10,
      });

      const response = await app.inject({ method: 'GET', url: '/fiction' });

      expect(response.statusCode).toBe(200);
      expect(mockFictionsService.findAll).toHaveBeenCalledWith(1, 10);
    });

    it('200 - deve repassar parâmetros de paginação', async () => {
      mockFictionsService.findAll.mockResolvedValue({
        data: [],
        total: 0,
        page: 2,
        limit: 5,
      });

      await app.inject({ method: 'GET', url: '/fiction?page=2&limit=5' });

      expect(mockFictionsService.findAll).toHaveBeenCalledWith(2, 5);
    });
  });

  describe('GET /fiction/:id', () => {
    it('200 - deve retornar ficção por id', async () => {
      mockFictionsService.findOne.mockResolvedValue(baseFiction);

      const response = await app.inject({
        method: 'GET',
        url: '/fiction/1',
      });

      expect(response.statusCode).toBe(200);
      expect(mockFictionsService.findOne).toHaveBeenCalledWith(1);
    });

    it('400 - deve rejeitar id não numérico', async () => {
      const response = await app.inject({
        method: 'GET',
        url: '/fiction/abc',
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('POST /fiction', () => {
    it('201 - deve criar ficção autenticado', async () => {
      mockFictionsService.create.mockResolvedValue(baseFiction);

      const response = await app.inject({
        method: 'POST',
        url: '/fiction',
        payload: { title: 'Dom Casmurro', link: 'https://link.com' },
      });

      expect(response.statusCode).toBe(201);
      expect(mockFictionsService.create).toHaveBeenCalledWith(
        expect.objectContaining({ title: 'Dom Casmurro' }),
        MOCK_USER.sub,
      );
    });

    it('400 - deve rejeitar payload sem título', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/fiction',
        payload: { link: 'https://link.com' },
      });

      expect(response.statusCode).toBe(400);
    });

    it('401 - deve rejeitar sem token', async () => {
      const response = await noAuthApp.inject({
        method: 'POST',
        url: '/fiction',
        payload: { title: 'Teste', link: 'https://link.com' },
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('PATCH /fiction/:id', () => {
    it('200 - deve atualizar ficção', async () => {
      mockFictionsService.update.mockResolvedValue({
        ...baseFiction,
        title: 'Atualizado',
      });

      const response = await app.inject({
        method: 'PATCH',
        url: '/fiction/1',
        payload: { title: 'Atualizado' },
      });

      expect(response.statusCode).toBe(200);
      expect(mockFictionsService.update).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ title: 'Atualizado' }),
        MOCK_USER.sub,
      );
    });

    it('401 - deve rejeitar sem token', async () => {
      const response = await noAuthApp.inject({
        method: 'PATCH',
        url: '/fiction/1',
        payload: { title: 'Tentativa' },
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('DELETE /fiction/:id', () => {
    it('200 - deve excluir ficção', async () => {
      mockFictionsService.remove.mockResolvedValue(baseFiction);

      const response = await app.inject({
        method: 'DELETE',
        url: '/fiction/1',
      });

      expect(response.statusCode).toBe(200);
      expect(mockFictionsService.remove).toHaveBeenCalledWith(1, MOCK_USER.sub);
    });

    it('401 - deve rejeitar sem token', async () => {
      const response = await noAuthApp.inject({
        method: 'DELETE',
        url: '/fiction/1',
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
