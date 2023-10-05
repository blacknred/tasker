import { ProjectType } from '../enums';
import { IProject, IProjectPreview } from '../interfaces';
import { issueStatusMock, issueTagMock } from './issue';

export const projectPreviewMock: IProjectPreview = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'My project',
  image: 'https://path-to-avatar.png',
};

export const projectMock: IProject = {
  ...projectPreviewMock,
  details: 'first project',
  type: ProjectType.SCRUM,
  key: 'mfp',
  authorId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  workspaceId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
  statusses: [issueStatusMock],
  tags: [issueTagMock],
};
