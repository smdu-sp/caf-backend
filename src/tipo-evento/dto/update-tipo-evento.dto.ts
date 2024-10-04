import { PartialType } from "@nestjs/swagger";
import { CreateTipoEventoDto } from "./create-tipo-evento.dto";

export class UpdateTipoEventoDto extends PartialType(CreateTipoEventoDto) {}