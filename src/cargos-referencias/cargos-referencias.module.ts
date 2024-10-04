import { Module } from '@nestjs/common';
import { CargosReferenciasService } from './cargos-referencias.service';
import { CargosReferenciasController } from './cargos-referencias.controller';

@Module({
  controllers: [CargosReferenciasController],
  providers: [CargosReferenciasService],
})
export class CargosReferenciasModule {}
