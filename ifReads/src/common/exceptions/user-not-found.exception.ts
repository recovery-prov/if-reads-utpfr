import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
  constructor(id?: number) {
    super(id ? `Usuário #${id} não encontrado` : 'Usuário não encontrado');
  }
}
