import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FeriadoService } from './feriado.service';
import { CreateFeriadoDto } from './dto/create-feriado.dto';
import { UpdateFeriadoDto } from './dto/update-feriado.dto';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('feriado')
export class FeriadoController {
  constructor(private readonly feriadoService: FeriadoService) {}

  @Permissoes('DEV', 'ADM')
  @Post('criar')
  criarFeiado(
    @Body() createFeriadoDto: CreateFeriadoDto, 
    @UsuarioAtual() usuario: Usuario) {
    return this.feriadoService.criarFeiado(
      createFeriadoDto, usuario.nome, usuario.login, usuario.email, usuario.permissao, +usuario.status );
  }

  @Permissoes('DEV', 'ADM')
  @Patch('atualizar/:data')
  atualizar(@Param('data') dataUp: Date, @Body() updateFeriadoDto: UpdateFeriadoDto, @UsuarioAtual() usuario: Usuario) {
    return this.feriadoService.atualizar(dataUp, updateFeriadoDto, usuario.id);
  }

  @Permissoes('ADM', 'DEV')
  @Post('gerarFeriado')
  gerarDataRecorrente() {
    return this.feriadoService.gerarDataRecorrente();
  }

  @Permissoes('ADM', 'DEV')
  @Patch('recorrente/status/:id')
  desativarRecorrentes(@Param('id') id: string) {
    return this.feriadoService.statusRecorrentes(id);
  }

  @Permissoes('ADM', 'DEV')
  @Patch("recorrente/atualizar/:id")
  atualizarRecorrente(@Param("id") id: string, @Body() updateFeriadoDto: UpdateFeriadoDto) {
    return this.feriadoService.atualizarRecorrente(id, updateFeriadoDto)
  }

  @Permissoes('ADM', 'DEV')
  @Patch('status/:id')
  desativarFeraido(@Param('id') id: string) {
    return this.feriadoService.desativarFeraido(id);
  }

  @IsPublic()
  @Get("buscar/feriados")
  buscarTudo(
    @Query('status') status?: string,
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('busca') busca?: string,
  ) {
    return this.feriadoService.buscarTudo(+pagina, +limite, busca, +status);
  }

  @IsPublic()
  @Get('data/:data1/:data2')
  findOne(
    @Param('data1') data1: string,
    @Param('data2') data2?: string,
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('busca') busca?: string
    ) {
    return this.feriadoService.findOne(new Date(data1), new Date(data2), +pagina, +limite, busca);
  }

  @IsPublic()
  @Get('verificar/:data')
  buscaDatas(@Param('data') data: string) {
    return this.feriadoService.verificar(new Date(data));
  }

  @IsPublic()
  @Get("ano/:ano")
  buscaAno(
    @Param('ano') ano: string,
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('busca') busca?: string,
    @Query('status') status?: string
  ) {
    return this.feriadoService.buscarAno(+ano, +pagina, +limite, busca, +status);
  }

  @IsPublic()
  @Get('recorrentes')
  buscarFeriadosRecorrente(
    @Query('status') status?: string,
    @Query('pagina') pagina?: string,
    @Query('limite') limite?: string,
    @Query('busca') busca?: string,
  ) {
    return this.feriadoService.buscarFeriadosRecorrente(+status, +pagina, +limite, busca);
  }

  @IsPublic()
  @Get("recorrente/:id")
  buscarRecorrenteId(@Param("id") id: string) {
    return this.feriadoService.buscarRecorrenteId(id)
  }
}
