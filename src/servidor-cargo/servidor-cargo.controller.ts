// src/servidor-cargo/servidor-cargo.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { ServidorCargoService } from './servidor-cargo.service';
import { CreateServidorCargoDto } from './dto/create-servidor-cargo.dto';
import { UpdateServidorCargoDto } from './dto/update-servidor-cargo.dto';

@ApiBearerAuth()
@ApiTags('ServidorCargo')
@Controller('servidor-cargo')
export class ServidorCargoController {
    constructor(private readonly servidorCargoService: ServidorCargoService) {}

    @Post()
    @ApiOperation({ summary: 'Cria um novo servidor cargo' })
    @ApiResponse({ status: 201, description: 'Servidor cargo criado com sucesso.' })
    create(@Body() createServidorCargoDto: CreateServidorCargoDto) {
        return this.servidorCargoService.create(createServidorCargoDto);
    }

    @Get()
    @ApiOperation({ summary: 'Lista todos os servidores cargos' })
    @ApiResponse({ status: 200, description: 'Lista de servidores cargos.' })
    findAll() {
        return this.servidorCargoService.findAll();
    }

    @Get(':especie_id/:servidor_id/:cargo_id')
    findOne(
        @Param('especie_id') especie_id: string,
        @Param('servidor_id') servidor_id: string,
        @Param('cargo_id') cargo_id: string
    ) {
        return this.servidorCargoService.findOne(especie_id, servidor_id, cargo_id);
    }

    @Patch(':especie_id/:servidor_id/:cargo_id')
    update(
        @Param('especie_id') especie_id: string,
        @Param('servidor_id') servidor_id: string,
        @Param('cargo_id') cargo_id: string,
        @Body() updateServidorCargoDto: UpdateServidorCargoDto
    ) {
        return this.servidorCargoService.update(especie_id, servidor_id, cargo_id, updateServidorCargoDto);
    }

    @Delete(':especie_id/:servidor_id/:cargo_id')
    remove(
        @Param('especie_id') especie_id: string,
        @Param('servidor_id') servidor_id: string,
        @Param('cargo_id') cargo_id: string
    ) {
        return this.servidorCargoService.remove(especie_id, servidor_id, cargo_id);
    }

    @Delete()
    removeAll() {
        return this.servidorCargoService.removeAll();
    }
}
