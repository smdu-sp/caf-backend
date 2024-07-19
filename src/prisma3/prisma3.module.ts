import { Global, Module } from '@nestjs/common';
import { Prisma3Service } from './prisma3.service';

@Global()
@Module({
  providers: [Prisma3Service],
  exports: [Prisma3Service],
})
export class Prisma3Module {}
