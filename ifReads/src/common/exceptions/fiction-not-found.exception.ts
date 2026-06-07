import { NotFoundException } from '@nestjs/common';

export class FictionNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(id ? `Ficção #${id} não encontrada` : 'Ficção não encontrada');
  }
}
