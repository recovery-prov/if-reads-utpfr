import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { AuthorsController } from './authors.controller.js';
import { AuthorsService } from './authors.service.js';

@Module({
  imports: [AuthModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule {}
