import { IssuePriority, IssueRelation, IssueType } from '../enums';
import {
  IIssue,
  IIssueComment,
  IIssueSubscription,
  IIssueVote,
} from '../interfaces';
import { sprintMock } from './sprint';
import { userMock } from './user';

export const issueTagMock = {
  name: 'design',
  color: '#244343',
};

export const issueStatusMock = {
  name: 'todo',
  color: '#244343',
  isFirst: true,
  isLast: false,
  transitions: ['in_process'],
};

export const issueMock: IIssue = (() => ({
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  type: IssueType.TASK,
  projectId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  author: userMock,
  name: 'msp-1',
  title: 'My first issue',
  details: 'Very important subject',
  priority: IssuePriority.MEDIUM,
  assets: [],
  version: 1,
  weight: 8,
  endsAt: '2022-08-14 13:55:16.622111',
  votesCount: 5,
  subscriptionsCount: 5,
  tags: [issueTagMock],
  sprint: sprintMock,
  assignee: userMock,
  status: issueStatusMock,
  epic: this,
  relations: [
    {
      issueId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
      relatedIssue: this,
      relation: IssueRelation.CAUSE,
    },
  ],
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
}))();

export const issueCommentMock: IIssueComment = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  issueId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  body: 'first comment',
  assets: [],
  author: userMock,
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
};

export const issueVoteMock: IIssueVote = {
  user: userMock,
};

export const issueSubscriptionMock: IIssueSubscription = {
  user: userMock,
};
