export enum BaseLabel {
  MINOR = 'MINOR',
  ROUTINE = 'ROUTINE',
  CRITICAL = 'CRITICAL',
}

export enum BaseStage {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class NewTaskDto {
  id: string;
  name: string;
  description?: string;
  stage: string;
  label?: string;
  assignee?: Record<string, unknown>;
  creator: Record<string, unknown>;
  sagas: Record<string, unknown>[];
  updates: Record<string, unknown>[];
  createdAt: string;
  expiresAt?: string;
  workspaceId: string;
  //
  wid: string;
  uid: number;
}
