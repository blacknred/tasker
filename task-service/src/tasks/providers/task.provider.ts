import { Connection } from 'typeorm';
import { databaseConnection, taskRepository } from '../consts';
import { Task } from '../entities/task.entity';

export const taskProvider = {
  provide: taskRepository,
  useFactory: (connection: Connection) => connection.getRepository(Task),
  inject: [databaseConnection],
};
