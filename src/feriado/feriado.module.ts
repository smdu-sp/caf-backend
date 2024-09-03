import { Module } from '@nestjs/common';
import { FeriadoService } from './feriado.service';
import { FeriadoController } from './feriado.controller';
import { FeriadosModule } from 'src/feriados/feriados.module';

@Module({
  controllers: [FeriadoController],
  providers: [FeriadoService],
  exports: [FeriadoService],
  imports: [
    FeriadosModule
  ]
})
export class FeriadoModule {}