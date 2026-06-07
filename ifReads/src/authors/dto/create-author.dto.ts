import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Marc Blank' })
  @Transform(({ value }: { value: string }) => value?.trim())
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({
    enum: ['main_author', 'coauthor', 'collaborator'],
    example: 'coauthor',
  })
  @IsString()
  @IsIn(['main_author', 'coauthor', 'collaborator'])
  role!: string;
}
