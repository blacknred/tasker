import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { CreateProjectDto } from '../../dto';

export class CreateProjectCommand implements ICommand {
  constructor(
    public readonly dto: CreateProjectDto,
    public readonly userId: ID,
  ) {}
}
