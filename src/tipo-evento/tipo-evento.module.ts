import { Module } from "@nestjs/common";
import { TipoEventoController } from "./tipo-evento.controller";
import { TipoEventoService } from "./tipo-evento.service";

@Module({
    controllers: [TipoEventoController],
    providers: [TipoEventoService],
    exports: [TipoEventoService],
})
export class TipoEventoModule {}