import { ICommand } from '@nestjs/cqrs';
import { UpdateFilterDto } from '../../../dto/update-filter.dto';

export class UpdateFilterCommand implements ICommand {
  constructor(public readonly dto: UpdateFilterDto) {}
}
