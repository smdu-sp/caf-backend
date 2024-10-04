import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsString, IsOptional } from 'class-validator';
import { Tipo_Cargo } from '@prisma/client';

export class CreateCargoDto {
    @ApiProperty({
        description: 'Nome do cargo',
        example: 'Diretor Executivo',
    })
    @IsString()
    nome: string;

    @ApiProperty({
        description: 'Código único do cargo',
        example: 'DIR123',
    })
    @IsString()
    codigo: string;

    @ApiProperty({
        description: 'Tipo de cargo',
        enum: Tipo_Cargo,
        default: Tipo_Cargo.COMISSIONADO,
    })
    @IsEnum(Tipo_Cargo)
    tipo: Tipo_Cargo;

    @ApiProperty({
        description: 'Status do cargo (ativo ou inativo)',
        example: true,
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    status?: boolean;
}
