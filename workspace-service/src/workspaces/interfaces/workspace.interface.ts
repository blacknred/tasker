import { IAgent } from 'src/agents/interfaces/agent.interface';
import { ObjectID } from 'typeorm';

export interface IWorkspace {
  id: ObjectID;
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
