import type { IBase, ID } from './base.interface';

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

export interface IProjectRole extends IBase {
  projectId: ID;
  name: string;
  color?: string;
  permissions: ProjectPermission[];
}
