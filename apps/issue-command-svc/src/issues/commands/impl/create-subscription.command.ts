import type { ICommand } from '@nestjs/cqrs';
import type { ID } from '@taskapp/shared';

export class CreateSubscriptionCommand implements ICommand {
  constructor(public readonly issueId: ID, public readonly userId: ID) {}
}
