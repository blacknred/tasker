import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';

export class ArchiveProjectCommand implements ICommand {
  constructor(public readonly id: ID) {}
}
