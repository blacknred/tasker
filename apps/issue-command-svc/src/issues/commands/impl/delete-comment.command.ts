import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';

export class DeleteCommentCommand implements ICommand {
  constructor(
    public readonly projectId: ID,
    public readonly issueId: ID,
    public readonly commentId: ID,
    public readonly userId: ID,
  ) {}
}
