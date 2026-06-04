import { ForbiddenException } from '@nestjs/common';

export class ReviewOwnershipException extends ForbiddenException {
  constructor(action = 'modificar') {
    super(`Apenas o autor pode ${action} esta avaliação`);
  }
}
