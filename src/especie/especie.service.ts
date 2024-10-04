import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EspecieService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createEspecieDto: CreateEspecieDto) {
    return this.prisma.especie.create({
      data: createEspecieDto
    });
  }
  
  async findAll() {
    return this.prisma.especie.findMany();
  }

  async findOne(id: string) {
    const especie = await this.prisma.especie.findUnique({
      where: { id },
    });
    if (!especie) {
      throw new NotFoundException(`Espécie com ID ${id} não encontrada.`);
    }
    return especie;
  }

  async update(id: string, updateEspecieDto: UpdateEspecieDto) {
    const especie = await this.prisma.especie.findUnique({
      where: { id },
    });
    if (!especie) {
      throw new NotFoundException(`Espécie com ID ${id} não encontrada.`);
    }

    return this.prisma.especie.update({
      where: { id },
      data: updateEspecieDto,
    });
  }

  async remove(id: string) {
    const especie = await this.prisma.especie.findUnique({
      where: { id },
    });
    if (!especie) {
      throw new NotFoundException(`Espécie com ID ${id} não encontrada.`);
    }

    await this.prisma.especie.delete({
      where: { id },
    });

    return { message: 'Espécie removida com sucesso.' };
  }

  async removeAll() {
    return this.prisma.especie.deleteMany();
  }
}
