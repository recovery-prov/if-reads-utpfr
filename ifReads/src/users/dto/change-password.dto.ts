import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ example: 'senhaAtual123' })
  @IsString()
  currentPassword!: string;

  @ApiProperty({ example: 'novaSenha123', minLength: 6 })
  @IsString()
  @MinLength(6)
  newPassword!: string;
}
