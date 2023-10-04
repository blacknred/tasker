import { ISprint, ISprintPreview } from '../interfaces';
import { userPreviewMock } from './user';

export const sprintPreviewMock: ISprintPreview = {
  id: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  name: 'SP-sprint:1',
};

export const sprintMock: ISprint = {
  ...sprintPreviewMock,
  author: userPreviewMock,
  projectId: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  details: 'Very first sprint',
  startsAt: '2022-08-14 13:55:16.622111',
  endsAt: '2022-08-14 13:55:16.622111',
  createdAt: '2022-08-14 13:55:16.622111',
  updatedAt: '2022-08-14 13:55:16.622111',
};
