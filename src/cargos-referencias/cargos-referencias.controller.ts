import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CargosReferenciasService } from './cargos-referencias.service';
import { CreateCargosReferenciaDto } from './dto/create-cargos-referencia.dto';
import { UpdateCargosReferenciaDto } from './dto/update-cargos-referencia.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Cargos Referencias')
@Controller('cargos-referencias')
export class CargosReferenciasController {
  constructor(private readonly cargosReferenciasService: CargosReferenciasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo Cargo referência.' })
  @ApiResponse({ status: 201, description: 'Cargo referência criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createCargosReferenciaDto: CreateCargosReferenciaDto) {
    return this.cargosReferenciasService.create(createCargosReferenciaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Buscar todos os Cargos referências.' })
  @ApiResponse({ status: 200, description: 'Busca concluída com sucesso.' })
  findAll() {
    return this.cargosReferenciasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar um Cargo referência pelo ID.' })
  @ApiParam({ name: 'id', description: 'ID do Cargo referência', type: String })
  @ApiResponse({ status: 200, description: 'Cargo referência encontrado.' })
  @ApiResponse({ status: 404, description: 'Cargo referência não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.cargosReferenciasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um Cargo referência pelo ID.' })
  @ApiParam({ name: 'id', description: 'ID do Cargo referência', type: String })
  @ApiResponse({ status: 200, description: 'Cargo referência atualizado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiResponse({ status: 404, description: 'Cargo referência não encontrado.' })
  update(@Param('id') id: string, @Body() updateCargosReferenciaDto: UpdateCargosReferenciaDto) {
    return this.cargosReferenciasService.update(id, updateCargosReferenciaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um Cargo referência pelo ID.' })
  @ApiParam({ name: 'id', description: 'ID do Cargo referência', type: String })
  @ApiResponse({ status: 200, description: 'Cargo referência removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Cargo referência não encontrado.' })
  remove(@Param('id') id: string) {
    return this.cargosReferenciasService.remove(id);
  }

  @Delete()
  @ApiOperation({ summary: 'Remover todos os Cargo referência.' })
  @ApiResponse({ status: 200, description: 'Cargos referência removidos com sucesso.' })
  removeAll() {
    return this.cargosReferenciasService.removeAll();
  }
}
