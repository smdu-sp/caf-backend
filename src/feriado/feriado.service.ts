import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateFeriadoDto } from './dto/create-feriado.dto';
import { UpdateFeriadoDto } from './dto/update-feriado.dto';
import { FeriadosService } from 'src/feriados/feriados.service';
import { AppService } from 'src/app.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class FeriadoService {

  constructor(
    private feriados: FeriadosService,
    private app: AppService,
  ) { }

  async gera_log(id_feriado?: string, estado?: any, id_usuario?: string, id_recorrentes?: string) {

    await this.feriados.log.create({
      data: { id_feriado, estado: estado, id_usuario, id_recorrentes }
    })
  }
  async criarFeiado(
    createFeriadoDto: CreateFeriadoDto,
    nomeUsuario: string,
    login: string,
    email: string,
    permissao: string,
    statusUsuario: number) {

    let usuarioFeriado: any;

    usuarioFeriado = await this.feriados.usuario.findUnique({
      where: {
        login: login
      },
      select: {
        id: true
      }
    })
    if (!usuarioFeriado) {
      await this.feriados.usuario.create({
        data: {
          nome: nomeUsuario,
          login,
          email,
          permissao: 'ADM',
          status: statusUsuario
        }
      }).then((response) => {
        usuarioFeriado = response.login
      })
    }

    const { nome, data, descricao, nivel, tipo, modo, status } = createFeriadoDto
    if (modo === 0) {
      const recorrente = await this.feriados.recorrente.create({
        data: { nome, data, descricao, nivel, tipo, modo, status }
      });
      const feriado = await this.feriados.feriados.create({
        data: { nome, data, descricao, nivel, tipo, modo, status }
      })
      await this.gera_log(feriado.id, feriado, usuarioFeriado.id, null)
      return [recorrente, feriado];
    } else {
      const criar = await this.feriados.feriados.create({
        data: { nome, data, descricao, nivel, tipo, modo, status }
      })
      await this.gera_log(criar.id, criar, usuarioFeriado.id, null)
      return criar;
    }
  }

  async atualizar(
    id: string,
    modoFeriado: number,
    updateFeriadoDto: UpdateFeriadoDto,
    nomeUsuario: string,
    login: string,
    email: string,
    permissao: string,
    statusUsuario: number
  ) {

    let usuarioFeriado: any;

    usuarioFeriado = await this.feriados.usuario.findUnique({
      where: {
        login: login
      },
      select: {
        id: true
      }
    })
    if (!usuarioFeriado) {
      await this.feriados.usuario.create({
        data: {
          nome: nomeUsuario,
          login,
          email,
          permissao: 'ADM',
          status: statusUsuario
        }
      }).then((response) => {
        usuarioFeriado = response.login
      })
    }

    const { nome, data, descricao, nivel, tipo, modo, status } = updateFeriadoDto
    const novadata = data.toString().split("T")[0] + "T00:00:00.000Z";
    if (modoFeriado === 0) {
      const recorrente = await this.feriados.recorrente.update({
        where: {
          id
        },
        data: {
          nome, data: novadata, descricao, nivel, tipo, modo, status
        }
      })
      if (!recorrente) throw new ForbiddenException("Não foi possivel atualizar este feriado.")
      await this.gera_log(null, recorrente, usuarioFeriado.id, recorrente.id)
      return recorrente
    } else {
      const feriados = await this.feriados.feriados.update({
        where: {
          id
        },
        data: {
          nome, data: novadata, descricao, nivel, tipo, modo, status
        }
      })
      if (!feriados) throw new ForbiddenException("Não foi possivel atualizar este feriado.")
      await this.gera_log(feriados.id, feriados, usuarioFeriado.id, null)
      return feriados
    }
  }

  @Cron(CronExpression.EVERY_YEAR)
  async gerarDataRecorrente() {
    const recorrentes = await this.feriados.recorrente.findMany({
      select: {
        id: true,
        nome: true,
        data: true,
        descricao: true,
        nivel: true,
        tipo: true,
        status: true,
        modo: true
      },
      where: {
        status: 0
      }
    });

    const ano = new Date().getFullYear();

    const feriados = recorrentes.map(feriados => ({
      nome: feriados.nome,
      data: new Date(ano, feriados.data.getMonth(), feriados.data.getDate() + 1),
      descricao: feriados.descricao,
      nivel: feriados.nivel,
      tipo: feriados.tipo,
      status: feriados.status,
      modo: feriados.modo
    }));
    const result = await this.feriados.feriados.createMany({
      data: feriados
    });
    return result;
  }

  async statusRecorrentes(id: string) {
    const feriadoAlvo = this.feriados.recorrente.findUnique({
      where: { id },
      select: { id: true, status: true }
    })
    const feriado = this.feriados.recorrente.update({
      where: { id: (await feriadoAlvo).id },
      data: { status: (await feriadoAlvo).status === 1 ? 0 : 1 }
    });
    if (!feriado) throw new ForbiddenException("Não foi possivel desativar este feriado")
    return feriado;
  }

  async atualizarRecorrente(id: string, updateFeriadoDto: UpdateFeriadoDto) {
    const recorrente = this.feriados.recorrente.update({
      where: { id },
      data: updateFeriadoDto
    })
    if (!recorrente) throw new ForbiddenException("Não foi possivel atualizar este feriado recorrente")
    return recorrente
  }

  async desativarFeraido(id: string) {
    const feriadoAlvo = this.feriados.feriados.findUnique({
      where: { id },
      select: { id: true, status: true }
    })
    const feriado = this.feriados.feriados.update({
      where: { id: (await feriadoAlvo).id },
      data: { status: (await feriadoAlvo).status === 1 ? 0 : 1 }
    });
    if (!feriado) throw new ForbiddenException("Não foi possivel desativar este feriado")
    return feriado;
  }

  async create(createFeriadoDto: CreateFeriadoDto, usuario_id: string) {
    const { nome, data, descricao, nivel, tipo, modo, status } = createFeriadoDto
    if (modo === 0) {
      const recorrente = await this.feriados.recorrente.create({
        data: { nome, data, descricao, nivel, tipo, modo, status }
      });
      const feriado = await this.feriados.feriados.create({
        data: { nome, data, descricao, nivel, tipo, modo, status }
      })
      await this.gera_log(null, feriado, usuario_id, recorrente.id)
      return [recorrente, feriado];
    } else {
      const criar = await this.feriados.feriados.create({
        data: { nome, data, descricao, nivel, tipo, modo, status }
      })
      await this.gera_log(criar.id, criar, usuario_id, null)
      return criar;
    }
  }

  async buscarTudo(
    pagina: number,
    limite: number,
    busca?: string,
    status?: number
  ) {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);
    const searchParams = {
      ...(busca ?
        {
          OR: [
            { nome: { contains: busca } },
            { tipo: { contains: busca } },
          ]
        } :
        {}),
    };
    const total = await this.feriados.feriados.count({ where: { ...searchParams, status } });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, users: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const feriados = await this.feriados.feriados.findMany({
      where: { ...searchParams, status },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: feriados
    };
  }

  async verificar(data: Date) {
    const buscaData = await this.feriados.feriados.findMany({
      select: {
        id: true,
        nome: true,
        data: true,
        descricao: true,
        nivel: true,
        tipo: true,
        status: true,
        modo: true
      },
      where: {
        data: data
      }
    });
    if (!buscaData) { throw new ForbiddenException('Não foi possivel encontrar feriados') }
    return data && buscaData.length > 0;
  }

  async findOne(
    data1: Date,
    data2?: Date,
    pagina?: number,
    limite?: number,
    busca?: string,
  ) {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);
    const searchParams = {
      ...(busca ?
        {
          OR: [
            { nome: { contains: busca } },
            { tipo: { contains: busca } },
          ]
        } :
        {}),
    };
    const total = await this.feriados.feriados.count({
      where: {
        ...searchParams,
        status: 0,
        data: { lte: data2 || data1 }
      }
    });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, users: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const feriados = await this.feriados.feriados.findMany({
      where: { ...searchParams, status: 0, data: { lte: data2 || data1 } },
      select: {
        id: true,
        nome: true,
        data: true,
        descricao: true,
        nivel: true,
        tipo: true,
        status: true,
        modo: true
      },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: feriados
    };
  }

  async buscarAno(
    ano: number,
    pagina: number,
    limite: number,
    busca?: string,
    status?: number
  ) {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);
    const searchParams = {
      ...(busca ?
        {
          OR: [
            { nome: { contains: busca } },
            { tipo: { contains: busca } },
          ]
        } :
        {}),
    };
    const total = await this.feriados.feriados.count({
      where: {
        ...searchParams,
        status,
        AND: [
          { data: { gte: new Date(`${ano}-01-01`) } },
          { data: { lt: new Date(`${ano + 1}-01-01`) } }
        ]
      }
    });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, users: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const feriados = await this.feriados.feriados.findMany({
      where: {
        ...searchParams,
        status,
        AND: [
          { data: { gte: new Date(`${ano}-01-01`) } },
          { data: { lt: new Date(`${ano + 1}-01-01`) } }
        ]
      },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: feriados
    };
  }

  async buscarPorNome(nome: string) {
    const busca = this.feriados.feriados.findMany({
      where: {
        nome
      },
      select: {
        id: true,
        nome: true,
        data: true,
        descricao: true,
        nivel: true,
        tipo: true,
        status: true,
        modo: true
      }
    })
    if (!busca) throw new ForbiddenException('Não foi possivel achar um feriado')
    return busca;
  }

  async buscarFeriadosRecorrente(
    status?: number,
    pagina?: number,
    limite?: number,
    busca?: string,
  ) {
    [pagina, limite] = this.app.verificaPagina(pagina, limite);
    const searchParams = {
      ...(busca ?
        {
          OR: [
            { nome: { contains: busca } },
            { tipo: { contains: busca } },
          ]
        } :
        {}),
    };
    const total = await this.feriados.recorrente.count({
      where: {
        ...searchParams,
        status
      }
    });
    if (total == 0) return { total: 0, pagina: 0, limite: 0, users: [] };
    [pagina, limite] = this.app.verificaLimite(pagina, limite, total);
    const feriados = await this.feriados.recorrente.findMany({
      where: {
        ...searchParams,
        status
      },
      select: {
        id: true,
        nome: true,
        data: true,
        descricao: true,
        nivel: true,
        tipo: true,
        status: true,
        modo: true
      },
      skip: (pagina - 1) * limite,
      take: limite,
    });
    return {
      total: +total,
      pagina: +pagina,
      limite: +limite,
      data: feriados
    };
  }

  async buscarRecorrenteId(id: string) {
    const recorrente = this.feriados.recorrente.findUnique({
      where: { id },
      select: {
        id: true,
        nome: true,
        data: true,
        descricao: true,
        nivel: true,
        tipo: true,
        status: true,
        modo: true
      }
    })
    if (!recorrente) throw new ForbiddenException("Não foi possivel encontrar este feriado recorrente")
    return recorrente;
  }

  async bucarUnico(id: string, modo: number) {
    if (modo === 0) {
      const feriado = this.feriados.recorrente.findUnique({
        where: {
          id
        }
      })
      if (!feriado) throw new ForbiddenException('Nenhum feriado encontrado')
      return feriado
    } else {
      const feriado = this.feriados.feriados.findUnique({
        where: {
          id
        }
      })
      if (!feriado) throw new ForbiddenException('Nenhum feriado encontrado')
      return feriado
    }
  }

}
