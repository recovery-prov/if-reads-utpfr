import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
} from 'class-validator';

export class CreateFictionDto {
  @ApiProperty({ example: 'Zork: A Grande Aventura Subterrânea' })
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  title!: string;

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

  @ApiProperty({ example: 'https://example.com/play' })
  @IsString()
  @IsNotEmpty()
  link!: string;
}
