import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateReviewDto } from './dto/create-reviews.dto.js';
import { UpdateReviewDto } from './dto/update-reviews.dto.js';

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(fictionId: number, dto: CreateReviewDto, authorId: number) {
    const fiction = await this.prisma.fiction.findUnique({
      where: { id: fictionId },
    });

    if (!fiction) {
      throw new NotFoundException('Ficção não encontrada');
    }

    const existing = await this.prisma.review.findUnique({
      where: { fictionId_authorId: { fictionId, authorId } },
    });

    if (existing) {
      throw new ConflictException('Você já avaliou esta ficção');
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
      throw new NotFoundException('Ficção não encontrada');
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

    return { items, total, page, limit };
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
      throw new NotFoundException('Avaliação não encontrada');
    }

    if (review.authorId !== userId) {
      throw new ForbiddenException('Apenas o autor pode editar esta avaliação');
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
      throw new NotFoundException('Avaliação não encontrada');
    }

    if (review.authorId !== userId) {
      throw new ForbiddenException(
        'Apenas o autor pode excluir esta avaliação',
      );
    }

    return this.prisma.review.delete({ where: { id } });
  }
}
