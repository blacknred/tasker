import { DB_CONNECTION } from 'src/__shared__/consts';
import { Connection } from 'typeorm';
import { AGENT_REPOSITORY } from '../consts';
import { Agent } from '../entities/agent.entity';

export const repositoryProvider = {
  useFactory: (connection: Connection) => connection.getRepository(Agent),
  provide: AGENT_REPOSITORY,
  inject: [DB_CONNECTION],
};
