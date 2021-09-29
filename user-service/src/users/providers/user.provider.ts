import { Connection } from 'typeorm';
import { DB_CONNECTION, USER_REPOSITORY } from '../consts';
import { User } from '../entities/user.entity';

export const userProvider = {
  useFactory: (connection: Connection) => connection.getRepository(User),
  provide: USER_REPOSITORY,
  inject: [DB_CONNECTION],
};
