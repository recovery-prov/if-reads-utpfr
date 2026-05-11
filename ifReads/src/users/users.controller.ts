import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-users.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { RolesGuard } from '../auth/roles.guard.js';
import { Roles } from '../auth/roles.decorator.js';
import { Role } from '../auth/role.enum.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { UsersService } from './users.service.js';
import { TransformInterceptor } from '../transform/transform.interceptor.js';

@ApiTags('Users')
@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Criar usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @ApiOperation({ summary: 'Obter perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil do usuário' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: jwtPayloadInterface.JwtPayload) {
    return this.usersService.findMe(user.sub);
  }

  @ApiOperation({ summary: 'Atualizar perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateMe(user.sub, dto);
  }

  @ApiOperation({ summary: 'Alterar senha do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Senha alterada com sucesso' })
  @ApiResponse({
    status: 401,
    description: 'Senha atual incorreta ou não autenticado',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  @HttpCode(HttpStatus.OK)
  changePassword(
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(user.sub, dto);
  }

  @ApiOperation({ summary: 'Listar ficções favoritadas' })
  @ApiResponse({ status: 200, description: 'Lista de favoritos' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me/favorites')
  getFavorites(@CurrentUser() user: jwtPayloadInterface.JwtPayload) {
    return this.usersService.getFavorites(user.sub);
  }

  @ApiOperation({ summary: 'Favoritar ficção' })
  @ApiResponse({ status: 201, description: 'Ficção adicionada aos favoritos' })
  @ApiResponse({ status: 404, description: 'Ficção não encontrada' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('me/favorites/:fictionId')
  @HttpCode(HttpStatus.CREATED)
  addFavorite(
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
    @Param('fictionId', ParseIntPipe) fictionId: number,
  ) {
    return this.usersService.addFavorite(user.sub, fictionId);
  }

  @ApiOperation({ summary: 'Remover ficção dos favoritos' })
  @ApiResponse({ status: 200, description: 'Removido dos favoritos' })
  @ApiResponse({ status: 404, description: 'Favorito não encontrado' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('me/favorites/:fictionId')
  @HttpCode(HttpStatus.OK)
  removeFavorite(
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
    @Param('fictionId', ParseIntPipe) fictionId: number,
  ) {
    return this.usersService.removeFavorite(user.sub, fictionId);
  }

  @ApiOperation({ summary: 'Listar avaliações do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de avaliações' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me/reviews')
  getMyReviews(@CurrentUser() user: jwtPayloadInterface.JwtPayload) {
    return this.usersService.getMyReviews(user.sub);
  }

  @ApiOperation({ summary: '[Admin] Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: '[Admin] Buscar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @ApiOperation({ summary: '[Admin] Atualizar dados de um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  adminUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.adminUpdate(id, dto);
  }

  @ApiOperation({ summary: '[Admin] Remover usuário' })
  @ApiResponse({ status: 200, description: 'Usuário removido' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  adminDelete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.adminDelete(id);
  }
}
