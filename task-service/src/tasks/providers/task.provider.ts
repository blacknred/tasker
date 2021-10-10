import { Connection } from 'typeorm';
import { DB_CONNECTION, TASK_REPOSITORY } from '../consts';
import { Task } from '../entities/task.entity';

export const taskProvider = {
  useFactory: (connection: Connection) => connection.getRepository(Task),
  provide: TASK_REPOSITORY,
  inject: [DB_CONNECTION],
};
