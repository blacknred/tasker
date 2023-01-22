import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { UpdateFilterDto } from '../../dto/update-filter.dto';

export class UpdateFilterCommand implements ICommand {
  constructor(
    public readonly id: ID,
    public readonly dto: UpdateFilterDto,
    public readonly userId: ID,
  ) {}
}
