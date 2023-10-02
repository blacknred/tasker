import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { CreateSprintDto } from '../../dto/create-sprint.dto';

export class CreateSprintCommand implements ICommand {
  constructor(
    public readonly dto: CreateSprintDto,
    public readonly userId: ID,
  ) {}
}
