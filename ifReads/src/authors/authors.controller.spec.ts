import {
  ExecutionContext,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Test, TestingModule } from '@nestjs/testing';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { JwtPayload } from '../auth/jwt-payload.interface.js';
import { AuthorsController } from './authors.controller.js';
import { AuthorsService } from './authors.service.js';

const mockAuthorsService = {
  create: vi.fn(),
  findAll: vi.fn(),
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

describe('AuthorsController (integration)', () => {
  let app: NestFastifyApplication;
  let noAuthApp: NestFastifyApplication;

  async function buildApp(guard: object) {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthorsController],
      providers: [{ provide: AuthorsService, useValue: mockAuthorsService }],
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

  describe('GET /fictions/:fictionId/authors', () => {
    it('200 - deve listar escritores da ficção', async () => {
      mockAuthorsService.findAll.mockResolvedValue([
        { id: 1, name: 'Machado de Assis', role: 'main_author' },
      ]);

      const response = await app.inject({
        method: 'GET',
        url: '/fictions/1/authors',
      });

      expect(response.statusCode).toBe(200);
      expect(mockAuthorsService.findAll).toHaveBeenCalledWith(1);
    });
  });

  describe('POST /fictions/:fictionId/authors', () => {
    it('201 - deve vincular escritor autenticado', async () => {
      mockAuthorsService.create.mockResolvedValue({
        id: 1,
        name: 'Machado de Assis',
        role: 'main_author',
        fictionId: 1,
      });

      const response = await app.inject({
        method: 'POST',
        url: '/fictions/1/authors',
        payload: { name: 'Machado de Assis', role: 'main_author' },
      });

      expect(response.statusCode).toBe(201);
      expect(mockAuthorsService.create).toHaveBeenCalledWith(
        1,
        expect.objectContaining({ name: 'Machado de Assis' }),
        MOCK_USER.sub,
      );
    });

    it('400 - deve rejeitar role inválida', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/fictions/1/authors',
        payload: { name: 'Alguém', role: 'invalido' },
      });

      expect(response.statusCode).toBe(400);
    });

    it('401 - deve rejeitar sem token', async () => {
      const response = await noAuthApp.inject({
        method: 'POST',
        url: '/fictions/1/authors',
        payload: { name: 'Alguém', role: 'coauthor' },
      });

      expect(response.statusCode).toBe(401);
    });
  });

  describe('DELETE /fictions/:fictionId/authors/:id', () => {
    it('200 - deve remover escritor', async () => {
      mockAuthorsService.remove.mockResolvedValue({
        id: 1,
        name: 'Machado de Assis',
      });

      const response = await app.inject({
        method: 'DELETE',
        url: '/fictions/1/authors/1',
      });

      expect(response.statusCode).toBe(200);
      expect(mockAuthorsService.remove).toHaveBeenCalledWith(
        1,
        1,
        MOCK_USER.sub,
      );
    });

    it('401 - deve rejeitar sem token', async () => {
      const response = await noAuthApp.inject({
        method: 'DELETE',
        url: '/fictions/1/authors/1',
      });

      expect(response.statusCode).toBe(401);
    });
  });
});
