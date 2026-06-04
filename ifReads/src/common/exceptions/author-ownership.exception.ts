import { ForbiddenException } from '@nestjs/common';

export class AuthorOwnershipException extends ForbiddenException {
  constructor(action = 'gerenciar escritores') {
    super(`Apenas o autor da ficção pode ${action}`);
  }
}
