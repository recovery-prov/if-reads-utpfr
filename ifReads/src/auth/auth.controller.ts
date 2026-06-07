import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import fastify from 'fastify';
import { AuthService } from './auth.service.js';
import { CurrentUser } from './current-user.decorator.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import * as jwtPayloadInterface from './jwt-payload.interface.js';

const COOKIE_NAME = 'access_token';
const cookieOptions = {
  httpOnly: true,
  sameSite: 'strict' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Registrar novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post('register')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) reply: fastify.FastifyReply,
  ) {
    const result = await this.authService.register(dto);
    reply.setCookie(COOKIE_NAME, result.access_token, cookieOptions);
    return { message: 'Registro realizado com sucesso', user: result.user };
  }

  @ApiOperation({ summary: 'Autenticar usuário' })
  @ApiResponse({ status: 200, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) reply: fastify.FastifyReply,
  ) {
    const result = await this.authService.login(dto);
    reply.setCookie(COOKIE_NAME, result.access_token, cookieOptions);
    return { message: 'Login realizado com sucesso' };
  }

  @ApiOperation({ summary: 'Encerrar sessão' })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) reply: fastify.FastifyReply) {
    reply.clearCookie(COOKIE_NAME, { path: '/' });
    return { message: 'Logout realizado com sucesso' };
  }

  @ApiOperation({ summary: 'Retornar usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Dados do usuário autenticado' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiBearerAuth()
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: jwtPayloadInterface.JwtPayload) {
    return { user };
  }
}
