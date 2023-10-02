import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { UpdateIssueDto } from '../../dto';

export class UpdateIssueCommand implements ICommand {
  constructor(
    public readonly id: ID,
    public readonly dto: UpdateIssueDto,
    public readonly userId: ID,
  ) {}
}
