import { PartialType } from '@nestjs/swagger';
import { CreateServidorCargoDto } from './create-servidor-cargo.dto';

export class UpdateServidorCargoDto extends PartialType(CreateServidorCargoDto) {}
