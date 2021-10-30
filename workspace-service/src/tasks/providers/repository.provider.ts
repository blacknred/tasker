import { DB_CONNECTION } from 'src/__shared__/consts';
import { Connection } from 'typeorm';
import { TASK_REPOSITORY } from '../consts';
import { Task } from '../entities/task.entity';

export const repositoryProvider = {
  useFactory: (connection: Connection) => connection.getRepository(Task),
  provide: TASK_REPOSITORY,
  inject: [DB_CONNECTION],
};
