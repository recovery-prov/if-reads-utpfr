import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateFictionDto } from './dto/create-fiction.dto.js';
import { UpdateFictionDto } from './dto/update-fiction.dto.js';

@Injectable()
export class FictionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateFictionDto, authorId: number) {
    return this.prisma.fiction.create({
      data: {
        ...dto,
        authorId,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.fiction.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: {
            select: { id: true, name: true },
          },
          authors: true,
        },
      }),
      this.prisma.fiction.count(),
    ]);

    const avgRatings = await this.prisma.review.groupBy({
      by: ['fictionId'],
      where: { fictionId: { in: items.map((f) => f.id) } },
      _avg: { rating: true },
    });

    const avgMap = new Map(avgRatings.map((r) => [r.fictionId, r._avg.rating]));

    const enriched = items.map((f) => ({
      ...f,
      averageRating: avgMap.get(f.id) ?? null,
    }));

    return { items: enriched, total, page, limit };
  }

  async findOne(id: number) {
    const fiction = await this.prisma.fiction.findUnique({
      where: { id },
      include: {
        author: {
          select: { id: true, name: true },
        },
        authors: true,
        reviews: {
          include: {
            author: { select: { id: true, name: true } },
          },
        },
      },
    });

    if (!fiction) {
      throw new NotFoundException('Ficção não encontrada');
    }

    const avgResult = await this.prisma.review.aggregate({
      where: { fictionId: id },
      _avg: { rating: true },
    });

    return { ...fiction, averageRating: avgResult._avg.rating };
  }

  async findMine(userId: number) {
    const data = await this.prisma.fiction.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        author: { select: { id: true, name: true } },
        authors: true,
      },
    });

    const avgRatings = await this.prisma.review.groupBy({
      by: ['fictionId'],
      where: { fictionId: { in: data.map((f) => f.id) } },
      _avg: { rating: true },
    });

    const avgMap = new Map(avgRatings.map((r) => [r.fictionId, r._avg.rating]));

    return data.map((f) => ({ ...f, averageRating: avgMap.get(f.id) ?? null }));
  }

  async update(id: number, dto: UpdateFictionDto, userId: number) {
    const fiction = await this.prisma.fiction.findUnique({
      where: { id },
    });

    if (!fiction) {
      throw new NotFoundException('Ficção não encontrada');
    }

    if (fiction.authorId !== userId) {
      throw new ForbiddenException('Apenas o autor pode editar esta ficção');
    }

    return this.prisma.fiction.update({
      where: { id },
      data: dto,
      include: {
        author: { select: { id: true, name: true } },
        authors: true,
      },
    });
  }

  async remove(id: number, userId: number) {
    const fiction = await this.prisma.fiction.findUnique({
      where: { id },
    });

    if (!fiction) {
      throw new NotFoundException('Ficção não encontrada');
    }

    if (fiction.authorId !== userId) {
      throw new ForbiddenException('Apenas o autor pode excluir esta ficção');
    }

    return this.prisma.fiction.delete({ where: { id } });
  }
}
