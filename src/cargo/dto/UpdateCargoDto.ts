import { PartialType } from '@nestjs/swagger';
import { CreateCargoDto } from './CreateCargoDto';

export class UpdateCargoDto extends PartialType(CreateCargoDto) {}
