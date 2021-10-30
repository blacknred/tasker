import { DB_CONNECTION } from 'src/__shared__/consts';
import { Connection } from 'typeorm';
import { WORKSPACE_REPOSITORY } from '../consts';
import { Workspace } from '../entities/workspace.entity';

export const repositoryProvider = {
  useFactory: (connection: Connection) => connection.getRepository(Workspace),
  provide: WORKSPACE_REPOSITORY,
  inject: [DB_CONNECTION],
};
