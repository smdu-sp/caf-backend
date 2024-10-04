import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Permissoes } from 'src/auth/decorators/permissoes.decorator';
import { UsuarioAtual } from 'src/auth/decorators/usuario-atual.decorator';
import { Usuario } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Usuários')
@Controller('usuarios') //localhost:3000/usuarios
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Permissoes('SUP', 'ADM')
  @Post('criar')
  @ApiBody({ description: 'Estrutura do usuário para criação.', type: CreateUsuarioDto })
  @ApiResponse({ status: 201, description: 'Sucesso na criação do usuário.', type: CreateUsuarioDto })
  criar(
    @UsuarioAtual() usuario: Usuario,
    @Body() createUsuarioDto: CreateUsuarioDto,
  ) {
    return this.usuariosService.criar(createUsuarioDto, usuario);
  }
  
  @Permissoes('ADM', 'SUP')
  @Get('buscar-tudo') //localhost:3000/usuarios/buscar-tudo
  buscarTudo(
  ) {
    return this.usuariosService.buscarTudo();
  }
  
  @Permissoes('ADM', 'SUP')
  @Get('buscar-por-id/:id') //localhost:3000/usuarios/buscar-por-id/id
  buscarPorId(@Param('id') id: string) {
    return this.usuariosService.buscarPorId(id);
  }
  
  @Permissoes('ADM', 'SUP', 'USR')
  @Patch('atualizar/:id') //localhost:3000/usuarios/atualizar/id
  @ApiBody({ description: 'Estrutura do usuário para atualização.', type: CreateUsuarioDto })
  atualizar(
    @UsuarioAtual() usuario: Usuario,
    @Param('id') id: string,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
  ) {
    return this.usuariosService.atualizar(usuario, id, updateUsuarioDto);
  }

  @Permissoes('ADM', 'SUP')
  @Get('lista-completa')
  listaCompleta() {
    return this.usuariosService.listaCompleta();
  }

  @Permissoes('ADM', 'SUP')
  @Delete('desativar/:id') 
  excluir(@Param('id') id: string) {
    return this.usuariosService.excluir(id);
  }

  @Permissoes('ADM', 'SUP')
  @Delete('desativar/all') 
  excluirAll() {
    return this.usuariosService.removeAll();
  }

  @Permissoes('ADM', 'SUP')
  @Patch('autorizar/:id')
  autorizarUsuario(@Param('id') id: string) {
    return this.usuariosService.autorizaUsuario(id);
  }

  @Get('valida-usuario')
  validaUsuario(@UsuarioAtual() usuario: Usuario) {
    return this.usuariosService.validaUsuario(usuario.id);
  }

  @Permissoes('ADM', 'SUP')
  @Get('buscar-novo')
  buscarNovo(@Query('login') login: string) {
    return this.usuariosService.buscarNovo(login);
  }
}
