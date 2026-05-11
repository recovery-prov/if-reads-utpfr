import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  DuplicateEmailException,
  FictionNotFoundException,
  UserNotFoundException,
} from '../common/exceptions/index.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new DuplicateEmailException();
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    return user;
  }

  async findMe(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  async updateMe(userId: number, data: { name?: string; email?: string }) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UserNotFoundException();
    }

    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new UserNotFoundException();

    const valid = await bcrypt.compare(dto.currentPassword, user.password);
    if (!valid) throw new UnauthorizedException('Senha atual incorreta');

    const hashed = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashed },
    });

    return { message: 'Senha atualizada com sucesso' };
  }

  async getFavorites(userId: number) {
    return await this.prisma.favorite.findMany({
      where: { userId },
      include: {
        fiction: {
          include: {
            author: { select: { id: true, name: true } },
            authors: { select: { id: true, name: true, role: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addFavorite(userId: number, fictionId: number) {
    const fiction = await this.prisma.fiction.findUnique({
      where: { id: fictionId },
    });
    if (!fiction) throw new FictionNotFoundException(fictionId);

    return this.prisma.favorite.upsert({
      where: { userId_fictionId: { userId, fictionId } },
      create: { userId, fictionId },
      update: {},
    });
  }

  async removeFavorite(userId: number, fictionId: number) {
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_fictionId: { userId, fictionId } },
    });
    if (!existing) throw new NotFoundException('Favorito não encontrado');

    await this.prisma.favorite.delete({
      where: { userId_fictionId: { userId, fictionId } },
    });

    return { message: 'Removido dos favoritos' };
  }

  async getMyReviews(userId: number) {
    return this.prisma.review.findMany({
      where: { authorId: userId },
      include: {
        fiction: { select: { id: true, title: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
