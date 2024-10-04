import { ApiProperty } from "@nestjs/swagger";
import { CreateServidorCargoDto } from "src/servidor-cargo/dto/create-servidor-cargo.dto";

export class CreateCargosReferenciaDto {
    @ApiProperty({
        description: 'Nome do cargo referência.',
        example: "ASSESSOR II",
    })
    nome: string;
}
