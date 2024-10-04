import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RoleGuard } from './auth/guards/role.guard';
import { PrismaModule } from './prisma/prisma.module';
import { FeriadoModule } from './feriado/feriado.module';
import { SGUModule } from './sgu/sgu.module';
import { UnidadeModule } from './unidade/unidade.module';
import { ServidorCargoModule } from './servidor-cargo/servidor-cargo.module';
import { ServidorModule } from './servidor/servidor.module';
import { CargoModule } from './cargo/cargo.module';
import { CargosReferenciasModule } from './cargos-referencias/cargos-referencias.module';
import { EspecieModule } from './especie/especie.module';
import { TipoEventoModule } from './tipo-evento/tipo-evento.module';

@Global()
@Module({
  imports: [CargoModule, UsuariosModule, UnidadeModule, AuthModule, PrismaModule, FeriadoModule, SGUModule, ServidorModule, ServidorCargoModule, CargosReferenciasModule, EspecieModule, TipoEventoModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [AppService],
})
export class AppModule {}
