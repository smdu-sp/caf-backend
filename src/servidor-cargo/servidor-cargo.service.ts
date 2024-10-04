import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServidorCargoDto } from './dto/create-servidor-cargo.dto';
import { UpdateServidorCargoDto } from './dto/update-servidor-cargo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ServidorCargoService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createServidorCargoDto: CreateServidorCargoDto) {
    const { servidor_id, titular_rf } = createServidorCargoDto;

    const servidor = await this.prismaService.servidor.findUnique({
      where: { usuario_id: servidor_id },
    });

    if (!servidor) {
      throw new NotFoundException(`Servidor com ID ${servidor_id} não encontrado.`);
    }

    const finalTitularRf = titular_rf || servidor.rf;

    return this.prismaService.servidor_Cargo.create({
      data: {
        ...createServidorCargoDto,
        titular_rf: finalTitularRf,
      },
    });
  }

  async findAll() {
    return this.prismaService.servidor_Cargo.findMany();
  }

  async findOne(especie_id: string, servidor_id: string, cargo_id: string) {
    return this.prismaService.servidor_Cargo.findUnique({
      where: {
        especie_id_servidor_id_cargo_id: {
          especie_id,
          servidor_id,
          cargo_id,
        },
      },
    });
  }

  async update(
    especie_id: string,
    servidor_id: string,
    cargo_id: string,
    updateServidorCargoDto: UpdateServidorCargoDto,
  ) {
    return this.prismaService.servidor_Cargo.update({
      where: {
        especie_id_servidor_id_cargo_id: {
          especie_id,
          servidor_id,
          cargo_id,
        },
      },
      data: updateServidorCargoDto,
    });
  }

  async remove(especie_id: string, servidor_id: string, cargo_id: string) {
    return this.prismaService.servidor_Cargo.delete({
      where: {
        especie_id_servidor_id_cargo_id: {
          especie_id,
          servidor_id,
          cargo_id,
        },
      },
    });
  }

  async removeAll() {
    return this.prismaService.servidor_Cargo.deleteMany();
  }
}
