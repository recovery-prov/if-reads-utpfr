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
import { CurrentUser } from '../auth/current-user.decorator.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { AuthorsService } from './authors.service.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { TransformInterceptor } from '../transform/transform.interceptor.js';

@Controller('fictions/:fictionId/authors')
@UseInterceptors(TransformInterceptor)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('fictionId', ParseIntPipe) fictionId: number,
    @Body() dto: CreateAuthorDto,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.authorsService.create(fictionId, dto, user.sub);
  }

  @Get()
  findAll(@Param('fictionId', ParseIntPipe) fictionId: number) {
    return this.authorsService.findAll(fictionId);
  }

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
