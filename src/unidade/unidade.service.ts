import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste o caminho conforme necessário
import { Unidade } from '@prisma/client';
import { CreateUnidadeDto } from './dto/create-unidade.dto';

@Injectable()
export class UnidadeService {
  constructor(private readonly prisma: PrismaService) {}

  async createManyUnidades(createUnidadeDto: CreateUnidadeDto[]): Promise<void> {
    try {
      await this.prisma.unidade.createMany({
        data: createUnidadeDto
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar unidades.');
    }
  }
  

  async findAll(): Promise<Unidade[]> {
    return this.prisma.unidade.findMany();
  }

  async findOne(id: string): Promise<Unidade> {
    const unidade = await this.prisma.unidade.findUnique({
      where: { id },
    });
    if (!unidade) {
      throw new NotFoundException(`Unidade com id ${id} não encontrada.`);
    }
    return unidade;
  }

  async update(id: string, data: Partial<{ nome: string; sigla: string; codigo: string; status: boolean }>): Promise<Unidade> {
    const unidade = await this.prisma.unidade.update({
      where: { id },
      data,
    });
    if (!unidade) {
      throw new NotFoundException(`Unidade com id ${id} não encontrada.`);
    }
    return unidade;
  }

  async remove(id: string): Promise<void> {
    const unidade = await this.prisma.unidade.delete({
      where: { id },
    });
    if (!unidade) {
      throw new NotFoundException(`Unidade com id ${id} não encontrada.`);
    }
  }

  async removeAll() {
    return this.prisma.unidade.deleteMany();
  }
}
