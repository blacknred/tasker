import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';

export class DeleteSprintCommand implements ICommand {
  constructor(
    public readonly projectId: ID,
    public readonly sprintId: ID,
    public readonly userId: ID,
  ) {}
}
