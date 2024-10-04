import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'O login do usuário',
    example: 'd927014',
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: 'A senha do usuário',
    example: 'senhaSegura123',
  })
  @IsString()
  senha: string;
}
