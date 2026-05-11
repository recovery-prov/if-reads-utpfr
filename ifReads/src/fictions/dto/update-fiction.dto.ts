import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';

export class UpdateFictionDto {
  @ApiPropertyOptional({ example: 'Zork: A Grande Aventura Subterrânea' })
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'Uma aventura de texto clássica.' })
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: 'Adventure' })
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsOptional()
  genre?: string;

  @ApiPropertyOptional({ example: 1980, minimum: 1900, maximum: 2100 })
  @IsInt()
  @Min(1900)
  @Max(2100)
  @IsOptional()
  publishedAt?: number;

  @ApiPropertyOptional({ example: 'https://example.com/play' })
  @IsString()
  @IsOptional()
  link?: string;
}
