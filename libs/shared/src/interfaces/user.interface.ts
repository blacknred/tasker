import { IBase, ID } from './base.interface';
// import { Merge } from 'type-fest';

// export interface ApiAllUsers {
//   allUsers: Merge<User, { postCount: number }>[];
// }

export enum ProjectPermission {
  PROJECT_MANAGEMENT = 'PROJECT_MANAGEMENT',
  SPRINT_MANAGEMENT = 'SPRINT_MANAGEMENT',
  EPIC_MANAGEMENT = 'EPIC_MANAGEMENT',
  STORY_MANAGEMENT = 'STORY_MANAGEMENT',
  TASK_MANAGEMENT = 'TASK_MANAGEMENT',
  BACKLOG_ACCESS = 'BACKLOG_ACCESS',
  ROADMAP_ACCESS = 'ROADMAP_ACCESS',
  REPORT_ACCESS = 'REPORT_ACCESS',
}

export enum NotificationTransport {
  EMAIL = 'EMAIL',
  PUSH = 'PHONE',
  NONE = 'NONE',
}

export enum SecuredNotificationTransport {
  EMAIL = 'EMAIL',
  PHONE = 'PHONE',
}

export interface IProjectRole {
  id: ID;
  projectId: ID;
  name: string;
  color?: string;
  permissions: ProjectPermission[];
}

export interface IUser extends IBase {
  username: string;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  details?: string;
  isAdmin: boolean;
  isConfirmed: boolean;
  locale: string;
  currency: string;
  is2faEnabled: boolean;
  notificationTransport: NotificationTransport;
  securedNotificationTransport: SecuredNotificationTransport;
  //
  roles: IProjectRole[];
}

export type IUserPreview = Pick<IUser, 'id' | 'name' | 'image'>;
