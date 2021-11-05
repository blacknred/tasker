import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Agent } from 'src/agents/entities/agent.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Saga } from '../../sagas/entities/saga.entity';
import { Task } from '../../tasks/entities/task.entity';
import { Workspace } from '../../workspaces/entities/workspace.entity';

export const databaseProvider: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    entities: [Workspace, Role, Agent, Saga, Task],
    url: configService.get('DB_URL'),
    type: 'mongodb',
    logging: true,
    synchronize: false,
    useUnifiedTopology: true,
  }),
};
