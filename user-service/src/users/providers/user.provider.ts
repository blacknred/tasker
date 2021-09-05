import { Connection } from 'typeorm';
import { databaseConnection, userRepository } from '../consts';
import { User } from '../entities/user.entity';

export const userProvider = {
  provide: userRepository,
  useFactory: (connection: Connection) => connection.getRepository(User),
  inject: [databaseConnection],
};
