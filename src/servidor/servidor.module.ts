import { Module } from '@nestjs/common';
import { ServidorService } from './servidor.service';
import { ServidorController } from './servidor.controller';

@Module({
  controllers: [ServidorController],
  providers: [ServidorService],
  exports: [ServidorService],
})
export class ServidorModule {}
