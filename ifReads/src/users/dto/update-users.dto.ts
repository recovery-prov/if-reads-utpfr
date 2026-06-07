import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Beatriz Amante' })
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 'beatriz@example.com' })
  @Transform(({ value }: { value: string }) => value?.toLowerCase().trim())
  @IsEmail()
  @IsOptional()
  email?: string;
}
