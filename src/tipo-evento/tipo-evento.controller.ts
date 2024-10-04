import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';
  import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
  import { TipoEventoService } from './tipo-evento.service';
  import { CreateTipoEventoDto } from './dto/create-tipo-evento.dto';
  import { UpdateTipoEventoDto } from './dto/update-tipo-evento.dto';
  
@ApiBearerAuth()
@ApiTags('TipoEvento')
@Controller('tipo-evento')
export class TipoEventoController {
  constructor(private readonly tipoEventoService: TipoEventoService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo tipo de evento' })
  @ApiResponse({ status: 201, description: 'Tipo de evento criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createTipoEventoDto: CreateTipoEventoDto) {
    return this.tipoEventoService.create(createTipoEventoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os tipos de evento' })
  @ApiResponse({ status: 200, description: 'Lista de tipos de evento retornada com sucesso.' })
  findAll() {
    return this.tipoEventoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter detalhes de um tipo de evento específico' })
  @ApiResponse({ status: 200, description: 'Tipo de evento retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tipo de evento não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.tipoEventoService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um tipo de evento existente' })
  @ApiResponse({ status: 200, description: 'Tipo de evento atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tipo de evento não encontrado.' })
  update(
    @Param('id') id: string,
    @Body() updateTipoEventoDto: UpdateTipoEventoDto,
  ) {
    return this.tipoEventoService.update(id, updateTipoEventoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um tipo de evento' })
  @ApiResponse({ status: 200, description: 'Tipo de evento removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Tipo de evento não encontrado.' })
  remove(@Param('id') id: string) {
    return this.tipoEventoService.remove(id);
  }
  
  @Delete()
  @ApiOperation({ summary: 'Remover tipos de evento' })
  @ApiResponse({ status: 200, description: 'Tipos de evento removidos com sucesso.' })
  removeAll() {
    return this.tipoEventoService.removeAll();
  }
}
  