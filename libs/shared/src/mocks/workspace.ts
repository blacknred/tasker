import { IWorkspace } from '../interfaces';
import { projectPreviewMock } from './project';

export const workspaceMock: IWorkspace = {
  id: 'workspace1',
  name: 'Workspace 1',
  details: 'My organization',
  totp: false,
  isUnlimited: false,
  ownerId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
  projects: [projectPreviewMock],
};
