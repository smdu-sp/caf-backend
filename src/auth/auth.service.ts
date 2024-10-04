import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from '@prisma/client';
import { UsuarioPayload } from './models/UsuarioPayload';
import { JwtService } from '@nestjs/jwt';
import { UsuarioToken } from './models/UsuarioToken';
import { Client, createClient } from 'ldapjs';
import { UsuarioJwt } from './models/UsuarioJwt';
import { CreateUsuarioDto, Tipo_Usuario } from 'src/usuarios/dto/create-usuario.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(usuario: Usuario): Promise<UsuarioToken> {
    const { access_token, refresh_token } = await this.getTokens(usuario);
    return { access_token, refresh_token };
  }

  async refresh(usuario: Usuario) {
    const { access_token, refresh_token } = await this.getTokens(usuario);
    return { access_token, refresh_token };
  }

  async getTokens(usuario: UsuarioJwt) {
    const { id, login, nome, email, permissao, status } = usuario;
    const payload: UsuarioPayload = { sub: id, login, nome, email, permissao, status };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
      secret: process.env.RT_SECRET,
    });
    return { access_token, refresh_token };
  }

  async validateUser(login: string, senha: string) {
    let usuario = await this.usuariosService.buscarPorLogin(login);
    if (usuario && usuario.status === 3)
      throw new UnauthorizedException(
        'Usuário aguardando aprovação de acesso ao sistema.',
      );
    if (usuario && usuario.status === 2)
      throw new UnauthorizedException('Usuário inativo.');
    if (process.env.ENVIRONMENT === 'local') {
      if (usuario) return usuario;
    }
    const client: Client = createClient({
      url: process.env.LDAP_SERVER,
    });
    await new Promise<void>((resolve, reject) => {
      client.bind(`${login}${process.env.LDAP_DOMAIN}`, senha, (err: any) => {
        if (err) {
          client.destroy();
          reject(new UnauthorizedException('Credenciais incorretas.'));
        }
        resolve();
      });
    });
    if (!usuario) {
      usuario = await new Promise<any>((resolve, reject) => {
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
              reject(new UnauthorizedException('Erro na busca LDAP.'));
            }
            res.on('searchEntry', async (entry) => {
              const { name, mail } = Object.fromEntries(
                entry.pojo.attributes.map(({ type, values }) => [type, values[0]])
              );
              try {
                const novoUsuario = await this.usuariosService.criar({
                  nome: name,
                  login,
                  email: mail,
                  permissao: 'USR',
                  status: 1,
                  tipo: Tipo_Usuario.SERVIDOR,
                  criadoEm: undefined
                });
                if (novoUsuario) {
                  resolve(await this.usuariosService.buscarPorLogin(novoUsuario.login));
                } else {
                  reject(new UnauthorizedException('Não foi possível criar o usuário.'));
                }
              } catch (error) {
                reject(new UnauthorizedException('Erro ao criar o usuário.'));
              } finally {
                client.destroy();
              }
            });
            res.on('error', (err) => {
              client.destroy();
              reject(new UnauthorizedException('Erro na busca LDAP.'));
            });
            res.on('end', () => {
              if (!usuario) {
                reject(new UnauthorizedException('Não foi possível fazer login no momento.'));
              }
            });
          }
        );
      });
    }
    return usuario;
  }
}
