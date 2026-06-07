import { NotFoundException } from '@nestjs/common';

export class AuthorNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(id ? `Escritor #${id} não encontrado` : 'Escritor não encontrado');
  }
}
