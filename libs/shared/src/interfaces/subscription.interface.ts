import type { ID } from './base.interface';
import type { IHydratedIssueBase } from './issue.interface';

export interface ISubscription {
  issueId: ID;
  subscriberId: ID;
}

export interface IHydratedSubscription extends Omit<ISubscription, 'issueId'> {
  issue: IHydratedIssueBase;
}
