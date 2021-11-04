import { DB_CONNECTION } from 'src/__shared__/consts';
import { Connection } from 'typeorm';
import { ROLE_REPOSITORY } from '../consts';
import { Role } from '../entities/role.entity';

export const repositoryProvider = {
  useFactory: (connection: Connection) => connection.getRepository(Role),
  provide: ROLE_REPOSITORY,
  inject: [DB_CONNECTION],
};
