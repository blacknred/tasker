import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { CreateSprintDto } from '../../dto';

export class CreateSprintCommand implements ICommand {
  constructor(
    public readonly projectId: ID,
    public readonly dto: CreateSprintDto,
    public readonly userId: ID,
  ) {}
}
