import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';
import { CreateIssueDto } from '../../dto';

export class CreateIssueCommand implements ICommand {
  constructor(
    public readonly dto: CreateIssueDto,
    public readonly userId: ID,
  ) {}
}
