import type { Options } from '@mikro-orm/core';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
// import { Agent } from './src/agents/entities/agent.entity';
// import { Saga } from './src/sagas/entities/saga.entity';
// import { Task } from './src/tasks/entities/task.entity';
// import { Workspace } from './src/workspaces/entities/workspace.entity';

// initialize the ConfigService manually since it is not a part of a NestJS app
const configService = new ConfigService();

const MikroOrmConfig: Options = {
  namingStrategy: EntityCaseNamingStrategy,
  entities: [
    // Workspace, Agent, Task, Saga
  ],
  clientUrl: configService.get('POSTGRES_URL'),
  type: 'postgresql',
};

export default MikroOrmConfig;
