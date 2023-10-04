import { IssueType } from '../enums';
import { IFilter, IUser, IUserPreview } from '../interfaces';
import { projectPreviewMock } from './project';
import { roleMock } from './role';

export const filterMock: IFilter = {
  name: 'my filter',
  url: `?type=${IssueType.EPIC}`,
};

export const userPreviewMock: IUserPreview = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  username: 'johndoe',
  image: 'https://path-to-avatar.png',
};

export const userMock: IUser = {
  ...userPreviewMock,
  isActive: true,
  workspaceId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  details: 'its me',
  locale: 'en',
  firstName: 'John',
  lastName: 'Joe',
  email: 'test@email.com',
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
  filters: [filterMock],
  roles: [roleMock],
  projects: [projectPreviewMock],
};
