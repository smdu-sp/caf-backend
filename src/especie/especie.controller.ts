import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EspecieService } from './especie.service';
import { CreateEspecieDto } from './dto/create-especie.dto';
import { UpdateEspecieDto } from './dto/update-especie.dto';

@ApiBearerAuth()
@ApiTags('Espécie')
@Controller('especie')
export class EspecieController {
  constructor(private readonly especieService: EspecieService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova espécie.' })
  @ApiResponse({ status: 201, description: 'Espécie criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createEspecieDto: CreateEspecieDto) {
    return this.especieService.create(createEspecieDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todas as espécies.' })
  @ApiResponse({ status: 200, description: 'Busca concluída com sucesso.' })
  findAll() {
    return this.especieService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma espécie pelo ID.' })
  @ApiResponse({ status: 200, description: 'Espécie encontrada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Espécie não encontrada.' })
  findOne(@Param('id') id: string) {
    return this.especieService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma espécie pelo ID.' })
  @ApiResponse({ status: 200, description: 'Espécie atualizada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Espécie não encontrada.' })
  update(@Param('id') id: string, @Body() updateEspecieDto: UpdateEspecieDto) {
    return this.especieService.update(id, updateEspecieDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir uma espécie pelo ID.' })
  @ApiResponse({ status: 200, description: 'Espécie removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Espécie não encontrada.' })
  remove(@Param('id') id: string) {
    return this.especieService.remove(id);
  }
  
  @Delete()
  @ApiOperation({ summary: 'Excluir as espécies.' })
  @ApiResponse({ status: 200, description: 'Espécie removida com sucesso.' })
  removeAll() {
    return this.especieService.removeAll();
  }
}
