import { Module } from '@nestjs/common';
import { ServidorCargoService } from './servidor-cargo.service';
import { ServidorCargoController } from './servidor-cargo.controller';

@Module({
  controllers: [ServidorCargoController],
  providers: [ServidorCargoService],
  exports: [ServidorCargoService],
})
export class ServidorCargoModule {}
