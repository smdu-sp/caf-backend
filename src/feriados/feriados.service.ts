import { Global, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/feriados/client';

@Global()
@Injectable()
export class FeriadosService extends PrismaClient {
  constructor() {
    super();
  }
}
