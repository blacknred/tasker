export enum ProjectPrivilege {
  PROJECT_MANAGEMENT = 'PROJECT_MANAGEMENT',
  PROJECT_DELETION = 'PROJECT_DELETION',
  SPRINT_MANAGEMENT = 'SPRINT_MANAGEMENT',
  EPIC_MANAGEMENT = 'EPIC_MANAGEMENT',
  STORY_MANAGEMENT = 'STORY_MANAGEMENT',
  TASK_MANAGEMENT = 'TASK_MANAGEMENT',
  BACKLOG_ACCESS = 'BACKLOG_ACCESS',
  ROADMAP_ACCESS = 'ROADMAP_ACCESS',
  REPORT_ACCESS = 'REPORT_ACCESS',
}

export interface IProjectRole {
  projectId: number;
  name: string;
  color?: string;
  privilege: ProjectPrivilege;
}

export interface IProjectMember {
  userId: number;
  projectId: number;
  role: IProjectRole;
  createdAt: string;
}
