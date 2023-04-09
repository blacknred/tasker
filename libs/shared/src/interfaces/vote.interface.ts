import type { ID } from './base.interface';
import type { IHydratedIssuePreview } from './issue.interface';

export interface IVote {
  issueId: ID;
  voterId: ID;
}

export interface IHydratedVote extends Omit<IVote, 'issueId'> {
  issue: IHydratedIssuePreview;
}
