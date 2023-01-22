import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { CreateFilterDto } from '../../dto/create-filter.dto';

export class CreateFilterCommand implements ICommand {
  constructor(
    public readonly dto: CreateFilterDto,
    public readonly userId: ID,
  ) {}
}
