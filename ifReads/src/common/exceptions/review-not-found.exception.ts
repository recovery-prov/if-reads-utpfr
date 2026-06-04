import { NotFoundException } from '@nestjs/common';

export class ReviewNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(id ? `Avaliação #${id} não encontrada` : 'Avaliação não encontrada');
  }
}
