import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum Tipo_Usuario {
  SERVIDOR = 'SERVIDOR',
  TEMPORARIO = 'TEMPORARIO',
  ESTAGIARIO = 'ESTAGIARIO',
}

export class CreateUsuarioDto {
  @ApiProperty()
  @MinLength(10, { message: 'Nome tem de ter ao menos 10 caracteres.' })
  @IsString({ message: 'Tem de ser texto.' })
  tipo: Tipo_Usuario;

  @ApiProperty()
  @MinLength(10, { message: 'Nome tem de ter ao menos 10 caracteres.' })
  @IsString({ message: 'Tem de ser texto.' })
  nome: string;

  @ApiProperty()
  @IsString({ message: 'Login inválido!' })
  @MinLength(7, { message: 'Login tem de ter ao menos 7 caracteres.' })
  login: string;

  @ApiProperty()
  @IsString({ message: 'Login inválido!' })
  @IsEmail({}, { message: 'Login tem de ter ao menos 7 caracteres.' })
  email: string;

  @ApiProperty()
  @IsEnum($Enums.Permissao, { message: 'Escolha uma permissão válida.' })
  permissao?: $Enums.Permissao;

  @ApiProperty()
  @IsNumber({}, { message: 'Status inválido!' })
  status?: number;

  @ApiProperty({ type: String, example: new Date().toISOString() }) // Mostra a data no formato ISO
  @IsDate({ message: 'Ultimo login deve ser uma data válida.' })
  ultimologin?: Date;

  @ApiProperty({ example: new Date() })
  criadoEm: Date;

  @ApiProperty({ example: new Date() })
  atualizadoEm?: Date;

  @ApiProperty({ required: false })
  @IsString({ message: 'Unidade inválida!' })
  @IsOptional()
  unidade_id?: string;

  @ApiProperty({ required: false })
  @IsString({ message: 'Servidor inválido!' })
  @IsOptional()
  servidor_id?: string;
}