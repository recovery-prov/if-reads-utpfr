import { ForbiddenException } from '@nestjs/common';

export class CannotReviewOwnFictionException extends ForbiddenException {
  constructor() {
    super('Você não pode avaliar sua própria ficção');
  }
}
