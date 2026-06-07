import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import {
  FictionNotFoundException,
  AuthorNotFoundException,
  AuthorOwnershipException,
} from '../common/exceptions/index.js';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(fictionId: number, dto: CreateAuthorDto, userId: number) {
    const fiction = await this.prisma.fiction.findUnique({
      where: { id: fictionId },
    });

    if (!fiction) {
      throw new FictionNotFoundException(fictionId);
    }

    if (fiction.authorId !== userId) {
      throw new AuthorOwnershipException('vincular escritores');
    }

    return this.prisma.author.create({
      data: {
        name: dto.name,
        role: dto.role,
        fictionId,
      },
    });
  }

  async findAll(fictionId: number) {
    const fiction = await this.prisma.fiction.findUnique({
      where: { id: fictionId },
    });

    if (!fiction) {
      throw new FictionNotFoundException(fictionId);
    }

    return this.prisma.author.findMany({
      where: { fictionId },
    });
  }

  async remove(fictionId: number, id: number, userId: number) {
    const fiction = await this.prisma.fiction.findUnique({
      where: { id: fictionId },
    });

    if (!fiction) {
      throw new FictionNotFoundException(fictionId);
    }

    if (fiction.authorId !== userId) {
      throw new AuthorOwnershipException('remover escritores');
    }

    const author = await this.prisma.author.findFirst({
      where: { id, fictionId },
    });

    if (!author) {
      throw new AuthorNotFoundException(id);
    }

    return this.prisma.author.delete({ where: { id } });
  }
}
