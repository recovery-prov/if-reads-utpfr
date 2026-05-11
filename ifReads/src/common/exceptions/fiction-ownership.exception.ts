import { ForbiddenException } from '@nestjs/common';

export class FictionOwnershipException extends ForbiddenException {
  constructor(action = 'modificar') {
    super(`Apenas o autor da ficção pode ${action}`);
  }
}
