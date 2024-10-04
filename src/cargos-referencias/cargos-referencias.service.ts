import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCargosReferenciaDto } from './dto/create-cargos-referencia.dto';
import { UpdateCargosReferenciaDto } from './dto/update-cargos-referencia.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CargosReferenciasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCargosReferenciaDto: CreateCargosReferenciaDto) {
    return this.prisma.cargo_Referencia.create({
      data: createCargosReferenciaDto, 
    });
  }

  async findAll() {
    return this.prisma.cargo_Referencia.findMany();
  }

  async findOne(id: string) {
    const cargoReferencia = await this.prisma.cargo_Referencia.findUnique({
      where: { id },
    });

    if (!cargoReferencia) {
      throw new NotFoundException(`Cargo referência com ID ${id} não encontrado.`);
    }
    return cargoReferencia;
  }

  async update(id: string, updateCargosReferenciaDto: UpdateCargosReferenciaDto) {
    const cargoReferencia = await this.prisma.cargo_Referencia.findUnique({
      where: { id },
    });

    if (!cargoReferencia) {
      throw new NotFoundException(`Cargo referência com ID ${id} não encontrado.`);
    }

    return this.prisma.cargo_Referencia.update({
      where: { id },
      data: updateCargosReferenciaDto,
    });
  }

  async remove(id: string) {
    const cargoReferencia = await this.prisma.cargo_Referencia.findUnique({
      where: { id },
    });

    if (!cargoReferencia) {
      throw new NotFoundException(`Cargo referência com ID ${id} não encontrado.`);
    }

    return this.prisma.cargo_Referencia.delete({
      where: { id },
    });
  }

  async removeAll() {
    return this.prisma.cargo_Referencia.deleteMany();
  }
}
