import { IAgent } from 'src/agents/interfaces/agent.interface';

export interface IWorkspace {
  id: string;
  name: string;
  description?: string;
  taskStages: string[];
  taskLabels: string[];
  doneStage: string;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
  //
  agent?: IAgent;
}
