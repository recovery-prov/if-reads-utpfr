import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'beatriz@example.com' })
  @Transform(({ value }: { value: string }) => value?.toLowerCase().trim())
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'senha123' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
