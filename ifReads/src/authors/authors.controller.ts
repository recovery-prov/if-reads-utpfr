import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { AuthorsService } from './authors.service.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { TransformInterceptor } from '../transform/transform.interceptor.js';

@ApiTags('Authors')
@Controller('fictions/:fictionId/authors')
@UseInterceptors(TransformInterceptor)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @ApiOperation({ summary: 'Vincular escritor a uma ficção' })
  @ApiResponse({ status: 201, description: 'Escritor vinculado com sucesso' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({ status: 404, description: 'Ficção não encontrada' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('fictionId', ParseIntPipe) fictionId: number,
    @Body() dto: CreateAuthorDto,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.authorsService.create(fictionId, dto, user.sub);
  }

  @ApiOperation({ summary: 'Listar escritores de uma ficção' })
  @ApiResponse({ status: 200, description: 'Lista de escritores' })
  @ApiResponse({ status: 404, description: 'Ficção não encontrada' })
  @Get()
  findAll(@Param('fictionId', ParseIntPipe) fictionId: number) {
    return this.authorsService.findAll(fictionId);
  }

  @ApiOperation({ summary: 'Remover escritor de uma ficção' })
  @ApiResponse({ status: 200, description: 'Escritor removido' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @ApiResponse({
    status: 404,
    description: 'Escritor ou ficção não encontrados',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('fictionId', ParseIntPipe) fictionId: number,
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.authorsService.remove(fictionId, id, user.sub);
  }
}
