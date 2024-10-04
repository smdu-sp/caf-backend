import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UnidadeService } from './unidade.service'; // Ajuste o caminho conforme necessário
import { CreateUnidadeDto } from './dto/create-unidade.dto'; // Ajuste o caminho conforme necessário
import { UpdateUnidadeDto } from './dto/update-unidade.dto'; // Ajuste o caminho conforme necessário
import { Unidade } from '@prisma/client';

@ApiBearerAuth()
@ApiTags('Unidade')
@Controller('unidade')
export class UnidadeController {
  constructor(private readonly unidadeService: UnidadeService) {}

  @Post('criar')
  @ApiBody({ type: [CreateUnidadeDto], description: 'Lista de unidades a serem criadas.' })
  @ApiResponse({ status: 201, description: 'Unidades criadas com sucesso.' })
  @ApiResponse({ status: 400, description: 'Solicitação inválida.' })
  async create(@Body() createUnidadeDto: CreateUnidadeDto[]): Promise<void> {
    try {
      await this.unidadeService.createManyUnidades(createUnidadeDto);
    } catch (error) {
      throw new BadRequestException('Erro ao criar as unidades: ' + error.message);
    }
  }

  @Get('buscar-tudo')
  @ApiResponse({ status: 200, description: 'Retorna todas as unidades.' })
  async findAll(): Promise<Unidade[]> {
    return this.unidadeService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Retorna a unidade com o id especificado.' })
  @ApiResponse({ status: 404, description: 'Unidade não encontrada.' })
  async findOne(@Param('id') id: string): Promise<Unidade> {
    return this.unidadeService.findOne(id);
  }

  @Put(':id')
  @ApiBody({ type: UpdateUnidadeDto, description: 'Dados necessários para atualizar a unidade existente.' })
  @ApiResponse({ status: 200, description: 'Unidade atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Unidade não encontrada.' })
  async update(@Param('id') id: string, @Body() updateUnidadeDto: UpdateUnidadeDto): Promise<Unidade> {
    return this.unidadeService.update(id, updateUnidadeDto);
  }

  // @Delete(':id')
  // @ApiResponse({ status: 204, description: 'Unidade removida com sucesso.' })
  // @ApiResponse({ status: 404, description: 'Unidade não encontrada.' })
  // async remove(@Param('id') id: string): Promise<void> {
  //   return this.unidadeService.remove(id);
  // }
  
  @Delete('delete')
  @ApiResponse({ status: 204, description: 'Unidades removidas com sucesso.' })
  @ApiResponse({ status: 404, description: 'ta bugado essa bosta.' })
  async removeAll() {
    return this.unidadeService.removeAll();
  }
}
