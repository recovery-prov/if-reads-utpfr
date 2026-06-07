/** biome-ignore-all lint/style/useImportType: NestJS needs these files to be imported as packages for Dependency Injection*/
import { ValidationPipe } from '@nestjs/common';
import fastifyCookie from '@fastify/cookie';
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

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

const mockAuthService = {
  register: vi.fn(),
  login: vi.fn(),
};

const mockJwtAuthGuard = { canActivate: vi.fn().mockReturnValue(true) };

describe('AuthController (integration)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockJwtAuthGuard)
      .compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    );

    await app.register(fastifyCookie);
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(() => app.close());
  beforeEach(() => vi.clearAllMocks());

  describe('POST /auth/register', () => {
    it('201 - deve registrar, definir cookie e retornar mensagem', async () => {
      mockAuthService.register.mockResolvedValue({
        access_token: 'token_jwt',
        user: { id: 1, name: 'Beatriz', email: 'beatriz@email.com' },
      });

      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          name: 'Beatriz',
          email: 'beatriz@email.com',
          password: 'senha123',
        },
      });

      expect(response.statusCode).toBe(201);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'Registro realizado com sucesso',
        user: { id: 1, name: 'Beatriz', email: 'beatriz@email.com' },
      });
      const cookies = response.cookies as Array<{
        name: string;
        value: string;
      }>;
      expect(cookies.find((c) => c.name === 'access_token')?.value).toBe(
        'token_jwt',
      );
      expect(mockAuthService.register).toHaveBeenCalledOnce();
    });

    it('400 - deve rejeitar quando campos obrigatórios estão ausentes', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: { email: 'beatriz@email.com' },
      });

      expect(response.statusCode).toBe(400);
      expect(mockAuthService.register).not.toHaveBeenCalled();
    });

    it('400 - deve rejeitar e-mail inválido', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: {
          name: 'Beatriz',
          email: 'nao-e-email',
          password: 'senha123',
        },
      });

      expect(response.statusCode).toBe(400);
    });

    it('400 - deve rejeitar senha com menos de 6 caracteres', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/register',
        payload: { name: 'Beatriz', email: 'b@b.com', password: '123' },
      });

      expect(response.statusCode).toBe(400);
    });
  });

  describe('POST /auth/login', () => {
    it('200 - deve autenticar e definir cookie de sessão', async () => {
      mockAuthService.login.mockResolvedValue({ access_token: 'token_jwt' });

      const response = await app.inject({
        method: 'POST',
        url: '/auth/login',
        payload: { email: 'beatriz@email.com', password: 'senha123' },
      });

      expect(response.statusCode).toBe(200);
      expect(JSON.parse(response.body)).toMatchObject({
        message: 'Login realizado com sucesso',
      });
      const cookies = response.cookies as Array<{
        name: string;
        value: string;
      }>;
      expect(cookies.find((c) => c.name === 'access_token')?.value).toBe(
        'token_jwt',
      );
    });

    it('400 - deve rejeitar payload sem e-mail', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/login',
        payload: { password: 'senha123' },
      });

      expect(response.statusCode).toBe(400);
    });

    it('400 - deve rejeitar payload sem senha', async () => {
      const response = await app.inject({
        method: 'POST',
        url: '/auth/login',
        payload: { email: 'beatriz@email.com' },
      });

      expect(response.statusCode).toBe(400);
    });
  });
});
