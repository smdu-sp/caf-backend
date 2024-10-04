import { ApiProperty } from '@nestjs/swagger';

export class CreateEspecieDto {
  @ApiProperty({
    description: 'Nome único da espécie.',
    example: 'Especie A',
  })
  nome: string;
}
