import { PartialType } from '@nestjs/swagger';
import { CreateCargosReferenciaDto } from './create-cargos-referencia.dto';

export class UpdateCargosReferenciaDto extends PartialType(CreateCargosReferenciaDto) {}
