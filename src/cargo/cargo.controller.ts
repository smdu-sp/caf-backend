import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CargoService } from './cargo.service';
import { CreateCargoDto } from './dto/CreateCargoDto';
import { UpdateCargoDto } from './dto/UpdateCargoDto';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Cargo')
@Controller('cargo')
export class CargoController {
  constructor(private readonly cargoService: CargoService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cargo' })
  @ApiResponse({ status: 201, description: 'Cargo criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  create(@Body() createCargoDto: CreateCargoDto, @UsuarioAtual() usuario: Usuario) {
    return this.cargoService.create(createCargoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna a lista de cargos ativos' })
  @ApiResponse({ status: 200, description: 'Lista de cargos' })
  findAll() {
    return this.cargoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um cargo pelo ID' })
  @ApiResponse({ status: 200, description: 'Cargo encontrado' })
  @ApiResponse({ status: 404, description: 'Cargo não encontrado' })
  findOne(@Param('id') id: string) {
    return this.cargoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza os dados de um cargo' })
  @ApiResponse({ status: 200, description: 'Cargo atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  update(@Param('id') id: string, @Body() updateCargoDto: UpdateCargoDto) {
    return this.cargoService.update(id, updateCargoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um cargo pelo ID' })
  @ApiResponse({ status: 200, description: 'Cargo deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Cargo não encontrado' })
  remove(@Param('id') id: string) {
    return this.cargoService.remove(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta todos os cargos' })
  @ApiResponse({ status: 200, description: 'Cargos deletados com sucesso' })
  removeAll() {
    return this.cargoService.removeAll();
  }
}
