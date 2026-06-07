import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { FictionsService } from './fictions.service.js';
import { FictionsController } from './fictions.controller.js';

@Module({
  imports: [AuthModule],
  controllers: [FictionsController],
  providers: [FictionsService],
  exports: [FictionsService],
})
export class FictionsModule {}
