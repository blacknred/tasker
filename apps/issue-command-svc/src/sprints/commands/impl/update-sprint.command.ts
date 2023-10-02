import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { UpdateSprintDto } from '../../dto/update-sprint.dto';

export class UpdateSprintCommand implements ICommand {
  constructor(
    public readonly id: ID,
    public readonly dto: UpdateSprintDto,
    public readonly userId: ID,
  ) {}
}
