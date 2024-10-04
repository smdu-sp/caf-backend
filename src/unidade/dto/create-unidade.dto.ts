import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MinLength, IsArray } from 'class-validator';

export class CreateUnidadeDto {
  @ApiProperty({
    description: 'Nome da unidade',
    example: 'Unidade Central',
  })
  @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres.' })
  @IsString({ message: 'Nome deve ser uma string.' })
  nome: string;

  @ApiProperty({
    description: 'Sigla da unidade',
    example: 'UC',
  })
  @MinLength(2, { message: 'Sigla deve ter pelo menos 2 caracteres.' })
  @IsString({ message: 'Sigla deve ser uma string.' })
  sigla: string;

  @ApiProperty({
    description: 'Código único da unidade',
    example: '123456',
  })
  @MinLength(1, { message: 'Código não pode ser vazio.' })
  @IsString({ message: 'Código deve ser uma string.' })
  codigo: string;

  @ApiProperty({
    description: 'Status da unidade',
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean({ message: 'Status deve ser um valor booleano.' })
  status?: boolean;

}
