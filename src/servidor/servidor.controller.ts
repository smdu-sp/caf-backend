import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ServidorService } from './servidor.service';
import { CreateServidorDto } from './dto/CreateServidorDto';
import { UpdateServidorDto } from './dto/UpdateServidorDto';

@ApiBearerAuth()
@ApiTags('servidores')
@Controller('servidores')
export class ServidorController {
  constructor(private readonly servidorService: ServidorService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo Servidor' })
  @ApiResponse({ status: 201, description: 'Servidor criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  async create(@Body() createServidorDto: CreateServidorDto) {
    return this.servidorService.create(createServidorDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os Servidores' })
  @ApiResponse({ status: 200, description: 'Lista de servidores retornada com sucesso.' })
  async findAll() {
    return this.servidorService.findAll();
  }

  @Get(':usuario_id')
  @ApiOperation({ summary: 'Buscar um Servidor pelo ID de usuário' })
  @ApiParam({ name: 'usuario_id', description: 'ID do usuário associado ao servidor', example: 'abc123' })
  @ApiResponse({ status: 200, description: 'Servidor encontrado.' })
  @ApiResponse({ status: 404, description: 'Servidor não encontrado.' })
  async findOne(@Param('usuario_id') usuario_id: string) {
    return this.servidorService.findOne(usuario_id);
  }

  @Patch(':usuario_id')
  @ApiOperation({ summary: 'Atualizar um Servidor pelo ID de usuário' })
  @ApiParam({ name: 'usuario_id', description: 'ID do usuário associado ao servidor', example: 'abc123' })
  @ApiResponse({ status: 200, description: 'Servidor atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Servidor não encontrado.' })
  async update(@Param('usuario_id') usuario_id: string, @Body() updateServidorDto: UpdateServidorDto) {
    return this.servidorService.update(usuario_id, updateServidorDto);
  }

  @Delete(':usuario_id')
  @ApiOperation({ summary: 'Remover um Servidor pelo ID de usuário' })
  @ApiParam({ name: 'usuario_id', description: 'ID do usuário associado ao servidor', example: 'abc123' })
  @ApiResponse({ status: 200, description: 'Servidor removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Servidor não encontrado.' })
  async remove(@Param('usuario_id') usuario_id: string) {
    return this.servidorService.remove(usuario_id);
  }
  
  @Delete()
  @ApiOperation({ summary: 'Remover os Servidores.' })
  @ApiResponse({ status: 200, description: 'Servidores removidos com sucesso.' })
  async removeAll() {
    return this.servidorService.removeAll();
  }
}
