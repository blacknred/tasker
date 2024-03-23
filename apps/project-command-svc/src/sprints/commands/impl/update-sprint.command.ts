import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { UpdateSprintDto } from '../../dto';

export class UpdateSprintCommand implements ICommand {
  constructor(
    public readonly projectId: ID,
    public readonly sprintId: ID,
    public readonly dto: UpdateSprintDto,
    public readonly userId: ID,
  ) {}
}
