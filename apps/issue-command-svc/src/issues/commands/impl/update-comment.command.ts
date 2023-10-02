import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { UpdateCommentDto } from '../../dto';

export class UpdateCommentCommand implements ICommand {
  constructor(
    public readonly id: ID,
    public readonly dto: UpdateCommentDto,
    public readonly userId: ID,
  ) {}
}
