import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { UpdateProjectDto } from '../../dto';

export class UpdateProjectCommand implements ICommand {
  constructor(public readonly id: ID, public readonly dto: UpdateProjectDto) {}
}
