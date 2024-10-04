import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCargoDto } from './dto/CreateCargoDto';
import { UpdateCargoDto } from './dto/UpdateCargoDto';

@Injectable()
export class CargoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCargoDto: CreateCargoDto) {
    return this.prisma.cargo.create({
      data: createCargoDto,
    });
  }

  async findAll() {
    return this.prisma.cargo.findMany({
      where: { status: true },
      orderBy: { nome: 'asc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.cargo.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateCargoDto: UpdateCargoDto) {
    return this.prisma.cargo.update({
      where: { id },
      data: updateCargoDto,
    });
  }

  async remove(id: string) {
    return this.prisma.cargo.delete({
      where: { id },
    });
  }

  async removeAll() {
    return this.prisma.cargo.deleteMany(); 
  }
}
