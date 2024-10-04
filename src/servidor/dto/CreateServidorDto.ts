import { ApiProperty } from '@nestjs/swagger';

export class CreateServidorDto {
  @ApiProperty({
    description: 'ID do usuário relacionado ao servidor. Este campo é necessário para criar um novo servidor.',
    example: '897ec68d-b39d-451e-85b9-b88a40d498e2',
  })
  usuario_id: string;

  @ApiProperty({
    description: 'Registro funcional (RF) único do servidor. Este campo é necessário para criar um novo servidor.',
    example: '456789',
  })
  rf: string;

  @ApiProperty({
    description: 'IDs dos cargos relacionados ao servidor. Deve corresponder a IDs de `Servidor_Cargo`. Este campo é opcional.',
    example: ["DIR123"],
    type: [String],
    required: false,
  })
  cargos?: string[];
}
