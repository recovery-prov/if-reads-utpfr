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

import { ReviewsController } from './reviews.controller.js';
import { ReviewsService } from './reviews.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { JwtPayload } from '../auth/jwt-payload.interface.js';

const mockReviewsService = {
  create: vi.fn(),
  findAll: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
};

const MOCK_USER = { sub: 20, email: 'leitor@email.com' };

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

const validReviewPayload = {
  rating: 5,
  narrative: 4,
  interactivity: 3,
  originality: 5,
  comment: 'Muito bom!',
};

describe('ReviewsController (integration)', () => {
  let app: NestFastifyApplication;
  let noAuthApp: NestFastifyApplication;

  async function buildApp(guard: object) {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewsController],
      providers: [{ provide: ReviewsService, useValue: mockReviewsService }],
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

  describe('GET /fictions/:fictionId/reviews', () => {
    it('200 - deve listar avaliações da ficção', async () => {
      mockReviewsService.findAll.mockResolvedValue({
        data: [],
        total: 0,
        page: 1,
        limit: 10,
      });

      const response = await app.inject({
        method: 'GET',
        url: '/fictions/1/reviews',
      });

      expect(response.statusCode).toBe(200);
      expect(mockReviewsService.findAll).toHaveBeenCalledWith(1, 1, 10);
    });
  });

  describe('POST /fictions/:fictionId/reviews', () => {
    it('201 - deve criar avaliação autenticado', async () => {
      mockReviewsService.create.mockResolvedValue({
        id: 1,
        ...validReviewPayload,
      });

      const response = await app.inject({
        method: 'POST',
        url: '/fictions/1/reviews',
        payload: validReviewPayload,
      });

      expect(response.statusCode).toBe(201);
      expect(mockReviewsService.create).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ rating: 5 }),
        MOCK_USER.sub,
      );
    });

    it('400 - deve rejeitar rating fora do intervalo (1-5)', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/fictions/1/reviews',
        payload: { ...validReviewPayload, rating: 10 },
      });

      expect(response.statusCode).toBe(400);
    });

    it('400 - deve rejeitar payload sem campos obrigatórios', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/fictions/1/reviews',
        payload: { comment: 'Só isso' }, // falta rating, narrative, etc.
      });

      expect(response.statusCode).toBe(400);
    });

    it('401 - deve rejeitar sem token', async () => {
      const response = await noAuthApp.inject({
        method: 'POST',
        url: '/fictions/1/reviews',
        payload: validReviewPayload,
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('PATCH /fictions/:fictionId/reviews/:id', () => {
    it('200 - deve atualizar avaliação', async () => {
      mockReviewsService.update.mockResolvedValue({
        id: 1,
        comment: 'Revisado',
      });

      const response = await app.inject({
        method: 'PATCH',
        url: '/fictions/1/reviews/1',
        payload: { comment: 'Revisado' },
      });

      expect(response.statusCode).toBe(200);
      expect(mockReviewsService.update).toHaveBeenCalledWith(
        1,
        1,
        expect.objectContaining({ comment: 'Revisado' }),
        MOCK_USER.sub,
      );
    });

    it('401 - deve rejeitar sem token', async () => {
      const response = await noAuthApp.inject({
        method: 'PATCH',
        url: '/fictions/1/reviews/1',
        payload: { comment: 'Tentativa' },
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('DELETE /fictions/:fictionId/reviews/:id', () => {
    it('200 - deve excluir avaliação', async () => {
      mockReviewsService.remove.mockResolvedValue({ id: 1 });

      const response = await app.inject({
        method: 'DELETE',
        url: '/fictions/1/reviews/1',
      });

      expect(response.statusCode).toBe(200);
      expect(mockReviewsService.remove).toHaveBeenCalledWith(
        1,
        1,
        MOCK_USER.sub,
      );
    });

    it('401 - deve rejeitar sem token', async () => {
      const response = await noAuthApp.inject({
        method: 'DELETE',
        url: '/fictions/1/reviews/1',
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
