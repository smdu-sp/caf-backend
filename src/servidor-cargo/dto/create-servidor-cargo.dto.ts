// src/servidor-cargo/dto/create-servidor-cargo.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateServidorCargoDto {
  @ApiProperty({ description: 'Data de início do cargo' })
  @IsDateString()
  inicio: Date;

  @ApiProperty({ description: 'Data de término do cargo', required: false })
  @IsOptional()
  @IsDateString()
  termino?: Date;

  @ApiProperty({ description: 'Início do exercício', required: false })
  @IsOptional()
  @IsDateString()
  inicio_exerc?: Date;

  @ApiProperty({ description: 'Vínculo do servidor com o cargo', default: 1 })
  @IsInt()
  vinculo: number;

  @ApiProperty({ description: 'Início da remuneração', required: false })
  @IsOptional()
  @IsDateString()
  inicio_rem?: Date;

  @ApiProperty({ description: 'Fim da remuneração', required: false })
  @IsOptional()
  @IsDateString()
  fim_rem?: Date;

  @ApiProperty({ description: 'Observações sobre o cargo', required: false })
  @IsOptional()
  @IsString()
  observacao?: string;

  @ApiProperty({ description: 'ID da vaga' })
  @IsInt()
  vaga: number;

  @ApiProperty({ description: 'ID do servidor', example: "897ec68d-b39d-451e-85b9-b88a40d498e2", })
  @IsString()
  servidor_id: string;

  @ApiProperty({ description: 'ID da espécie', example: "adff9e3b-9685-4e60-b055-149ace664b5d" })
  @IsString()
  especie_id: string;

  @ApiProperty({ description: 'ID do cargo', example: "cb6b5929-1e33-440e-8dd3-9a25bc502366" })
  @IsString()
  cargo_id: string;

  @ApiProperty({ description: 'ID da referência do cargo', example: "e78e7074-a254-4712-abcd-a3a00ad40471" })
  @IsString()
  cargo_referencia_id: string;

  @ApiProperty({ description: 'ID do tipo de evento', example: "c87ee5b9-450c-4b78-bb56-dfdd1d89b49d" })
  @IsString()
  tipo_evento_id: string;

  @ApiProperty({ description: 'ID da unidade', example: "a80e65e9-e812-481f-9aa6-aaf8954f0c9e" })
  @IsString()
  unidade_id: string;

  @ApiProperty({ description: 'Registro funcional do titular', required: false, example: "456789" })
  @IsOptional()
  @IsString()
  titular_rf?: string;
}
