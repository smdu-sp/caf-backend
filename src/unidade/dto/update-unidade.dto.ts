import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUnidadeDto {
  @ApiProperty({
    description: 'Nome da unidade',
    example: 'Unidade Atualizada',
    required: false,
  })
  @IsOptional()
  @MinLength(3, { message: 'Nome deve ter pelo menos 3 caracteres.' })
  @IsString({ message: 'Nome deve ser uma string.' })
  nome?: string;

  @ApiProperty({
    description: 'Sigla da unidade',
    example: 'UA',
    required: false,
  })
  @IsOptional()
  @MinLength(2, { message: 'Sigla deve ter pelo menos 2 caracteres.' })
  @IsString({ message: 'Sigla deve ser uma string.' })
  sigla?: string;

  @ApiProperty({
    description: 'Código único da unidade',
    example: '654321',
    required: false,
  })
  @IsOptional()
  @MinLength(1, { message: 'Código não pode ser vazio.' })
  @IsString({ message: 'Código deve ser uma string.' })
  codigo?: string;

  @ApiProperty({
    description: 'Status da unidade',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean({ message: 'Status deve ser um valor booleano.' })
  status?: boolean;

  @ApiProperty({
    description: 'Lista de IDs de usuários associados à unidade',
    example: ['123e4567-e89b-12d3-a456-426614174000'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Usuários deve ser uma lista de IDs.' })
  @IsString({ each: true, message: 'Cada usuário deve ser um ID válido.' })
  usuarios?: string[];

  @ApiProperty({
    description: 'Lista de IDs de servidores associados à unidade',
    example: ['123e4567-e89b-12d3-a456-426614174001'],
    type: [String],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Servidores deve ser uma lista de IDs.' })
  @IsString({ each: true, message: 'Cada servidor deve ser um ID válido.' })
  servidores?: string[];
}
