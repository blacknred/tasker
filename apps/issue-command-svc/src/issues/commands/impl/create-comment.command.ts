import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { CreateCommentDto } from '../../dto';

export class CreateCommentCommand implements ICommand {
  constructor(
    public readonly projectId: ID,
    public readonly issueId: ID,
    public readonly dto: CreateCommentDto,
    public readonly userId: ID,
  ) {}
}
