import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';

export class UnArchiveProjectCommand implements ICommand {
  constructor(public readonly id: ID) {}
}
