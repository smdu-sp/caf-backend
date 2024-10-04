import {
  ForbiddenException,
  Global,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { $Enums, Usuario } from '@prisma/client';
import { AppService } from 'src/app.service';
import { SGUService } from 'src/sgu/sgu.service';
import { Client, createClient } from 'ldapjs';

@Global()
@Injectable()
export class UsuariosService {
  constructor(
    private prisma: PrismaService,
    private sgu: SGUService,
    private app: AppService,
  ) {}

  async retornaPermissao(id: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    return usuario.permissao;
  }

  async listaCompleta() {
    const lista = await this.prisma.usuario.findMany({
      orderBy: { nome: 'asc' },
    });
    if (!lista || lista.length == 0) throw new ForbiddenException('Nenhum usuário encontrado.');
    return lista;
  }

  validaPermissaoCriador(
    permissao: $Enums.Permissao,
    permissaoCriador: $Enums.Permissao,
  ) {
    if (
      permissao === $Enums.Permissao.DEV &&
      permissaoCriador === $Enums.Permissao.ADM
    )
      permissao = $Enums.Permissao.ADM;
    if (
      (permissao === $Enums.Permissao.DEV ||
        permissao === $Enums.Permissao.ADM) &&
      permissaoCriador === $Enums.Permissao.ELO
    )
      permissao = $Enums.Permissao.ELO;
    return permissao;
  }

  async criar(createUsuarioDto: CreateUsuarioDto, criador?: Usuario) {
    const loguser = await this.buscarPorLogin(createUsuarioDto.login);
    if (loguser) throw new ForbiddenException('Login já cadastrado.');
    const emailuser = await this.buscarPorEmail(createUsuarioDto.email);
    if (emailuser) throw new ForbiddenException('Email já cadastrado.');

    if (!criador) createUsuarioDto.permissao = 'USR';
    if (criador) {
      const permissaoCriador = await this.retornaPermissao(criador.id);
      if (permissaoCriador !== $Enums.Permissao.DEV)
        createUsuarioDto.permissao = this.validaPermissaoCriador(
          createUsuarioDto.permissao,
          permissaoCriador,
        );
    }

    const usuario = await this.prisma.usuario.create({
      data: { 
        ...createUsuarioDto
      }
    });

    if (!usuario)
      throw new InternalServerErrorException(
        'Não foi possível criar o usuário, tente novamente.',
      );
    return usuario;
  }

  async buscarTudo(){
    const listUsuario = await this.prisma.usuario.findMany()
    return listUsuario
  }

  async buscarPorId(id: string) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
    });
    return usuario;
  }

  async buscarPorEmail(email: string) {
    return await this.prisma.usuario.findUnique({ where: { email } });
  }

  async buscarPorLogin(login: string) {
    return await this.prisma.usuario.findUnique({
      where: { login },
    });
  }

  async atualizar(
    usuario: Usuario,
    id: string,
    updateUsuarioDto: UpdateUsuarioDto,
  ) {
    const usuarioLogado = await this.buscarPorId(usuario.id);
    if (!usuarioLogado || ['TEC', 'USR'].includes(usuarioLogado.permissao) && id !== usuarioLogado.id)
      throw new ForbiddenException('Operação não autorizada para este usuário.');

    if (updateUsuarioDto.login) {
      const usuarioExistente = await this.buscarPorLogin(updateUsuarioDto.login);
      if (usuarioExistente && usuarioExistente.id !== id) throw new ForbiddenException('Login já cadastrado.');
    }

    if (updateUsuarioDto.email) {
      const usuarioPorEmail = await this.buscarPorEmail(updateUsuarioDto.email);
      if (usuarioPorEmail && usuarioPorEmail.id !== id) throw new ForbiddenException('Email já cadastrado.');
    }

    if (updateUsuarioDto.permissao) {
      updateUsuarioDto.permissao = this.validaPermissaoCriador(
        updateUsuarioDto.permissao,
        usuarioLogado.permissao,
      );
    }

    const usuarioAtualizado = await this.prisma.usuario.update({
      data: updateUsuarioDto,
      where: { id },
    });
    return usuarioAtualizado;
  }

  async excluir(id: string) {
    await this.prisma.usuario.update({
      data: { status: 2 },
      where: { id },
    });
    return {
      desativado: true,
    };
  }

  async autorizaUsuario(id: string) {
    const autorizado = await this.prisma.usuario.update({
      where: { id },
      data: { status: 1 },
    });
    if (autorizado && autorizado.status === 1) return { autorizado: true };
    throw new ForbiddenException('Erro ao autorizar o usuário.');
  }

  async validaUsuario(id: string) {
    const usuario = await this.prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new ForbiddenException('Usuário não encontrado.');
    if (usuario.status !== 1) throw new ForbiddenException('Usuário inativo.');
    return usuario;
  }

  async buscarNovo(login: string){
    const usuarioExiste = await this.buscarPorLogin(login);
    if (usuarioExiste && usuarioExiste.status === 1) throw new ForbiddenException('Login já cadastrado.');
    if (usuarioExiste && usuarioExiste.status !== 1){
      const usuarioReativado = await this.prisma.usuario.update({ where: { id: usuarioExiste.id }, data: { status: 1 } });
      return usuarioReativado;
    }

    const client: Client = createClient({
      url: process.env.LDAP_SERVER,
    });

    await new Promise<void>((resolve, reject) => {
      client.bind(`${process.env.USER_LDAP}${process.env.LDAP_DOMAIN}`, process.env.PASS_LDAP, (err) => {
        if (err) {
          client.destroy();
          reject(new UnauthorizedException('Credenciais incorretas.'));
        }
        resolve();
      });
    });

    const usuario_ldap = await new Promise<any>((resolve, reject) => {
      client.search(
        process.env.LDAP_BASE,
        {
          filter: `(&(samaccountname=${login})(company=SMUL))`,
          scope: 'sub',
          attributes: ['name', 'mail'],
        },
        (err, res) => {
          if (err) {
            client.destroy();
            resolve('erro');
          }
          res.on('searchEntry', async (entry) => {
            const nome = JSON.stringify(
              entry.pojo.attributes[0].values[0],
            ).replaceAll('"', '');
            const email = JSON.stringify(
              entry.pojo.attributes[1].values[0],
            ).replaceAll('"', '').toLowerCase();
            resolve({ nome, email });
          });
          res.on('error', (err) => {
            client.destroy();
            resolve('erro');
          });
          res.on('end', () => {
            client.destroy();
            resolve('erro');
          });
        },
      );
    });
    client.destroy();
    if (!usuario_ldap.email) throw new UnauthorizedException('Credenciais incorretas.');
    return {
      login,
      nome: usuario_ldap.nome,
      email: usuario_ldap.email
    };
  }

  async removeAll() {
    return this.prisma.usuario.deleteMany();
  }
  
  async removeAllExceptOne() {
    return this.prisma.usuario.deleteMany({
      where: {
        email: {
          not: "vmabreu@prefeitura.sp.gov.br"
        }
      }
    });
  }
}
