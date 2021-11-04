import { IAgent } from './agent.interface';

export enum BaseStage {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export enum BaseLabel {
  MINOR = 'MINOR',
  ROUTINE = 'ROUTINE',
  CRITICAL = 'CRITICAL',
}

export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  taskStages: string[];
  taskLabels: string[];
  doneStage: string;
  creatorId: number;
  createdAt: string;
  updatedAt: string;
  //
  agent?: IAgent;
}
