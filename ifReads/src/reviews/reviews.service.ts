import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReviewDto } from './dto/create-reviews.dto.js';
import { UpdateReviewDto } from './dto/update-reviews.dto.js';
import {
  FictionNotFoundException,
  ReviewNotFoundException,
  ReviewOwnershipException,
  DuplicateReviewException,
  CannotReviewOwnFictionException,
} from '../common/exceptions/index.js';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(fictionId: number, dto: CreateReviewDto, authorId: number) {
    const fiction = await this.prisma.fiction.findUnique({
      where: { id: fictionId },
    });

    if (!fiction) {
      throw new FictionNotFoundException(fictionId);
    }

    if (fiction.authorId === authorId) {
      throw new CannotReviewOwnFictionException();
    }

    const existing = await this.prisma.review.findUnique({
      where: { fictionId_authorId: { fictionId, authorId } },
    });

    if (existing) {
      throw new DuplicateReviewException();
    }

    return this.prisma.review.create({
      data: {
        ...dto,
        fictionId,
        authorId,
      },
      include: {
        author: { select: { id: true, name: true } },
      },
    });
  }

  async findAll(fictionId: number, page = 1, limit = 10) {
    const fiction = await this.prisma.fiction.findUnique({
      where: { id: fictionId },
    });

    if (!fiction) {
      throw new FictionNotFoundException(fictionId);
    }

    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { fictionId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          author: { select: { id: true, name: true } },
        },
      }),
      this.prisma.review.count({ where: { fictionId } }),
    ]);

    return { data: items, total, page, limit };
  }

  async update(
    fictionId: number,
    id: number,
    dto: UpdateReviewDto,
    userId: number,
  ) {
    const review = await this.prisma.review.findFirst({
      where: { id, fictionId },
    });

    if (!review) {
      throw new ReviewNotFoundException(id);
    }

    if (review.authorId !== userId) {
      throw new ReviewOwnershipException('editar');
    }

    return this.prisma.review.update({
      where: { id },
      data: dto,
      include: {
        author: { select: { id: true, name: true } },
      },
    });
  }

  async remove(fictionId: number, id: number, userId: number) {
    const review = await this.prisma.review.findFirst({
      where: { id, fictionId },
    });

    if (!review) {
      throw new ReviewNotFoundException(id);
    }

    if (review.authorId !== userId) {
      throw new ReviewOwnershipException('excluir');
    }

    return this.prisma.review.delete({ where: { id } });
  }
}
