import { PartialType } from '@nestjs/swagger';
import { CreateServidorDto } from './CreateServidorDto';

export class UpdateServidorDto extends PartialType(CreateServidorDto) {}
