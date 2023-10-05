import { WorkspacePolicy } from '../enums';
import { IRole } from '../interfaces';

export const roleMock: IRole = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'Worker',
  details: 'base role',
  color: '#454564',
  rank: 1,
  policies: [WorkspacePolicy.ISSUE_MANAGEMENT],
  workspaceId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
};
