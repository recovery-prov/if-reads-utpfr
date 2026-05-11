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

@Controller('users')
@UseInterceptors(TransformInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@CurrentUser() user: jwtPayloadInterface.JwtPayload) {
    return this.usersService.findMe(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateMe(
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.updateMe(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/password')
  @HttpCode(HttpStatus.OK)
  changePassword(
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(user.sub, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/favorites')
  getFavorites(@CurrentUser() user: jwtPayloadInterface.JwtPayload) {
    return this.usersService.getFavorites(user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Post('me/favorites/:fictionId')
  @HttpCode(HttpStatus.CREATED)
  addFavorite(
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
    @Param('fictionId', ParseIntPipe) fictionId: number,
  ) {
    return this.usersService.addFavorite(user.sub, fictionId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/favorites/:fictionId')
  @HttpCode(HttpStatus.OK)
  removeFavorite(
    @CurrentUser() user: jwtPayloadInterface.JwtPayload,
    @Param('fictionId', ParseIntPipe) fictionId: number,
  ) {
    return this.usersService.removeFavorite(user.sub, fictionId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/reviews')
  getMyReviews(@CurrentUser() user: jwtPayloadInterface.JwtPayload) {
    return this.usersService.getMyReviews(user.sub);
  }

  // --- Admin ---

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  adminUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.adminUpdate(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  adminDelete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.adminDelete(id);
  }
}
