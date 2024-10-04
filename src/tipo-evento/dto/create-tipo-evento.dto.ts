import { ApiProperty } from '@nestjs/swagger';

export class CreateTipoEventoDto {
  @ApiProperty({
    description: 'Nome único do tipo de evento.',
    example: 'Treinamento',
  })
  nome: string;
}
