import { Module } from '@nestjs/common';
import { FeriadoService } from './feriado.service';
import { FeriadoController } from './feriado.controller';

@Module({
  controllers: [FeriadoController],
  providers: [FeriadoService],
})
export class FeriadoModule {}
