import { ConfigModule, ConfigService } from '@nestjs/config';
import { Saga } from 'src/sagas/entities/saga.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { createConnection } from 'typeorm';
import { Workspace } from '../../workspaces/entities/workspace.entity';
import { DB_CONNECTION } from '../consts';

export const databaseProvider = {
  provide: DB_CONNECTION,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    createConnection({
      entities: [Workspace, Saga, Task],
      url: configService.get('DB_URL'),
      type: 'mongodb',
      logging: true,
      synchronize: true,
    }),
};
