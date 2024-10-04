import { ApiProperty } from "@nestjs/swagger";

export class CreateFeriadoDto {
  @ApiProperty({
    description: 'Nome do feriado',
    example: 'Dia da Independência'
  })
  nome: string;

  @ApiProperty({
    description: 'Data do feriado',
    example: '2024-09-07',
    type: String, // Swagger trabalha melhor com strings no formato de datas
    format: 'date',
  })
  data: Date;

  @ApiProperty({
    description: 'Descrição do feriado',
    example: 'Comemoração da Independência do Brasil'
  })
  descricao: string;

  @ApiProperty({
    description: 'Nível do feriado (por exemplo, nacional, estadual, municipal)',
    example: 'Nacional'
  })
  nivel: string;

  @ApiProperty({
    description: 'Tipo do feriado (por exemplo, religioso, civil)',
    example: 'Civil'
  })
  tipo: string;

  @ApiProperty({
    description: 'Status do feriado (ativo/inativo)',
    example: 1, // 1 para ativo, 0 para inativo
    type: Number
  })
  status: number;

  @ApiProperty({
    description: 'Modo do feriado (por exemplo, fixo ou móvel)',
    example: 1, // 1 para fixo, 2 para móvel
    type: Number
  })
  modo: number;
}


export class Log{
    id_feriado: string
    estado: JSON
    id_usuario: string
}
