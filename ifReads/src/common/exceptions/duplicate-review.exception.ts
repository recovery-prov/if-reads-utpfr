import { ConflictException } from '@nestjs/common';

export class DuplicateReviewException extends ConflictException {
  constructor() {
    super('Você já avaliou esta ficção');
  }
}
