import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateFictionDto } from './dto/create-fiction.dto.js';
import { UpdateFictionDto } from './dto/update-fiction.dto.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { FictionsService } from './fictions.service.js';
import { TransformInterceptor } from '../transform/transform.interceptor.js';

@ApiTags('Fictions')
@Controller('fiction')
@UseInterceptors(TransformInterceptor)
export class FictionsController {
  constructor(private readonly fictionService: FictionsService) {}

  @ApiOperation({ summary: 'Criar ficção' })
  @ApiResponse({ status: 201, description: 'Ficção criada com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreateFictionDto,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.fictionService.create(dto, user.sub);
  }

  @ApiOperation({ summary: 'Listar ficções do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de ficções próprias' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('mine')
  findMine(@CurrentUser() user: jwtPayloadInterface.JwtPayload) {
    return this.fictionService.findMine(user.sub);
  }

  @ApiOperation({ summary: 'Listar todas as ficções (páginado)' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiResponse({ status: 200, description: 'Lista paginada de ficções' })
  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.fictionService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @ApiOperation({ summary: 'Buscar ficção por ID' })
  @ApiResponse({ status: 200, description: 'Ficção encontrada' })
  @ApiResponse({ status: 404, description: 'Ficção não encontrada' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fictionService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar ficção' })
  @ApiResponse({ status: 200, description: 'Ficção atualizada' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 404, description: 'Ficção não encontrada' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFictionDto,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.fictionService.update(id, dto, user.sub);
  }

  @ApiOperation({ summary: 'Remover ficção' })
  @ApiResponse({ status: 200, description: 'Ficção removida' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 404, description: 'Ficção não encontrada' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.fictionService.remove(id, user.sub);
  }
}

@Controller('fiction')
@UseInterceptors(TransformInterceptor)
export class FictionsController {
  constructor(private readonly fictionService: FictionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() dto: CreateFictionDto,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.fictionService.create(dto, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Get('mine')
  findMine(@CurrentUser() user: jwtPayloadInterface.JwtPayload) {
    return this.fictionService.findMine(user.sub);
  }

  @Get()
  findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.fictionService.findAll(
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fictionService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFictionDto,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.fictionService.update(id, dto, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.fictionService.remove(id, user.sub);
  }
}
