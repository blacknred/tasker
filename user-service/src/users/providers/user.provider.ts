import { Connection } from 'typeorm';
import { DB_CONNECTION, USER_REPOSITORY } from '../consts';
import { User } from '../entities/user.entity';

export const userProvider = {
  provide: USER_REPOSITORY,
  useFactory: (connection: Connection) => connection.getRepository(User),
  inject: [DB_CONNECTION],
};
