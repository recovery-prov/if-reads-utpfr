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

import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import * as jwtPayloadInterface from '../auth/jwt-payload.interface.js';
import { CreateReviewDto } from './dto/create-reviews.dto.js';
import { UpdateReviewDto } from './dto/update-reviews.dto.js';
import { ReviewsService } from './reviews.service.js';
import { TransformInterceptor } from '../transform/transform.interceptor.js';

@Controller('fictions/:fictionId/reviews')
@UseInterceptors(TransformInterceptor)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Param('fictionId', ParseIntPipe) fictionId: number,
    @Body() dto: CreateReviewDto,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.reviewsService.create(fictionId, dto, user.sub);
  }

  @Get()
  findAll(
    @Param('fictionId', ParseIntPipe) fictionId: number,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.reviewsService.findAll(
      fictionId,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 10,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('fictionId', ParseIntPipe) fictionId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReviewDto,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.reviewsService.update(fictionId, id, dto, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('fictionId', ParseIntPipe) fictionId: number,
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
  ) {
    return this.reviewsService.remove(fictionId, id, user.sub);
  }
}
