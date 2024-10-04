import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTipoEventoDto } from './dto/create-tipo-evento.dto';
import { UpdateTipoEventoDto } from './dto/update-tipo-evento.dto';

@Injectable()
export class TipoEventoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTipoEventoDto: CreateTipoEventoDto) {
    return this.prisma.tipo_Evento.create({
      data: createTipoEventoDto,
    });
  }

  async findAll() {
    return this.prisma.tipo_Evento.findMany();
  }

  async findOne(id: string) {
    const tipoEvento = await this.prisma.tipo_Evento.findUnique({
      where: { id },
    });

    if (!tipoEvento) {
      throw new NotFoundException(`Tipo de evento com ID ${id} não encontrado.`);
    }
    return tipoEvento;
  }

  async update(id: string, updateTipoEventoDto: UpdateTipoEventoDto) {
    const tipoEvento = await this.prisma.tipo_Evento.findUnique({
      where: { id },
    });

    if (!tipoEvento) {
      throw new NotFoundException(`Tipo de evento com ID ${id} não encontrado.`);
    }

    return this.prisma.tipo_Evento.update({
      where: { id },
      data: updateTipoEventoDto,
    });
  }

  async remove(id: string) {
    const tipoEvento = await this.prisma.tipo_Evento.findUnique({
      where: { id },
    });

    if (!tipoEvento) {
      throw new NotFoundException(`Tipo de evento com ID ${id} não encontrado.`);
    }

    return this.prisma.tipo_Evento.delete({
      where: { id },
    });
  }

  async removeAll() {
    return this.prisma.tipo_Evento.deleteMany();
  }
}
