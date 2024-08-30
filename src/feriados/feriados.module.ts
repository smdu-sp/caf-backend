import { Global, Module } from '@nestjs/common';
import { FeriadosService } from './feriados.service';

@Global()
@Module({
  providers: [FeriadosService],
  exports: [FeriadosService],
})
export class FeriadosModule {}
