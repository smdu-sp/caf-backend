import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServidorDto } from './dto/CreateServidorDto';
import { UpdateServidorDto } from './dto/UpdateServidorDto';

@Injectable()
export class ServidorService {
  constructor(private prisma: PrismaService) {}

  async create(createServidorDto: CreateServidorDto) {
    return this.prisma.servidor.create({
      data: {
        usuario_id: createServidorDto.usuario_id,
        rf: createServidorDto.rf,
        // Se você precisar lidar com relacionamentos, faça isso aqui
      },
      include: { usuario: true }, 
    });
  }

  async findAll() {
    return this.prisma.servidor.findMany({
      include: { usuario: true, cargos: true, titulares: true }, // Inclui cargos e titulares relacionados
    });
  }

  async findOne(usuario_id: string) {
    const servidor = await this.prisma.servidor.findUnique({
      where: { usuario_id },
      include: { usuario: true, cargos: true, titulares: true }, // Inclui dados relacionados
    });
    if (!servidor) {
      throw new NotFoundException(`Servidor com ID de usuário ${usuario_id} não encontrado`);
    }
    return servidor;
  }

  async update(rf: string, updateServidorDto: UpdateServidorDto) {
    // Verifica se o servidor existe
    const servidor = await this.prisma.servidor.findUnique({ where: { rf } });
    if (!servidor) {
      throw new NotFoundException(`Servidor com RF ${rf} não encontrado.`);
    }

    // Atualiza o servidor com os dados fornecidos
    return this.prisma.servidor.update({
      where: { rf },
      data: {
        usuario_id: updateServidorDto.usuario_id,
        rf: updateServidorDto.rf,
      },
      include: { usuario: true },
    });
  }

  async remove(usuario_id: string) {
    const servidor = await this.prisma.servidor.findUnique({
      where: { usuario_id },
    });
    if (!servidor) {
      throw new NotFoundException(`Servidor com ID de usuário ${usuario_id} não encontrado`);
    }
    return this.prisma.servidor.delete({
      where: { usuario_id },
    });
  }

  async removeAll() {
    return this.prisma.servidor.deleteMany();
  }
}
