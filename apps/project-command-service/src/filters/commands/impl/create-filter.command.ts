import { ICommand } from '@nestjs/cqrs';
import { CreateFilterDto } from '../../dto/create-filter.dto';

export class CreateFilterCommand implements ICommand {
  constructor(public readonly dto: CreateFilterDto) {}
}
